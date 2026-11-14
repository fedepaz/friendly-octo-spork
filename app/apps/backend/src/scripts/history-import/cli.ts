// apps/backend/src/scripts/history-import/cli.ts
// CLI for the history-import pipeline: parse → validate → reconcile → import.
import fs from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { importHistory } from './import';
import { parseSheets } from './parse';
import { readSheets } from './ods';
import { reconcile, type ReconcileReport } from './reconcile';
import type { InferredDateEntry, QuarantineEntry } from './types';
import { validateParse, type ValidationReport } from './validate';

export interface CliOptions {
  odspath: string;
  email: string;
  password: string;
  name: string;
  force: boolean;
  dryRun: boolean;
  report: string;
}

function flagValue(argv: string[], name: string): string | undefined {
  const i = argv.indexOf(name);
  if (i === -1 || i + 1 >= argv.length) return undefined;
  return argv[i + 1];
}

function requireFlag(argv: string[], name: string): string {
  const v = flagValue(argv, name);
  if (v === undefined || v.startsWith('--')) {
    throw new Error(`Missing required flag ${name}`);
  }
  return v;
}

export function parseCliArgs(argv: string[]): CliOptions {
  return {
    odspath: requireFlag(argv, '--odspath'),
    email: requireFlag(argv, '--email'),
    password: requireFlag(argv, '--password'),
    name: flagValue(argv, '--name') ?? 'History Import',
    force: argv.includes('--force'),
    dryRun: argv.includes('--dry-run'),
    report: flagValue(argv, '--report') ?? 'history-import-report.md',
  };
}

function pct(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

export function formatReport(
  validation: ValidationReport,
  rec: ReconcileReport,
  quarantine: QuarantineEntry[],
  inferredDates: InferredDateEntry[] = [],
): string {
  const lines: string[] = [];

  lines.push('# History import report');
  lines.push('');
  lines.push(`**Validation:** ${validation.ok ? 'PASSED' : 'FAILED'}`);
  lines.push(`- Parsed rows: ${validation.importedRows}`);
  lines.push(
    `- Quarantined: ${validation.quarantinedRows} (${pct(validation.quarantineRate)})`,
  );
  lines.push(`- Inferred dates: ${validation.inferredDates}`);
  const passedChecks =
    validation.checks.length - validation.failedChecks.length;
  lines.push(
    `- Table checksums: ${passedChecks} passed, ${validation.failedChecks.length} failed`,
  );
  for (const c of validation.failedChecks) {
    lines.push(
      `- FAIL ${c.sheet} / ${c.label || '(no label)'} [band ${c.band}]: rows ${c.rowSum} vs total ${c.total} (diff ${c.diff})`,
    );
  }
  lines.push('');

  lines.push(`**Reconciliation:** ${rec.ok ? 'PASSED' : 'FAILED'}`);
  lines.push(`- Checkpoints passed: ${rec.passed}`);
  lines.push(`- Checkpoints failed: ${rec.failed}`);
  lines.push(`- Info-only checkpoints: ${rec.infoCount}`);
  for (const c of rec.checks) {
    const status = c.severity === 'info' ? 'INFO' : c.ok ? 'OK' : 'MISMATCH';
    const who = c.accountName ?? 'unmapped';
    lines.push(
      `- ${status} ${c.label} @${c.dateISO} (${who}): expected ${c.expected}, computed ${c.computed ?? 'n/a'}`,
    );
  }
  lines.push('');

  lines.push(`## Inferred dates (${inferredDates.length})`);
  if (inferredDates.length === 0) {
    lines.push('- None.');
  } else {
    for (const inf of inferredDates) {
      lines.push(`- ${inf.sheet} r${inf.row} c${inf.col}: "${inf.cell}"`);
    }
  }
  lines.push('');

  lines.push(`## Quarantine (${quarantine.length})`);
  if (quarantine.length === 0) {
    lines.push('- None.');
  } else {
    for (const q of quarantine) {
      lines.push(`- ${q.sheet} r${q.row} c${q.col} "${q.cell}": ${q.reason}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

export async function runCli(
  argv: string[],
  deps: {
    prisma: PrismaClient | null;
    stdout?: (line: string) => void;
  },
): Promise<number> {
  let opts: CliOptions;
  try {
    opts = parseCliArgs(argv);
  } catch (err) {
    deps.stdout?.((err as Error).message);
    return 1;
  }

  const sheets = readSheets(opts.odspath);
  const parsed = parseSheets(sheets);
  const validation = validateParse(parsed);
  const rows = parsed.tables.flatMap((t) => t.rows);
  const rec = reconcile({ snapshots: parsed.snapshots, rows });

  const report = formatReport(
    validation,
    rec,
    parsed.quarantine,
    parsed.inferredDates,
  );
  fs.writeFileSync(path.resolve(opts.report), report);
  deps.stdout?.(report);

  if (!validation.ok) {
    deps.stdout?.(
      'Import aborted: validation failed (see report). Fix parser maps or adjust data, then rerun.',
    );
    return 2;
  }

  if (opts.dryRun) {
    deps.stdout?.(
      `Dry run: would import ${rows.length} transactions for ${opts.email}.`,
    );
    return 0;
  }

  if (!deps.prisma) {
    deps.stdout?.('No database client available for import.');
    return 1;
  }

  try {
    const summary = await importHistory(deps.prisma, parsed, {
      email: opts.email,
      name: opts.name,
      password: opts.password,
      force: opts.force,
    });
    deps.stdout?.(
      `Imported ${summary.transactions} transactions, ${summary.accounts} accounts, ${summary.categories} categories for ${opts.email}` +
        (summary.dryRun ? ' (dry run)' : '') +
        '.',
    );
    return 0;
  } catch (err) {
    deps.stdout?.((err as Error).message);
    return 1;
  }
}

async function main(): Promise<void> {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });
  try {
    const code = await runCli(process.argv.slice(2), {
      prisma,
      stdout: (line) => console.log(line),
    });
    process.exitCode = code;
  } finally {
    await prisma.$disconnect();
  }
}

/* c8 ignore next 3 */
if (require.main === module) {
  void main();
}

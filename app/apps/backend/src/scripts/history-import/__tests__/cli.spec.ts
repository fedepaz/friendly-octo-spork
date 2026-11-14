// apps/backend/src/scripts/history-import/__tests__/cli.spec.ts
import { formatReport, parseCliArgs } from '../cli';
import type { ValidationReport } from '../validate';
import type { ReconcileReport } from '../reconcile';

describe('parseCliArgs', () => {
  it('parses all supported flags', () => {
    const opts = parseCliArgs([
      '--odspath',
      '/tmp/x.ods',
      '--email',
      'a@b.com',
      '--password',
      'secret',
      '--name',
      'Imported User',
      '--force',
      '--dry-run',
      '--report',
      '/tmp/out.md',
    ]);

    expect(opts).toEqual({
      odspath: '/tmp/x.ods',
      email: 'a@b.com',
      password: 'secret',
      name: 'Imported User',
      force: true,
      dryRun: true,
      report: '/tmp/out.md',
    });
  });

  it('defaults name, force, dry-run and report path', () => {
    const opts = parseCliArgs([
      '--odspath',
      'x.ods',
      '--email',
      'a@b.com',
      '--password',
      'secret',
    ]);

    expect(opts.name).toBe('History Import');
    expect(opts.force).toBe(false);
    expect(opts.dryRun).toBe(false);
    expect(opts.report).toBe('history-import-report.md');
  });

  it('throws when a required flag is missing', () => {
    expect(() =>
      parseCliArgs(['--email', 'a@b.com', '--password', 'x']),
    ).toThrow(/--odspath/);
    expect(() =>
      parseCliArgs(['--odspath', 'x.ods', '--password', 'x']),
    ).toThrow(/--email/);
    expect(() =>
      parseCliArgs(['--odspath', 'x.ods', '--email', 'a@b.com']),
    ).toThrow(/--password/);
  });
});

describe('formatReport', () => {
  const validation: ValidationReport = {
    checks: [
      {
        sheet: 'mayo2025',
        label: 'GASTOS',
        band: 0,
        rowSum: 900,
        total: 1000,
        diff: -100,
        ok: false,
      },
    ],
    failedChecks: [
      {
        sheet: 'mayo2025',
        label: 'GASTOS',
        band: 0,
        rowSum: 900,
        total: 1000,
        diff: -100,
        ok: false,
      },
    ],
    importedRows: 42,
    quarantinedRows: 3,
    inferredDates: 7,
    quarantineRate: 0.0667,
    ok: false,
  };

  const reconcileReport: ReconcileReport = {
    checks: [
      {
        sheet: 'mayo2025',
        label: 'efectivo',
        dateISO: '2025-05-31',
        accountName: 'Efectivo',
        expected: -1000,
        computed: -1000,
        diff: 0,
        ok: true,
        severity: 'fail',
      },
      {
        sheet: 'mayo2025',
        label: 'tarjeta',
        dateISO: '2025-05-31',
        accountName: 'Visa',
        expected: 30000,
        computed: 0,
        diff: -30000,
        ok: false,
        severity: 'info',
      },
    ],
    passed: 1,
    failed: 0,
    infoCount: 1,
    ok: true,
  };

  it('summarizes validation, checkpoints and quarantine', () => {
    const md = formatReport(validation, reconcileReport, [
      {
        sheet: 'mayo2025',
        row: 5,
        col: 14,
        cell: 'sube',
        reason: 'unparseable-amount',
      },
    ]);

    expect(md).toContain('# History import report');
    expect(md).toContain('**Validation:** FAILED');
    expect(md).toContain('Parsed rows: 42');
    expect(md).toContain('Quarantined: 3 (6.67%)');
    expect(md).toContain('GASTOS');
    expect(md).toContain('mayo2025');
    expect(md).toContain('**Reconciliation:** PASSED');
    expect(md).toContain('Checkpoints passed: 1');
    expect(md).toContain('unparseable-amount');
  });

  it('lists inferred dates reported by the parser', () => {
    const md = formatReport(
      validation,
      reconcileReport,
      [],
      [{ sheet: 'mayo2025', row: 33, col: 10, cell: 'tres/seis' }],
    );

    expect(md).toContain('Inferred dates: 7');
    expect(md).toContain('## Inferred dates (1)');
    expect(md).toContain('tres/seis');
  });

  it('marks reconciliation as FAILED when checkpoints diverge', () => {
    const failing: ReconcileReport = {
      ...reconcileReport,
      passed: 0,
      failed: 1,
      ok: false,
    };

    const md = formatReport(validation, failing, []);

    expect(md).toContain('**Reconciliation:** FAILED');
  });
});

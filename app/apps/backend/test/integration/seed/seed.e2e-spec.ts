// apps/backend/test/integration/seed/seed.e2e-spec.ts
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { prisma } from '../setup';

const backendDir = path.resolve(__dirname, '../../..');
const tsNodeBin = path.join(backendDir, 'node_modules', '.bin', 'ts-node');
const seedScript = path.join(backendDir, 'prisma', 'seed.ts');

interface SeedRun {
  status: number;
  stdout: string;
  stderr: string;
}

function runSeed(envOverrides: Record<string, string | undefined>): SeedRun {
  const env: NodeJS.ProcessEnv = { ...process.env };
  for (const [key, value] of Object.entries(envOverrides)) {
    if (value === undefined) delete env[key];
    else env[key] = value;
  }
  try {
    const stdout = execFileSync(tsNodeBin, [seedScript], {
      cwd: backendDir,
      env,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { status: 0, stdout, stderr: '' };
  } catch (e) {
    const err = e as {
      status?: number;
      stdout?: string;
      stderr?: string;
    };
    return {
      status: err.status ?? 1,
      stdout: err.stdout ?? '',
      stderr: err.stderr ?? '',
    };
  }
}

describe('prisma/seed.ts (e2e)', () => {
  it('runs successfully without DATABASE_URL in the environment', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'seed-env-'));
    const tmpEnvFile = path.join(tmpDir, '.env');
    fs.writeFileSync(
      tmpEnvFile,
      `DATABASE_URL="${process.env.DATABASE_URL}"\n`,
    );
    try {
      const result = runSeed({
        DATABASE_URL: undefined,
        DOTENV_CONFIG_PATH: tmpEnvFile,
      });
      expect(result.stderr).not.toContain('SASL');
      expect(result.status).toBe(0);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('repairs diverged user_profile metadata (entity + admin grant) to CRUD', async () => {
    const admin = await prisma.user.upsert({
      where: { email: 'user@admin.com' },
      update: {},
      create: {
        name: 'seedtest',
        email: 'user@admin.com',
        passwordHash: 'not-a-real-hash',
      },
    });

    const entity = await prisma.entity.upsert({
      where: { name: 'user_profile' },
      update: { permissionType: 'READ_ONLY' },
      create: {
        name: 'user_profile',
        label: 'Perfil',
        permissionType: 'READ_ONLY',
      },
    });

    await prisma.userPermission.upsert({
      where: {
        userId_entityId: { userId: admin.id, entityId: entity.id },
      },
      update: { permissionType: 'READ_ONLY' },
      create: {
        userId: admin.id,
        entityId: entity.id,
        canCreate: true,
        canRead: true,
        canUpdate: true,
        canDelete: true,
        scope: 'ALL',
        permissionType: 'READ_ONLY',
      },
    });

    const result = runSeed({ DATABASE_URL: process.env.DATABASE_URL });
    expect(result.status).toBe(0);

    const entityAfter = await prisma.entity.findUniqueOrThrow({
      where: { name: 'user_profile' },
    });
    expect(entityAfter.permissionType).toBe('CRUD');

    const grantAfter = await prisma.userPermission.findUniqueOrThrow({
      where: {
        userId_entityId: { userId: admin.id, entityId: entity.id },
      },
    });
    expect(grantAfter.permissionType).toBe('CRUD');
  });
});

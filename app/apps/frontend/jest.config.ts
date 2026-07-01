import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    // MSW v2 uses conditional exports; this ensures the Node.js entry is resolved.
    customExportConditions: ['node', 'node-addons'],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/mocks/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 70,
      statements: 70,
    },
  },
};

// createJestConfig returns an async function; we call it to get the resolved
// config, then override transformIgnorePatterns to allow MSW's ESM-only
// dependencies to be transpiled by the Next.js SWC transformer.
//
// We remove the default /node_modules/ exclusion and replace it with a
// pattern that only ignores packages we KNOW don't need transformation.
// This is the safest approach because MSW v2 has many ESM-only transitive
// dependencies (rettime, until-async, @open-draft/deferred-promise, etc.)
// that would be impossible to enumerate exhaustively.
export default async (): Promise<Config> => {
  const jestConfig = await createJestConfig(customJestConfig)();

  return {
    ...jestConfig,
    transformIgnorePatterns: [
      // Only keep non-node_modules patterns from the default config
      ...(jestConfig.transformIgnorePatterns?.filter(
        (pattern: string | RegExp) =>
          typeof pattern === 'string' && !pattern.includes('node_modules'),
      ) ?? []),
    ],
  };
};

// apps/backend/test/integration/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.integration/.+\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [151002],
        },
      },
    ],
  },
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
  moduleNameMapper: {
    '^@repo/shared$': '<rootDir>/../../../packages/shared/src',
  },
  setupFilesAfterEnv: ['<rootDir>/integration/setup.ts'],
  testTimeout: 30000,
};

export default config;

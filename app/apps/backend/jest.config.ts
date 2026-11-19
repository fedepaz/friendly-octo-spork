// apps/backend/jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
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
  // Nest 12 is ESM-only: run jest with NODE_OPTIONS=--experimental-vm-modules
  // so require(esm) works on Node < 24.9 (see package.json test script).
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.module.ts',
    '!**/*.dto.ts',
    '!**/*.interface.ts',
    '!**/generated/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 70,
      statements: 70,
    },
  },
};

export default config;

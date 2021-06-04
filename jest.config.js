const tstFiles = [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ];
  
  const ignoreDirs = [
    '/node_modules/',
    '/.build/',
    '/.serverless/',
  ];
  
  module.exports = {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: tstFiles,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['text', 'cobertura'],
    collectCoverageFrom: [
      '**/src/**/?*.[jt]s?(x)',
      '!**/src/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    reporters: ['default', 'jest-junit'],
    testPathIgnorePatterns: ignoreDirs,
    coveragePathIgnorePatterns: ignoreDirs,
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  };
  
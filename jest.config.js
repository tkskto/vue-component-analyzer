export default {
  verbose: true,
  testTimeout: 60000,
  preset: 'ts-jest/presets/default-esm',
  testMatch: [
    '**/test/specs/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }],
  },
};

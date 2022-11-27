export default {
  verbose: true,
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

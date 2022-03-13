export default {
  verbose: true,
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  preset: 'ts-jest/presets/default-esm',
  testMatch: [
    '**/test/specs/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

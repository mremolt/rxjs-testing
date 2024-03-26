import { Config } from 'jest';

export default {
  clearMocks: true,

  collectCoverage: false,
  collectCoverageFrom: ['src/app/**/*.{ts,tsx}'],
} as Config;

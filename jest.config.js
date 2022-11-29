const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    // "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    '\\.css$': require.resolve('./styles/style-mock.js'),
  },
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
};

module.exports = createJestConfig(customJestConfig);
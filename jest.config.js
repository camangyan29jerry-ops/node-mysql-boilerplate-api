/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^_helpers/(.*)$': '<rootDir>/src/_helpers/$1',
    '^_middleware/(.*)$': '<rootDir>/src/_middleware/$1',
    '^users/(.*)$': '<rootDir>/src/users/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/_helpers/setupTestDb.ts'],
  testPathIgnorePatterns: ['<rootDir>/dist/']
};

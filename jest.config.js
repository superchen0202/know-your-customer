/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 搭配路徑alias '@'
  },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;

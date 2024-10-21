module.exports = {
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
};

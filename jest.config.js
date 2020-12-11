module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  moduleFileExtensions: ["js", "ts", "tsx"],
  moduleNameMapper: {
    "@root/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  preset: "ts-jest",
  testMatch: null,
};

module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "/__tests__\/.*spec\.tsx?$",
  "testEnvironment": "node",
  "collectCoverage": false,
  "collectCoverageFrom": [
    "**/src/**/*.{ts,tsx}",
    "!**/src/index.ts",
    "!**/src/interfaces/*.ts",
    "!**/node_modules/**"
  ],
  "coverageDirectory": "__coverage__",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}

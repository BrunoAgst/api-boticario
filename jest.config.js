module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: [
      "json",
      "text",
      "lcov",
      "clover"
    ],
    coverageThreshold: {
      global: {
        branch: 90,
        function: 90,
        lines: 90,
        statements: 90
      }
    },
    maxWorkers: "50%",
    testEnvironment: "node",
    watchPathIgnorePatterns: [
      "node_modules"
    ]
  }
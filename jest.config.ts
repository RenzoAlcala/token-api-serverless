import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: 'coverage',
  verbose: true,
  automock: true,
  maxWorkers: "",
  testMatch: [
    '**/test/**/*.test.ts'
  ],
  rootDir: "test"
}
export default config
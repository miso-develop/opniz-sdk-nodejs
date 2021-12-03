module.exports = {
	testEnvironment: "node",
	roots: ["<rootDir>/tests/"],
	moduleFileExtensions: ["ts", "js"],
	transform: { "^.+\\.ts$": "esbuild-jest-transform" },
	globals: { "ts-jest": { tsconfig: "tsconfig.json" } },
	testMatch: ["**/tests/**/*.test.ts"],
	moduleNameMapper: { "^#/(.+)": "<rootDir>/src/$1" },
	coveragePathIgnorePatterns: [
		"/src/utils.ts",
		"/tests/.*Mock.ts",
	],
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 80,
			functions: 90,
			lines: 90,
		},
	},
}

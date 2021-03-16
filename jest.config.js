module.exports = {
	"moduleFileExtensions": ["ts", "js"],
	"transform": { "^.+\\.ts$": "ts-jest" },
	"globals": { "ts-jest": { "tsconfig": "tsconfig.json" } },
	"testMatch": ["**/tests/**/*.test.ts"],
	"moduleNameMapper": { "^#/(.+)": "<rootDir>/src/$1" },
	"coveragePathIgnorePatterns": [
		"/src/utils.ts",
		"/tests/.*Mock.ts",
	],
	"coverageThreshold": {
		"global": {
			"statements": 90,
			"branches": 80,
			"functions": 90,
			"lines": 90,
		},
		
		"**/PromiseTimer.ts ": {
			"branches": 77.78,
		}
	},
}

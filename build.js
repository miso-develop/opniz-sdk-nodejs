const prod = false

require("esbuild").build({
	entryPoints: prod ?
		["src/index.ts"] : // prod
		require("glob").sync("src/**/*.ts"), // dev
	
	bundle: prod, // prod
	minify: prod, // prod
	sourcemap: !prod, // dev
	
	outdir: "dist",
	platform: "node",
	format: "cjs",
	
	watch: process.argv[2] === "-w" || process.argv[2] === "--watch",
})

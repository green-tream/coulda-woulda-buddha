import { defineConfig } from "vite";

export default defineConfig({
	base: "./",
	server: {
		port: 8080,
	},
	esbuild: {
		supported: {
			"top-level-await": true, //browsers can handle top-level-await features
		},
	},
});

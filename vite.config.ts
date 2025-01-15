import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@tabler/icons-react":
				"@tabler/icons-react/dist/esm/icons/index.mjs",
		},
	},
	build: {
		target: "esnext",
	},
});

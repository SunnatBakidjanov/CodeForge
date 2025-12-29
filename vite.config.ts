import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), tailwindcss()],
	build: {
		rolldownOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
						return 'react';
					}
					return null;
				},
			},
		},
	},
});

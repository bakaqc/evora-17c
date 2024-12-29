import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: '/',
	optimizeDeps: {
		include: ['slick-carousel'],
	},
	build: {
		rollupOptions: {
			external: [
				'slick-carousel/slick/slick-theme.css',
				'slick-carousel/slick/slick.css',
			],
		},
	},
});

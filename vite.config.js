import { sveltekit } from '@sveltejs/kit/vite';
import { path } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'static': path.resolve(__dirname, './src/lib/static'),
			'utils': path.resolve(__dirname, './src/lib/utils')
		},
	},
	plugins: [sveltekit()]
};

export default config;

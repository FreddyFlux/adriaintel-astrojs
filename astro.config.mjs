// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Replace with your production origin for canonical URLs, sitemap, and RSS.
const site = 'https://www.adriaintel.com';

// https://astro.build/config
export default defineConfig({
	site,
	output: 'static',
	adapter: vercel({
		imageService: true,
	}),
	integrations: [react(), sitemap()],

	image: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'cdn.sanity.io' },
			{ protocol: 'https', hostname: 'lh3.googleusercontent.com' },
		],
	},

	vite: {
		plugins: [tailwindcss()],
	},
});

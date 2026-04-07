// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Replace with your production origin for canonical URLs, sitemap, and RSS.
const site = 'https://www.adriaintel.com';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [react(), sitemap()],

	vite: {
		plugins: [tailwindcss()],
	},
});

// @ts-check
import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

loadEnv();
const sanityProjectId = process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
const sanityDataset = process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

// Replace with your production origin for canonical URLs, sitemap, and RSS.
const site = 'https://www.adriaintel.com';

// https://astro.build/config
export default defineConfig({
	site,
	trailingSlash: 'always',
	output: 'static',
	adapter: vercel({
		imageService: true,
	}),
	integrations: [
		react(),
		sanity({
			projectId: sanityProjectId,
			dataset: sanityDataset,
			useCdn: true,
			studioBasePath: '/studio',
			studioRouterHistory: 'hash',
		}),
	],

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

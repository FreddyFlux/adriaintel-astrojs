import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './src/sanity/schemaTypes';

// Hosted deploy only bundles SANITY_STUDIO_* (see `sanity build` output). Astro embed uses PUBLIC_*.
const projectId = (
	import.meta.env.SANITY_STUDIO_PROJECT_ID ||
	import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
	import.meta.env.SANITY_PROJECT_ID ||
	process.env.SANITY_STUDIO_PROJECT_ID ||
	process.env.PUBLIC_SANITY_PROJECT_ID ||
	process.env.SANITY_PROJECT_ID ||
	''
) as string;
const dataset = (
	import.meta.env.SANITY_STUDIO_DATASET ||
	import.meta.env.PUBLIC_SANITY_DATASET ||
	import.meta.env.SANITY_DATASET ||
	process.env.SANITY_STUDIO_DATASET ||
	process.env.PUBLIC_SANITY_DATASET ||
	process.env.SANITY_DATASET ||
	'production'
) as string;

const isDev = import.meta.env.DEV;

export default defineConfig({
	name: 'default',
	title: 'AdriaIntel Studio',
	projectId,
	dataset,
	plugins: [structureTool(), ...(isDev ? [visionTool()] : [])],
	schema: {
		types: schemaTypes,
	},
});

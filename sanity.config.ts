import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { schemaTypes } from './src/sanity/schemaTypes';

// Embedded Studio runs in the browser — use import.meta.env (not process.env).
const projectId =
	(import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID || '') as string;
const dataset =
	(import.meta.env.PUBLIC_SANITY_DATASET ||
		import.meta.env.SANITY_DATASET ||
		'production') as string;

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

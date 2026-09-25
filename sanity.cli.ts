import { config as loadEnv } from 'dotenv';
import { defineCliConfig } from 'sanity/cli';

loadEnv();

const projectId =
	process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
const dataset =
	process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

/** Subdomain for https://<studioHost>.sanity.studio */
const studioHost = process.env.SANITY_STUDIO_HOST || 'adriaintel-cms';

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
	studioHost,
	deployment: {
		appId: 'nilj0ua7fczu5z06e01llbrj',
	},
});

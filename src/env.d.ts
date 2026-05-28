/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly SANITY_PROJECT_ID: string;
	readonly SANITY_DATASET: string;
	readonly SANITY_API_VERSION?: string;
	readonly SANITY_WEBHOOK_SECRET?: string;
	/** Exposed to client bundles (e.g. embedded Studio) — set in .env */
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
	/** GA4 measurement ID — analytics runs only after opt-in */
	readonly PUBLIC_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

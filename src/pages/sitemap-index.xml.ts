import type { APIRoute } from 'astro';

/** Legacy URL from `@astrojs/sitemap`; redirect to the canonical sitemap. */
export const GET: APIRoute = ({ site }) => {
	const base = site?.href?.replace(/\/$/, '') ?? 'https://www.adriaintel.com';
	return new Response(null, {
		status: 301,
		headers: {
			Location: `${base}/sitemap.xml`,
			'Cache-Control': 'public, max-age=3600',
		},
	});
};

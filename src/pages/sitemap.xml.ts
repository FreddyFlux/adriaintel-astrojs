import type { APIRoute } from 'astro';
import { buildSitemapEntries, renderSitemapXml } from '@/lib/sitemap-seo';
import { getAllArticles } from '@/lib/sanity';

export const GET: APIRoute = async ({ site }) => {
	const origin = site?.href?.replace(/\/$/, '') ?? 'https://www.adriaintel.com';
	const articles = await getAllArticles();
	const xml = renderSitemapXml(buildSitemapEntries(origin, articles));

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};

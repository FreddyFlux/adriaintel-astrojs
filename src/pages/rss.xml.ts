import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllArticles } from '@/lib/sanity';

export async function GET(context: APIContext) {
	const articles = await getAllArticles();

	return rss({
		title: 'AdriaIntel | Maritime Intelligence',
		description: 'Articles and analysis on Adriatic seafood markets, logistics, and blue economy trends.',
		site: context.site ?? 'https://www.adriaintel.com',
		items: articles.map((post) => ({
			title: post.title,
			pubDate: new Date(post.publishedAt),
			description: post.excerpt,
			link: `/articles/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}

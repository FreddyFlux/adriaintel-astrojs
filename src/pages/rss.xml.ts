import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
	const articles = (await getCollection('articles')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: 'AdriaIntel | Maritime Intelligence',
		description: 'Articles and analysis on Adriatic seafood markets, logistics, and blue economy trends.',
		site: context.site ?? 'https://www.adriaintel.com',
		items: articles.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/articles/${post.id}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}

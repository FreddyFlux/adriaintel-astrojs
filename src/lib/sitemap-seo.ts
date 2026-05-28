import type { ArticleListItem } from './sanity';
import { urlFor } from './sanity';

type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export type SitemapEntry = {
	loc: string;
	lastmod?: Date;
	changefreq?: Changefreq;
	priority?: number;
	images?: { url: string; title?: string }[];
};

const STATIC_LASTMOD = new Date();

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function formatLastmod(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function toAbsolute(origin: string, pathname: string): string {
	const base = origin.replace(/\/$/, '');
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return path === '/' ? `${base}/` : `${base}${path.endsWith('/') ? path : `${path}/`}`;
}

const STATIC_PAGES: {
	path: string;
	changefreq: Changefreq;
	priority: number;
}[] = [
	{ path: '/', changefreq: 'weekly', priority: 1 },
	{ path: '/articles/', changefreq: 'daily', priority: 0.9 },
	{ path: '/about/', changefreq: 'monthly', priority: 0.7 },
	{ path: '/contact/', changefreq: 'monthly', priority: 0.7 },
	{ path: '/privacy/', changefreq: 'yearly', priority: 0.3 },
	{ path: '/terms/', changefreq: 'yearly', priority: 0.3 },
];

function articleEntries(articles: ArticleListItem[], origin: string): SitemapEntry[] {
	return articles.map((article) => {
		const raw = article.updatedAt ?? article.publishedAt;
		const lastmod = raw ? new Date(raw) : undefined;
		const loc = toAbsolute(origin, `/articles/${article.slug}/`);

		let images: SitemapEntry['images'];
		if (article.heroImage) {
			const imageUrl = urlFor(article.heroImage).width(1200).height(630).auto('format').url();
			const absolute = imageUrl.startsWith('http')
				? imageUrl
				: toAbsolute(origin, imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`);
			images = [{ url: absolute, title: article.title }];
		}

		return {
			loc,
			lastmod: lastmod && !Number.isNaN(lastmod.getTime()) ? lastmod : undefined,
			changefreq: 'monthly' as const,
			priority: 0.8,
			images,
		};
	});
}

export function buildSitemapEntries(siteOrigin: string, articles: ArticleListItem[]): SitemapEntry[] {
	const staticEntries: SitemapEntry[] = STATIC_PAGES.map(({ path, changefreq, priority }) => ({
		loc: toAbsolute(siteOrigin, path),
		changefreq,
		priority,
		lastmod: STATIC_LASTMOD,
	}));

	return [...staticEntries, ...articleEntries(articles, siteOrigin)];
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
	const urlNodes = entries
		.map((entry) => {
			const parts = [`<url><loc>${escapeXml(entry.loc)}</loc>`];
			if (entry.lastmod) {
				parts.push(`<lastmod>${formatLastmod(entry.lastmod)}</lastmod>`);
			}
			if (entry.changefreq) {
				parts.push(`<changefreq>${entry.changefreq}</changefreq>`);
			}
			if (entry.priority != null) {
				parts.push(`<priority>${entry.priority.toFixed(1)}</priority>`);
			}
			for (const image of entry.images ?? []) {
				parts.push('<image:image>');
				parts.push(`<image:loc>${escapeXml(image.url)}</image:loc>`);
				if (image.title) {
					parts.push(`<image:title>${escapeXml(image.title)}</image:title>`);
				}
				parts.push('</image:image>');
			}
			parts.push('</url>');
			return parts.join('');
		})
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">` +
		urlNodes +
		`</urlset>`;
}

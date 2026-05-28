import { config as loadEnv } from 'dotenv';
import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

loadEnv();
const projectId =
	(process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID) as string | undefined;
const dataset = (process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET) as string | undefined;
const apiVersion = (process.env.SANITY_API_VERSION as string | undefined) ?? '2024-01-01';

/** Placeholder values from .env.example — no network calls so builds succeed before a real project exists. */
const UNCONFIGURED_PROJECT_IDS = new Set(['', 'placeholder', 'your_project_id']);

if (!projectId || !dataset) {
	throw new Error(
		'Missing SANITY_PROJECT_ID / SANITY_DATASET (or PUBLIC_*) in environment for Sanity client.',
	);
}

export function isSanityConfigured(): boolean {
	return !UNCONFIGURED_PROJECT_IDS.has(projectId.trim().toLowerCase());
}

export const sanityClient: SanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export type AuthorRef = {
	name: string | null;
	slug: { current: string } | null;
	image?: SanityImageSource | null;
	bio?: string | null;
};

export type ArticleListItem = {
	_id: string;
	title: string;
	slug: string;
	publishedAt: string;
	updatedAt?: string | null;
	excerpt: string;
	heroImage: SanityImageSource | null;
	heroImageAlt: string;
	category: string | null;
	readTime: number | null;
	featured: boolean | null;
	author: AuthorRef | null;
};

const articleListProjection = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  updatedAt,
  excerpt,
  heroImage,
  heroImageAlt,
  category,
  readTime,
  featured,
  "author": author->{ name, slug, image }
}`;

export async function getAllArticles(): Promise<ArticleListItem[]> {
	if (!isSanityConfigured()) return [];
	return sanityClient.fetch<ArticleListItem[]>(
		`*[_type == "article"] | order(publishedAt desc) ${articleListProjection}`,
	);
}

export type ArticleDetail = ArticleListItem & {
	updatedAt?: string | null;
	body: unknown[] | null;
	seoTitle?: string | null;
	seoDescription?: string | null;
	ogImage?: SanityImageSource | null;
	tags?: string[] | null;
};

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
	if (!isSanityConfigured()) return null;
	return sanityClient.fetch<ArticleDetail | null>(
		`*[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      publishedAt,
      updatedAt,
      excerpt,
      body,
      heroImage,
      heroImageAlt,
      category,
      tags,
      readTime,
      featured,
      seoTitle,
      seoDescription,
      ogImage,
      "slug": slug.current,
      "author": author->{ name, slug, image, bio }
    }`,
		{ slug },
	);
}

export async function getFeaturedArticles(): Promise<ArticleListItem[]> {
	if (!isSanityConfigured()) return [];
	return sanityClient.fetch<ArticleListItem[]>(
		`*[_type == "article" && featured == true] | order(publishedAt desc) [0...3] ${articleListProjection}`,
	);
}

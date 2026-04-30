import { defineField, defineType } from 'sanity';

const categoryOptions = [
	{ title: 'Market Analysis', value: 'Market Analysis' },
	{ title: 'Regulatory', value: 'Regulatory' },
	{ title: 'Supply Chain', value: 'Supply Chain' },
	{ title: 'Species Focus', value: 'Species Focus' },
	{ title: 'Blue Economy', value: 'Blue Economy' },
	{ title: 'Trade & Logistics', value: 'Trade & Logistics' },
];

export const article = defineType({
	name: 'article',
	title: 'Article',
	type: 'document',
	groups: [
		{ name: 'default', title: 'Content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'default',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'default',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			group: 'default',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'updatedAt',
			title: 'Updated at',
			type: 'datetime',
			description: 'Set when the article is substantially revised.',
			group: 'default',
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			group: 'default',
			description: 'Used for meta description and listings (max 160 characters).',
			validation: (Rule) => Rule.required().max(160),
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			group: 'default',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Number', value: 'number' },
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: (Rule) =>
											Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
									},
								],
							},
						],
					},
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			group: 'default',
			options: { hotspot: true },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'heroImageAlt',
			title: 'Hero image alt text',
			type: 'string',
			group: 'default',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			group: 'default',
			options: {
				list: categoryOptions,
				layout: 'dropdown',
			},
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			group: 'default',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			group: 'default',
			to: [{ type: 'author' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'readTime',
			title: 'Read time (minutes)',
			type: 'number',
			group: 'default',
			validation: (Rule) => Rule.positive().integer(),
		}),
		defineField({
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			group: 'default',
			initialValue: false,
			description: 'Pin on the homepage and articles listing.',
		}),
		defineField({
			name: 'seoTitle',
			title: 'SEO title',
			type: 'string',
			group: 'seo',
			description: 'Overrides the page <title> when different from the headline.',
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO description',
			type: 'string',
			group: 'seo',
			validation: (Rule) => Rule.max(160),
		}),
		defineField({
			name: 'ogImage',
			title: 'Open Graph image',
			type: 'image',
			group: 'seo',
			options: { hotspot: true },
			description: 'Falls back to hero image when empty.',
		}),
	],
	preview: {
		select: { title: 'title', media: 'heroImage', date: 'publishedAt' },
		prepare({ title, media, date }) {
			return {
				title,
				subtitle: date ? new Date(date).toLocaleDateString() : undefined,
				media,
			};
		},
	},
});

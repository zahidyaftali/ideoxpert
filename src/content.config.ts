// Blog articles live as Markdown files in src/content/blog. The file name is
// the URL: src/content/blog/how-much-does-a-website-cost.md is published at
// /blog/how-much-does-a-website-cost.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		/** Shorter title for search results when `title` is over 55 characters. */
		metaTitle: z.string().optional(),
		/** Shown in search results and social previews: keep it under ~155 characters. */
		description: z.string(),
		/** Category tag, e.g. "SEO" or "E-commerce". */
		category: z.string(),
		/** Slug of the related service page, linked from the article. */
		service: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		keywords: z.string().optional(),
		faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		featured: z.boolean().default(false),
		/** Who wrote it: a key of `authors` in src/data/blog.ts. Without one the byline says "the IdeoXpert team". */
		author: z.string().optional(),
	}),
});

export const collections = { blog };

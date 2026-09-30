import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All articles, newest first. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime() || a.data.title.localeCompare(b.data.title));
}

/** Minutes to read at ~220 words per minute. */
export const readingTime = (post: Post) => Math.max(1, Math.round((post.body ?? '').split(/\s+/).filter(Boolean).length / 220));

export const cover = (post: Post) => `/assets/images/blog/${post.id}.webp`;

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const formatDate = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

import { getCollection, type CollectionEntry } from 'astro:content';
import { founders, type Person } from './site';

export type Post = CollectionEntry<'blog'>;

/** All articles, newest first. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime() || a.data.title.localeCompare(b.data.title));
}

/** Minutes to read at ~220 words per minute. */
export const readingTime = (post: Post) => Math.max(1, Math.round((post.body ?? '').split(/\s+/).filter(Boolean).length / 220));

export const cover = (post: Post) => `/assets/images/blog/${post.id}.webp`;

/** People who sign articles (`author: zahid` in an article's front matter): founders with a photo in src/data/site.ts. */
const signs = (p: Person) => {
	if (!p.photo) throw new Error(`${p.name} needs a photo in src/data/site.ts to sign articles`);
	return { ...p, photo: p.photo };
};
export const authors: Record<string, Person & { photo: string }> = {
	zahid: signs(founders[0]),
};

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const formatDate = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

import type { APIRoute } from 'astro';
import { getPosts, cover } from '../../data/blog';
import { site } from '../../data/site';

// RSS feed of blog articles, linked from every page's <head>.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const items = posts
		.map((p) => {
			const url = `${site.url}/blog/${p.id}`;
			return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <category>${esc(p.data.category)}</category>
      <pubDate>${p.data.published.toUTCString()}</pubDate>
      <enclosure url="${site.url}${encodeURI(cover(p))}" type="image/webp" length="0" />
    </item>`;
		})
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>IdeoXpert blog</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guides on web design, development, SEO and e-commerce from IdeoXpert.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

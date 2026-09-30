import type { APIRoute } from 'astro';
import { servicePages } from '../data/service-pages';
import { projects } from '../data/projects';
import { industries } from '../data/industries';
import { locations } from '../data/locations';
import { getPosts } from '../data/blog';

// Builds /sitemap.xml. Static pages come from the files in src/pages, so a
// page that is added or deleted is picked up automatically. Pages generated
// from data (services, case studies, industries, locations, blog articles)
// are listed from that data.
const pages = import.meta.glob('./**/*.astro');

export const GET: APIRoute = async ({ site }) => {
	const statics = Object.keys(pages)
		.map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''))
		.filter((name) => name !== '404' && !name.includes('['))
		.map((name) => ({ path: name }));

	const posts = await getPosts();
	const entries: { path: string; lastmod?: Date }[] = [
		...statics,
		...servicePages.map((p) => ({ path: p.slug })),
		...projects.map((p) => ({ path: `work/${p.slug}` })),
		...industries.map((i) => ({ path: `industries/${i.slug}` })),
		...locations.map((l) => ({ path: `locations/${l.slug}` })),
		...posts.map((p) => ({ path: `blog/${p.id}`, lastmod: p.data.updated ?? p.data.published })),
	];

	const urls = entries
		.map((e) => ({ loc: new URL(e.path ? `/${e.path}` : '/', site).href, lastmod: e.lastmod }))
		.sort((a, b) => a.loc.length - b.loc.length || a.loc.localeCompare(b.loc));

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

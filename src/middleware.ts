// Brand heading style, applied to every page as it is rendered (dev and build):
// like the logo ("ideo" regular + "xpert" bold + green dot), a heading's start
// is set in the regular weight, its last words in bold, and it ends in the
// round green period. Headings that already contain <b> keep their own split.
//
// Applies to elements with one of these classes: display, h1, h2, h3,
// shero__title, chero__title. Headings ending in "?" or "!" get no dot.
import { defineMiddleware } from 'astro:middleware';
import { from, money, seo } from './data/pricing';

const HEADING_CLASSES = new Set(['display', 'h1', 'h2', 'h3', 'shero__title', 'chero__title']);
const STOPWORDS = new Set(['a', 'an', 'the', 'to', 'of', 'and', 'or', 'for', 'with', 'in', 'on', 'at', 'by', 'from', 'your', 'our', 'is', 'are', 'we', 'you', '&amp;', '&', '—', '–', '-']);
const DOT = '<span class="dot">.</span>';

function styleHeading(inner: string): string {
	let body = inner.trim();
	let dot = false;
	// The dot span may carry scoped-style attributes (data-astro-cid-*).
	const existing = body.match(/<span class="dot"[^>]*>\.<\/span>$/);
	if (existing) {
		body = body.slice(0, -existing[0].length).trimEnd();
		dot = true;
	} else if (/[^.]\.$/.test(body) && !/<[^>]+>\.?$/.test(body)) {
		body = body.slice(0, -1);
		dot = true;
	}
	const endsWithMark = /[?!]$/.test(body);
	if (!endsWithMark) dot = true;

	// Only plain text (entities allowed) is split automatically.
	if (!body.includes('<b>') && !/<[a-z]/i.test(body)) {
		const words = body.split(/\s+/).filter(Boolean);
		const n = words.length;
		if (n >= 2) {
			let k = n <= 3 ? 1 : n <= 6 ? 2 : 3;
			while (k > 1 && STOPWORDS.has(words[n - k].toLowerCase())) k--;
			body = `${words.slice(0, n - k).join(' ')} <b>${words.slice(n - k).join(' ')}</b>`;
		}
	}
	return body + (dot ? DOT : '');
}

/** Finds the closing tag for `name` starting at `from`, allowing nesting. */
function findClose(html: string, name: string, from: number): number {
	const re = new RegExp(`<(/?)${name}\\b[^>]*>`, 'gi');
	re.lastIndex = from;
	let depth = 1;
	let m: RegExpExecArray | null;
	while ((m = re.exec(html))) {
		depth += m[1] ? -1 : 1;
		if (depth === 0) return m.index;
	}
	return -1;
}

export function brandHeadings(html: string): string {
	const open = /<(h[1-6]|span|p|div)\b([^>]*?)\bclass="([^"]*)"([^>]*)>/gi;
	let out = '';
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = open.exec(html))) {
		const classes = m[3].split(/\s+/);
		if (!classes.some((c) => HEADING_CLASSES.has(c))) continue;
		const start = m.index + m[0].length;
		const end = findClose(html, m[1], start);
		if (end < 0) continue;
		out += html.slice(last, start) + styleHeading(html.slice(start, end));
		last = end;
		open.lastIndex = end;
	}
	return out + html.slice(last);
}

// The site is written in US English; pages for UK visitors use UK spelling.
// Only visible text in <body> changes: tags, attributes, scripts and styles
// are left alone.
const UK_PAGES = new Set(['/locations/united-kingdom']);
const US_TO_UK: [string, string][] = [
	['inquiries', 'enquiries'], ['inquiry', 'enquiry'],
	['optimization', 'optimisation'], ['optimized', 'optimised'], ['optimize', 'optimise'], ['optimizing', 'optimising'],
	['organizations', 'organisations'], ['organization', 'organisation'], ['organized', 'organised'], ['organize', 'organise'],
	['customized', 'customised'], ['customize', 'customise'],
	['colors', 'colours'], ['color', 'colour'],
	['centered', 'centred'], ['center', 'centre'],
	['neighborhoods', 'neighbourhoods'], ['neighborhood', 'neighbourhood'],
	['favor', 'favour'], ['behavior', 'behaviour'],
	['labeled', 'labelled'], ['analyze', 'analyse'],
	['prioritize', 'prioritise'], ['recognize', 'recognise'], ['specialize', 'specialise'], ['realize', 'realise'],
	['catalog', 'catalogue'], ['gray', 'grey'],
];
const UK_RULES = US_TO_UK.flatMap(([us, uk]) => [
	[new RegExp(`\\b${us}\\b`, 'g'), uk],
	[new RegExp(`\\b${us[0].toUpperCase()}${us.slice(1)}\\b`, 'g'), uk[0].toUpperCase() + uk.slice(1)],
] as [RegExp, string][]);

function toUkSpelling(html: string): string {
	const body = html.indexOf('<body');
	if (body < 0) return html;
	const head = html.slice(0, body);
	// Split into tags (and whole script/style blocks) and the text between them.
	const parts = html.slice(body).split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/);
	return (
		head +
		parts
			.map((part, i) => {
				if (i % 2 === 1) return part; // a tag
				let text = part;
				for (const [re, uk] of UK_RULES) text = text.replace(re, uk);
				return text;
			})
			.join('')
	);
}

// Prices written in Markdown (blog posts) as {{price:website}} come from
// src/data/pricing.ts, so a post never shows a different price from /pricing.
const usd = (n: number) => money(n, 'USD');
const PRICE_TOKENS: Record<string, string> = {
	website: usd(from.website),
	websitePages: String(from.websitePages),
	store: usd(from.store),
	storeProducts: String(from.storeProducts),
	seo: usd(from.seo),
	seoSetup: usd(seo.setup),
	hosting: usd(from.hosting),
	care: usd(from.care),
	app: `${usd(from.app[0])}–${usd(from.app[1])}`,
};
function fillPrices(html: string): string {
	return html.replace(/\{\{price:(\w+)\}\}/g, (_, key: string) => {
		if (!(key in PRICE_TOKENS)) throw new Error(`Unknown price token {{price:${key}}}`);
		return PRICE_TOKENS[key];
	});
}

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();
	const type = response.headers.get('content-type') ?? '';
	if (type && !type.includes('text/html')) return response;
	let html = await response.text();
	if (!html.includes('<html')) return new Response(html, response);
	const path = context.url.pathname.replace(/\.html$/, '').replace(/\/$/, '');
	if (UK_PAGES.has(path)) html = toUkSpelling(html);
	if (html.includes('{{price:')) html = fillPrices(html);
	return new Response(brandHeadings(html), {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers,
	});
});

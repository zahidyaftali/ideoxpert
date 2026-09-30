// Search snippet limits used across the site: titles up to 55 characters and
// meta descriptions up to 155, so Google shows them in full. BaseLayout warns
// during the build when a page goes over.
export const TITLE_MAX = 55;
export const DESC_MAX = 155;

const BRAND = ' | IdeoXpert';

/** "Page title | IdeoXpert" when that fits, otherwise the page title alone. */
export const withBrand = (title: string) => (title.length + BRAND.length <= TITLE_MAX ? title + BRAND : title);

/** The first option that fits within `max` characters (the last one if none do). */
export const firstFit = (options: string[], max = TITLE_MAX) => options.find((o) => o.length <= max) ?? options[options.length - 1];

/**
 * Shortens text to fit `max` characters: whole sentences when possible,
 * otherwise whole words followed by an ellipsis.
 */
export function fitText(text: string, max = DESC_MAX): string {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	let out = '';
	for (const sentence of clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? []) {
		if ((out + sentence).trim().length > max) break;
		out += sentence;
	}
	if (out.trim().length >= 70) return out.trim();
	const cut = clean.slice(0, max - 1);
	return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
}

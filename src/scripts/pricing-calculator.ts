// Website cost calculator (/website-cost-calculator).
//
// The top half is pure: calculateEstimate(), buildSummary(), toQuery() and
// fromQuery() only use src/data/pricing.ts, so they run in Node for the tests
// (scripts/pricing.test.mjs). The DOM wiring at the bottom only runs in the
// browser.
import {
	apps,
	care,
	hosting,
	money,
	monthly,
	oneOff,
	range,
	seo,
	store,
	website,
	currencyList,
	rates,
	type Currency,
	type Weeks,
} from '../data/pricing.ts';

export type Need = 'website' | 'store' | 'seo' | 'app' | 'hosting';
export const needs: { id: Need; label: string; desc: string; service: string }[] = [
	{ id: 'website', label: 'A website', desc: 'For a business, service or personal brand', service: 'Website Development' },
	{ id: 'store', label: 'An online store', desc: 'Sell products with card payments', service: 'E-commerce Development' },
	{ id: 'seo', label: 'More customers from Google', desc: 'SEO, monthly', service: 'SEO Optimization' },
	{ id: 'app', label: 'An app', desc: 'Mobile app or custom web app', service: 'Mobile App Development' },
	{ id: 'hosting', label: 'Hosting and care', desc: 'For a site you already have, or one we build', service: 'Hosting & Domain' },
];

export type Answers = {
	need: Need[];
	pages: string;
	design: string;
	copy: string;
	extras: string[];
	existing: string;
	products: string;
	platform: string;
	adding: string;
	storeExtras: string[];
	area: string;
	articles: string;
	app: string;
	login: string;
	connect: string;
	hosting: string;
	billing: 'monthly' | 'annual';
	care: string;
};

export const defaults: Answers = {
	need: [],
	pages: '2-5',
	design: 'layout',
	copy: 'own',
	extras: [],
	existing: 'new',
	products: '25',
	platform: 'advise',
	adding: 'own',
	storeExtras: [],
	area: 'town',
	articles: '0',
	app: 'mobile',
	login: '',
	connect: '',
	hosting: 'none',
	billing: 'monthly',
	care: 'none',
};

type Timeline = { min: number; max: number; complex: boolean; kind: 'build' | 'app' | 'start'; text: string };
export type MonthlyItem = { label: string; amount: number };
export type Part = {
	need: Need;
	title: string;
	detail: string;
	low: number;
	high: number;
	from: boolean;
	monthly: MonthlyItem[];
	timeline: Timeline | null;
	notes: string[];
	included: string[];
};
export type Estimate = {
	currency: Currency;
	empty: boolean;
	parts: Part[];
	oneOff: { low: number; high: number; from: boolean } | null;
	monthly: MonthlyItem[];
	monthlyTotal: number;
	/** "2–3 weeks", "3 weeks", "3–5 weeks, confirmed in your quote", "Starts within 1 week". */
	timeline: string | null;
	complex: boolean;
	notes: string[];
	included: string[];
};

const HALF_WEEK = 0.5;
const weekText = (min: number, max: number) => (min === max ? `${min} ${min === 1 ? 'week' : 'weeks'}` : `${min}–${max} weeks`);

/** Websites and stores: base timeline plus half a week per slower extra, never over 3 weeks unless complex. */
function buildTimeline(weeks: Weeks, slower: number, complex: boolean): Timeline {
	if (complex) return { min: weeks[0], max: weeks[1], complex: true, kind: 'build', text: `${weeks[0]}–${weeks[1]} weeks, confirmed in your quote` };
	const min = weeks[0] + slower * HALF_WEEK;
	const max = weeks[1] + slower * HALF_WEEK;
	if (max > 3) return { min: 3, max: 3, complex: false, kind: 'build', text: '3 weeks' };
	return { min, max, complex: false, kind: 'build', text: weekText(min, max) };
}

/** High end of a one-off range: low x 1.15, rounded up to the nearest 10. */
const highOf = (low: number) => Math.ceil(Math.round(low * 115) / 100 / 10) * 10;
const pick = <T extends { id: string }>(list: T[], id: string) => list.find((o) => o.id === id) ?? list[0];

export function calculateEstimate(a: Answers, cur: Currency = 'USD'): Estimate {
	const parts: Part[] = [];

	if (a.need.includes('website')) {
		const p = pick(website.pages, a.pages);
		const d = pick(website.design, a.design);
		const c = pick(website.copy, a.copy);
		const ex = website.extras.filter((e) => a.extras.includes(e.id));
		const old = pick(website.existing, a.existing);
		const usd = p.price + (p.id === '1' ? d.onePagePrice : d.price) + c.perPage * p.count + ex.reduce((n, e) => n + e.price, 0) + old.price;
		const slower = [d.slower, ...ex.map((e) => e.slower), old.slower].filter(Boolean).length;
		const low = oneOff(usd, cur);
		parts.push({
			need: 'website',
			title: 'Website',
			detail: [p.label, d.short, c.short, ex.map((e) => e.label).join(', '), old.id === 'replace' ? old.short : ''].filter(Boolean).join(' · '),
			low,
			high: p.from ? low : highOf(low),
			from: p.from,
			monthly: [],
			timeline: buildTimeline(p.weeks, slower, p.from),
			notes: [],
			included: [...website.included, d.label, ...(c.perPage ? ['Text for every page'] : []), ...ex.map((e) => e.label), ...(old.price ? ['Content moved and redirects set up'] : [])],
		});
	}

	if (a.need.includes('store')) {
		const p = pick(store.products, a.products);
		const pf = pick(store.platform, a.platform);
		const ad = pick(store.adding, a.adding);
		const ex = store.extras.filter((e) => a.storeExtras.includes(e.id));
		const usd = p.price + ad.perProduct * p.count + ex.reduce((n, e) => n + e.price, 0);
		const slower = ex.filter((e) => e.slower).length;
		const low = oneOff(usd, cur);
		parts.push({
			need: 'store',
			title: 'Online store',
			detail: [`${p.label} products`, pf.label, ad.short, ex.map((e) => e.label).join(', ')].filter(Boolean).join(' · '),
			low,
			high: p.from ? low : highOf(low),
			from: p.from,
			monthly: [],
			timeline: buildTimeline(p.weeks, slower, p.from),
			notes: pf.note ? [pf.note] : [],
			included: [...store.included, ...(ad.perProduct ? ['Products added for you'] : []), ...ex.map((e) => e.label)],
		});
	}

	if (a.need.includes('seo')) {
		const area = pick(seo.area, a.area);
		const art = pick(seo.articles, a.articles);
		const setup = oneOff(seo.setup, cur);
		parts.push({
			need: 'seo',
			title: 'SEO',
			detail: [area.label, art.monthly ? `${art.label} a month` : 'no articles'].join(' · '),
			low: setup,
			high: setup,
			from: false,
			monthly: area.monthly === null ? [] : [{ label: 'SEO', amount: monthly(area.monthly + art.monthly, cur) }],
			timeline: { min: 0, max: 0, complex: false, kind: 'start', text: seo.start },
			notes: [...(area.monthly === null ? [`SEO for several countries: ${seo.customNote}`] : []), seo.note],
			included: [...seo.included, ...(art.monthly ? [`${art.label} a month`] : [])],
		});
	}

	if (a.need.includes('app')) {
		const t = pick(apps.types, a.app);
		parts.push({
			need: 'app',
			title: 'App',
			detail: [t.label, a.login ? `login: ${a.login}` : '', a.connect ? `connects to another system: ${a.connect}` : ''].filter(Boolean).join(' · '),
			low: oneOff(t.range[0], cur),
			high: oneOff(t.range[1], cur),
			from: false,
			monthly: [],
			timeline: { min: t.weeks[0], max: t.weeks[1], complex: false, kind: 'app', text: weekText(t.weeks[0], t.weeks[1]) },
			notes: [apps.result],
			included: [],
		});
	}

	if (a.need.includes('hosting')) {
		const plan = hosting.plans.find((p) => p.id === a.hosting);
		const cp = care.plans.find((p) => p.id === a.care);
		const items: MonthlyItem[] = [];
		const notes: string[] = [];
		if (plan) {
			const annual = a.billing === 'annual';
			items.push({ label: `${plan.name} hosting`, amount: (annual ? plan.annualPerMonth : plan.monthly)[cur] });
			if (annual) notes.push(`${plan.name} hosting is billed yearly: ${money(plan.annualPerYear[cur], cur)}.`);
		}
		if (cp) items.push({ label: `${cp.name} plan`, amount: monthly(cp.monthly, cur) });
		if (items.length) {
			parts.push({
				need: 'hosting',
				title: 'Hosting and care',
				detail: [plan ? `${plan.name}, ${a.billing}` : '', cp ? cp.name : ''].filter(Boolean).join(' · '),
				low: 0,
				high: 0,
				from: false,
				monthly: items,
				timeline: null,
				notes,
				included: [...(plan ? plan.features.slice(0, 3) : []), ...(cp ? cp.features.slice(0, 2) : [])],
			});
		}
	}

	const withCost = parts.filter((p) => p.low > 0 || p.high > 0);
	const oneOffTotal = withCost.length
		? { low: withCost.reduce((n, p) => n + p.low, 0), high: withCost.reduce((n, p) => n + p.high, 0), from: withCost.some((p) => p.from) }
		: null;
	const monthlyItems = parts.flatMap((p) => p.monthly);
	const monthlyTotal = Math.round(monthlyItems.reduce((n, m) => n + m.amount, 0) * 100) / 100;

	// Timeline: the longest single one, not the sum. A complex project wins.
	const timelines = parts.map((p) => p.timeline).filter((t): t is Timeline => !!t);
	const complexOne = timelines.find((t) => t.complex);
	const longest = complexOne ?? [...timelines].sort((x, y) => y.max - x.max)[0];

	return {
		currency: cur,
		empty: parts.length === 0,
		parts,
		oneOff: oneOffTotal,
		monthly: monthlyItems,
		monthlyTotal,
		timeline: longest ? longest.text : null,
		complex: !!complexOne,
		notes: [...new Set(parts.flatMap((p) => p.notes))],
		included: [...new Set(parts.flatMap((p) => p.included))],
	};
}

/** "$1,400 – $1,650", or "From $2,800" for projects confirmed in the quote. */
export const formatOneOff = (e: Estimate) => (!e.oneOff ? '' : e.oneOff.from ? `From ${money(e.oneOff.low, e.currency)}` : range(e.oneOff.low, e.oneOff.high, e.currency));
/** "Ready in about 2–3 weeks", "3–5 weeks, confirmed in your quote", "Starts within 1 week". */
export const timelineLine = (e: Estimate) => (!e.timeline ? '' : e.complex || e.timeline.startsWith('Starts') ? e.timeline : `Ready in about ${e.timeline}`);

// ---------------------------------------------------------------- URL state
const list = (v: string | null) => (v ? v.split(',').filter(Boolean) : []);
const valid = (v: string | null, ids: string[], fallback: string) => (v && ids.includes(v) ? v : fallback);

export function toQuery(a: Answers, cur: Currency): string {
	const q = new URLSearchParams();
	if (a.need.length) q.set('need', a.need.join(','));
	if (a.need.includes('website')) {
		q.set('pages', a.pages);
		q.set('design', a.design);
		q.set('copy', a.copy);
		if (a.extras.length) q.set('extras', a.extras.join(','));
		q.set('existing', a.existing);
	}
	if (a.need.includes('store')) {
		q.set('products', a.products);
		q.set('platform', a.platform);
		q.set('adding', a.adding);
		if (a.storeExtras.length) q.set('store_extras', a.storeExtras.join(','));
	}
	if (a.need.includes('seo')) {
		q.set('area', a.area);
		q.set('articles', a.articles);
	}
	if (a.need.includes('app')) {
		q.set('app', a.app);
		if (a.login) q.set('login', a.login);
		if (a.connect) q.set('connect', a.connect);
	}
	if (a.need.includes('hosting')) {
		q.set('hosting', a.hosting);
		q.set('billing', a.billing);
		q.set('care', a.care);
	}
	q.set('cur', cur);
	return q.toString();
}

export function fromQuery(search: string): { answers: Answers; currency: Currency | null } {
	const q = new URLSearchParams(search);
	const ids = (l: { id: string }[]) => l.map((o) => o.id);
	const answers: Answers = {
		need: list(q.get('need')).filter((n): n is Need => needs.some((x) => x.id === n)),
		pages: valid(q.get('pages'), ids(website.pages), defaults.pages),
		design: valid(q.get('design'), ids(website.design), defaults.design),
		copy: valid(q.get('copy'), ids(website.copy), defaults.copy),
		extras: list(q.get('extras')).filter((x) => ids(website.extras).includes(x)),
		existing: valid(q.get('existing'), ids(website.existing), defaults.existing),
		products: valid(q.get('products'), ids(store.products), defaults.products),
		platform: valid(q.get('platform'), ids(store.platform), defaults.platform),
		adding: valid(q.get('adding'), ids(store.adding), defaults.adding),
		storeExtras: list(q.get('store_extras')).filter((x) => ids(store.extras).includes(x)),
		area: valid(q.get('area'), ids(seo.area), defaults.area),
		articles: valid(q.get('articles'), ids(seo.articles), defaults.articles),
		app: valid(q.get('app'), ids(apps.types), defaults.app),
		login: valid(q.get('login'), ['yes', 'no'], ''),
		connect: valid(q.get('connect'), ['yes', 'no'], ''),
		hosting: valid(q.get('hosting'), ['none', ...ids(hosting.plans)], defaults.hosting),
		billing: q.get('billing') === 'annual' ? 'annual' : 'monthly',
		care: valid(q.get('care'), ['none', ...ids(care.plans)], defaults.care),
	};
	const c = q.get('cur');
	return { answers, currency: currencyList.includes(c as Currency) ? (c as Currency) : null };
}

/** The readable summary for the quote form and WhatsApp. */
export function buildSummary(e: Estimate, link: string): string {
	const lines = [`Calculator estimate (${e.currency})`, ...e.parts.map((p) => `${p.title}: ${p.detail}`)];
	const totals = [
		e.oneOff ? `One-off: ${formatOneOff(e)}` : '',
		e.monthly.length ? `Monthly: ${money(e.monthlyTotal, e.currency)}` : '',
		e.timeline ? `Timeline: ${e.complex || e.timeline.startsWith('Starts') ? e.timeline : `about ${e.timeline}`}` : '',
	].filter(Boolean);
	if (totals.length) lines.push(totals.join(' · '));
	lines.push(`Link: ${link}`);
	return lines.join('\n');
}

/** The form service that best matches the answers. */
export const serviceFor = (a: Answers) =>
	a.need[0] === 'hosting' && a.hosting === 'none' && a.care !== 'none' ? 'Website Maintenance' : (needs.find((n) => n.id === a.need[0])?.service ?? '');

// ---------------------------------------------------------------- browser
if (typeof document !== 'undefined') {
	const root = document.querySelector<HTMLFormElement>('form[data-calc]');
	if (root) initCalculator(root);
}

function initCalculator(root: HTMLFormElement) {
	const $ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => el.querySelector<T>(sel);
	const $$ = <T extends Element = HTMLElement>(sel: string, el: ParentNode = document) => [...el.querySelectorAll<T>(sel)];
	const summary = $('[data-est]')!;
	const bar = $('[data-calc-bar]');
	const whatsapp = summary.dataset.whatsapp ?? '';
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
	let started = false;

	const checked = (name: string) => $$<HTMLInputElement>(`input[name="${name}"]:checked`, root).map((i) => i.value);
	const one = (name: string, fallback: string) => checked(name)[0] ?? fallback;
	const read = (): Answers => ({
		need: checked('need') as Need[],
		pages: one('pages', defaults.pages),
		design: one('design', defaults.design),
		copy: one('copy', defaults.copy),
		extras: checked('extras'),
		existing: one('existing', defaults.existing),
		products: one('products', defaults.products),
		platform: one('platform', defaults.platform),
		adding: one('adding', defaults.adding),
		storeExtras: checked('store_extras'),
		area: one('area', defaults.area),
		articles: one('articles', defaults.articles),
		app: one('app', defaults.app),
		login: one('login', ''),
		connect: one('connect', ''),
		hosting: one('hosting', defaults.hosting),
		billing: one('billing', defaults.billing) as Answers['billing'],
		care: one('care', defaults.care),
	});
	const apply = (a: Answers) => {
		const set = (name: string, values: string[]) =>
			$$<HTMLInputElement>(`input[name="${name}"]`, root).forEach((i) => {
				if (!i.disabled) i.checked = values.includes(i.value);
			});
		set('need', a.need);
		set('pages', [a.pages]);
		set('design', [a.design]);
		set('copy', [a.copy]);
		set('extras', a.extras);
		set('existing', [a.existing]);
		set('products', [a.products]);
		set('platform', [a.platform]);
		set('adding', [a.adding]);
		set('store_extras', a.storeExtras);
		set('area', [a.area]);
		set('articles', [a.articles]);
		set('app', [a.app]);
		set('login', [a.login]);
		set('connect', [a.connect]);
		set('hosting', [a.hosting]);
		set('billing', [a.billing]);
		set('care', [a.care]);
	};
	const currency = (): Currency => (($('input[name="cur"]:checked', summary) as HTMLInputElement | null)?.value as Currency) ?? 'USD';

	// Prices on the option cards, in the chosen currency.
	const retag = (cur: Currency) => {
		$$('[data-usd]', root).forEach((el) => {
			const usd = Number(el.dataset.usd);
			const amount = el.dataset.kind === 'monthly' ? monthly(usd, cur) : el.dataset.kind === 'unit' ? Math.round(usd * rates[cur]) : oneOff(usd, cur);
			el.textContent = `${el.dataset.prefix ?? ''}${money(amount, cur)}${el.dataset.suffix ?? ''}`;
		});
		$$('[data-usd-range]', root).forEach((el) => {
			const [lo, hi] = el.dataset.usdRange!.split('-').map(Number);
			el.textContent = `${money(oneOff(lo, cur), cur)}–${money(oneOff(hi, cur), cur)}`;
		});
		$$('[data-host]', root).forEach((el) => {
			const plan = hosting.plans.find((p) => p.id === el.dataset.host)!;
			const annual = one('billing', 'monthly') === 'annual';
			el.textContent = `${money((annual ? plan.annualPerMonth : plan.monthly)[cur], cur)}/month`;
		});
	};

	const showGroups = (a: Answers) => {
		$$('[data-group]', root).forEach((g) => {
			const on = a.need.includes(g.dataset.group as Need);
			if (on && g.hidden && !reduced) {
				g.classList.remove('is-entering');
				void g.offsetWidth;
				g.classList.add('is-entering');
			}
			g.hidden = !on;
		});
	};

	const link = (a: Answers, cur: Currency) => `${location.origin}${location.pathname}?${toQuery(a, cur)}`;

	const render = () => {
		const a = read();
		const cur = currency();
		const e = calculateEstimate(a, cur);
		showGroups(a);
		retag(cur);
		$('[data-est-empty]', summary)!.hidden = !e.empty;
		$('[data-est-body]', summary)!.hidden = e.empty;
		$('[data-est-range]', summary)!.textContent = e.oneOff ? formatOneOff(e) : 'No one-off cost';
		const mon = $('[data-est-monthly]', summary)!;
		mon.hidden = !e.monthly.length;
		mon.innerHTML = '';
		for (const m of e.monthly) mon.insertAdjacentHTML('beforeend', `<li>+ ${money(m.amount, cur)}/month ${m.label}</li>`);
		if (e.monthly.length > 1) mon.insertAdjacentHTML('beforeend', `<li class="est__total">Monthly total: ${money(e.monthlyTotal, cur)}</li>`);
		const time = $('[data-est-time]', summary)!;
		time.hidden = !e.timeline;
		(time.querySelector('span') ?? time).textContent = timelineLine(e);
		const notes = $('[data-est-notes]', summary)!;
		notes.innerHTML = e.notes.map((n) => `<li>${n}</li>`).join('');
		notes.hidden = !e.notes.length;
		$('[data-est-included]', summary)!.innerHTML = e.included.map((i) => `<li>${i}</li>`).join('');
		if (bar) {
			bar.dataset.empty = String(e.empty);
			$('[data-bar-range]', bar)!.textContent = e.empty ? '' : `Estimate: ${e.oneOff ? formatOneOff(e) : `${money(e.monthlyTotal, cur)}/month`}`;
		}
		history.replaceState(null, '', e.empty ? location.pathname : `${location.pathname}?${toQuery(a, cur)}`);
		return { a, e, cur };
	};

	// Restore from the URL, else pick the currency from the browser language.
	const fromUrl = fromQuery(location.search);
	if (location.search && fromUrl.answers.need.length) apply(fromUrl.answers);
	const lang = navigator.language.toLowerCase();
	const guess: Currency = fromUrl.currency ?? (lang === 'en-gb' ? 'GBP' : /^(de|nl|fr|es|it)\b/.test(lang) ? 'EUR' : 'USD');
	const curInput = $<HTMLInputElement>(`input[name="cur"][value="${guess}"]`, summary);
	if (curInput) curInput.checked = true;
	const track = (name: string, value?: number) => import('./track.ts').then((m) => m.track(name, value !== undefined ? { value: String(value) } : {}));

	root.addEventListener('change', () => {
		const { e } = render();
		if (!started && !e.empty) {
			started = true;
			track('calculator_started', e.oneOff?.low ?? 0);
		}
	});
	summary.addEventListener('change', () => render());
	render();

	// Buttons
	$('[data-calc-quote]', summary)?.addEventListener('click', async () => {
		const { a, e, cur } = render();
		if (e.empty) return;
		const text = buildSummary(e, link(a, cur));
		track('calculator_quote_click', e.oneOff?.low ?? 0);
		const { fillProjectForm } = await import('./fill-form.ts');
		fillProjectForm({ service: serviceFor(a), message: `Hi, here’s my estimate. ${text}`, estimate: text });
	});
	$('[data-calc-wa]', summary)?.addEventListener('click', () => {
		const { a, e, cur } = render();
		if (e.empty) return;
		track('calculator_whatsapp_click', e.oneOff?.low ?? 0);
		window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi IdeoXpert, I used your calculator:\n${buildSummary(e, link(a, cur))}`)}`, '_blank', 'noopener');
	});
	$('[data-calc-reset]', summary)?.addEventListener('click', () => {
		apply({ ...defaults, need: [] });
		started = false;
		render();
		history.replaceState(null, '', location.pathname);
	});

	// Phones: a slim bar with the estimate while the questions are on screen.
	if (bar) {
		$('[data-bar-summary]', bar)?.addEventListener('click', () => summary.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
		const io = new IntersectionObserver(
			(entries) => {
				for (const en of entries) {
					if (en.target === root) bar.dataset.inView = String(en.isIntersecting);
					if (en.target === summary) bar.dataset.summaryInView = String(en.isIntersecting);
				}
			},
			{ rootMargin: '0px 0px -120px 0px' },
		);
		io.observe(root);
		io.observe(summary);
	}
}

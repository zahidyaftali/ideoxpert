// Every price on the site: /pricing, /website-cost-calculator, the pricing
// FAQ, the FAQ cost answer, the cost blog post and the structured data all
// read from this file. Change a number here and every page follows.
//
// Price list updated 1 Oct 2026 (owner): lower prices, hosting unchanged.
// Prices are in USD and one-off unless marked monthly. Hosting has its own
// fixed prices per currency (see `hosting`); everything else converts from USD
// with the fixed rates below. This file has no imports so the calculator
// tests can load it directly with Node.

export type Currency = 'USD' | 'GBP' | 'EUR';
export const currencyList: Currency[] = ['USD', 'GBP', 'EUR'];
export const symbols: Record<Currency, string> = { USD: '$', GBP: '£', EUR: '€' };

// Fixed rates from USD. Never fetched live.
// TODO(owner): review these rates from time to time (set 30 Sept 2026).
export const rates: Record<Currency, number> = { USD: 1, GBP: 0.75, EUR: 0.86 };

/** [shortest, longest] in weeks. */
export type Weeks = [number, number];

// ---------------------------------------------------------------- website
// Covers Website Design, Website Development, WordPress Website and CMS Development.
export const website = {
	pages: [
		{ id: '1', label: 'One page', desc: 'A landing page', price: 100, count: 1, weeks: [1, 1] as Weeks, from: false },
		{ id: '2-5', label: '2–5 pages', desc: 'Home, About, a few services, Contact', price: 200, count: 5, weeks: [1, 2] as Weeks, from: false },
		{ id: '6-10', label: '6–10 pages', desc: 'A page for each main service', price: 280, count: 8, weeks: [2, 3] as Weeks, from: false },
		{ id: '11-20', label: '11–20 pages', desc: 'More services, areas or projects', price: 400, count: 15, weeks: [3, 3] as Weeks, from: false },
		{ id: '20+', label: 'More than 20 pages', desc: 'A large site, confirmed in your quote', price: 550, count: 25, weeks: [3, 5] as Weeks, from: true },
	],
	design: [
		{ id: 'layout', label: 'Our proven layouts', short: 'our layouts', desc: 'Built from our proven layouts, styled to your brand', price: 0, onePagePrice: 0, slower: false },
		{ id: 'custom', label: 'Fully custom design', short: 'fully custom design', desc: 'Drawn from scratch, just for you', price: 100, onePagePrice: 50, slower: true },
	],
	copy: [
		{ id: 'own', label: 'I’ll send you the text', short: 'you write the text', perPage: 0 },
		{ id: 'write', label: 'Please write it for me', short: 'we write the text', perPage: 10 },
	],
	extras: [
		{ id: 'blog', label: 'Blog', desc: 'Articles you can publish yourself', price: 20, slower: false },
		{ id: 'booking', label: 'Online booking or appointments', desc: 'Customers book a time on the site', price: 60, slower: true },
		{ id: 'language', label: 'Second language', desc: 'Every page in two languages', price: 60, slower: true },
		{ id: 'forms', label: 'Extra forms', desc: 'Quote request, job application', price: 10, slower: false },
		{ id: 'gallery', label: 'Gallery or portfolio', desc: 'Show your work in photos', price: 10, slower: false },
		{ id: 'newsletter', label: 'Newsletter sign-up', desc: 'Collect emails for updates', price: 10, slower: false },
	],
	/** Always in the price, shown ticked and disabled. */
	included: ['Contact form', 'WhatsApp button', 'Google Map', 'Basic SEO setup'],
	existing: [
		{ id: 'new', label: 'No, this is a new website', short: 'new site', desc: '', price: 0, slower: false },
		{ id: 'replace', label: 'Yes, replace my current site', short: 'replacing current site', desc: 'We move your content and keep your Google rankings with redirects', price: 40, slower: true },
	],
};

// ---------------------------------------------------------------- store
export const store = {
	products: [
		{ id: '25', label: 'Up to 25', desc: 'Products', price: 500, count: 25, weeks: [2, 3] as Weeks, from: false },
		{ id: '26-100', label: '26–100', desc: 'Products', price: 700, count: 60, weeks: [3, 3] as Weeks, from: false },
		{ id: '100+', label: 'More than 100', desc: 'Confirmed in your quote', price: 950, count: 200, weeks: [3, 5] as Weeks, from: true },
	],
	platform: [
		{ id: 'woocommerce', label: 'WooCommerce', desc: 'No monthly platform fee', note: '' },
		{ id: 'shopify', label: 'Shopify', desc: 'The easiest to run yourself', note: 'Shopify’s own monthly plan is paid by you directly to Shopify.' },
		{ id: 'advise', label: 'Not sure, advise me', desc: 'We will recommend one', note: '' },
	],
	adding: [
		{ id: 'own', label: 'I’ll add them', short: 'you add the products', perProduct: 0 },
		{ id: 'us', label: 'Please add them for me', short: 'we add the products', perProduct: 1 },
	],
	extras: [
		{ id: 'options', label: 'Product options', desc: 'Sizes, colors', price: 30, slower: false },
		{ id: 'shipping', label: 'Shipping rules', desc: 'By country or weight', price: 30, slower: false },
		{ id: 'payments', label: 'Extra payment methods', desc: 'PayPal, Klarna and so on', price: 20, slower: false },
		{ id: 'multi', label: 'Several currencies or languages', desc: 'Sell in more than one market', price: 50, slower: false },
		{ id: 'subscriptions', label: 'Subscriptions or bookable products', desc: 'Repeat orders or time slots', price: 80, slower: true },
		{ id: 'migrate', label: 'Move my products from another store', desc: 'Products, customers and orders', price: 60, slower: true },
	],
	included: ['Card payments (Stripe or Shopify Payments)', 'Basic SEO setup', 'Order emails'],
};

// ---------------------------------------------------------------- SEO
export const seo = {
	area: [
		{ id: 'town', label: 'One town or city', monthly: 120 as number | null },
		{ id: 'region', label: 'Several cities or a region', monthly: 180 as number | null },
		{ id: 'country', label: 'The whole country', monthly: 250 as number | null },
		{ id: 'countries', label: 'Several countries', monthly: null as number | null },
	],
	articles: [
		{ id: '0', label: 'None', monthly: 0 },
		{ id: '2', label: '2 articles', monthly: 40 },
		{ id: '4', label: '4 articles', monthly: 80 },
	],
	/** One-off, always added: audit, technical fixes, Google Business Profile, Search Console and Analytics. */
	setup: 100,
	minimumMonths: 3,
	note: 'SEO takes time. Most local businesses see real movement in 3 to 6 months. The minimum is 3 months, then it’s month to month.',
	customNote: 'We’ll quote this after a quick look at your market.',
	start: 'Starts within 1 week',
	included: ['SEO audit and technical fixes', 'Google Business Profile setup', 'Search Console and Analytics setup', 'A report every month'],
};

// ---------------------------------------------------------------- apps
export const apps = {
	types: [
		{ id: 'mobile', label: 'Mobile app', desc: 'Android, iPhone or both', range: [1500, 5000] as [number, number], weeks: [6, 12] as Weeks },
		{ id: 'web', label: 'Custom web app or client portal', desc: 'Logins, dashboards, bookings', range: [1200, 4000] as [number, number], weeks: [5, 10] as Weeks },
	],
	result: 'Apps vary too much to price with a calculator. This range covers most of the apps we’re asked for. Book a free call and we’ll give you a fixed quote within 48 hours.',
};

// ---------------------------------------------------------------- hosting
// Explicit prices per currency (never converted at runtime). Annual plans
// save 20%: shown per month and billed once a year.
type Money = Record<Currency, number>;
export type HostingPlan = {
	id: string;
	name: string;
	/** Label on the plan, e.g. "Most popular". */
	tag: string;
	desc: string;
	popular: boolean;
	monthly: Money;
	annualPerMonth: Money;
	annualPerYear: Money;
	features: string[];
	/** Extra features behind "Show all features". */
	more: string[];
};
export const hosting = {
	annualSaving: 20,
	plans: [
		{
			id: 'basic',
			name: 'Basic',
			tag: 'One website',
			desc: 'One brochure site, fully managed: hosting, SSL, backups and updates handled.',
			popular: false,
			monthly: { GBP: 8, USD: 11, EUR: 9 },
			annualPerMonth: { GBP: 6.4, USD: 8.8, EUR: 7.2 },
			annualPerYear: { GBP: 76.8, USD: 105.6, EUR: 86.4 },
			features: ['1 website', '20 GB SSD storage', '100 GB bandwidth per month', 'Free SSL certificate', '5 email accounts', 'Daily backups (kept 30 days)'],
			more: [], // TODO(owner): remaining features
		},
		{
			id: 'business',
			name: 'Business',
			tag: 'Most popular',
			desc: 'For growing sites that need more room, faster servers and a quicker response.',
			popular: true,
			monthly: { GBP: 18, USD: 24, EUR: 21 },
			annualPerMonth: { GBP: 14.4, USD: 19.2, EUR: 16.8 },
			annualPerYear: { GBP: 172.8, USD: 230.4, EUR: 201.6 },
			features: ['Up to 5 websites', '80 GB NVMe storage', 'Unlimited bandwidth', 'Free SSL certificates', '25 email accounts', 'Daily backups (kept 90 days)'],
			more: [], // TODO(owner): remaining features
		},
		{
			id: 'enterprise',
			name: 'Enterprise',
			tag: 'For online stores',
			desc: 'Built for online stores: checkout uptime, PCI-ready setup and room for traffic spikes.',
			popular: false,
			monthly: { GBP: 38, USD: 49, EUR: 44 },
			annualPerMonth: { GBP: 30.4, USD: 39.2, EUR: 35.2 },
			annualPerYear: { GBP: 364.8, USD: 470.4, EUR: 422.4 },
			features: ['Unlimited websites', '200 GB NVMe storage', 'Unlimited bandwidth', 'Free SSL certificates', 'Unlimited email accounts', 'Hourly backups (kept 12 months)'],
			more: [], // TODO(owner): remaining features
		},
	] as HostingPlan[],
	/** Domain registration or transfer, at cost, not part of the plans. */
	domainPerYear: 15,
};

// ---------------------------------------------------------------- care
export const care = {
	plans: [
		{
			id: 'care',
			name: 'Care',
			monthly: 19,
			desc: 'Updates and security checks so nothing breaks.',
			features: ['WordPress, theme and plugin updates', 'Security scans', 'Uptime monitoring', 'Monthly backup check', 'Fixes if an update breaks something'],
		},
		{
			id: 'plus',
			name: 'Care Plus',
			monthly: 39,
			desc: 'Care, plus time for changes and a monthly report.',
			features: ['Everything in Care', 'Up to 2 hours of content changes each month', 'Monthly report (speed, uptime, updates done)', 'Priority replies within 4 working hours'],
		},
	],
	note: 'Care plans work with our hosting or with your own hosting.',
};

// ---------------------------------------------------------------- policies (owner-approved)
export const policies = {
	payment: '50% to start, 50% when you’ve approved the finished site and before it goes live.',
	changes: 'Two rounds of design changes are included.',
	afterLaunch: '30 days of free fixes.',
	hourlyRate: 15,
	cancel: 'Cancel any time with 30 days’ notice.',
	ownership: 'You own your domain, website, content and logins from day one.',
	invoices: 'Invoices in USD, GBP or EUR. Pay by bank transfer, Wise or PayPal.',
	taxes: 'Prices don’t include any taxes that may apply in your country.',
};

// ---------------------------------------------------------------- what every website includes
export const alwaysIncluded = [
	'Works on phones, tablets and desktops',
	'Basic SEO setup: page titles, descriptions, sitemap, structured data and fast loading',
	'Contact form and WhatsApp button',
	'Google Analytics and Search Console connected',
	'Two rounds of design changes',
	'30 days of free fixes after launch',
	'A short video showing you how to edit your site',
	'You own everything: domain, website, content and logins',
];
export const notIncluded = [
	'Premium plugins or themes, if your site needs one (at cost, and we’ll ask first)',
	'Paid stock photos (we use free, licensed images unless you’d like paid ones)',
	`Your domain name (usually about $${hosting.domainPerYear} a year, paid at cost)`,
	'Third-party fees, such as Shopify’s monthly plan or payment processing fees',
];

// ---------------------------------------------------------------- money helpers
/** Rounds a USD one-off amount into the display currency (nearest 10). */
export const oneOff = (usd: number, cur: Currency) => Math.round((usd * rates[cur]) / 10) * 10;
/** Rounds a USD monthly amount into the display currency (nearest 1). */
export const monthly = (usd: number, cur: Currency) => Math.round(usd * rates[cur]);
/** "$1,400", or "$19.20" with cents when the amount has them. */
export function money(amount: number, cur: Currency): string {
	const cents = Math.round(amount * 100) % 100 !== 0;
	return symbols[cur] + amount.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
}
export const range = (low: number, high: number, cur: Currency) => (low === high ? money(low, cur) : `${money(low, cur)} – ${money(high, cur)}`);

// Starting prices (for cards, FAQ answers, blog post and schema).
export const from = {
	website: website.pages.find((p) => p.id === '2-5')!.price,
	websitePages: website.pages.find((p) => p.id === '2-5')!.count,
	store: store.products[0].price,
	storeProducts: store.products[0].count,
	seo: Math.min(...seo.area.map((a) => a.monthly ?? Infinity)),
	hosting: Math.min(...hosting.plans.map((p) => p.monthly.USD)),
	care: Math.min(...care.plans.map((p) => p.monthly)),
	app: apps.types.find((a) => a.id === 'mobile')!.range,
};

// ---------------------------------------------------------------- pricing FAQ (D3)
export type PriceFaq = { q: string; a: string };
export const pricingFaqs: PriceFaq[] = [
	{ q: 'Is the calculator price the final price?', a: 'It’s a range to help you plan. After a short chat or a few messages, we send a fixed quote. The fixed quote is what you pay. If you ask for something extra later, we agree the cost with you before we start.' },
	{ q: 'Why is the estimate a range?', a: 'Two 5-page websites can still be different: one might need more images, longer pages or a special form. The range covers that. Most fixed quotes land in the lower half.' },
	{ q: 'Why are you more affordable than agencies in the UK or US?', a: 'We’re based in Islamabad, where running a business costs less. We pass that on to you. The quality is the same, and you can check it on the live sites in our portfolio.' },
	{ q: 'Do I have to pay every month?', a: 'No. Your website is a one-off payment. Hosting, care plans and SEO are optional monthly services, and you can cancel any time with 30 days’ notice.' },
	{ q: 'Can I use my own hosting?', a: 'Yes. We can build on your hosting, and our care plans work there too.' },
	{ q: 'How long will my website take?', a: 'Most websites are ready in 1 to 3 weeks, and online stores in 2 to 3 weeks. Very large sites and apps take longer, and we’ll tell you the exact timeline in your quote.' },
	{ q: 'How do I pay?', a: '50% to start and 50% when you’ve approved the finished site, before it goes live. Invoices are in USD, GBP or EUR, and you can pay by bank transfer, Wise or PayPal.' },
	{ q: 'What if I need changes after launch?', a: `You get 30 days of free fixes. After that, small changes are included in the Care Plus plan, or charged at ${money(policies.hourlyRate, 'USD')} an hour, always agreed first.` },
];
/** The shorter set used on the calculator page (questions 1, 2, 6 and 8). */
export const calculatorFaqs = [pricingFaqs[0], pricingFaqs[1], pricingFaqs[5], pricingFaqs[7]];

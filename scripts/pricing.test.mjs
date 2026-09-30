// Calculator tests (the B8 cases in the pricing brief). Run: npm test
// Node strips the TypeScript types itself, so there is nothing to install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, defaults, formatOneOff, fromQuery, toQuery } from '../src/scripts/pricing-calculator.ts';
import { hosting, money } from '../src/data/pricing.ts';

const est = (answers) => calculateEstimate({ ...defaults, ...answers }, 'USD');

test('A: website, 6-10 pages, our layouts, own text, no extras, new site', () => {
	const e = est({ need: ['website'], pages: '6-10', design: 'layout', copy: 'own', existing: 'new' });
	assert.equal(formatOneOff(e), '$350 – $410');
	assert.equal(e.timeline, '2–3 weeks');
});

test('B: website, 2-5 pages, fully custom, we write the text, online booking', () => {
	const e = est({ need: ['website'], pages: '2-5', design: 'custom', copy: 'write', extras: ['booking'] });
	assert.equal(formatOneOff(e), '$530 – $610');
	assert.equal(e.timeline, '2–3 weeks');
});

test('C: store, up to 25 products, we add them, product options', () => {
	const e = est({ need: ['store'], products: '25', adding: 'us', storeExtras: ['options'] });
	assert.equal(formatOneOff(e), '$980 – $1,130');
	assert.equal(e.timeline, '2–3 weeks');
});

test('D: SEO, several cities, 2 articles a month', () => {
	const e = est({ need: ['seo'], area: 'region', articles: '2' });
	assert.equal(formatOneOff(e), '$100');
	assert.equal(e.monthlyTotal, 220);
	assert.equal(e.timeline, 'Starts within 1 week');
});

test('E: hosting Business, annual, USD', () => {
	const e = est({ need: ['hosting'], hosting: 'business', billing: 'annual', care: 'none' });
	assert.equal(money(e.monthlyTotal, 'USD'), '$19.20');
	const plan = hosting.plans.find((p) => p.id === 'business');
	assert.equal(money(plan.annualPerYear.USD, 'USD'), '$230.40');
	assert.ok(e.notes.some((n) => n.includes('$230.40')));
});

test('F: website, more than 20 pages', () => {
	const e = est({ need: ['website'], pages: '20+' });
	assert.equal(formatOneOff(e), 'From $800');
	assert.equal(e.complex, true);
	assert.equal(e.timeline, '3–5 weeks, confirmed in your quote');
});

test('G: slower extras never push a normal website past 3 weeks', () => {
	const e = est({ need: ['website'], pages: '6-10', design: 'custom', extras: ['booking', 'language'], existing: 'replace' });
	assert.equal(e.timeline, '3 weeks');
});

test('URL state round-trips', () => {
	const a = { ...defaults, need: ['website', 'hosting'], pages: '6-10', extras: ['blog', 'booking'], hosting: 'business', billing: 'annual' };
	const back = fromQuery(toQuery(a, 'GBP'));
	assert.equal(back.currency, 'GBP');
	assert.deepEqual(back.answers.need, ['website', 'hosting']);
	assert.deepEqual(back.answers.extras, ['blog', 'booking']);
	assert.equal(back.answers.billing, 'annual');
});

test('several services add up; the timeline is the longest single one', () => {
	const e = est({ need: ['website', 'store'], pages: '6-10' });
	assert.equal(e.oneOff.low, 350 + 900);
	assert.equal(e.timeline, '2–3 weeks');
});

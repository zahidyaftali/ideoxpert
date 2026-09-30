// /pricing: currency switch (USD, GBP, EUR), monthly / annual hosting toggle,
// and the plan buttons that fill the project form.
import { hosting, money, monthly, oneOff, type Currency } from '../data/pricing';
import { fillProjectForm } from './fill-form';

const $$ = <T extends Element = HTMLElement>(sel: string) => [...document.querySelectorAll<T>(sel)];
let cur: Currency = 'USD';
let billing: 'monthly' | 'annual' = 'monthly';

function render() {
	$$('[data-cur]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cur === cur)));
	$$('[data-billing]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.billing === billing)));
	// One-off and monthly prices converted from USD.
	$$('[data-usd]').forEach((el) => {
		const usd = Number(el.dataset.usd);
		el.textContent = money(el.dataset.kind === 'monthly' ? monthly(usd, cur) : oneOff(usd, cur), cur);
	});
	$$('[data-usd-range]').forEach((el) => {
		const [lo, hi] = el.dataset.usdRange!.split('-').map(Number);
		el.textContent = `${money(oneOff(lo, cur), cur)}–${money(oneOff(hi, cur), cur)}`;
	});
	// Hosting: fixed prices per currency.
	$$('[data-host-min]').forEach((el) => (el.textContent = money(Math.min(...hosting.plans.map((p) => p.monthly[cur])), cur)));
	$$('[data-host-price]').forEach((el) => {
		const p = hosting.plans.find((x) => x.id === el.dataset.hostPrice)!;
		el.textContent = money((billing === 'annual' ? p.annualPerMonth : p.monthly)[cur], cur);
	});
	$$('[data-host-sub]').forEach((el) => {
		const p = hosting.plans.find((x) => x.id === el.dataset.hostSub)!;
		el.textContent =
			billing === 'annual'
				? `${money(p.annualPerYear[cur], cur)} billed once a year`
				: `${money(Math.round(p.monthly[cur] * 12 * 100) / 100, cur)} a year billed monthly · switch to annual and pay ${money(p.annualPerYear[cur], cur)}`;
	});
	$$('[data-annual-only]').forEach((el) => (el.hidden = billing !== 'annual'));
	$$<HTMLAnchorElement>('[data-plan]').forEach((a) => (a.dataset.billingNow = billing));
}

const lang = navigator.language.toLowerCase();
cur = lang === 'en-gb' ? 'GBP' : /^(de|nl|fr|es|it)\b/.test(lang) ? 'EUR' : 'USD';

$$('[data-cur]').forEach((b) =>
	b.addEventListener('click', () => {
		cur = b.dataset.cur as Currency;
		render();
	}),
);
$$('[data-billing]').forEach((b) =>
	b.addEventListener('click', () => {
		billing = b.dataset.billing as typeof billing;
		render();
	}),
);
// "Choose Business": the form, set to hosting, with the plan in the message.
// When the form handles it, the click stops here so Lenis's anchor handler
// doesn't start a second scroll to #discovery.
const handled = (e: Event, done: boolean) => {
	if (!done) return;
	e.preventDefault();
	e.stopPropagation();
};
$$<HTMLAnchorElement>('[data-plan]').forEach((a) =>
	a.addEventListener('click', (e) => handled(e, fillProjectForm({ service: 'Hosting & Domain', message: `I’d like the ${a.dataset.plan} hosting plan (${billing}).` }))),
);
$$<HTMLAnchorElement>('[data-care]').forEach((a) =>
	a.addEventListener('click', (e) => handled(e, fillProjectForm({ service: 'Website Maintenance', message: `I’d like the ${a.dataset.care} plan.` }))),
);
render();

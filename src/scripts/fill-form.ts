// Fills the project form (the closing section on every page, or /contact):
// used by the cost calculator's "Get my fixed quote", the hosting plan
// buttons on /pricing, and links that arrive with ?estimate=… in the URL.
import { lenis } from './smooth';

type Fill = { service?: string; message?: string; estimate?: string; scroll?: boolean };

export function fillProjectForm({ service, message, estimate, scroll = true }: Fill): boolean {
	const form = document.querySelector<HTMLFormElement>('form[data-project-form]');
	if (!form) return false;
	const hidden = form.querySelector<HTMLInputElement>('input[name="estimate"]');
	if (hidden && estimate !== undefined) hidden.value = estimate;
	const box = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]');
	if (box && message !== undefined) box.value = message;
	if (service) {
		form.querySelector('input[name="service"]')?.closest('[data-select]')?.dispatchEvent(new CustomEvent('select:set', { detail: service }));
	}
	if (scroll) {
		const target = form.closest('section') ?? form;
		// A pixel position from the real scroll offset: Lenis's own offset can be
		// stale after a native scroll, which made it stop short or overshoot.
		if (lenis) lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - 110, { force: true });
		else target.scrollIntoView({ block: 'start' });
		setTimeout(() => form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), lenis ? 900 : 50);
	}
	return true;
}

// A link such as /contact?estimate=… (from the calculator) fills the form.
const fromUrl = new URLSearchParams(location.search).get('estimate');
if (fromUrl) fillProjectForm({ estimate: fromUrl.slice(0, 2000), message: `Hi, here’s my estimate. ${fromUrl.slice(0, 2000)}`, scroll: false });

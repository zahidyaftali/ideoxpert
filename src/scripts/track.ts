// Conversion events for analytics: form sent, WhatsApp, email and phone
// clicks. Sends to Google Analytics 4 (gtag) or Plausible when one of them is
// on the page (see the commented slot in BaseLayout.astro); does nothing
// otherwise.
type Params = Record<string, string>;

declare global {
	interface Window {
		gtag?: (command: 'event', name: string, params?: Params) => void;
		plausible?: (name: string, options?: { props?: Params }) => void;
	}
}

export function track(name: string, params: Params = {}) {
	window.gtag?.('event', name, params);
	window.plausible?.(name, { props: params });
}

// Contact clicks anywhere on the page.
document.addEventListener('click', (e) => {
	const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
	if (!link) return;
	const href = link.getAttribute('href') ?? '';
	const page = location.pathname;
	if (href.includes('wa.me/')) track('whatsapp_click', { page });
	else if (href.startsWith('mailto:')) track('email_click', { page });
	else if (href.startsWith('tel:')) track('phone_click', { page });
});

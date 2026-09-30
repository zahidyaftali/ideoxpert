// 44×44 line icons for the services (stroke drawn by the consumer), keyed by
// service slug. Used by ServiceIcon.astro and the homepage services wheel.
export const serviceIcons: Record<string, string> = {
	// browser window with code
	'website-development': '<rect x="4" y="7" width="36" height="30" rx="3"/><path d="M4 14h36"/><circle cx="9" cy="10.5" r=".6"/><circle cx="12.5" cy="10.5" r=".6"/><path d="m17 21-4.5 4.5L17 30M27 21l4.5 4.5L27 30M23.5 19l-3 13"/>',
	// pen nib over a baseline
	'website-design': '<path d="M22 5 32.5 19 22 34 11.5 19Z"/><path d="M22 5v11"/><circle cx="22" cy="19" r="2.8"/><path d="M8 39h28"/>',
	// page built from blocks
	'wordpress-website': '<rect x="6" y="5" width="32" height="34" rx="3"/><path d="M6 13h32"/><rect x="11" y="18" width="10" height="8" rx="1"/><path d="M25 19h8M25 23h6M11 31h22"/>',
	// shopping bag
	'ecommerce-development': '<path d="M8 14h28l-2.2 23.5a2 2 0 0 1-2 1.8H12.2a2 2 0 0 1-2-1.8Z"/><path d="M15.5 18v-6.5a6.5 6.5 0 0 1 13 0V18"/><path d="m17 27 3.5 3.5L27.5 23"/>',
	// magnifier with rising bars
	'seo-optimization': '<circle cx="19" cy="19" r="13"/><path d="m28.5 28.5 10 10"/><path d="M13.5 24v-3M19 24v-8M24.5 24v-5.5"/>',
	// pointer on an interface
	// phone
	'mobile-app-development': '<rect x="12" y="4" width="20" height="36" rx="4"/><path d="M19 8.5h6M20 35h4"/><path d="M17 17h10M17 22h10M17 27h6"/>',
	// stacked layers
	'cms-development': '<path d="M22 6 38 14 22 22 6 14Z"/><path d="m6 21.5 16 8 16-8M6 29l16 8 16-8"/>',
	// server stack
	'hosting-domain': '<rect x="7" y="6" width="30" height="12" rx="2"/><rect x="7" y="22" width="30" height="12" rx="2"/><circle cx="12.5" cy="12" r="1"/><circle cx="12.5" cy="28" r="1"/><path d="M20 12h11M20 28h11M22 34v5M14 39h16"/>',
	// shield with check
	'website-maintenance': '<path d="M22 4.5 36 9.5V20c0 9-6 15.2-14 19.5C14 35.2 8 29 8 20V9.5Z"/><path d="m15.5 21.5 4.5 4.5 8.5-9"/>',
};

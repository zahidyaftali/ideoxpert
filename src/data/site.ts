// Single source of truth for company facts. Header, footer, CTAs and the
// structured data (JSON-LD) on every page read from here, so a change made
// here shows up everywhere at once.

export const site = {
	name: 'IdeoXpert',
	url: 'https://ideoxpert.com',
	tagline: 'Web development agency in Islamabad, Pakistan',
	description:
		'IdeoXpert is a web development agency in Islamabad, Pakistan providing web solutions: web design, web development, WordPress websites, e-commerce stores, mobile apps, SEO, CMS development, hosting and website maintenance.',
	logo: '/assets/images/Logo.png',
	logoLight: '/assets/images/logo-light.png',
	defaultImage: '/assets/images/bg/16.png',
	themeColor: '#2db453',

	// YouTube/Vimeo URL for the "Watch our story" button on the About page.
	// The button stays hidden while this is empty.
	storyVideoUrl: '',

	email: 'info@ideoxpert.com',
	phone: '+923019860329',
	phoneDisplay: '+92 301 9860329',
	whatsapp: '923019860329',

	// Only the city is published: the site says "based in Islamabad" and never
	// shows a street address or map.
	address: {
		locality: 'Islamabad',
		region: 'Islamabad Capital Territory',
		country: 'PK',
	},

	// Social profiles. These are also emitted as schema.org "sameAs" links, which
	// tell Google and AI assistants which profiles belong to this company.
	// Add Clutch / GoodFirms / Google Business Profile URLs here once they exist.
	socials: [
		{ name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/ideoxpert/' },
		{ name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/ideoxpert/' },
		{ name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/people/IdeoXpert/61558867673561/' },
	],
} as const;

// Countries we work in, shown with flags in the footer, the About menu and
// the Contact page, and emitted as schema.org areaServed. Taken from where the
// portfolio clients are. Flag files live in /public/assets/images/flags.
export const countries = [
	{ code: 'us', name: 'United States' },
	{ code: 'gb', name: 'United Kingdom' },
	{ code: 'ca', name: 'Canada' },
	{ code: 'au', name: 'Australia' },
	{ code: 'de', name: 'Germany' },
	{ code: 'nl', name: 'Netherlands' },
	{ code: 'nz', name: 'New Zealand' },
	{ code: 'ae', name: 'United Arab Emirates' },
	{ code: 'fj', name: 'Fiji' },
	{ code: 'pk', name: 'Pakistan' },
];

// Headline figures. Used on the homepage, About page and service pages.
// TODO: the old pages disagreed with each other (homepage: 50+ projects and
// 4.8/5 from 100+ clients; service pages: 150+ clients and 270+ projects;
// About: 300+ clients at 4.85). Check these against your records.
export const stats = {
	years: { value: 6, suffix: '+', label: 'Years of experience' },
	projects: { value: 50, suffix: '+', label: 'Completed projects' },
	rating: { value: 4.8, suffix: '/5', label: 'Average client rating', reviews: '100+' },
	support: { value: 24, suffix: '/7', label: 'Support when you need it' },
	clients: { value: 150, suffix: '+', label: 'Clients have built their websites with us since 2022' },
	delivered: { value: 270, suffix: '+', label: 'Client projects completed all over the world' },
};

export type Service = {
	slug: string;
	name: string;
	summary: string;
	/** Image shown in menus and previews. */
	image: string;
};

// Order here drives the header menu, footer links and the Services schema.
export const services: Service[] = [
	{ slug: 'website-development', name: 'Website Development', summary: 'Custom websites and web applications built for speed, security and growth.', image: '/assets/images/web dev-1.jpg' },
	{ slug: 'website-design', name: 'Website Design', summary: 'Websites designed to build brands people love.', image: '/assets/images/website design 1.jpg' },
	{ slug: 'wordpress-website', name: 'WordPress Website', summary: 'WordPress websites your team can manage and grow.', image: '/assets/images/Wordpress website 1.jpg' },
	{ slug: 'ecommerce-development', name: 'E-commerce Development', summary: 'Online stores on WooCommerce and Shopify that are easy to run and built to sell.', image: '/assets/images/work/maisonluma-com/hero.webp' },
	{ slug: 'seo-optimization', name: 'SEO Optimization', summary: 'Technical, on-page and content SEO that improves online visibility.', image: '/assets/images/seo optimizations.jpg' },
	{ slug: 'mobile-app-development', name: 'Mobile App Development', summary: 'Mobile apps that put your business in every pocket.', image: '/assets/images/elements/web-dev2.jpg' },
	{ slug: 'cms-development', name: 'CMS Development', summary: 'Content management systems that let your team update content without developer help.', image: '/assets/images/cms develop.jpg' },
	{ slug: 'hosting-domain', name: 'Hosting & Domain', summary: 'Fast, secure hosting and domain management with SSL included.', image: '/assets/images/hosing and domain.jpg' },
	{ slug: 'website-maintenance', name: 'Website Maintenance', summary: 'Updates, backups, security and monitoring to keep websites running smoothly.', image: '/assets/images/maintenance 1.jpg' },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

// Logos in the "Platforms we build on" marquee. These are tools, not clients.
export const platforms = [
	{ name: 'WordPress', logo: '/assets/images/client/06.png' },
	{ name: 'WooCommerce', logo: '/assets/images/client/05.png' },
	{ name: 'Elementor', logo: '/assets/images/client/03.png' },
	{ name: 'Yoast SEO', logo: '/assets/images/client/01.png' },
	{ name: 'Hostinger', logo: '/assets/images/client/04.png' },
	{ name: 'Bluehost', logo: '/assets/images/client/02.png' },
];

// Technologies named on the service pages.
export const stack = [
	'WordPress', 'WooCommerce', 'Elementor', 'Shopify', 'Drupal', 'React', 'React Native',
	'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS3', 'Yoast SEO', 'Joomla',
];

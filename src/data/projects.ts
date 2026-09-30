// Client websites: the portfolio, case study pages (/work/<slug>), the logo
// marquee and the "Recent work" carousel. Most recent first.
//
// Copy (headline, summary, brief) is written from what each live site says
// about the business. Everything measurable (pages, SEO checks, tech, logo,
// screenshots) comes from src/data/case-facts.json, captured from the live
// sites; regenerate it rather than editing it by hand.
//
// Screenshots: /public/assets/images/work/<id>/ (hero, s1-s4 sections,
// mobile, logo, logo-mono).
//
// Not shown because the live site was down or broken when captured:
// psgwa.com.au, niyumtrading.com, olimotion.com, mstrucking.co.nz,
// iprofxgroup.com, dvora.ideoxpert.com, goepfert-express.solutions-vogelfrei.de,
// aceimpactllc.com, bace.academy, danbeauty.ca, queenhairworks.nl,
// slotenspecialistdirect.nl, viewpro.com, danis-umzuege.de, victory-umzuege.de.
// Removed on request: naehd.org, wiseorigin.co.uk, apexium.team, and
// zahidyaftali.com (the founder's own site, not client work).
import factsJson from './case-facts.json';

type CountryCode = 'us' | 'gb' | 'ca' | 'au' | 'de' | 'nl' | 'nz' | 'ae' | 'fj' | 'pk';
type Goal = 'enquiries' | 'bookings' | 'sales' | 'applications' | 'signups' | 'support' | 'listings' | 'readers';

type Facts = {
	sections: { file: string; h: number }[];
	mobile: boolean;
	logo: { light: boolean; ratio: number; marquee: boolean } | null;
	pages: number;
	posts: number;
	languages: number;
	translated: boolean;
	wordpress: boolean;
	builder: string | null;
	shop: boolean;
	host: string | null;
	seo: { good: boolean; plugin: string | null; passed: number; total: number; checks: { label: string; pass: boolean }[] };
	stack: { name: string; si?: string; img?: string }[];
	built: { title: string; text: string }[];
	/** Main brand colour measured from the homepage screenshot. */
	accent: string | null;
};

type Entry = {
	id: string;
	slug: string;
	name: string;
	url: string;
	country?: CountryCode;
	/** Chip on the card, e.g. "Crane hire". */
	industry: string;
	/** Broader group for the portfolio filter. */
	sector: string;
	/** What kind of website it is, for non-SEO cards. */
	kind: string;
	goal: Goal;
	/** Set when one client has several sites (the Jazba group), so they count as one client. */
	client?: string;
	/** A measured result the client can confirm, e.g. "Page 1 on Google for 'crane hire Rockingham'". Real results only. */
	result?: string;
	headline: string;
	summary: string;
	brief: string;
};

const recent: Entry[] = [
	{
		id: 'jazbahost-com', slug: 'jazba-host', client: 'Jazba', name: 'Jazba Host', url: 'https://www.jazbahost.com/', country: 'gb',
		industry: 'Web hosting', sector: 'Technology', kind: 'Business website', goal: 'enquiries',
		headline: 'Jazba Host: web design and UK hosting under one roof',
		summary: 'Jazba Host builds, hosts and maintains websites for UK businesses, with fixed-price builds and managed hosting plans. We designed and developed their new website to explain both offers clearly and turn visitors into quote requests.',
		brief: 'Jazba Host sells two things at once, website builds and monthly hosting, and needed a site that explains both without confusing anyone. Prices had to be clear and every page had to lead to a quote.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'jazba-studio', slug: 'jazba-studio', client: 'Jazba', name: 'Jazba Studio', url: 'https://jazba.studio/',
		industry: 'Recording studio', sector: 'Media & entertainment', kind: 'Booking website', goal: 'bookings',
		headline: 'Jazba Studio: four recording rooms, one booking journey',
		summary: 'Jazba Studio runs recording rooms, post-production services and film equipment rental across three branches. We designed and built a website that presents the whole pipeline and makes booking studio time a single step.',
		brief: 'Artists and filmmakers needed to see every room, service and branch in one place, and book time without phoning around.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'gahealthcaretraining-com', slug: 'ga-healthcare-training', name: 'GA Healthcare Training', url: 'https://gahealthcaretraining.com/', country: 'us',
		industry: 'Healthcare training', sector: 'Health & wellness', kind: 'Training website', goal: 'bookings',
		headline: 'GA Healthcare Training: CPR and BLS classes Georgia can book online',
		summary: 'GA Healthcare Training runs American Heart Association BLS, ACLS, PALS and Heartsaver classes in Lilburn, Georgia, alongside nurse review courses and consulting. We built a website that lists every programme and helps students book a seat.',
		brief: 'Nurses and healthcare workers search for certified classes near them. The site needed to show every programme clearly, rank locally and make booking a seat easy.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'jazbaentertainment-com', slug: 'jazba-entertainment', client: 'Jazba', name: 'Jazba Entertainment', url: 'https://jazbaentertainment.com/',
		industry: 'Music & live events', sector: 'Media & entertainment', kind: 'Brand website', goal: 'bookings',
		headline: 'Jazba Entertainment: music, film and live events in one brand',
		summary: 'Jazba Entertainment covers music production, studios, artist management, distribution and ticketing. We designed a bold, event-led website that showcases shows and artists and points fans to tickets and bookings.',
		brief: 'One company, many services. The website had to feel as big as the events it promotes while still sending fans to tickets and promoters to artist bookings.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'jazbatickets-com', slug: 'jazba-tickets', client: 'Jazba', name: 'Jazba Tickets', url: 'https://jazbatickets.com/',
		industry: 'Event ticketing', sector: 'Media & entertainment', kind: 'Launch page', goal: 'signups',
		headline: 'Jazba Tickets: a launch page for a new ticketing platform',
		summary: 'Jazba Tickets is a new platform for concert, theatre, comedy and festival tickets, and for hiring verified artists. Ahead of launch we built a fast, custom-coded page that explains the offer and collects early interest.',
		brief: 'Before the platform opened, Jazba Tickets needed a page that explains what is coming, builds trust in the checkout and captures early sign-ups.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'abccranehire-com-au', slug: 'abc-crane-hire', name: 'ABC Crane Hire', url: 'https://abccranehire.com.au/', country: 'au',
		industry: 'Crane hire', sector: 'Construction & trades', kind: 'Service website', goal: 'enquiries',
		headline: 'ABC Crane Hire: ranking crane hire across Perth and Peel',
		summary: 'ABC Crane Hire supplies Franna, Tom Thumb, Hiab and 100-tonne mobile cranes across Perth and the Peel region. We built their WordPress website with location pages and a large blog, set up to rank for crane hire searches across Western Australia.',
		brief: 'Site managers search "crane hire" plus their suburb. ABC Crane Hire needed to show up in Perth, Rockingham and Mandurah, and make it easy to call about a lift.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'brightwayconsultsolutions-com', slug: 'brightway-consult-solutions', name: 'Brightway Consult Solutions', url: 'https://brightwayconsultsolutions.com/',
		industry: 'Business consulting', sector: 'Business & consulting', kind: 'Business website', goal: 'enquiries',
		headline: 'Brightway Consult Solutions: a consulting firm and its family of brands',
		summary: 'Brightway Consult Solutions offers strategy, recruiting and business services, alongside a family of brands, events and affiliate partners. We designed a website that brings the firm and its brands together and turns interest into enquiries.',
		brief: 'The firm had services, brands, events and partner deals to show. The site needed to present all of it without overwhelming a first-time visitor.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'brightwaygroup-org', slug: 'brightway-group', name: 'Brightway Group', url: 'https://brightwaygroup.org/',
		industry: 'Group of companies', sector: 'Business & consulting', kind: 'Group website', goal: 'enquiries',
		headline: 'Brightway Group: one website for a group of companies',
		summary: 'Brightway Group brings several companies under one vision. We built the group website that introduces each company, shares events and updates, and gives partners and clients one clear place to get in touch.',
		brief: 'Each company in the group had its own audience. The group site needed to explain how they fit together and route visitors to the right one.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'ransfordaddo-com', slug: 'dr-ransford-addo', name: 'Dr. Ransford Addo', url: 'https://ransfordaddo.com/',
		industry: 'Author & speaker', sector: 'Business & consulting', kind: 'Personal brand website', goal: 'readers',
		headline: 'Dr. Ransford Addo: an author and speaker’s home online',
		summary: 'Dr. Ransford M. K. Addo is an author, speaker and organisational development consultant. We built a personal website that brings together his books, videos, events and articles, with clear ways to buy, follow and get in touch.',
		brief: 'Books, talks, videos and articles were spread across platforms. Dr. Addo needed one home for his work that readers and event organisers could trust.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'fijianrealestate-com', slug: 'fijian-real-estate', name: 'Fijian Real Estate', url: 'https://fijianrealestate.com/', country: 'fj',
		industry: 'Real estate', sector: 'Real estate', kind: 'Property listings website', goal: 'listings',
		headline: 'Fijian Real Estate: property listings in paradise, in two languages',
		summary: 'Fijian Real Estate helps local and overseas buyers find property across Fiji. We built a listings website with featured and luxury properties, browsing by type and location, and an English and Chinese version for international buyers.',
		brief: 'Many buyers are overseas. The site needed listings that are easy to browse, a strong sense of place, and content in more than one language.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'myrentfiji-com', slug: 'myrent-fiji', name: 'myRent Fiji', url: 'https://myrentfiji.com/', country: 'fj',
		industry: 'Property rentals', sector: 'Real estate', kind: 'Rental platform', goal: 'signups',
		headline: 'myRent Fiji: a rental platform from listing to signed tenancy',
		summary: 'myRent Fiji lets landlords list, market and manage rental property, and helps tenants find homes across Fiji. We designed and built the platform’s website, from fresh rental listings to tenant checks, pricing and sign-up.',
		brief: 'Landlords were used to classified ads. myRent Fiji needed to show why a managed platform is better and get both landlords and tenants signed up.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'tvdm-au', slug: 'tvdm', name: 'TVDM', url: 'https://tvdm.au/', country: 'au',
		industry: 'Digital marketing', sector: 'Marketing & agencies', kind: 'Agency website', goal: 'enquiries',
		headline: 'TVDM: a Perth marketing agency’s website that sells its own results',
		summary: 'True Vine Digital Marketing helps Perth businesses grow with web development, SEO, lead generation and AI. We built a website that practises what they preach: fast, clear on pricing and built around a free audit offer.',
		brief: 'A marketing agency’s own site is its first case study. TVDM needed a website that ranks, explains its method and pricing, and books audits.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
];

const earlier: Entry[] = [
	{
		id: 'iuvedalife-com', slug: 'iuveda-life', name: 'IUVEDA Life', url: 'https://iuvedalife.com/',
		industry: 'Ayurveda & wellness', sector: 'Health & wellness', kind: 'Content & shop website', goal: 'sales',
		headline: 'IUVEDA Life: Ayurvedic guides, courses and consultations online',
		summary: 'IUVEDA Life shares Ayurvedic wisdom from Sri Vrindavan Dham through guides, a Vedic library, a dosha quiz and personal consultations. We built a content-rich WordPress site with a shop for the guides and online booking for consultations.',
		brief: 'Years of teaching needed a home: a library of guides to sell, content to read, a quiz to engage visitors and a simple way to book a consultation.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'thomwerk-nl', slug: 'thomwerk', name: 'Thomwerk', url: 'https://thomwerk.nl/', country: 'nl',
		industry: 'Recruitment agency', sector: 'Recruitment', kind: 'Recruitment website', goal: 'applications',
		headline: 'Thomwerk: a recruitment site that puts vacancies first',
		summary: 'Thomwerk is an Eindhoven recruitment agency for technical and hands-on staff. We built a Dutch-language website where job seekers see open vacancies straight away and can apply or send a CV in a few clicks.',
		brief: 'Candidates want to see jobs, not marketing. Thomwerk needed vacancies on the homepage, easy applications and a site their recruiters can update daily.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'zero-trip-com', slug: 'zero-trip', name: 'Zero-Trip Wedge', url: 'https://zero-trip.com/',
		industry: 'Drilling technology', sector: 'Industrial & engineering', kind: 'Product website', goal: 'enquiries',
		headline: 'Zero-Trip Wedge: an industrial product, explained online',
		summary: 'The Zero-Trip Wedge is a directional drilling tool that cuts the time, cost and risk of sidetrack drilling. We built a product website with training, case studies, media and distribution pages, plus a downloadable e-brochure.',
		brief: 'Drilling engineers need proof before they trust a new tool. The site needed to explain the product, show it working in the field and connect buyers with distributors.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'die-chaoskiller-berlin-de', slug: 'chaos-killer-berlin', name: 'Chaos-Killer Berlin', url: 'https://die-chaoskiller-berlin.de/', country: 'de',
		industry: 'Clearance & removals', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'Chaos-Killer Berlin: clearance and removals, one call away',
		summary: 'Chaos-Killer Berlin handles house clearances, waste disposal, small demolitions, removals and cleaning across Berlin. We built a German-language website with a page for every service, set up to rank for local searches.',
		brief: 'People need a clearance company fast, and they search for the exact job. Each service needed its own page and a quick way to ask for a quote.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'handwerk-am-rhein-de', slug: 'handwerk-am-rhein', name: 'Handwerk am Rhein', url: 'https://handwerk-am-rhein.de/', country: 'de',
		industry: 'Renovation & repairs', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'Handwerk am Rhein: windows, doors and insect screens, made local',
		summary: 'Handwerk am Rhein fits windows, doors and insect screens and takes on renovation work along the Rhine. We built a website with product pages, local area pages and an enquiry flow, set up to be found in local search.',
		brief: 'Homeowners compare local tradespeople online. Handwerk am Rhein needed to appear in each town they serve and make requesting a quote simple.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'flessner-sicherheitsdienst-de', slug: 'flessner-sicherheitsdienst', name: 'Fleßner Sicherheitsdienst', url: 'https://www.flessner-sicherheitsdienst.de/', country: 'de',
		industry: 'Security & locksmith', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'Fleßner: security and locksmith services, found 24/7',
		summary: 'Fleßner Sicherheitsdienst provides property protection, event security and a 24/7 emergency locksmith around Pfungstadt. We built a custom-coded website with a page for every service and area, set up to rank in local search.',
		brief: 'Someone locked out at midnight searches their town plus "Schlüsseldienst". Fleßner needed to show up for every service in every nearby town, and be one tap from a call.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'caisd-africa', slug: 'caisd', name: 'CAISD', url: 'https://caisd.africa/',
		industry: 'AI research centre', sector: 'Nonprofit & public', kind: 'Organisation website', goal: 'support',
		headline: 'CAISD: an AI research centre for sustainable development in Africa',
		summary: 'The Centre for Artificial Intelligence and Sustainable Development drives AI research and collaboration across Africa. We built a website for its research, events, podcasts, partners and the Continental AI Index.',
		brief: 'CAISD publishes research, runs events and works with partners across the continent. The site needed to present that work with authority and make it easy to support.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'archdermatology-com', slug: 'arch-dermatology', name: 'Arch Dermatology', url: 'https://archdermatology.com/', country: 'us',
		industry: 'Dermatology clinic', sector: 'Health & wellness', kind: 'Clinic website', goal: 'bookings',
		headline: 'Arch Dermatology: skin cancer screening in St. Louis',
		summary: 'Arch Dermatology offers skin cancer screening and dermatology care from two locations in St. Louis. We built a website with service and location pages, patient resources and policies, set up to rank for local dermatology searches.',
		brief: 'Patients search for a dermatologist near them and want to know what to expect. The clinic needed clear service pages, both locations and patient information in one place.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'flechtarbeiten-de', slug: 'flechtarbeiten', name: 'Flechtarbeiten', url: 'https://flechtarbeiten.de/', country: 'de',
		industry: 'Furniture restoration', sector: 'Retail & e-commerce', kind: 'Service & shop website', goal: 'sales',
		headline: 'Flechtarbeiten: chair caning repairs with an online shop',
		summary: 'Die Flechterei repairs cane, rush and Danish cord seating on Thonet, Tecta and other design classics, with partners across Germany. We built a German-language website with a page for each repair and an online shop.',
		brief: 'Owners of design classics search for the exact chair and repair. Each repair needed its own page, and the shop had to sit alongside the service.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'maisonluma-com', slug: 'maison-luma', name: 'Maison LŪMA', url: 'https://xn--maisonlma-m6b.com/',
		industry: 'Skincare brand', sector: 'Retail & e-commerce', kind: 'Online store', goal: 'sales',
		headline: 'Maison LŪMA: a slow-beauty brand with its own boutique',
		summary: 'Maison LŪMA makes calm, simple beauty rituals: konjac sponges, eye masks and soy candles. We built a French-language WooCommerce store that tells the brand story and sells the products.',
		brief: 'A slow-beauty brand cannot feel rushed online. The store needed a calm, premium feel, a clear brand story and a simple checkout.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'priveluxadvisory-com', slug: 'prive-lux-advisory', name: 'Privé LUX Advisory', url: 'https://priveluxadvisory.com/',
		industry: 'Wealth advisory', sector: 'Business & consulting', kind: 'Advisory website', goal: 'enquiries',
		headline: 'Privé LUX Advisory: a private client platform for wealth and legacy',
		summary: 'Privé LUX Advisory Group advises clients on wealth, property and legacy through its Realty, Capital, Assurance and Wealth divisions. We designed an elegant website that introduces each division and the Privé process.',
		brief: 'Private clients expect discretion and polish. The site needed to present four divisions as one trusted advisory and guide visitors to a first conversation.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'quincyforcongress-com', slug: 'quincy-for-congress', name: 'Quincy for Congress', url: 'https://quincyforcongress.com/', country: 'us',
		industry: 'Political campaign', sector: 'Nonprofit & public', kind: 'Campaign website', goal: 'support',
		headline: 'Quincy for Congress: a campaign website for Maryland’s 5th District',
		summary: 'Quincy Bareebe ran as a Democratic candidate for Maryland’s 5th Congressional District. We built the campaign website with issues, events, media, volunteer sign-up and donations.',
		brief: 'A campaign moves fast. Voters needed the candidate’s positions and events at a glance, and supporters needed quick ways to volunteer and donate.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'infinitecalculators-com', slug: 'infinite-calculators', name: 'Infinite Calculators', url: 'https://infinitecalculators.com/',
		industry: 'Online tools', sector: 'Technology', kind: 'Web tool', goal: 'readers',
		headline: 'Infinite Calculators: free online tools that show their working',
		summary: 'Infinite Calculators offers free calculators for time cards, dates, concrete, paint, tips, sales tax, grades and more. We built a fast, custom-coded site where every calculator gives an instant answer and shows the working.',
		brief: 'People want an answer in seconds. Each calculator needed to load instantly, work in the browser with no sign-up, and rank for the exact search.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'csfmcleaning-com', slug: 'csfm-cleaning', name: 'CSFM Cleaning', url: 'https://csfmcleaning.com/', country: 'gb',
		industry: 'Cleaning services', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'CSFM Cleaning: home cleaning in Birmingham, booked with a message',
		summary: 'CSFM Cleaning offers home, deep and event cleaning in Birmingham and nearby. We built a website that explains each service and the areas covered, with enquiries by form or WhatsApp.',
		brief: 'Customers want to know what is included, where the company works and how to book. The site needed to answer all three quickly.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: '4tsstudio-org', slug: 't-shirt-studio', name: 'T-Shirt Studio', url: 'https://www.4tsstudio.org/',
		industry: 'Custom apparel', sector: 'Retail & e-commerce', kind: 'Online store', goal: 'sales',
		headline: 'T-Shirt Studio: custom apparel with an online shop',
		summary: 'T-Shirt Studio designs custom t-shirts with screen printing and embroidery. We built a WooCommerce website with a custom shop, quick order and local store pages.',
		brief: 'Customers wanted to order custom shirts without visiting the store. The site needed a shop, a quick order option and a clear view of the print services.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'djschilderwerken-nl', slug: 'dj-schilderwerken', name: 'DJ Schilderwerken', url: 'https://www.djschilderwerken.nl/', country: 'nl',
		industry: 'Painting & decorating', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'DJ Schilderwerken: painting and decorating, shown before and after',
		summary: 'DJ Schilderwerken has handled interior and exterior painting, wood-rot repair and maintenance since 2005. We built a Dutch-language website with a page per service and a before-and-after project gallery.',
		brief: 'Painters are chosen on trust and past work. The site needed to show real before-and-after projects and make it simple to request a quote.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'casa-suerte-nl', slug: 'casa-suerte', name: 'Casa Suerte', url: 'https://casa-suerte.nl/', country: 'nl',
		industry: 'Holiday rental', sector: 'Hospitality & travel', kind: 'Booking website', goal: 'bookings',
		headline: 'Casa Suerte: a Costa Blanca holiday apartment, booked direct',
		summary: 'Casa Suerte is a modern holiday apartment in a small complex in San Miguel de Salinas on Spain’s Costa Blanca. We built a website that shows the apartment, the area and prices, with direct booking and translation for international guests.',
		brief: 'The owners wanted guests to book direct instead of through platforms. The site needed great photos, clear prices and a booking path that works for guests from any country.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'redxpink-com', slug: 'red-x-pink', name: 'Red X Pink', url: 'https://redxpink.com/',
		industry: 'Talent management', sector: 'Marketing & agencies', kind: 'Agency website', goal: 'applications',
		headline: 'Red X Pink: a talent management agency’s website',
		summary: 'Red X Pink Management helps creators grow their social media presence with coaching, audits and brand growth management. We built a website that explains their services and brings in new creators.',
		brief: 'Creators compare agencies before they sign. The site needed to explain the services and results clearly and make applying straightforward.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'smbelectrical-ca', slug: 'smb-electrical', name: 'SMB Electrical', url: 'https://smbelectrical.ca/', country: 'ca',
		industry: 'Electrical contractor', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'SMB Electrical: Toronto electricians, found for every job',
		summary: 'SMB Electrical is a licensed electrical contractor serving homes and businesses in Toronto. We built a WordPress website with a page for every electrical service, set up to rank in local search.',
		brief: 'People search for the exact job, from panel upgrades to floor heating. Each service needed its own page and an easy way to get in touch.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'vanguardstrengthfitness-com', slug: 'vanguard-strength', name: 'Vanguard Strength', url: 'https://vanguardstrengthfitness.com/',
		industry: 'Fitness coaching', sector: 'Health & wellness', kind: 'Coaching website', goal: 'signups',
		headline: 'Vanguard Strength: a fitness coaching website',
		summary: 'Vanguard Strength and Fitness offers customised workouts, expert guidance and progress tracking. We built a clean website that explains the coaching approach and helps new members get started.',
		brief: 'New members want to know how coaching works before signing up. The site needed to explain the approach simply and make joining easy.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'mut-umzug-de', slug: 'mut-umzug', name: 'MUT Umzug', url: 'https://mut-umzug.de/', country: 'de',
		industry: 'Removals', sector: 'Home & trade services', kind: 'Service website', goal: 'enquiries',
		headline: 'MUT Umzug: a Wiesbaden removals company, working nationwide',
		summary: 'MUT Umzüge & Transport handles private, business, international and European moves from Wiesbaden. We built a custom-coded website with a page for every service and city, plus articles and FAQs, set up for local search across Germany.',
		brief: 'Moves are booked by searching the service plus the city. MUT needed a page for each combination and a fast way to request a quote.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
	{
		id: 'istanbulrestaurantbirmingham-com', slug: 'istanbul-restaurant', name: 'Istanbul Restaurant', url: 'https://istanbulrestaurantbirmingham.com/', country: 'gb',
		industry: 'Restaurant', sector: 'Hospitality & travel', kind: 'Restaurant website', goal: 'bookings',
		headline: 'Istanbul Restaurant: Turkish dining in Birmingham, online',
		summary: 'Istanbul Restaurant serves authentic Turkish food in Birmingham. We built a website with the menu, gallery, reviews and table booking, designed to make the food the star.',
		brief: 'Diners decide with their eyes. The site needed mouth-watering photography, an easy-to-read menu and a quick way to book a table.',
		// [[FILL: result]] e.g. result: 'Page 1 on Google for "..."' (only a result the client can confirm)
	},
];

const facts = factsJson as unknown as Record<string, Facts>;

const goalText: Record<Goal, { title: string; text: (n: string) => string }> = {
	enquiries: { title: 'More enquiries', text: (n) => `Every page needed a clear next step, so visitors interested in ${n} get in touch instead of leaving.` },
	bookings: { title: 'Bookings without the back-and-forth', text: () => 'Visitors needed to go from interested to booked in a few taps, without phone tag or email chains.' },
	sales: { title: 'A shop that sells', text: (n) => `Products needed to look their best, with a checkout simple enough that ${n} customers finish their order.` },
	applications: { title: 'Applications that come in', text: () => 'The path from reading to applying needed to be short and obvious on every page.' },
	signups: { title: 'Sign-ups from day one', text: () => 'The site needed to earn trust quickly and turn visitors into sign-ups.' },
	support: { title: 'Support and involvement', text: () => 'Visitors needed simple ways to get involved: follow, sign up, attend or support the work.' },
	listings: { title: 'Listings that are easy to browse', text: () => 'Buyers needed to filter by type and location and find the right property without digging.' },
	readers: { title: 'Content people come back to', text: () => 'The content needed to be easy to find, read and share, on any device.' },
};

export type Project = Entry & {
	domain: string;
	/** Full screenshot, 1440 x 900. */
	image: string;
	/** Same screenshot at 800px wide, for cards and small views. */
	thumb: string;
	/** srcset with both sizes. */
	srcset: string;
	recent: boolean;
	services: string[];
	lines: { strong: string; text: string }[];
	goals: { title: string; text: string }[];
	solution: string;
	facts: Facts;
};

const build = (isRecent: boolean) => (e: Entry): Project => {
	const f = facts[e.id];
	const platform = f.wordpress ? `on WordPress${f.builder ? ` and ${f.builder}` : ''}` : `custom-coded${f.host ? ` and hosted on ${f.host}` : ''}`;
	const builtAs = f.wordpress ? `on WordPress${f.builder ? ` with ${f.builder}` : ''}` : `as a custom-coded site${f.host ? ` hosted on ${f.host}` : ''}`;
	const services = ['website-development', 'website-design', ...(f.wordpress ? ['wordpress-website'] : []), ...(f.shop ? ['ecommerce-development'] : []), ...(f.seo.good ? ['seo-optimization'] : [])];
	const second = f.seo.good
		? { strong: 'SEO optimization', text: f.seo.plugin ? `with ${f.seo.plugin}, schema and a sitemap` : 'with schema, meta tags and a sitemap' }
		: { strong: e.kind, text: f.shop ? 'with a WooCommerce shop' : f.pages >= 5 ? `with ${f.pages} pages` : 'designed for every screen' };
	return {
		...e,
		recent: isRecent,
		domain: decodeURIComponent(new URL(e.url).hostname).replace(/^www\./, '').replace('xn--maisonlma-m6b.com', 'maisonlūma.com'),
		image: `/assets/images/work/${e.id}/hero.webp`,
		thumb: `/assets/images/work/${e.id}/hero-800.webp`,
		srcset: `/assets/images/work/${e.id}/hero-800.webp 800w, /assets/images/work/${e.id}/hero.webp 1440w`,
		services,
		lines: [{ strong: 'Web development', text: platform }, second],
		goals: [
			{ title: 'A clear first impression', text: `Visitors needed to understand what ${e.name} does, and who it is for, within seconds of landing, on a phone as much as on a desktop.` },
			f.seo.good
				? { title: 'Found on Google', text: `Customers search before they call. Every page needed solid on-page SEO so ${e.name} shows up for the searches that matter.` }
				: { title: 'Easy to keep up to date', text: `The ${e.name} team needed to change text, images and pages themselves, without waiting on a developer.` },
			{ title: goalText[e.goal].title, text: goalText[e.goal].text(e.name) },
		],
		solution: `We designed and built the ${e.name} website ${builtAs}${f.shop ? ', with a WooCommerce shop' : ''}${f.seo.good ? ', with SEO set up from launch' : ''}. Here is what went into it.`,
		facts: f,
	};
};

export const projects: Project[] = [...recent.map(build(true)), ...earlier.map(build(false))];
/**
 * Recent work without one client filling the row: at most two sites per
 * client (the Jazba group has four), never two of theirs side by side.
 */
function spread(list: Project[], max = 2): Project[] {
	const key = (p: Project) => p.client ?? p.id;
	const count = new Map<string, number>();
	const pool = list.filter((p) => {
		const n = (count.get(key(p)) ?? 0) + 1;
		count.set(key(p), n);
		return n <= max;
	});
	const out: Project[] = [];
	while (pool.length) {
		const last = out.at(-1);
		const i = pool.findIndex((p) => !last || key(p) !== key(last));
		out.push(...pool.splice(i < 0 ? 0 : i, 1));
	}
	return out;
}

export const recentProjects = spread(projects.filter((p) => p.recent));
/** One logo per client in the marquee (the Jazba group shows once). */
export const logoProjects = projects.filter((p, i, all) => p.facts.logo?.marquee && (!p.client || all.findIndex((q) => q.client === p.client && q.facts.logo?.marquee) === i));
export const sectors = [...new Set(projects.map((p) => p.sector))].sort();
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

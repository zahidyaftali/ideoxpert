import { from, money } from './pricing';

// Industry pages (/industries/<slug>). Each lists only industries where we
// have real, live client work to show; `projects` are ids from projects.ts.
// Figures on the page (project count, countries, pages, SEO) are computed
// from those projects, so they stay true as the portfolio changes.
export type Industry = {
	slug: string;
	name: string;
	/** Short name for the menu tiles, like the reference: "Healthcare_". */
	short: string;
	/** Used in running text: "websites for {audience}". */
	audience: string;
	meta: { title: string; description: string; keywords: string };
	title: string;
	lead: string;
	builds: { title: string; text: string; icon: string }[];
	needs: { title: string; text: string }[];
	faqs: { q: string; a: string }[];
	services: string[];
	projects: string[];
};

export const industries: Industry[] = [
	{
		slug: 'home-services',
		name: 'Home Services',
		short: 'Home Services',
		audience: 'home service businesses',
		meta: {
			title: 'Websites for Home Service Businesses | IdeoXpert',
			description: 'Websites and local SEO for electricians, removal firms, cleaners and locksmiths, with home service sites we built in Canada, Germany and the UK.',
			keywords: 'website for tradesmen, electrician website design, removal company website, cleaning company website, contractor website design, plumber website, locksmith website, local SEO for trades, home services website',
		},
		title: 'Websites for home service businesses',
		lead: 'Electricians, removal firms, cleaners, clearance companies, security firms and locksmiths. We build websites that show up when someone nearby searches for the job, and make it easy to call or ask for a quote.',
		builds: [
			{ title: 'A page for every service', text: 'Panel upgrades, house clearances, deep cleans: each job gets its own page, because that is exactly what people search for.', icon: 'website-development' },
			{ title: 'Pages for the areas you cover', text: 'Town and city pages written for real local searches, so you show up beyond your own postcode.', icon: 'seo-optimization' },
			{ title: 'Quote and call buttons', text: 'Click-to-call, WhatsApp and short quote forms on every page, built for someone standing in a hallway with their phone.', icon: 'mobile-app-development' },
			{ title: 'Proof that builds trust', text: 'Reviews, before-and-after photos, certifications and insurance details where customers look for them.', icon: 'website-design' },
			{ title: 'Easy to keep up to date', text: 'Add a new service, area or project photo yourself in WordPress, without calling a developer.', icon: 'wordpress-website' },
			{ title: 'Hosting and upkeep', text: 'Fast hosting, SSL, backups and updates handled, so the site keeps working while you are on the job.', icon: 'website-maintenance' },
		],
		needs: [
			{ title: 'Show up in local search', text: 'Most home service jobs start with a search like "electrician near me" or "removals Wiesbaden". Service pages, area pages, a complete Google Business Profile and LocalBusiness schema are what get you into those results.' },
			{ title: 'Answer the price question', text: 'Customers want to know roughly what a job costs before they call. Clear starting prices or what affects the price bring in better inquiries and fewer time-wasters.' },
			{ title: 'Make contact effortless', text: 'A phone number that works as a button, a WhatsApp link and a three-field quote form. Every extra step loses a customer who is comparing three firms at once.' },
			{ title: 'Prove you do good work', text: 'Photos of real jobs, reviews and credentials such as licenses and insurance matter more for home services than any design detail.' },
			{ title: 'Load fast on a phone', text: 'Most visitors are on mobile data. Compressed images and a light build keep the page quick enough that they do not go back to the search results.' },
		],
		faqs: [
			{ q: 'Do home service businesses really need more than a Facebook page?', a: 'A Facebook page helps, but it does not rank for searches like "emergency electrician Toronto" and you do not control it. A website with a page per service and area is what gets you found by people who do not know your name yet.' },
			{ q: 'Can you build pages for every town we cover?', a: 'Yes. We write area pages with real local content, such as the jobs you do there and the areas nearby, rather than copies with the town name swapped, which Google ignores.' },
			{ q: 'Can I update prices and photos myself?', a: 'Yes. We build most home service websites on WordPress and show you how to add services, areas, prices and project photos on your own.' },
			{ q: 'Do you set up Google Business Profile?', a: 'We make sure your website and Google Business Profile match (name, address, phone, services and hours) and link to each other, which helps you appear in the local map results.' },
		],
		services: ['website-development', 'wordpress-website', 'seo-optimization', 'website-maintenance'],
		projects: ['smbelectrical-ca', 'csfmcleaning-com', 'mut-umzug-de', 'die-chaoskiller-berlin-de', 'flessner-sicherheitsdienst-de'],
	},
	{
		slug: 'construction',
		name: 'Construction',
		short: 'Construction',
		audience: 'construction, renovation and engineering firms',
		meta: {
			title: 'Construction & Contractor Website Design | IdeoXpert',
			description: 'Websites for crane hire, renovation, painting and engineering firms: service and area pages, project galleries and quote forms that bring in jobs.',
			keywords: 'construction website design, contractor website, crane hire website, renovation company website, painter website, builder website, construction company SEO, engineering company website',
		},
		title: 'Websites for construction and engineering firms',
		lead: 'Crane hire, renovation, painting and decorating, and industrial equipment. We build websites that show your projects, explain what you do and where, and make it easy for site managers and homeowners to ask for a quote.',
		builds: [
			{ title: 'A page for every service', text: 'Crane hire by size, window fitting, interior painting: each service gets its own page, so it shows up for the exact search.', icon: 'website-development' },
			{ title: 'Pages for the areas you work in', text: 'Suburb and town pages for the places you cover, like ABC Crane Hire’s pages across Perth and the Peel region.', icon: 'seo-optimization' },
			{ title: 'Project galleries', text: 'Before-and-after photos and finished jobs, organized by type, because contractors are hired on past work.', icon: 'website-design' },
			{ title: 'Quote requests from the site', text: 'Short forms that ask for the job, the location and the dates, plus a phone number that works as a button.', icon: 'mobile-app-development' },
			{ title: 'Easy to keep up to date', text: 'Add new projects, services and photos yourself in WordPress, without calling a developer.', icon: 'wordpress-website' },
			{ title: 'Hosting and upkeep', text: 'Fast hosting, SSL, backups and updates handled, so the site keeps working while you are on site.', icon: 'website-maintenance' },
		],
		needs: [
			{ title: 'Show the work', text: 'Clients hire contractors on past work. Real project photos, before-and-after shots and the size of jobs you take on count for more than any slogan.' },
			{ title: 'Be found for the job and the place', text: 'Site managers search for the service plus the suburb, like "crane hire Rockingham". A page for each service and area is how you appear for those searches.' },
			{ title: 'Make quoting quick', text: 'A short quote form and a phone number that works as a button. Busy people on a job site call whoever answers first.' },
			{ title: 'Show you are licensed and insured', text: 'Licenses, insurance and industry memberships reassure larger clients before they send you a job.' },
			{ title: 'Explain technical products simply', text: 'For equipment and industrial products: what it does, how it saves time and cost, and a way to ask an engineer.' },
		],
		faqs: [
			{ q: 'Can you show our past projects?', a: 'Yes. We build project galleries you can add to yourself, with photos, the location and what the job involved, as we did for DJ Schilderwerken.' },
			{ q: 'Can you help us rank in the areas we cover?', a: 'Yes. We build service and area pages with real local content, schema markup and a matching Google Business Profile, as for ABC Crane Hire across Perth and the Peel region.' },
			{ q: 'Do you build websites in German or Dutch?', a: 'Yes. Handwerk am Rhein is in German and DJ Schilderwerken is in Dutch.' },
			{ q: 'Can you build a website for an industrial product?', a: 'Yes. The Zero-Trip Wedge site explains a directional drilling tool, how it works and how it cuts the time, cost and risk of sidetrack drilling.' },
		],
		services: ['website-development', 'wordpress-website', 'seo-optimization', 'website-maintenance'],
		projects: ['abccranehire-com-au', 'handwerk-am-rhein-de', 'djschilderwerken-nl', 'zero-trip-com'],
	},
	{
		slug: 'healthcare',
		name: 'Healthcare',
		short: 'Healthcare',
		audience: 'clinics, trainers and wellness brands',
		meta: {
			title: 'Healthcare & Wellness Website Design | IdeoXpert',
			description: 'Websites for clinics, healthcare training providers and wellness brands: clear services, easy booking and local SEO. See the healthcare sites we built.',
			keywords: 'healthcare website design, medical clinic website, dermatology website, healthcare training website, wellness website design, fitness coach website, clinic SEO, patient booking website',
		},
		title: 'Websites for healthcare and wellness',
		lead: 'Clinics, healthcare training providers, coaches and wellness brands. We build calm, clear websites that explain your services, answer patients’ questions and make booking simple.',
		builds: [
			{ title: 'Clear service pages', text: 'One page per treatment, program or class, written in plain language patients understand.', icon: 'website-design' },
			{ title: 'Online booking', text: 'Booking and inquiry forms that fit how you work, from class seats to consultations.', icon: 'website-development' },
			{ title: 'Locations and patient info', text: 'Every location, opening hours, what to bring and your policies, all easy to find.', icon: 'cms-development' },
			{ title: 'Local search', text: 'Service and location pages set up to rank for searches such as "dermatologist near me" or "BLS class Lilburn".', icon: 'seo-optimization' },
			{ title: 'Shops for guides and products', text: 'Sell courses, guides and wellness products online with a simple checkout.', icon: 'ecommerce-development' },
			{ title: 'Secure and maintained', text: 'SSL, backups, updates and monitoring, so the site stays safe and online.', icon: 'website-maintenance' },
		],
		needs: [
			{ title: 'Trust at first glance', text: 'Patients judge credibility in seconds: real photos of your team and premises, qualifications, accreditations and reviews do more than any slogan.' },
			{ title: 'Plain-language services', text: 'Explain each treatment or course, who it is for and what happens, without jargon. It helps patients and helps you rank for the words they actually search.' },
			{ title: 'Booking without phone tag', text: 'Online booking or a short inquiry form cuts the back-and-forth and fills appointments outside office hours.' },
			{ title: 'Practical information up front', text: 'Locations, hours, insurance or payment policies and what to expect on the day are what patients look for right before they commit.' },
			{ title: 'Accessible for everyone', text: 'Readable text, good contrast and forms that work with screen readers matter more in healthcare than anywhere else.' },
		],
		faqs: [
			{ q: 'Can patients book appointments on the website?', a: 'Yes. We add booking forms or connect the booking tool you already use, so patients can book or request a slot without calling.' },
			{ q: 'Do you handle patient data?', a: 'We keep contact forms to what you need, send them securely, and do not store medical records on the website. For clinical data you should keep using your practice management or EHR system.' },
			{ q: 'Can you help us rank locally?', a: 'Yes. We set up service and location pages, schema markup and a matching Google Business Profile so you show up for searches near each of your locations.' },
			{ q: 'Can we sell courses or products?', a: 'Yes. We build shops for guides, courses and wellness products on WooCommerce, as we did for IUVEDA Life.' },
		],
		services: ['website-design', 'website-development', 'seo-optimization', 'ecommerce-development'],
		projects: ['archdermatology-com', 'gahealthcaretraining-com', 'iuvedalife-com', 'vanguardstrengthfitness-com'],
	},
	{
		slug: 'real-estate',
		name: 'Real Estate',
		short: 'Real estate',
		audience: 'real estate agents, property platforms and advisors',
		meta: {
			title: 'Real Estate & Property Website Design | IdeoXpert',
			description: 'Property listing websites, rental platforms and multilingual sites for overseas buyers. See the real estate websites we built in Fiji and beyond.',
			keywords: 'real estate website design, property listing website, real estate web development, rental property website, property management website, real estate agent website, multilingual real estate website',
		},
		title: 'Websites for real estate and property',
		lead: 'Agencies, rental platforms and property advisors. We build listing websites that are easy to browse, easy for your team to update, and ready for buyers searching from overseas.',
		builds: [
			{ title: 'Property listings', text: 'Listings with photos, prices, features and maps, which your team can add and update from a dashboard.', icon: 'cms-development' },
			{ title: 'Search and filters', text: 'Browse by property type, location and price, so buyers find the right place without digging.', icon: 'website-development' },
			{ title: 'Rental platforms', text: 'Rental marketplaces with landlord sign-up, tenant tools and pricing plans.', icon: 'website-design' },
			{ title: 'More than one language', text: 'Content for overseas buyers in their own language, as on Fijian Real Estate’s English and Chinese site.', icon: 'website-design' },
			{ title: 'Listing SEO', text: 'Property and location pages set up to rank for searches like "land for sale Fiji".', icon: 'seo-optimization' },
			{ title: 'Hosting that copes with photos', text: 'Fast, image-heavy pages on hosting that stays quick as your listings grow.', icon: 'hosting-domain' },
		],
		needs: [
			{ title: 'Listings that are easy to browse', text: 'Buyers compare dozens of properties. Clear filters, consistent photos and key facts at a glance keep them on your site instead of a portal.' },
			{ title: 'A team that can update it', text: 'New listings, price changes and sold properties need to go live the same day, without waiting for a developer.' },
			{ title: 'Built for overseas buyers', text: 'International buyers need content in their language, prices they understand and a way to get in touch across time zones.' },
			{ title: 'Fast despite the photos', text: 'Property sites are photo-heavy. Compressed, lazy-loaded images keep pages quick on phones.' },
			{ title: 'Leads that reach the right agent', text: 'Inquiry forms that say which property someone asked about, sent straight to the right person.' },
		],
		faqs: [
			{ q: 'Can our team add and edit listings?', a: 'Yes. Listings are managed from a dashboard, with fields for price, location, type, features and photos, so there is no code involved.' },
			{ q: 'Can the site be in more than one language?', a: 'Yes. We have built multilingual property sites, with separate language versions so overseas buyers can browse in their own language.' },
			{ q: 'Can you build a rental platform with sign-ups?', a: 'Yes. myRent Fiji is a rental platform with sign-up for landlords and tenants, listings and pricing plans.' },
			{ q: 'Will the listings show up on Google?', a: 'Each property and location gets its own page with a descriptive title, description and structured data, which is what search engines need to index them.' },
		],
		services: ['website-development', 'cms-development', 'website-design', 'seo-optimization'],
		projects: ['fijianrealestate-com', 'myrentfiji-com', 'priveluxadvisory-com'],
	},
	{
		slug: 'ecommerce',
		name: 'E-commerce',
		short: 'E-commerce',
		audience: 'online shops and product brands',
		meta: {
			title: 'E-commerce Website Design for Online Shops | IdeoXpert',
			description: 'Online stores for product brands and small shops on WooCommerce and Shopify: product pages, a short checkout and SEO. See the stores we built.',
			keywords: 'ecommerce website design, online store design, WooCommerce store, Shopify store design, small business online shop, product brand website, ecommerce SEO',
		},
		title: 'Websites for online shops and product brands',
		lead: 'Beauty and gift brands, custom apparel and repair businesses that sell online. We build stores that show products well, keep checkout short and are easy to run day to day.',
		builds: [
			{ title: 'Product pages that sell', text: 'Photos, prices, sizes and options, with delivery and returns information where people decide.', icon: 'ecommerce-development' },
			{ title: 'A short checkout', text: 'Guest checkout and card payments, tested with orders before launch.', icon: 'website-development' },
			{ title: 'Your brand story', text: 'Pages for your story, your values and the people behind the products, so buyers choose you over a marketplace.', icon: 'website-design' },
			{ title: 'A shop next to your services', text: 'Sell products on the same site as your services, as Flechtarbeiten does next to its chair repairs.', icon: 'cms-development' },
			{ title: 'Found for product searches', text: 'Category and product pages written for what people search, with product structured data.', icon: 'seo-optimization' },
			{ title: 'Hosting and upkeep', text: 'Fast hosting, SSL, backups and updates, so the store stays up when orders come in.', icon: 'website-maintenance' },
		],
		needs: [
			{ title: 'Products people can picture', text: 'Good photos, sizes, options and delivery details on the page, so buyers do not have to ask.' },
			{ title: 'A checkout with no surprises', text: 'Shipping, taxes and payment options shown before the last step. Surprises at checkout make people leave.' },
			{ title: 'A brand worth buying from', text: 'Your story, your values and real reviews give people a reason to buy from you and not from a marketplace.' },
			{ title: 'Easy to run', text: 'Adding products, changing prices and handling orders should take minutes, not a developer.' },
			{ title: 'Found on Google', text: 'Category and product pages that match what people search, so the store brings in visitors without paying for every click.' },
		],
		faqs: [
			{ q: 'WooCommerce or Shopify?', a: 'Both work well. WooCommerce has no monthly platform fee and runs on WordPress. Shopify is the easiest to run yourself. We built T-Shirt Studio on WooCommerce and BOTL on Shopify.' },
			{ q: 'Can you sell services and products on one site?', a: 'Yes. Flechtarbeiten offers chair repairs and runs a shop on the same site.' },
			{ q: 'Can I add products myself?', a: 'Yes. At handover we show you how to add products, change prices and handle orders.' },
			{ q: 'How much does an online store cost?', a: `Online stores start at ${money(from.store, 'USD')} for up to ${from.storeProducts} products, with card payments set up. The cost calculator on our pricing page gives you an estimate for your own store.` },
		],
		services: ['ecommerce-development', 'website-design', 'seo-optimization', 'website-maintenance'],
		projects: ['flechtarbeiten-de', 'maisonluma-com', '4tsstudio-org', 'botl-com-au'],
	},
	{
		slug: 'hospitality',
		name: 'Hospitality',
		short: 'Hospitality',
		audience: 'restaurants, holiday rentals and hospitality businesses',
		meta: {
			title: 'Restaurant & Hospitality Website Design | IdeoXpert',
			description: 'Websites for restaurants and holiday rentals: menus as real pages, direct bookings, great photos and local SEO. See our projects in the UK and Spain.',
			keywords: 'restaurant website design, restaurant web development, holiday rental website, direct booking website, hotel website design, cafe website, hospitality website design, restaurant SEO',
		},
		title: 'Websites for restaurants and hospitality',
		lead: 'Restaurants, cafés and holiday rentals. We build websites where the food or the view does the selling, the menu is easy to read, and booking takes a few taps.',
		builds: [
			{ title: 'Menus people can read', text: 'Menus as real web pages, not PDFs, so they load fast on phones and show up in search.', icon: 'website-design' },
			{ title: 'Table and direct bookings', text: 'Booking buttons and forms that take reservations without a third-party commission.', icon: 'website-development' },
			{ title: 'Photos that sell', text: 'Galleries of dishes, rooms and views, optimized so they stay sharp and load quickly.', icon: 'website-design' },
			{ title: 'Found by locals and visitors', text: 'Local SEO and a matching Google Business Profile, so you appear for "Turkish restaurant Birmingham".', icon: 'seo-optimization' },
			{ title: 'For international guests', text: 'Translation for guests from abroad, as on Casa Suerte.', icon: 'cms-development' },
			{ title: 'Always online', text: 'Hosting, updates and backups handled, because a broken booking page costs covers.', icon: 'website-maintenance' },
		],
		needs: [
			{ title: 'Great photos, fast', text: 'Diners and guests decide with their eyes. Large, high-quality photos matter, and so does compressing them so the page still loads on a phone.' },
			{ title: 'The menu as a web page', text: 'PDF menus are slow on mobile and invisible to Google. A menu built as a page is easier to read and helps you rank for dish and cuisine searches.' },
			{ title: 'Book direct', text: 'Every booking through your own site avoids a platform commission. A clear booking button on every page pays for the website quickly.' },
			{ title: 'Location and hours everywhere', text: 'Address, map, opening hours and phone number should be one tap away, and match your Google listing exactly.' },
			{ title: 'Reviews in plain sight', text: 'Recent reviews reassure first-time visitors more than anything you write about yourself.' },
		],
		faqs: [
			{ q: 'Can customers book a table on the website?', a: 'Yes. We add a booking form or connect the reservation tool you use, with a booking button on every page.' },
			{ q: 'Can I update the menu myself?', a: 'Yes. The menu is managed from the dashboard, so you can change dishes and prices whenever you like.' },
			{ q: 'Can a holiday rental take direct bookings?', a: 'Yes. We build rental sites with availability, prices and a booking request flow, so guests can book direct instead of through a platform.' },
			{ q: 'Can the site be translated for international guests?', a: 'Yes. We add translation so guests from abroad can read the site in their own language.' },
		],
		services: ['website-design', 'website-development', 'seo-optimization', 'website-maintenance'],
		projects: ['istanbulrestaurantbirmingham-com', 'casa-suerte-nl'],
	},
	{
		slug: 'professional-services',
		name: 'Professional Services',
		short: 'Professional Services',
		audience: 'consultants, agencies and professional firms',
		meta: {
			title: 'Websites for Consultants & Agencies | IdeoXpert',
			description: 'Websites for consulting firms, advisory groups, agencies, recruiters and experts that explain what you do and turn visitors into inquiries.',
			keywords: 'consulting firm website, professional services website design, agency website design, advisory firm website, recruitment agency website, personal brand website, B2B website design',
		},
		title: 'Websites for consultants, agencies and professional firms',
		lead: 'Consulting firms, advisory groups, marketing agencies, recruiters and experts. We build websites that explain what you do in seconds, prove you are good at it and turn visitors into conversations.',
		builds: [
			{ title: 'Clear service offers', text: 'What you do, who it is for and what it costs, laid out so a busy decision-maker gets it in seconds.', icon: 'website-design' },
			{ title: 'Credibility pages', text: 'Case studies, founder and team pages, books, talks and press, where visitors look for proof.', icon: 'cms-development' },
			{ title: 'Lead capture', text: 'Audit offers, quote forms and call booking that turn reading into a conversation.', icon: 'website-development' },
			{ title: 'Group and brand sites', text: 'One site for a family of companies, routing each visitor to the right one.', icon: 'website-design' },
			{ title: 'Content that ranks', text: 'Blogs and insight pages set up so your expertise shows up on Google.', icon: 'seo-optimization' },
			{ title: 'Recruitment sites', text: 'Vacancies up front and applications in a few clicks, as for Thomwerk.', icon: 'wordpress-website' },
		],
		needs: [
			{ title: 'Say what you do in one line', text: 'Visitors leave if they cannot tell what you offer. A clear headline and plain service names beat clever copy every time.' },
			{ title: 'Proof, not promises', text: 'Case studies, client names, credentials and published work are what professional buyers check before they get in touch.' },
			{ title: 'A clear next step', text: 'A free audit, a short call or a quote form, one obvious action on every page instead of five competing ones.' },
			{ title: 'Your expertise in search', text: 'Articles that answer your clients’ real questions bring in the right visitors and do your selling for you.' },
			{ title: 'Built to grow with you', text: 'New services, brands or team members should be easy to add without rebuilding the site.' },
		],
		faqs: [
			{ q: 'Can you build one site for a group of companies?', a: 'Yes. We have built group websites that introduce each company and send visitors to the right one, like Brightway Group.' },
			{ q: 'Do you build websites for agencies?', a: 'Yes. We have built websites for agencies such as TVDM and Jazba Host. If you are an agency looking for a development partner, get in touch.' },
			{ q: 'Can visitors book a call from the site?', a: 'Yes. We add call booking or short inquiry forms, and connect them to the calendar or inbox you already use.' },
			{ q: 'Will you write the content?', a: 'We can. We help shape the service descriptions and page structure, and can write or edit the copy for SEO.' },
		],
		services: ['website-design', 'website-development', 'wordpress-website', 'seo-optimization'],
		projects: ['psgwa-com-au', 'tvdm-au', 'jazbahost-com', 'brightwayconsultsolutions-com', 'brightwaygroup-org', 'priveluxadvisory-com', 'ransfordaddo-com', 'thomwerk-nl'],
	},
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);

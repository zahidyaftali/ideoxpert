// Country pages (/locations/<slug>). Each page targets the country's largest
// markets for web development by city, and is built around what is true for
// that country: our local clients, the time-zone overlap with Islamabad
// (PKT, UTC+5, no daylight saving) and local legal or language needs.
// `projects` are ids from projects.ts; leave empty where we have none yet.
export type Location = {
	slug: string;
	code: 'us' | 'gb' | 'ca' | 'au' | 'de' | 'nl' | 'ae';
	country: string;
	/** Used in running text: "across the UK", "our work in Canada". */
	short: string;
	/** "UK businesses", "US businesses"... */
	people: string;
	cities: string[];
	meta: { title: string; description: string; keywords: string };
	title: string;
	lead: string;
	timezone: string;
	points: { title: string; text: string }[];
	faqs: { q: string; a: string }[];
	projects: string[];
};

export const locations: Location[] = [
	{
		slug: 'united-kingdom',
		short: 'the UK',
		code: 'gb',
		country: 'United Kingdom',
		people: 'UK businesses',
		cities: ['London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Bristol'],
		meta: {
			title: 'Web Design London, Birmingham & UK | IdeoXpert',
			description: 'Websites, WordPress, e-commerce and SEO for businesses in London, Birmingham, Manchester and across the UK. See the UK websites we built.',
			keywords: 'web design UK, web development company UK, website design London, web design Birmingham, web design Manchester, WordPress developer UK, SEO agency UK, affordable web design UK, outsource web development UK',
		},
		title: 'Web design and development for UK businesses',
		lead: 'We design, build and look after websites for businesses in London, Birmingham, Manchester and across the UK, from local service firms to online stores, with the same team from first call to launch.',
		timezone: 'The UK is 4 hours behind Islamabad in summer and 5 in winter, so our afternoon is your working morning: calls, updates and fixes happen in your business day.',
		points: [
			{ title: 'Built for UK search', text: 'Pages written for UK searches and Google.co.uk, local area pages for the towns you serve, and a Google Business Profile that matches your site.' },
			{ title: 'UK GDPR and cookies', text: 'Privacy policy, cookie consent and contact forms set up with UK GDPR and PECR in mind, so you are not collecting data you should not.' },
			{ title: 'Your domain and hosting', text: 'We register or move your .co.uk or .com domain and set up fast hosting with SSL, or work with the host you already use.' },
			{ title: 'Proven with UK clients', text: 'We have built websites for UK businesses including a Birmingham restaurant, a cleaning company and a web hosting firm.' },
		],
		faqs: [
			{ q: 'Do you work with businesses anywhere in the UK?', a: 'Yes. We work with businesses across England, Scotland, Wales and Northern Ireland. Everything happens over video calls, email and WhatsApp, so location is never an obstacle.' },
			{ q: 'When can we talk?', a: 'The UK is 4 to 5 hours behind Islamabad, so there is a good overlap with your working day. Calls usually fit into your morning or early afternoon.' },
			{ q: 'Can you help my business rank in my city?', a: 'Yes. We set up local SEO for the towns and cities you serve, with dedicated pages, local business schema and a matching Google Business Profile.' },
			{ q: 'Do you handle GDPR and cookie consent?', a: 'We add a privacy policy page, a cookie consent banner and forms that only collect what you need. For legal advice specific to your business, check with your solicitor.' },
		],
		projects: ['jazbahost-com', 'istanbulrestaurantbirmingham-com', 'csfmcleaning-com'],
	},
	{
		slug: 'united-states',
		short: 'the US',
		code: 'us',
		country: 'United States',
		people: 'US businesses',
		cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Atlanta', 'Washington, DC'],
		meta: {
			title: 'Web Design New York, Atlanta & USA | IdeoXpert',
			description: 'Websites, WordPress, e-commerce and SEO for businesses in New York, Atlanta, Chicago and across the US. See the US websites we built.',
			keywords: 'web design USA, web development company USA, website design New York, web design Atlanta, WordPress developer USA, outsource web development USA, small business website design USA, SEO services USA',
		},
		title: 'Web design and development for US businesses',
		lead: 'We design and build websites for businesses across the United States, from clinics and training providers to campaigns and service firms, with calls scheduled around your time zone.',
		timezone: 'The US East Coast is 9 hours behind Islamabad in summer (10 in winter). We schedule calls in your morning, our evening, and work while you sleep, so updates are waiting when your day starts.',
		points: [
			{ title: 'Built for US search', text: 'Service and city pages for the markets you serve, Google Business Profile alignment and structured data that helps you show up locally.' },
			{ title: 'Accessibility in mind', text: 'Readable contrast, keyboard-friendly navigation and labeled forms, following WCAG guidelines, which matters for many US businesses.' },
			{ title: 'Work while you sleep', text: 'The time difference works in your favor: send feedback at the end of your day and wake up to the changes.' },
			{ title: 'Proven with US clients', text: 'We have built websites for a St. Louis dermatology practice, a Georgia healthcare training provider and a Maryland congressional campaign.' },
		],
		faqs: [
			{ q: 'Do you work with businesses in every US state?', a: 'Yes. We work with clients across the US over video calls, email and WhatsApp, and have delivered projects in Missouri, Georgia and Maryland.' },
			{ q: 'How do we handle the time difference?', a: 'We schedule calls in your morning, which is our evening, and do most of the work during your night, so each day starts with progress to review.' },
			{ q: 'Can you make our website accessible?', a: 'We build with accessibility in mind: sufficient contrast, clear headings, alt text, keyboard navigation and labeled forms, following WCAG guidance.' },
			{ q: 'Can you help us rank in our city?', a: 'Yes. We set up local SEO for your city and service areas, including location pages, schema markup and a matching Google Business Profile.' },
		],
		projects: ['archdermatology-com', 'gahealthcaretraining-com', 'quincyforcongress-com'],
	},
	{
		slug: 'canada',
		short: 'Canada',
		code: 'ca',
		country: 'Canada',
		people: 'Canadian businesses',
		cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
		meta: {
			title: 'Web Design in Toronto & Across Canada | IdeoXpert',
			description: 'Websites and local SEO for businesses in Toronto, Vancouver, Montreal and across Canada, including the Toronto electrician website we built.',
			keywords: 'web design Canada, web development company Canada, website design Toronto, web design Vancouver, web design Montreal, WordPress developer Canada, local SEO Toronto, contractor website Canada',
		},
		title: 'Web design and development for Canadian businesses',
		lead: 'We build websites for businesses in Toronto, Vancouver, Montreal and across Canada, set up to rank locally and turn visitors into calls and quote requests.',
		timezone: 'Toronto is 9 hours behind Islamabad in summer (10 in winter) and Vancouver 12 (13). We book calls in your morning and deliver work overnight, so there is progress to review each day.',
		points: [
			{ title: 'Local SEO for your city', text: 'Service pages and pages for the neighborhoods and cities you cover, from the GTA to the Lower Mainland, with a matching Google Business Profile.' },
			{ title: 'Sites in more than one language', text: 'We have built a site in English and Chinese for Fijian Real Estate, and German and Dutch sites for clients in Europe. An English and French site works the same way.' },
			{ title: 'Built for trades and services', text: 'Click-to-call, quote forms and service pages for contractors and home services, as we did for a licensed Toronto electrician.' },
			{ title: 'Overnight progress', text: 'Send feedback at the end of your day and find the changes ready in the morning.' },
		],
		faqs: [
			{ q: 'Do you work with businesses across Canada?', a: 'Yes. We work with clients across Canada remotely, and have built a website for a licensed electrical contractor in Toronto.' },
			{ q: 'Can you build a bilingual English and French website?', a: 'Yes. We have built bilingual sites before, such as Fijian Real Estate in English and Chinese. Each language gets its own version of every page, so each audience reads the site in its own language.' },
			{ q: 'Can you help us rank in Toronto or Vancouver?', a: 'Yes. We build local SEO into the site: service pages, area pages, schema markup and a Google Business Profile that matches your website.' },
			{ q: 'How does the time difference work?', a: 'We schedule calls in your morning, our evening, and do most of the work during your night.' },
		],
		projects: ['smbelectrical-ca'],
	},
	{
		slug: 'australia',
		short: 'Australia',
		code: 'au',
		country: 'Australia',
		people: 'Australian businesses',
		cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
		meta: {
			title: 'Web Design Sydney, Perth & Australia | IdeoXpert',
			description: 'Websites and SEO for businesses in Sydney, Melbourne, Brisbane and Perth, including the Perth crane hire and marketing agency sites we built.',
			keywords: 'web design Australia, web development company Australia, website design Sydney, web design Melbourne, web design Perth, WordPress developer Australia, SEO Perth, outsource web development Australia',
		},
		title: 'Web design and development for Australian businesses',
		lead: 'We design and build websites for businesses in Sydney, Melbourne, Brisbane, Perth and across Australia, with SEO set up from launch so the right people find you.',
		timezone: 'Perth is 3 hours ahead of Islamabad and Sydney 5 (6 in summer), so our working days overlap well: your afternoon is our morning.',
		points: [
			{ title: 'Built for Australian search', text: 'Pages for the suburbs and regions you serve, Google Business Profile alignment and local schema, as for our Perth clients.' },
			{ title: 'Strong daily overlap', text: 'With only a few hours between us, questions get answered the same working day.' },
			{ title: 'Your domain and hosting', text: 'We register or move your .com.au domain and set up fast hosting with SSL.' },
			{ title: 'Proven in Perth', text: 'We built the ABC Crane Hire website and blog for Perth and the Peel region, and the website for Perth marketing agency TVDM.' },
		],
		faqs: [
			{ q: 'Do you work with businesses across Australia?', a: 'Yes. We work with clients in every state remotely, and have delivered projects for Perth businesses.' },
			{ q: 'What hours can we talk?', a: 'Perth is 3 hours ahead of Islamabad and the east coast 5 to 6, so your afternoon overlaps with our morning. Most questions are answered the same day.' },
			{ q: 'Can you help us rank in our suburbs?', a: 'Yes. We build suburb and region pages with real local content, plus schema markup and a matching Google Business Profile.' },
			{ q: 'Can you register our .com.au domain?', a: 'We can help you register or transfer a .com.au domain. Australian domain rules require an Australian business connection, which you provide as the registrant.' },
		],
		projects: ['abccranehire-com-au', 'tvdm-au'],
	},
	{
		slug: 'germany',
		short: 'Germany',
		code: 'de',
		country: 'Germany',
		people: 'German businesses',
		cities: ['Berlin', 'Frankfurt', 'Munich', 'Hamburg', 'Cologne', 'Wiesbaden'],
		meta: {
			title: 'Web Design Berlin, Frankfurt & Germany | IdeoXpert',
			description: 'German-language websites and local SEO for businesses in Berlin, Frankfurt, Munich and Hamburg. See the German websites we built.',
			keywords: 'Webdesign Agentur, Website erstellen lassen, web design Germany, web development company Germany, website design Berlin, web design Frankfurt, WordPress Agentur, local SEO Germany, German website developer',
		},
		title: 'Web design and development for German businesses',
		lead: 'We build German-language websites for businesses in Berlin, Frankfurt, Munich and across Germany, from removal firms and security services to craftsmen, with local SEO set up for every city you serve.',
		timezone: 'Germany is 3 hours behind Islamabad in summer (4 in winter), so we overlap with your whole working morning and early afternoon.',
		points: [
			{ title: 'German-language websites', text: 'We have built German websites for businesses in Berlin, Wiesbaden, Pfungstadt and along the Rhine, with content written for German searches.' },
			{ title: 'Impressum and DSGVO', text: 'We set up the pages and features German sites need: Impressum, Datenschutzerklärung, cookie consent and forms that follow DSGVO principles.' },
			{ title: 'Local SEO for every city', text: 'Service and city pages for each area you cover, as on MUT Umzug’s site for moves across Germany.' },
			{ title: 'Close working hours', text: 'A 3 to 4 hour difference means calls in your morning and fixes the same day.' },
		],
		faqs: [
			{ q: 'Do you build websites in German?', a: 'Yes. Several of our client websites are in German, including sites for removals, security, renovation, clearance and furniture restoration businesses.' },
			{ q: 'Do you set up the Impressum and privacy policy?', a: 'We create the Impressum and Datenschutzerklärung pages and add cookie consent. The legal text itself should come from you or your lawyer, as it depends on your business.' },
			{ q: 'Can you help us rank in several cities?', a: 'Yes. We build city and service pages with local content and structured data, so you can be found in each area you serve.' },
			{ q: 'When can we talk?', a: 'Germany is 3 to 4 hours behind Islamabad, so there is a large overlap with your working day.' },
		],
		projects: ['mut-umzug-de', 'flessner-sicherheitsdienst-de', 'die-chaoskiller-berlin-de', 'handwerk-am-rhein-de', 'flechtarbeiten-de'],
	},
	{
		slug: 'netherlands',
		short: 'the Netherlands',
		code: 'nl',
		country: 'Netherlands',
		people: 'Dutch businesses',
		cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
		meta: {
			title: 'Web Design Amsterdam & Netherlands | IdeoXpert',
			description: 'Dutch-language websites and SEO for businesses in Amsterdam, Rotterdam, Utrecht and Eindhoven. See the Dutch websites we built.',
			keywords: 'webdesign bureau, website laten maken, web design Netherlands, web development company Netherlands, website design Amsterdam, web design Rotterdam, web design Eindhoven, WordPress bureau, SEO Netherlands',
		},
		title: 'Web design and development for Dutch businesses',
		lead: 'We build Dutch-language websites for businesses in Amsterdam, Rotterdam, Eindhoven and across the Netherlands, from recruitment agencies to painters and holiday rentals.',
		timezone: 'The Netherlands is 3 hours behind Islamabad in summer (4 in winter), so we overlap with most of your working day.',
		points: [
			{ title: 'Dutch-language websites', text: 'We have built Dutch websites for a recruitment agency in Eindhoven, a painting company and a holiday rental.' },
			{ title: 'Vacancies, services and bookings', text: 'Job listings with easy applications, service pages with before-and-after projects, and booking pages for rentals.' },
			{ title: 'AVG and cookies', text: 'Privacy policy, cookie consent and forms set up with the AVG (GDPR) in mind.' },
			{ title: 'Found in Dutch search', text: 'Pages and structured data set up for Dutch searches and the cities you serve.' },
		],
		faqs: [
			{ q: 'Do you build websites in Dutch?', a: 'Yes. We have built Dutch-language websites for a recruitment agency, a painting company and a holiday rental.' },
			{ q: 'Can you build a vacancy website for a recruitment agency?', a: 'Yes. Thomwerk’s website puts open vacancies on the homepage and lets candidates apply or send a CV in a few clicks.' },
			{ q: 'Do you handle cookie consent and privacy?', a: 'We add a privacy policy page, cookie consent and minimal forms. The legal text should come from you or your adviser.' },
			{ q: 'When can we talk?', a: 'The Netherlands is 3 to 4 hours behind Islamabad, so calls fit easily into your working day.' },
		],
		projects: ['thomwerk-nl', 'djschilderwerken-nl', 'casa-suerte-nl'],
	},
	{
		slug: 'uae',
		short: 'the UAE',
		code: 'ae',
		country: 'United Arab Emirates',
		people: 'UAE businesses',
		cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
		meta: {
			title: 'Web Design Dubai, Abu Dhabi & UAE | IdeoXpert',
			description: 'Websites, online stores and SEO for businesses in Dubai, Abu Dhabi and Sharjah, built remotely by our team in Islamabad, one hour ahead of you.',
			keywords: 'web design Dubai, web development company Dubai, website design Abu Dhabi, web design Sharjah, ecommerce website Dubai, web developer Dubai, SEO Dubai',
		},
		title: 'Web design and development for UAE businesses',
		lead: 'We design and build websites and online stores for businesses in Dubai, Abu Dhabi, Sharjah and across the UAE. We work remotely, the same way we do for our clients in the UK, Germany and Australia.',
		timezone: 'The UAE is just 1 hour behind Islamabad, so we share almost the whole working day: calls, updates and fixes happen in real time.',
		points: [
			{ title: 'Remote, like all our clients', text: 'Our clients are in the UK, the US, Canada, Australia, Germany, the Netherlands and Fiji. We work with all of them over calls, WhatsApp and email.' },
			{ title: 'Nearly the same hours', text: 'With only 1 hour between us, working together feels like working with a local team.' },
			{ title: 'Stores and bookings', text: 'Online stores, booking pages and lead forms for retail, hospitality, real estate and services.' },
			{ title: 'Found in local search', text: 'Pages and Google Business Profile set up for the emirates and areas you serve.' },
		],
		faqs: [
			{ q: 'Have you worked with UAE businesses before?', a: 'Not yet. Our clients so far are in the UK, the US, Canada, Australia, Germany, the Netherlands and Fiji. Every project in our portfolio links to a live site, so you can see the work for yourself.' },
			{ q: 'How do we work together?', a: 'Over video calls, WhatsApp and email. The UAE is only 1 hour behind Islamabad, so we are available through your working day.' },
			{ q: 'Can you build an online store for the UAE?', a: 'Yes. We build stores on WooCommerce and Shopify and connect payment providers that work in the UAE.' },
			{ q: 'Can you help us rank in Dubai?', a: 'Yes. We set up local SEO with area pages, structured data and a Google Business Profile that matches your website.' },
		],
		projects: [],
	},
];

export const locationByCode = (code: string) => locations.find((l) => l.code === code);

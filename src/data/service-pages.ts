// Content for the service pages, rendered by src/pages/[service].astro.
// Page order and the short summaries used in menus live in `services` in ./site.ts.
// Every page has its own text: no paragraph is shared between two services.

export type Step = { title: string; text: string };

export type ServicePage = {
	slug: string;
	meta: { title: string; description: string; keywords: string; image: string; schemaDescription: string };
	/** Hero headline. The part in `em` is set in bold, echoing the "ideo" + "xpert" weights in the logo. */
	title: { lead: string; em: string };
	intro: string;
	/** "Typical timeline: ..." under the hero. Hidden while empty. */
	timeline?: string;
	images: { src: string; alt: string }[];
	overview: { title: string; paragraphs: string[] };
	features: Step[];
	approach: { title: string; intro?: string; steps: Step[] };
	/** Closing offer for this service, next to the process steps. */
	cta: { text: string; button: string };
};

export const servicePages: ServicePage[] = [
	{
		slug: "website-development",
		meta: {
			title: "Website Development Agency in Islamabad | IdeoXpert",
			description: "Website development for startups and small businesses: custom-coded or WordPress sites that load fast, rank on Google and bring you inquiries.",
			keywords: "website development Islamabad, web development company Pakistan, custom website development Pakistan, responsive website development, web application development Islamabad, fast website development, business website Pakistan, web development agency Islamabad, professional web developers Pakistan, IdeoXpert web development",
			image: "/assets/images/web development.png",
			schemaDescription: "Custom-coded and WordPress website development for startups and small businesses: planning, design, build, testing, launch and 30 days of fixes.",
		},
		title: { lead: "Websites that load fast and", em: "bring you customers" },
		intro: "We plan, design and build your website, launch it, and fix whatever comes up in the first 30 days. You deal with the people doing the work from the first call to launch day.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/elements/web-dev2.jpg", alt: "" },
			{ src: "/assets/images/web dev-1.jpg", alt: "Custom website development by IdeoXpert" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"You run a startup or a small business, and your website is not pulling its weight. It is slow on phones, hard to update, or it simply does not bring in inquiries. You want a site that explains what you do in a few seconds and makes it easy to get in touch.",
				"That is what we build, custom-coded or on WordPress, depending on how often you will change it. MUT Umzug, a removals company in Wiesbaden, got a custom-coded site with a page for every service and every city it covers. Jazba Host, a UK hosting company, got a site that explains two offers without confusing anyone.",
			],
		},
		features: [
			{ title: "A page for every service you sell", text: "People search for the exact job. Each service gets its own page with the details, the questions customers ask, and a way to contact you." },
			{ title: "Built for phones first", text: "We design and check every page at phone size before we look at the desktop version." },
			{ title: "Ready for Google on launch day", text: "Page titles, descriptions, headings, a sitemap and structured data are in place before the site goes live." },
			{ title: "Yours to keep", text: "At launch you get the domain, the hosting logins, admin access and all the files. You are never locked in with us." },
		],
		approach: {
			title: "How we build your website",
			steps: [
				{ title: "A call about your business", text: "We ask who your customers are, what they search for and what a good month looks like for you. Then we send a plan with the pages, features and price." },
				{ title: "Design you approve", text: "We design the key pages first. You comment, we adjust (two rounds of changes are included), and nothing gets built until you say yes." },
				{ title: "The build", text: "We build the site and share it with you before launch, so you can click through it on your own phone." },
				{ title: "Testing", text: "We check every page on phones, tablets and desktops, send every form, and fix what we find." },
				{ title: "Launch and 30 days of fixes", text: "We put the site live, check it again, and fix anything that comes up in the first 30 days for free." },
			],
		},
		cta: { text: "Not sure what your site needs? Tell us what your business does and we will send you a plan and a price.", button: "Get my free plan" },
	},
	{
		slug: "website-design",
		meta: {
			title: "Website Design Agency in Islamabad | IdeoXpert",
			description: "Website design for startups and small businesses: clear pages, your own brand, and an obvious next step on every page. Get a free review of your site.",
			keywords: "website design Islamabad, web design company Pakistan, custom website design Pakistan, responsive web design, professional website designers Islamabad, UI design Pakistan, SEO friendly website design, business website design, IdeoXpert website design",
			image: "/assets/images/website design 1.jpg",
			schemaDescription: "Website design for startups and small businesses: page structure, visual design in your brand, and designs approved before the build.",
		},
		title: { lead: "Website design that makes", em: "people get in touch" },
		intro: "Design decides how fast a visitor understands what you do, whether they trust you, and whether they find the button to contact you. We design for those three things first.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/website design.png", alt: "Website design services by IdeoXpert" },
			{ src: "/assets/images/website design 1.jpg", alt: "Custom website design for growing brands" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if your site looks dated, looks like every other template, or makes people hunt for your phone number. Visitors decide in a few seconds whether to stay. If the design does not help them, they go back to Google and call someone else.",
				"We design around the one thing you want visitors to do. For Casa Suerte, a holiday apartment on Spain’s Costa Blanca, that was booking direct. For Istanbul Restaurant in Birmingham, it was the menu, the photos and a table booking.",
			],
		},
		features: [
			{ title: "Your brand, not a theme demo", text: "We start from your logo, colors and photos, so the site looks like your business." },
			{ title: "One clear action per page", text: "Every page leads somewhere: call, WhatsApp, book, or ask for a quote." },
			{ title: "Designs before code", text: "You see the key pages designed and get two rounds of changes. We build only what you approved." },
			{ title: "Checked on phones", text: "Layouts are checked on small and large phones and on tablets, where many of your visitors will see the site first." },
		],
		approach: {
			title: "How the design comes together",
			steps: [
				{ title: "What visitors should do", text: "We start with the action that matters most to you, and the questions a customer asks before taking it." },
				{ title: "Structure first", text: "We sketch the order of each page: what goes at the top, what answers doubts, and where the button sits." },
				{ title: "The look", text: "We design the pages in your colors and fonts, with your photos. You get two rounds of changes." },
				{ title: "From design to build", text: "Once you approve the design, we build it as you saw it and show you the working pages before launch." },
			],
		},
		cta: { text: "Does your site look dated? Send us the link and we will tell you, free, what we would change first.", button: "Get a free design review" },
	},
	{
		slug: "wordpress-website",
		meta: {
			title: "WordPress Website Development in Islamabad | IdeoXpert",
			description: "WordPress websites you can update yourself: fast pages, SEO set up, only the plugins you need, and a walkthrough at handover.",
			keywords: "WordPress development Islamabad, WordPress website Pakistan, custom WordPress website, WordPress developer Pakistan, WooCommerce development Pakistan, WordPress design services, SEO friendly WordPress website, managed WordPress Pakistan, IdeoXpert WordPress",
			image: "/assets/images/wordpress 1.png",
			schemaDescription: "WordPress website design and development: custom themes, content setup, SEO plugins, backups and training for your team.",
		},
		title: { lead: "WordPress websites", em: "you can update yourself" },
		intro: "WordPress lets you change text, photos, pages and blog posts from a simple dashboard. We set it up so that stays easy, and so the site stays fast.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/wordpress 1.png", alt: "WordPress website development by IdeoXpert" },
			{ src: "/assets/images/Wordpress website 1.jpg", alt: "Custom WordPress website built for a business" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"Choose WordPress if your content changes often: new jobs, new projects, new blog posts, new prices. Most of the websites in our portfolio run on it, because most of our clients want to make those changes without waiting for a developer.",
				"Thomwerk, a recruitment agency in Eindhoven, has its vacancies on the homepage, and its recruiters update them every day. ABC Crane Hire in Perth has published more than 140 blog posts on its WordPress site.",
			],
		},
		features: [
			{ title: "You edit it yourself", text: "At handover we show you how to change pages, photos and posts on your own site." },
			{ title: "Only the plugins you need", text: "Every plugin is one more thing to update and one more way in for hackers. We keep the list short." },
			{ title: "Quick on mobile data", text: "Compressed images, caching and a light theme, so pages open quickly on a phone." },
			{ title: "SEO plugin set up", text: "Rank Math or Yoast installed and configured, with a title, a description and a sitemap entry for every page." },
		],
		approach: {
			title: "How a WordPress project runs",
			steps: [
				{ title: "Plan the pages", text: "We list every page and what goes on it, and agree the plan and the price before any work starts." },
				{ title: "Design", text: "You see the key pages designed and ask for changes. We build once you approve." },
				{ title: "Build on WordPress", text: "We build the theme, add your content, and set up forms, SEO and backups." },
				{ title: "Your walkthrough", text: "We show you how to edit your own pages, then hand over every login." },
				{ title: "Launch", text: "We go live, test everything again, and fix any problem in the first 30 days for free." },
			],
		},
		cta: { text: "Stuck with a WordPress site you are scared to touch? Send us the link and we will tell you what is wrong with it, free.", button: "Get a free WordPress check" },
	},
	{
		slug: "seo-optimization",
		meta: {
			title: "SEO Services in Islamabad, Pakistan | IdeoXpert",
			description: "SEO for small businesses: keyword research, technical fixes, service and area pages, local SEO and a monthly report. Get a free review of your site.",
			keywords: "SEO services Islamabad, SEO optimization Pakistan, search engine optimization Pakistan, on-page SEO Pakistan, off-page SEO, technical SEO, local SEO Islamabad, Google ranking Pakistan, website traffic improvement, IdeoXpert SEO services",
			image: "/assets/images/seo optimizations.jpg",
			schemaDescription: "SEO for small businesses and startups: keyword research, technical SEO, on-page improvements, local SEO and monthly reporting.",
		},
		title: { lead: "Get found on Google by", em: "people looking for you" },
		intro: "We find out what your customers type into Google, fix what stops your pages from showing up, and report every month on what changed.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/seo .png", alt: "SEO optimization services by IdeoXpert" },
			{ src: "/assets/images/seo optimizations.jpg", alt: "SEO strategy and keyword research for higher search rankings" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if people who need what you sell cannot find you on Google, or your competitors keep showing up first. The causes are usually simple: service pages are missing, titles are generic, pages are slow, or Google cannot read them properly.",
				"We build SEO into the sites we make. ABC Crane Hire in Perth has a page for each area it covers and a blog with more than 140 posts. SMB Electrical in Toronto has a page for every electrical job, from panel upgrades to floor heating.",
			],
		},
		features: [
			{ title: "Keyword research you can read", text: "A plain list of what your customers search for, how often, and which page should rank for it." },
			{ title: "Technical fixes", text: "Indexing problems, slow pages, broken links, missing titles and duplicate pages, found and fixed." },
			{ title: "Pages that answer the search", text: "We improve the pages you have and write the ones you are missing, such as service and area pages." },
			{ title: "A report every month", text: "Rankings, clicks and inquiries from Google, what we did that month, and what comes next." },
		],
		approach: {
			title: "How SEO works with us",
			steps: [
				{ title: "Audit", text: "We check how Google sees your site today: what is indexed, what ranks, and what is broken." },
				{ title: "Plan", text: "We pick the searches worth winning first, usually the local and specific ones you can win soonest." },
				{ title: "Fix and write", text: "We fix the technical problems, then improve or add the pages the plan needs." },
				{ title: "Local setup", text: "If you serve an area, we set up or clean up your Google Business Profile and add local structured data." },
				{ title: "Report every month", text: "You see what changed and what we do next. SEO takes months, and we will not pretend otherwise." },
			],
		},
		cta: { text: "Want to know why you are not on page one? Send us your website and we will tell you for free.", button: "Get my free SEO review" },
	},
	{
		slug: "mobile-app-development",
		meta: {
			title: "Mobile App Development in Islamabad | IdeoXpert",
			description: "Android and iOS apps for startups and small businesses: screens you approve first, one codebase for both stores, and app store submission.",
			keywords: "mobile app development Islamabad, Android app development Pakistan, iOS app development Islamabad, mobile app developers Pakistan, app development company Islamabad, custom mobile app development, mobile application development Pakistan, cross-platform app development, React Native app development Pakistan, web development agency Islamabad mobile apps",
			image: "/assets/images/web dev-1.jpg",
			schemaDescription: "Mobile app development for Android and iOS: screen design, cross-platform development, testing on devices and app store submission.",
		},
		title: { lead: "Mobile apps for", em: "Android and iOS" },
		intro: "We design and build apps for startups and small businesses, from the first screen sketch to the app store listing.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/elements/web-dev2.jpg", alt: "Mobile app development services by IdeoXpert" },
			{ src: "/assets/images/web dev-1.jpg", alt: "Mobile app development team at IdeoXpert" },
		],
		// [[FILL: an app you have built (name, what it does, store link) to name in the overview]]
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if you have an app idea and need a team to build it, or your customers keep asking for an app to book, order or track something. Start small: the first version should do one job well.",
				"We design every screen before we write any code, so you can click through the app and change it while changes are still cheap. Then we build it for Android and iOS and handle the store submission.",
			],
		},
		features: [
			{ title: "Screens you approve first", text: "Clickable designs of every screen before development starts." },
			{ title: "Android and iOS", text: "One codebase for both platforms where it makes sense, so you launch on both stores from one build." },
			{ title: "Store submission handled", text: "We prepare the listings and submit the app to Google Play and the App Store." },
			{ title: "A first version, then the next", text: "We build version one around one job, and plan the next features with you after launch." },
		],
		approach: {
			title: "How an app gets built",
			steps: [
				{ title: "Define version one", text: "We agree what the app must do on day one, and what can wait." },
				{ title: "Design the screens", text: "You click through the designs on your phone and ask for changes." },
				{ title: "Build feature by feature", text: "We build one feature at a time and show you each one as it works." },
				{ title: "Test on real phones", text: "We test on different phones and screen sizes before submission." },
				{ title: "Launch", text: "We submit the app to both stores and stay on hand for fixes." },
			],
		},
		cta: { text: "Have an app idea? Tell us what it should do and we will tell you what version one needs and what it costs.", button: "Plan my app" },
	},
	{
		slug: "cms-development",
		meta: {
			title: "CMS Development Services in Islamabad | IdeoXpert",
			description: "CMS development so your team can update pages, jobs, listings and posts without a developer. Usually WordPress, custom when it has to be.",
			keywords: "CMS development Islamabad, content management system Pakistan, custom CMS development Pakistan, WordPress CMS, Drupal development Pakistan, website management system, scalable CMS solutions, CMS website development, IdeoXpert CMS development",
			image: "/assets/images/cms develop.jpg",
			schemaDescription: "CMS development: content types, editor roles, content migration and training, usually on WordPress.",
		},
		title: { lead: "Change your own website", em: "without calling a developer" },
		intro: "A content management system (CMS) lets your team edit pages, listings, jobs or posts from a dashboard. We set one up around the content you actually change.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/cms development.png", alt: "CMS development services by IdeoXpert" },
			{ src: "/assets/images/cms develop.jpg", alt: "Custom content management system development for business websites" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if every small change to your site means an email to a developer and a wait. Or if you have a lot of similar content, like jobs, properties, courses or products, that needs adding and updating all the time.",
				"Thomwerk’s recruiters add and edit vacancies themselves every day. Fijian Real Estate manages its property listings in English and Chinese. Both run on WordPress.",
			],
		},
		features: [
			{ title: "Built around your content", text: "Jobs, properties, courses or products get their own fields and page layout, so each new one looks right without design work." },
			{ title: "The right access for each person", text: "Editors change content, admins change settings, and nobody breaks the layout by accident." },
			{ title: "Training on your own site", text: "We show your team the tasks they will do every week, on your real site." },
			{ title: "WordPress, or custom when needed", text: "Usually WordPress. A custom setup when your content does not fit it." },
		],
		approach: {
			title: "How we set up your CMS",
			steps: [
				{ title: "List what changes", text: "We find out which content your team updates, how often, and who does it." },
				{ title: "Design the content types", text: "Each type of content gets the fields it needs and one page layout that fits them." },
				{ title: "Build and move your content", text: "We build the CMS and move your existing pages and posts across." },
				{ title: "Train your team", text: "We walk your team through the everyday tasks and hand over the logins." },
			],
		},
		cta: { text: "Tired of waiting for a developer to change one sentence? Tell us what you update most and we will show you how to do it yourself.", button: "Talk to us about a CMS" },
	},
	{
		slug: "hosting-domain",
		meta: {
			title: "Web Hosting & Domain Services in Pakistan | IdeoXpert",
			description: "Web hosting and domain setup: a domain in your name, hosting that fits your site, SSL and backups, and moves between hosts without downtime.",
			keywords: "web hosting Pakistan, domain registration Islamabad, website hosting company Pakistan, hosting and domain Pakistan, secure web hosting, SSL certificate Pakistan, business hosting Islamabad, affordable hosting Pakistan, IdeoXpert hosting domain",
			image: "/assets/images/hosing and domain.jpg",
			schemaDescription: "Web hosting and domain services: domain registration, hosting setup, SSL, backups and site moves between hosts.",
		},
		title: { lead: "Hosting and domains,", em: "set up and looked after" },
		intro: "We register or move your domain, set up hosting and SSL, and keep the renewals on time, so your site stays up and you do not have to think about it.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/hosting .png", alt: "Web hosting and domain services by IdeoXpert" },
			{ src: "/assets/images/hosing and domain.jpg", alt: "Secure website hosting and domain management" },
		],
		// [[FILL: the host you use for client sites, and a client whose hosting you look after, to name in the overview]]
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if your site is slow, goes down, or sits on a hosting plan nobody at your company understands. Or if you are starting out and do not know where to buy a domain or which hosting to pick.",
				"We pick hosting that fits your site and its traffic, set it up, and keep the domain, SSL certificate and hosting renewed on time. You own all of it and get every login.",
			],
		},
		features: [
			{ title: "A domain in your name", text: "Registered to you, with auto-renew on, so it never lapses by accident." },
			{ title: "Hosting that fits", text: "Matched to your site and traffic, so you do not pay for more than you need." },
			{ title: "SSL and backups", text: "The padlock in the browser, and backups you can restore from." },
			{ title: "Moves without downtime", text: "If you are switching hosts, we move the site and the DNS records carefully, so visitors see no gap." },
		],
		approach: {
			title: "How we set up your hosting",
			steps: [
				{ title: "Check what you have", text: "We look at your current domain, hosting and site, or start fresh if you have none." },
				{ title: "Choose the plan", text: "We recommend a host and a plan, and tell you the monthly cost before you commit." },
				{ title: "Set up and move", text: "We set up the hosting, SSL and domain, and move your site across if needed." },
				{ title: "Hand over", text: "You get every login and a short note of what is where." },
			],
		},
		cta: { text: "Is your site slower or down more often than it should be? Send us the address and we will check your hosting for free.", button: "Check my hosting" },
	},
	{
		slug: "website-maintenance",
		meta: {
			title: "Website Maintenance Services in Islamabad | IdeoXpert",
			description: "Website maintenance: safe updates, backups, form checks and small changes every month, plus 30 days of free fixes after every site we launch.",
			keywords: "website maintenance Islamabad, website maintenance services Pakistan, web maintenance support, website security updates Pakistan, WordPress maintenance Pakistan, website speed optimization, website support services, technical website support, IdeoXpert maintenance",
			image: "/assets/images/maintenance 1.jpg",
			schemaDescription: "Website maintenance: software updates, backups, security and form checks, and small content changes each month.",
		},
		title: { lead: "Website care so", em: "nothing breaks quietly" },
		intro: "Updates, backups, security checks and small changes, done every month, so your site keeps working and keeps bringing in inquiries.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/maintenance .png", alt: "Website maintenance services by IdeoXpert" },
			{ src: "/assets/images/maintenance 1.jpg", alt: "Website updates, backups and security monitoring" },
		],
		// [[FILL: a client whose site you maintain, to name in the overview]]
		overview: {
			title: "Who this is for",
			paragraphs: [
				"Websites break slowly when nobody looks after them. Plugins go out of date, forms stop sending, pages get slower, and one day the site is hacked or down. This is for you if nobody on your side has time to check.",
				"Every site we build gets 30 days of free fixes after launch. After that, you can hand the upkeep to us with an optional monthly care plan.",
			],
		},
		features: [
			{ title: "Updates done safely", text: "WordPress, theme and plugin updates, with a backup taken first." },
			{ title: "Backups you can restore", text: "Backups on a schedule, and we restore one if something goes wrong." },
			{ title: "Forms and pages checked", text: "We test your contact forms and key pages, so you are not losing inquiries without knowing it." },
			{ title: "Small changes included", text: "Text, photos, prices and opening hours updated when you ask." },
		],
		approach: {
			title: "How monthly care works",
			steps: [
				{ title: "Check the site", text: "We look at updates, speed, security and forms, and fix anything urgent first." },
				{ title: "Backups and monitoring", text: "Backups run on a schedule, and we get an alert if your site goes down." },
				{ title: "Monthly updates", text: "Every month we update, test and check the site." },
				{ title: "Changes on request", text: "Send us what you need changed, by email or WhatsApp." },
			],
		},
		cta: { text: "Not sure when your site was last updated? Send us the link and we will check it for free.", button: "Check my website" },
	},
	{
		slug: "ecommerce-development",
		meta: {
			title: "WooCommerce & Shopify Store Development | IdeoXpert",
			description: "WooCommerce and Shopify stores for small businesses: product pages, payments, shipping and tax set up, and training so you can run the store yourself.",
			keywords: "ecommerce website development, WooCommerce development, Shopify store development, online store design, ecommerce web design agency, WooCommerce developer Pakistan, Shopify developer, ecommerce SEO, online shop development, IdeoXpert ecommerce",
			image: "/assets/images/work/maisonluma-com/hero.webp",
			schemaDescription: "E-commerce development on WooCommerce and Shopify: store design, product setup, payment gateways, shipping, tax and training.",
		},
		title: { lead: "Online stores that are", em: "easy to run" },
		intro: "We build stores on WooCommerce or Shopify, set up payments, shipping and tax, and show you how to add products and handle orders yourself.",
		// [[FILL: typical timeline for this service, e.g. "3 to 5 weeks"]]
		timeline: '',
		images: [
			{ src: "/assets/images/work/maisonluma-com/hero.webp", alt: "Maison LŪMA online store built by IdeoXpert" },
			{ src: "/assets/images/work/flechtarbeiten-de/hero.webp", alt: "Flechtarbeiten website with online shop built by IdeoXpert" },
		],
		overview: {
			title: "Who this is for",
			paragraphs: [
				"This is for you if you sell products and want a store of your own instead of relying on marketplaces. Maybe you are starting out. Maybe your current store is slow, hard to manage, or losing people at checkout.",
				"Maison LŪMA sells its beauty products from its own boutique. Flechtarbeiten runs a shop next to its chair repair service. T-Shirt Studio takes custom apparel orders through WooCommerce.",
			],
		},
		features: [
			{ title: "Product pages that answer questions", text: "Photos, prices, sizes and stock, plus shipping and returns information where people decide to buy." },
			{ title: "A short checkout", text: "Guest checkout and card payments through Stripe or PayPal, tested with orders before launch." },
			{ title: "Shipping and tax set up", text: "Shipping zones, tax rules and discount codes configured for the places you sell to." },
			{ title: "You run it day to day", text: "We show you how to add products, change prices and handle orders." },
		],
		approach: {
			title: "How we build your store",
			steps: [
				{ title: "Pick the platform", text: "WooCommerce or Shopify, based on your products, your budget and who will run the store. We explain the choice." },
				{ title: "Design the store", text: "Homepage, category, product, cart and checkout pages, designed for phones. You approve before we build." },
				{ title: "Build and add products", text: "We build the store, import your products, and connect payments and shipping." },
				{ title: "Test orders", text: "We place test orders on phones and desktops and check every email your customer gets." },
				{ title: "Launch and training", text: "We go live and show you how to manage products and orders." },
			],
		},
		cta: { text: "Thinking of opening an online store? Tell us what you sell and we will recommend a platform and send a quote.", button: "Plan my store" },
	},
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);

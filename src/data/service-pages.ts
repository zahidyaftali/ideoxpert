// Content for the nine service pages, rendered by src/pages/[service].astro.
// Page order and the short summaries used in menus live in `services` in ./site.ts.

export type Step = { title: string; text: string };

export type ServicePage = {
	slug: string;
	meta: { title: string; description: string; keywords: string; image: string; schemaDescription: string };
	/** Hero headline. The part in `em` is set in bold, echoing the "ideo" + "xpert" weights in the logo. */
	title: { lead: string; em: string };
	intro: string;
	images: { src: string; alt: string }[];
	overview: { title: string; paragraphs: string[] };
	features: Step[];
	approach: { title: string; intro?: string; steps: Step[] };
	cta: string;
};

export const servicePages: ServicePage[] = [
	{
		slug: "website-development",
		meta: {
			title: "Website Development Agency in Islamabad | IdeoXpert",
			description: "Website development in Islamabad, Pakistan: fast, responsive, SEO-friendly websites and web applications for businesses of all sizes, worldwide.",
			keywords: "website development Islamabad, web development company Pakistan, custom website development Pakistan, responsive website development, web application development Islamabad, fast website development, business website Pakistan, web development agency Islamabad, professional web developers Pakistan, IdeoXpert web development",
			image: "/assets/images/web development.png",
			schemaDescription: "Professional website development services including custom websites, web applications, responsive design, and SEO-friendly builds for businesses in Islamabad and across Pakistan.",
		},
		title: { lead: "Building websites", em: "that turn your ideas into impactful online experiences" },
		intro: "We build websites and web applications that load fast, hold up under pressure, and give your visitors a smooth experience from start to finish. Our team handles everything from planning and design to development and launch.",
		images: [
			{ src: "/assets/images/elements/web-dev2.jpg", alt: "" },
			{ src: "/assets/images/web dev-1.jpg", alt: "Custom website development by IdeoXpert" },
		],
		overview: {
			title: "Website development",
			paragraphs: [
				"We craft exceptional websites that captivate your audience and drive results. From sleek and modern designs to robust and user-friendly interfaces, we provide comprehensive web development solutions tailored to your unique business needs. Our expertise spans a wide range of services, including custom website design and development, e-commerce platforms, mobile-responsive websites, and ongoing maintenance and support.",
				"We prioritize a collaborative approach, working closely with you to understand your vision and translate it into a digital reality that exceeds your expectations.",
			],
		},
		features: [
			{ title: "Responsive Design", text: "Your website adapts seamlessly to any screen size, providing an optimal experience across all devices." },
			{ title: "User-Friendly Interface", text: "We prioritize intuitive navigation and clear calls to action to guide visitors towards desired outcomes." },
			{ title: "Search Engine Optimization (SEO)", text: "We optimize your website for search engines to improve your online visibility and attract more organic traffic." },
			{ title: "High-Performance Technology", text: "We utilize cutting-edge technologies to ensure your website loads quickly, providing a seamless and enjoyable user experience." },
		],
		approach: {
			title: "Our approach to website development",
			steps: [
				{ title: "Discovery & Planning", text: "We delve deep into your business goals, target audience, and brand identity to create a website that aligns perfectly with your objectives." },
				{ title: "Design & Wireframing", text: "Our talented designers create visually stunning and user-friendly website designs that capture your brand's essence and resonate with your target audience." },
				{ title: "Development & Implementation", text: "Our skilled developers bring the design to life, using the latest technologies and best practices to create a high-performance, secure, and scalable website." },
				{ title: "Quality Assurance & Testing", text: "We conduct thorough testing to identify and fix any bugs or issues, ensuring the website functions flawlessly and meets the highest quality standards." },
				{ title: "Launch & Ongoing Support", text: "We seamlessly launch your website, ensuring a smooth transition and minimal disruption to your online presence." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "website-design",
		meta: {
			title: "Website Design Agency in Islamabad | IdeoXpert",
			description: "Website design in Islamabad, Pakistan: modern, responsive designs that build your brand and guide visitors to get in touch. Free consultation.",
			keywords: "website design Islamabad, web design company Pakistan, custom website design Pakistan, responsive web design, professional website designers Islamabad, UI design Pakistan, SEO friendly website design, business website design, IdeoXpert website design",
			image: "/assets/images/website design 1.jpg",
			schemaDescription: "Professional website design services creating modern, responsive, and user-friendly designs for businesses and brands in Islamabad and across Pakistan.",
		},
		title: { lead: "We craft websites", em: "that build brands people love" },
		intro: "We design websites that are clear, purposeful, and easy to navigate. Every layout we create is built around your visitors' needs — helping them understand what you do and why they should choose you.",
		images: [
			{ src: "/assets/images/website design.png", alt: "Website design services by IdeoXpert" },
			{ src: "/assets/images/website design 1.jpg", alt: "Custom website design for growing brands" },
		],
		overview: {
			title: "Website design",
			paragraphs: [
				"In today's digital world, your website is your online storefront. It's where you make your first impression, showcase your brand, and connect with potential customers. At IdeoXpert, we believe that a well-designed website is more than just pretty visuals; it's a strategic tool that drives results. We specialize in crafting custom websites that are not only visually stunning but also user-friendly, engaging, and optimized for conversions. Whether you need a simple brochure website or a complex e-commerce platform, we have the expertise to bring your vision to life",
			],
		},
		features: [
			{ title: "Responsive Design", text: "Your website adapts seamlessly to any screen size, providing an optimal experience across all devices." },
			{ title: "User-Friendly Interface", text: "We prioritize intuitive navigation and clear calls to action to guide visitors towards desired outcomes." },
			{ title: "Search Engine Optimization (SEO)", text: "We optimize your website for search engines to improve your online visibility and attract more organic traffic." },
			{ title: "High-Performance Technology", text: "We utilize cutting-edge technologies to ensure your website loads quickly, providing a seamless and enjoyable user experience." },
		],
		approach: {
			title: "Our approach to website design",
			steps: [
				{ title: "Discovery & Planning", text: "We delve deep into your business goals, target audience, and brand identity to create a website that aligns perfectly with your objectives." },
				{ title: "Design & Wireframing", text: "Our talented designers create visually stunning and user-friendly website designs that capture your brand's essence and resonate with your target audience." },
				{ title: "Development & Implementation", text: "Our skilled designers bring the design to life, using the latest technologies and best practices to create a high-performance, secure, and scalable website." },
				{ title: "Quality Assurance & Testing", text: "We conduct thorough testing to identify and fix any bugs or issues, ensuring the website functions flawlessly and meets the highest quality standards." },
				{ title: "Launch & Ongoing Support", text: "We seamlessly launch your website, ensuring a smooth transition and minimal disruption to your online presence." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "wordpress-website",
		meta: {
			title: "WordPress Website Development in Islamabad | IdeoXpert",
			description: "Custom WordPress websites from Islamabad, Pakistan: fast, SEO-friendly and easy for your team to manage, built around how your business works.",
			keywords: "WordPress development Islamabad, WordPress website Pakistan, custom WordPress website, WordPress developer Pakistan, WooCommerce development Pakistan, WordPress design services, SEO friendly WordPress website, managed WordPress Pakistan, IdeoXpert WordPress",
			image: "/assets/images/wordpress 1.png",
			schemaDescription: "Custom WordPress website development services including theme customisation, WooCommerce setup, SEO configuration, and easy-to-manage CMS for businesses in Islamabad and Pakistan.",
		},
		title: { lead: "We build powerful", em: "WordPress websites that grow your business" },
		intro: "We build WordPress websites that you can actually manage yourself without needing a developer every time something changes. Clean code, proper SEO setup, fast loading, and a design that fits your brand.",
		images: [
			{ src: "/assets/images/wordpress 1.png", alt: "WordPress website development by IdeoXpert" },
			{ src: "/assets/images/Wordpress website 1.jpg", alt: "Custom WordPress website built for a business" },
		],
		overview: {
			title: "WordPress website",
			paragraphs: [
				"In today's dynamic digital landscape, your online presence is crucial. WordPress provides a robust and flexible platform for creating engaging websites that connect with your audience and achieve your business goals. At IdeoXpert, we specialize in developing high-performing WordPress websites that are tailored to your unique needs and objectives. Whether you need a simple blog, an e-commerce store, or a complex membership site, our team has the expertise to bring your vision to life.",
			],
		},
		features: [
			{ title: "Responsive Design", text: "Your website adapts seamlessly to any screen size, providing an optimal experience across all devices." },
			{ title: "User-Friendly Interface", text: "We prioritize intuitive navigation and clear calls to action to guide visitors towards desired outcomes." },
			{ title: "Search Engine Optimization (SEO)", text: "We optimize your website for search engines to improve your online visibility and attract more organic traffic." },
			{ title: "Enhanced Security", text: "We implement robust security measures to protect your WordPress website from threats like hacking and malware, ensuring the safety and integrity of your online presence." },
		],
		approach: {
			title: "Our approach to WordPress websites",
			steps: [
				{ title: "Consultation & Planning", text: "We begin with a thorough consultation to understand your business goals, target audience, and desired website functionality." },
				{ title: "Theme Selection & Customization", text: "We select a suitable WordPress theme and customize it to perfectly match your brand identity and visual preferences." },
				{ title: "Plugin Integration & Development", text: "We integrate essential plugins for functionality like contact forms, e-commerce, and social media integration. We also develop custom plugins to meet your specific requirements." },
				{ title: "Content Optimization & SEO", text: "We optimize your website content for search engines, ensuring it's easily discoverable by your target audience." },
				{ title: "Launch & Ongoing Support", text: "We launch your WordPress website and provide ongoing support, including updates, maintenance, and troubleshooting." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "seo-optimization",
		meta: {
			title: "SEO Services in Islamabad, Pakistan | IdeoXpert",
			description: "SEO services in Islamabad, Pakistan: keyword research, on-page, technical and local SEO that improve your Google rankings and bring enquiries.",
			keywords: "SEO services Islamabad, SEO optimization Pakistan, search engine optimization Pakistan, on-page SEO Pakistan, off-page SEO, technical SEO, local SEO Islamabad, Google ranking Pakistan, website traffic improvement, IdeoXpert SEO services",
			image: "/assets/images/seo optimizations.jpg",
			schemaDescription: "Professional SEO optimization services including keyword research, on-page SEO, technical SEO, link building, and local SEO for businesses in Islamabad and Pakistan.",
		},
		title: { lead: "Boost your online", em: "visibility with expert SEO" },
		intro: "We build SEO strategies that are grounded in real keyword research and your specific market. No shortcuts, no guesswork — just a clear plan that gets your website in front of the people actively searching for what you offer.",
		images: [
			{ src: "/assets/images/seo .png", alt: "SEO optimization services by IdeoXpert" },
			{ src: "/assets/images/seo optimizations.jpg", alt: "SEO strategy and keyword research for higher search rankings" },
		],
		overview: {
			title: "SEO optimization",
			paragraphs: [
				"In today's competitive online landscape, having a strong online presence is crucial for business success. Search Engine Optimization (SEO) is the cornerstone of any successful digital marketing strategy. At IdeoXpert, we provide comprehensive SEO services that help you improve your website's visibility in search engine results pages (SERPs), attract more organic traffic, and achieve your business goals. our team has the expertise to bring your vision to life.",
			],
		},
		features: [
			{ title: "Comprehensive Site Audit", text: "We conduct a thorough analysis of your website, identifying areas for improvement in terms of on-page and off-page SEO." },
			{ title: "Keyword Research & Strategy", text: "We identify relevant keywords and develop a targeted keyword strategy to attract your ideal customers." },
			{ title: "On-Page & Off-Page Optimization", text: "We optimize your website's content, technical aspects, and backlink profile to improve your search engine rankings." },
			{ title: "Ongoing Monitoring & Reporting", text: "We continuously monitor your website's performance, track your progress, and provide regular reports to keep you informed." },
		],
		approach: {
			title: "Our approach to SEO optimization",
			steps: [
				{ title: "In-Depth Analysis", text: "We begin with a thorough analysis of your website, your competitors, and your target audience to understand your current online presence and identify key opportunities." },
				{ title: "Keyword Research & Strategy", text: "We conduct in-depth keyword research to identify high-volume, low-competition keywords that resonate with your target audience." },
				{ title: "On-Page Optimization", text: "We optimize your website's on-page elements, including title tags, meta descriptions, header tags, and 1 image alt text, to improve search engine visibility." },
				{ title: "Off-Page Optimization", text: "We build high-quality backlinks from reputable websites to improve your website's authority and credibility in the eyes of search engines." },
				{ title: "Content Marketing Strategy", text: "We develop a content marketing strategy that leverages high-quality, relevant content to attract and engage your target audience." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "mobile-app-development",
		meta: {
			title: "Mobile App Development in Islamabad | IdeoXpert",
			description: "Mobile app development in Islamabad, Pakistan: Android and iOS apps for startups and businesses that are fast, secure and easy to use.",
			keywords: "mobile app development Islamabad, Android app development Pakistan, iOS app development Islamabad, mobile app developers Pakistan, app development company Islamabad, custom mobile app development, mobile application development Pakistan, cross-platform app development, React Native app development Pakistan, web development agency Islamabad mobile apps",
			image: "/assets/images/web dev-1.jpg",
			schemaDescription: "Professional mobile app development services including Android and iOS apps, cross-platform development, app screen design, and app store submission for businesses in Islamabad and across Pakistan.",
		},
		title: { lead: "Building mobile apps", em: "that put your business in every pocket" },
		intro: "We build Android and iOS apps that people actually want to use. From the first screen to the final feature, every decision we make is about making the app fast, reliable, and easy to navigate. We work with startups launching their first product and with established businesses bringing their services to mobile.",
		images: [
			{ src: "/assets/images/elements/web-dev2.jpg", alt: "Mobile app development services by IdeoXpert" },
			{ src: "/assets/images/web dev-1.jpg", alt: "Mobile app development team at IdeoXpert" },
		],
		overview: {
			title: "Mobile app development",
			paragraphs: [
				"We build mobile apps for Android and iOS that are clean, fast, and built to last. Whether you need a standalone app or a mobile companion to your existing web platform, we handle everything from concept and design through to development, testing, and app store submission.",
				"We work closely with you from the start to understand your users and your goals, so the app we deliver is one your customers will actually enjoy using — not just download once and forget.",
			],
		},
		features: [
			{ title: "Native & Cross-Platform", text: "We build for Android and iOS using the right technology for your project — native or cross-platform depending on your budget and requirements." },
			{ title: "Intuitive User Interface", text: "Every screen is designed with the user in mind. Clear navigation, clean layouts, and interactions that feel natural on a mobile device." },
			{ title: "Secure & Scalable", text: "We build with security and performance in mind from day one, so your app handles growth without breaking or exposing user data." },
			{ title: "App Store Ready", text: "We handle the full submission process for Google Play and the Apple App Store, including review compliance and store listing optimization." },
		],
		approach: {
			title: "Our approach to mobile app development",
			intro: "We follow a structured process that keeps you informed at every stage, from the first planning session to the day your app goes live on the store.",
			steps: [
				{ title: "Discovery & Planning", text: "We start by understanding your app idea, your target users, and what problem you are solving. This stage includes feature mapping, platform decisions, and a project roadmap so everyone knows what to expect." },
				{ title: "App Screen Design", text: "We design every screen before writing a single line of code. You get wireframes and high-fidelity mockups to review and approve, so there are no surprises when development begins." },
				{ title: "Development", text: "Our developers build the app feature by feature, keeping the codebase clean and the architecture scalable. We share progress throughout the build so you can test and give feedback along the way." },
				{ title: "Quality Assurance & Testing", text: "We test the app across multiple devices and screen sizes before it goes anywhere near the app store. Performance, security, and usability are all checked thoroughly so you launch with confidence." },
				{ title: "Launch & Ongoing Support", text: "We handle submission to Google Play and the Apple App Store and stay available after launch to fix any issues, release updates, and add new features as your business grows." },
			],
		},
		cta: "Ready to build your mobile app? Let's talk.",
	},
	{
		slug: "cms-development",
		meta: {
			title: "CMS Development Services in Islamabad | IdeoXpert",
			description: "CMS development in Islamabad, Pakistan: WordPress and custom content management systems your team can update without a developer.",
			keywords: "CMS development Islamabad, content management system Pakistan, custom CMS development Pakistan, WordPress CMS, Drupal development Pakistan, website management system, scalable CMS solutions, CMS website development, IdeoXpert CMS development",
			image: "/assets/images/cms develop.jpg",
			schemaDescription: "Professional CMS development services including custom CMS builds, WordPress, Drupal, and Joomla development for businesses in Islamabad and across Pakistan.",
		},
		title: { lead: "Building powerful websites", em: "with content management systems" },
		intro: "We build content management systems that put your team in control. No more waiting on a developer to update a page or add a new product. We set it up so anyone on your team can manage your website content with ease.",
		images: [
			{ src: "/assets/images/cms development.png", alt: "CMS development services by IdeoXpert" },
			{ src: "/assets/images/cms develop.jpg", alt: "Custom content management system development for business websites" },
		],
		overview: {
			title: "CMS Development",
			paragraphs: [
				"In today's fast-paced digital world, having a website that is easy to update and maintain is crucial. A Content Management System (CMS) provides you with the tools and flexibility to easily manage your website content, add new pages, and make changes on the fly. At IdeoXpert, we specialize in developing custom CMS solutions and integrating with popular platforms like WordPress, Drupal, and Shopify to empower you to take control of your online presence. our team has the expertise to bring your vision to life.",
			],
		},
		features: [
			{ title: "CMS Selection & Strategy", text: "We carefully evaluate your specific needs and recommend the most suitable CMS platform for your business." },
			{ title: "Custom Development & Integration", text: "We develop custom features and integrations to enhance the functionality of your chosen CMS and meet your unique requirements." },
			{ title: "User Interface & Experience", text: "We prioritize a user-friendly interface that makes it easy for you to navigate and manage your website content." },
			{ title: "Training & Support", text: "We provide comprehensive training to help you effectively use your CMS and ongoing support to ensure the smooth functioning of your website." },
		],
		approach: {
			title: "Our approach to CMS development",
			steps: [
				{ title: "Needs Assessment & Planning", text: "We begin with a thorough assessment of your business needs and objectives to determine the most suitable CMS solution." },
				{ title: "CMS Selection & Customization", text: "We select the most appropriate CMS platform and customize it to meet your specific requirements and branding." },
				{ title: "Development & Integration", text: "We develop custom features, integrate third-party applications, and ensure seamless functionality across all devices." },
				{ title: "User Training & Ongoing Support", text: "We provide comprehensive training on how to use your CMS and offer ongoing support to ensure the smooth operation of your website." },
				{ title: "Continuous Improvement", text: "Emphasizing the iterative process of refinement and optimization." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "hosting-domain",
		meta: {
			title: "Web Hosting & Domain Services in Pakistan | IdeoXpert",
			description: "Web hosting and domain services from Islamabad, Pakistan: fast, secure hosting with SSL, domain setup and ongoing server management.",
			keywords: "web hosting Pakistan, domain registration Islamabad, website hosting company Pakistan, hosting and domain Pakistan, secure web hosting, SSL certificate Pakistan, business hosting Islamabad, affordable hosting Pakistan, IdeoXpert hosting domain",
			image: "/assets/images/hosing and domain.jpg",
			schemaDescription: "Reliable web hosting and domain registration services with SSL certificates, fast servers, and ongoing management for businesses in Islamabad and across Pakistan.",
		},
		title: { lead: "Solid foundations", em: "for your online presence" },
		intro: "Your domain name is your address online, and your hosting is what keeps you open for business. We set both up properly from the start — reliable servers, SSL included, good load speeds, and a team to handle it when anything goes wrong.",
		images: [
			{ src: "/assets/images/hosting .png", alt: "Web hosting and domain services by IdeoXpert" },
			{ src: "/assets/images/hosing and domain.jpg", alt: "Secure website hosting and domain management" },
		],
		overview: {
			title: "Hosting & Domain",
			paragraphs: [
				"Choosing the right hosting and domain name is crucial for the success of your website. Our comprehensive hosting and domain services provide you with the foundation you need for a robust and reliable online presence. We offer a variety of hosting options, including shared hosting, VPS hosting, and dedicated servers, to suit your specific needs and budget.",
			],
		},
		features: [
			{ title: "Domain Name Registration", text: "We help you choose and register a memorable and relevant domain name that reflects your brand identity." },
			{ title: "Hosting Plan Selection", text: "We recommend the most suitable hosting plan based on your website's traffic, resource requirements, and budget." },
			{ title: "Server Setup & Configuration", text: "We set up your hosting environment and configure it for optimal performance and security." },
			{ title: "Ongoing Support & Maintenance", text: "We provide ongoing support and maintenance to ensure your website remains online and accessible 24/7." },
		],
		approach: {
			title: "Our approach to Hosting & Domain",
			steps: [
				{ title: "Needs Assessment & Consultation", text: "We begin with a thorough consultation to understand your specific hosting and domain requirements." },
				{ title: "Domain Name Selection & Registration", text: "We assist you in choosing and registering a memorable and relevant domain name that aligns with your brand." },
				{ title: "Hosting Plan Recommendation", text: "We recommend the most suitable hosting plan based on your website's traffic, resource needs, and budget." },
				{ title: "Server Setup & Optimization", text: "We set up your hosting environment, optimize server configurations, and ensure optimal performance and security." },
				{ title: "24/7 Support & Maintenance", text: "We provide 24/7 technical support and ongoing maintenance to ensure your website remains online and accessible at all times." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "website-maintenance",
		meta: {
			title: "Website Maintenance Services in Islamabad | IdeoXpert",
			description: "Website maintenance from Islamabad, Pakistan: updates, backups, security and monitoring that keep your website fast, secure and online.",
			keywords: "website maintenance Islamabad, website maintenance services Pakistan, web maintenance support, website security updates Pakistan, WordPress maintenance Pakistan, website speed optimization, website support services, technical website support, IdeoXpert maintenance",
			image: "/assets/images/maintenance 1.jpg",
			schemaDescription: "Professional website maintenance services including security updates, software patches, performance monitoring, content updates, and technical support for businesses in Pakistan.",
		},
		title: { lead: "Keep your website", em: "running smoothly and securely" },
		intro: "A website that is not maintained regularly becomes a liability. We handle security updates, software patches, performance monitoring, and technical fixes — so your site stays fast, secure, and working the way it should.",
		images: [
			{ src: "/assets/images/maintenance .png", alt: "Website maintenance services by IdeoXpert" },
			{ src: "/assets/images/maintenance 1.jpg", alt: "Website updates, backups and security monitoring" },
		],
		overview: {
			title: "Website maintenance",
			paragraphs: [
				"In today's dynamic digital landscape, your website requires ongoing care and attention to ensure optimal performance and security. Neglecting website maintenance can lead to technical issues, security vulnerabilities, and a decline in search engine rankings. At IdeoXpert, we offer comprehensive website maintenance services to keep your website running smoothly and securely. our team has the expertise to bring your vision to life.",
			],
		},
		features: [
			{ title: "Regular Backups & Security", text: "We perform regular backups of your website data and implement robust security measures to protect your site from threats like hacking and malware." },
			{ title: "Software Updates & Upgrades", text: "We keep your website software, including WordPress, plugins, and themes, updated with the latest security patches and performance enhancements." },
			{ title: "Performance Monitoring", text: "We monitor your website's performance, identify and resolve any technical issues, and optimize for speed and efficiency." },
			{ title: "Content Updates & Support", text: "We can assist with content updates, including adding new pages, blog posts, and product information. We also provide ongoing support to address any questions or concerns you may have." },
		],
		approach: {
			title: "Our approach to Website Maintenance",
			steps: [
				{ title: "Comprehensive Website Audit", text: "We conduct a thorough audit of your website to identify any potential issues or areas for improvement." },
				{ title: "Security Measures", text: "We implement robust security measures, including firewalls, malware scanning, and regular security audits, to protect your website from threats." },
				{ title: "Performance Optimization", text: "We optimize your website's speed and performance by minimizing page load times, improving image delivery, and optimizing server configurations." },
				{ title: "Regular Backups & Updates", text: "We perform regular backups of your website data and keep your website software updated with the latest security patches and performance enhancements." },
				{ title: "Ongoing Monitoring & Support", text: "We continuously monitor your website's performance, address any technical issues promptly, and provide ongoing support to ensure your website is always running smoothly." },
			],
		},
		cta: "Start your worldwide journey with a powerful website.",
	},
	{
		slug: "ecommerce-development",
		meta: {
			title: "WooCommerce & Shopify Store Development | IdeoXpert",
			description: "Online stores on WooCommerce and Shopify: fast product pages, a simple checkout, secure payments and SEO from launch. Get a free quote.",
			keywords: "ecommerce website development, WooCommerce development, Shopify store development, online store design, ecommerce web design agency, WooCommerce developer Pakistan, Shopify developer, ecommerce SEO, online shop development, IdeoXpert ecommerce",
			image: "/assets/images/work/maisonluma-com/hero.webp",
			schemaDescription: "E-commerce website development on WooCommerce and Shopify, including store design, product setup, payment gateways, shipping, SEO and ongoing support.",
		},
		title: { lead: "Online stores that are easy to run", em: "and built to sell" },
		intro: "We design and build online stores on WooCommerce and Shopify: product pages that load fast, a checkout short enough that people finish it, and a dashboard your team can run without calling a developer.",
		images: [
			{ src: "/assets/images/work/maisonluma-com/hero.webp", alt: "Maison LŪMA online store built by IdeoXpert" },
			{ src: "/assets/images/work/flechtarbeiten-de/hero.webp", alt: "Flechtarbeiten website with online shop built by IdeoXpert" },
		],
		overview: {
			title: "E-commerce development",
			paragraphs: [
				"An online store has one job: turn visitors into orders. That depends on things customers notice straight away (how fast pages load, how clear the product photos and prices are, how many steps the checkout takes) and on things they never see, like stock syncing, tax and shipping rules, and order emails that arrive on time.",
				"We build stores on WooCommerce when you want full control and no monthly platform fee, and on Shopify when you want hosting, security and payments handled for you. Either way you get a store your team can update on its own, with SEO, analytics and payments set up before launch.",
			],
		},
		features: [
			{ title: "Product pages that sell", text: "Clear photos, prices, variations and stock levels, with fast loading on phones, where most shoppers browse." },
			{ title: "Short, secure checkout", text: "Guest checkout, card and wallet payments through trusted gateways such as Stripe and PayPal, and as few steps as possible." },
			{ title: "Shipping, tax and stock", text: "Shipping zones, tax rules, discount codes and low-stock alerts, set up for how and where you actually sell." },
			{ title: "Found on Google", text: "Search-friendly product and category pages, product schema, a clean sitemap and analytics to see what sells." },
		],
		approach: {
			title: "Our approach to e-commerce development",
			intro: "From the first product list to the first order, you know what is happening at every step.",
			steps: [
				{ title: "Discovery & platform choice", text: "We look at your products, order volume, budget and team, then recommend WooCommerce or Shopify and explain why." },
				{ title: "Store design", text: "We design the homepage, category, product, cart and checkout pages around how your customers shop, and you approve every screen." },
				{ title: "Build & product setup", text: "We build the store, import your products, and connect payments, shipping, tax, email notifications and analytics." },
				{ title: "Testing & test orders", text: "We place real test orders on phones and desktops, check every payment method and email, and fix anything that slows the checkout." },
				{ title: "Launch & support", text: "We launch, show your team how to add products and manage orders, and stay available for updates, new features and maintenance." },
			],
		},
		cta: "Ready to start selling online? Let's talk.",
	},
];

export const servicePageBySlug = (slug: string) => servicePages.find((p) => p.slug === slug);

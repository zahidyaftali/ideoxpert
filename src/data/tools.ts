// Platforms and tools shown in "Our experts recommend the best platform" on
// each service page. The six per service match the tools in that service's
// artwork. `si` is a Simple Icons export name (rendered as inline SVG);
// `img` is a logo file in /public/assets/images/tools for brands Simple Icons
// does not carry.
export type Tool = { name: string; text: string; si?: string; img?: string };

export const toolsByService: Record<string, Tool[]> = {
	'website-development': [
		{ name: 'HTML5 & CSS', si: 'siHtml5', text: 'Clean, semantic markup and hand-written styles that load fast, work in every browser and give search engines a clear page structure.' },
		{ name: 'JavaScript', si: 'siJavascript', text: 'Interactive features, forms and animations that run smoothly without slowing the page down.' },
		{ name: 'React', si: 'siReact', text: 'For web applications and dashboards that need fast, app-like screens and components we can reuse as the product grows.' },
		{ name: 'PHP', si: 'siPhp', text: 'The backbone of WordPress and most business websites. We use it for custom features, integrations and admin tools.' },
		{ name: 'MySQL', si: 'siMysql', text: 'Reliable databases for products, bookings, listings and users, designed so your site stays quick as the data grows.' },
		{ name: 'WordPress', si: 'siWordpress', text: 'When your team needs to update content themselves, we build on WordPress with a custom theme instead of a heavy template.' },
	],
	'website-design': [
		{ name: 'Figma', si: 'siFigma', text: 'Where we design every page and screen, and where you review and comment on designs before development starts.' },
		{ name: 'Adobe XD', img: '/assets/images/tools/adobe-xd.png', text: 'Clickable prototypes that let you move through the website and feel the flow before a line of code is written.' },
		{ name: 'Sketch', si: 'siSketch', text: 'Layouts, icons and design systems that keep colours, type and spacing consistent across every page.' },
		{ name: 'Framer', si: 'siFramer', text: 'Interactive prototypes with real motion, so you can see exactly how pages, menus and animations will behave.' },
		{ name: 'InVision', img: '/assets/images/tools/invision.png', text: 'Shareable prototypes for gathering feedback from your team in one place, with comments pinned to the design.' },
		{ name: 'Axure', img: '/assets/images/tools/axure.png', text: 'Detailed wireframes for larger websites, mapping out page structure and content before visual design begins.' },
	],
	'wordpress-website': [
		{ name: 'WordPress', si: 'siWordpress', text: 'The world’s most used CMS. We set it up so your team can edit pages, posts and images without calling a developer.' },
		{ name: 'Elementor', si: 'siElementor', text: 'A visual page builder for pages you want to change often, set up with your brand’s colours and fonts locked in.' },
		{ name: 'WooCommerce', si: 'siWoocommerce', text: 'Online stores with products, payments, shipping and stock management, all inside your WordPress dashboard.' },
		{ name: 'Yoast SEO', si: 'siYoast', text: 'Titles, meta descriptions, XML sitemaps and schema configured on every page from launch day.' },
		{ name: 'WP Rocket', si: 'siWprocket', text: 'Caching, file minification and lazy loading so your WordPress site loads fast on phones and slower connections.' },
		{ name: 'WPForms', img: '/assets/images/tools/wpforms.png', text: 'Contact, quote and booking forms that land in your inbox, with spam protection built in.' },
	],
	'ecommerce-development': [
		{ name: 'WooCommerce', si: 'siWoocommerce', text: 'The most used store platform on the web, built on WordPress. No monthly platform fee, full control over design and data, and thousands of extensions.' },
		{ name: 'Shopify', si: 'siShopify', text: 'A hosted store with security, updates and payments handled for you. The right choice when you want to sell with as little upkeep as possible.' },
		{ name: 'Stripe', si: 'siStripe', text: 'Card, Apple Pay and Google Pay payments, set up so customers pay without leaving your checkout.' },
		{ name: 'PayPal', si: 'siPaypal', text: 'A payment option many shoppers trust, added alongside cards so nobody leaves at the last step.' },
		{ name: 'WordPress', si: 'siWordpress', text: 'Your blog, pages and store in one place, so content that ranks on Google leads straight to products.' },
		{ name: 'Google Analytics', si: 'siGoogleanalytics', text: 'E-commerce tracking that shows which products, pages and campaigns turn into orders.' },
	],
	'seo-optimization': [
		{ name: 'Google Search Console', si: 'siGooglesearchconsole', text: 'We watch which searches bring visitors, fix indexing problems and submit your sitemap so new pages are found quickly.' },
		{ name: 'Google Analytics', si: 'siGoogleanalytics', text: 'Tracks where visitors come from and what they do, so every SEO change can be measured against real enquiries.' },
		{ name: 'Semrush', si: 'siSemrush', text: 'Keyword research, competitor analysis and rank tracking to find the searches worth going after in your market.' },
		{ name: 'Rank Math', img: '/assets/images/tools/rank-math.png', text: 'On-page SEO for WordPress: titles, descriptions, schema markup and redirects managed page by page.' },
		{ name: 'Yoast SEO', si: 'siYoast', text: 'Readability and on-page checks for every post, plus clean sitemaps and canonical URLs.' },
		{ name: 'GTmetrix', img: '/assets/images/tools/gtmetrix.png', text: 'Speed audits that show what slows a page down. Page speed is a ranking factor, so we fix what it finds.' },
	],
	'mobile-app-development': [
		{ name: 'React Native', si: 'siReact', text: 'One codebase for iOS and Android, so your app launches on both stores faster and costs less to maintain.' },
		{ name: 'Flutter', si: 'siFlutter', text: 'Smooth, native-feeling apps with custom designs that look the same on every device.' },
		{ name: 'Firebase', si: 'siFirebase', text: 'Sign-in, databases, push notifications and crash reports, without running your own servers.' },
		{ name: 'Android', si: 'siAndroid', text: 'Tested across phones and screen sizes, then prepared and submitted to Google Play.' },
		{ name: 'iOS', si: 'siApple', text: 'Built and tested for iPhone and iPad, then taken through Apple’s App Store review for you.' },
		{ name: 'Figma', si: 'siFigma', text: 'Every screen designed and approved as a prototype before development, so there are no surprises later.' },
	],
	'cms-development': [
		{ name: 'WordPress', si: 'siWordpress', text: 'Our first choice for most business websites: flexible, easy for your team to use and backed by a huge ecosystem.' },
		{ name: 'Shopify', si: 'siShopify', text: 'For online stores that need secure payments, inventory and shipping handled with as little upkeep as possible.' },
		{ name: 'Drupal', si: 'siDrupal', text: 'For large, content-heavy websites with many editors, complex permissions and strict security needs.' },
		{ name: 'Joomla', si: 'siJoomla', text: 'A solid option for community and membership websites. We also maintain and upgrade existing Joomla sites.' },
		{ name: 'Wix', si: 'siWix', text: 'For small businesses that want a simple website they can manage themselves. We design and set it up properly.' },
		{ name: 'Squarespace', si: 'siSquarespace', text: 'Clean, design-led websites for portfolios and small brands, with hosting and security included.' },
	],
	'hosting-domain': [
		{ name: 'Hostinger', si: 'siHostinger', text: 'Fast, affordable hosting with LiteSpeed servers. A good fit for most small and medium business websites.' },
		{ name: 'Namecheap', si: 'siNamecheap', text: 'Domain registration and DNS, with privacy protection so your personal details stay out of public records.' },
		{ name: 'GoDaddy', si: 'siGodaddy', text: 'We move and manage domains and hosting already registered with GoDaddy, without downtime.' },
		{ name: 'Bluehost', img: '/assets/images/tools/bluehost.png', text: 'WordPress-recommended hosting with one-click setup, daily backups and free SSL.' },
		{ name: 'DreamHost', img: '/assets/images/tools/dreamhost.png', text: 'Reliable managed hosting for WordPress sites that need solid uptime and room to grow.' },
		{ name: 'Cloudflare', si: 'siCloudflare', text: 'DNS, a global CDN and protection against attacks, so your site stays fast and online wherever visitors are.' },
	],
	'website-maintenance': [
		{ name: 'Sucuri', img: '/assets/images/tools/sucuri.png', text: 'Malware scanning, a website firewall and clean-up if anything slips through, so your site stays secure.' },
		{ name: 'UpdraftPlus', img: '/assets/images/tools/updraftplus.png', text: 'Scheduled backups stored off-site, so any version of your website can be restored in minutes.' },
		{ name: 'ManageWP', img: '/assets/images/tools/managewp.png', text: 'Safe plugin, theme and core updates across WordPress sites, with uptime monitoring and reports.' },
		{ name: 'Cloudflare', si: 'siCloudflare', text: 'Caching and protection at the network edge that keep your website fast and filter out bad traffic.' },
		{ name: 'Google Analytics', si: 'siGoogleanalytics', text: 'Monthly checks on traffic and enquiries, so problems are spotted before they cost you customers.' },
		{ name: 'Google Search Console', si: 'siGooglesearchconsole', text: 'Alerts for crawl errors, security issues and broken pages, fixed as part of your maintenance plan.' },
	],
};

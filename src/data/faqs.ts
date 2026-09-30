export type Faq = { q: string; a: string };

// Shown on the homepage and About page (FAQPage schema is emitted on About).
export const generalFaqs: Faq[] = [
	{
		q: 'How long does it take to build a website?',
		a: 'It depends on the size and complexity of the project. A simple WordPress website can be ready in two to three weeks. A custom web application or a larger multi-page website typically takes four to eight weeks. We give you a clear timeline before we start so there are no surprises along the way.',
	},
	{
		q: 'Do you work with businesses outside of Islamabad?',
		a: 'Yes, absolutely. While we are based in Islamabad, we work with clients across Pakistan and internationally. Most of our communication happens over calls, WhatsApp, and email, so location has never been an obstacle. We have delivered projects for clients in Karachi, Lahore, Dubai, the UK, and the US.',
	},
	{
		q: 'Will my website work on mobile phones and tablets?',
		a: 'Every website we build is fully responsive. That means it automatically adjusts to look and work properly on any screen size — whether it is a phone, tablet, laptop, or desktop. We test across multiple devices before handing anything over to you.',
	},
	{
		q: 'Do you offer SEO with website development?',
		a: 'Yes. Every website we build is set up with SEO foundations in mind — proper page structure, fast loading speeds, clean code, meta tags, and mobile optimization. If you need ongoing SEO work to grow your rankings over time, we offer that as a separate service with a clear monthly plan.',
	},
	{
		q: 'What happens after my website goes live?',
		a: 'We do not just hand over the files and disappear. After launch, we provide a short handover so you understand how to use and update your website. We also offer website maintenance packages that cover security updates, performance checks, content updates, and technical fixes — so your site stays secure and running well long after it goes live.',
	},
];

// Shown on the Services page.
export const serviceFaqs: Faq[] = [
	{
		q: 'What services does IdeoXpert offer?',
		a: 'We offer a complete range of software and digital services — web design, web development, web application development, mobile app development, WordPress websites, e-commerce stores, SEO optimization, CMS development, hosting and domain, and website maintenance. You can get everything done in one place without needing to manage multiple vendors.',
	},
	{
		q: 'How much does a website cost?',
		a: 'We do not have a fixed price list because every project is different. The cost depends on what you need — the number of pages, features, the type of design, and any custom functionality. We start every project with a free consultation to understand your requirements, and then provide a clear quote with no hidden charges.',
	},
	{
		q: 'Can you help with both design and development?',
		a: 'Yes, and this is one of the main reasons clients choose us. We handle both design and development in-house, which means there is no handoff between teams, no miscommunication, and no delays. You get a consistent result because the same team that designs your website also builds it.',
	},
	{
		q: 'Do you offer SEO as part of web development?',
		a: 'Every website we build includes SEO foundations — proper heading structure, meta tags, page speed optimization, mobile-friendly layout, and clean URL structure. If you need ongoing SEO to grow your rankings month over month, we offer that as a dedicated service with a clear plan and transparent reporting.',
	},
	{
		q: 'I already have a website — can you improve it?',
		a: 'Absolutely. Many of our clients come to us with an existing website that is outdated, slow, or not ranking well. We can carry out a full redesign, fix performance issues, improve SEO, add new features, or migrate you to a better platform. We start with an honest review of what you have and what needs to change to get better results.',
	},
];

export const faqSchema = (faqs: Faq[]) => ({
	'@type': 'FAQPage',
	mainEntity: faqs.map((f) => ({
		'@type': 'Question',
		name: f.q,
		acceptedAnswer: { '@type': 'Answer', text: f.a },
	})),
});

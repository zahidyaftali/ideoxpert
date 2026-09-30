import { site, countries } from './site';

export type Faq = { q: string; a: string };

// "the UK, the US, Canada, ... and Fiji", from the countries we have clients in.
const where = countries
	.map((c) => (['United States', 'United Kingdom', 'Netherlands'].includes(c.name) ? `the ${c.name.replace('United States', 'US').replace('United Kingdom', 'UK')}` : c.name))
	.join(', ')
	.replace(/, ([^,]*)$/, ' and $1');

// Shown on the homepage and About page (FAQPage schema is emitted on About).
export const generalFaqs: Faq[] = [
	{
		q: 'How long does it take to build a website?',
		a: 'It depends on the size of the site. A simple WordPress website can be ready in two to three weeks. A custom web application or a larger site usually takes four to eight weeks. You get a timeline with the quote, before any work starts.',
	},
	{
		q: 'Do you work with businesses outside Islamabad?',
		a: `Yes. Most of our clients are abroad: we have built websites for businesses in ${where}. We work over email, WhatsApp and video calls, and our working day overlaps with yours.`,
	},
	{
		q: 'Will my website work on phones and tablets?',
		a: 'Yes. Every site we build adjusts to any screen size, and we check it on phones, tablets and desktops before launch.',
	},
	{
		q: 'Do you offer SEO with website development?',
		a: 'Every site we build is ready for Google at launch: page titles, descriptions, headings, fast pages, a sitemap and structured data. Ongoing SEO, to climb the rankings month by month, is a separate service with a monthly report.',
	},
	{
		q: 'What happens after my website goes live?',
		a: 'You get every login and all the files, and we show you how to update the site. For 30 days after launch we fix any problem for free. After that you can choose a monthly care plan for updates, backups and small changes.',
	},
];

// Shown on the Services page.
export const serviceFaqs: Faq[] = [
	{
		q: 'What services does IdeoXpert offer?',
		a: 'Website design and development, WordPress websites, online stores, SEO, mobile apps, CMS development, hosting and domains, and website maintenance. One team does all of it, so you do not have to manage several suppliers.',
	},
	{
		q: 'How much does a website cost?',
		a: `It depends on what your site needs to do: how many pages, whether you sell online, which features, and who writes the content. Tell us about your project and we will reply ${site.replyTime} with a clear quote and no hidden charges. You pay 50% to start and 50% when the site goes live, and two rounds of design changes are included.`,
	},
	{
		q: 'Can you help with both design and development?',
		a: 'Yes. The same team designs and builds your site, so nothing gets lost in a handover between agencies. You approve the design before we build it.',
	},
	{
		q: 'Is SEO part of every website you build?',
		a: 'The basics are: clean headings, titles and descriptions, fast pages, a sitemap and structured data. If you want to rank for competitive searches, our SEO service adds keyword research, new pages and a monthly report.',
	},
	{
		q: 'I already have a website. Can you improve it?',
		a: 'Yes. Send us the link and we will tell you, for free, what is holding it back. Then we can redesign it, fix speed problems, improve the SEO, add features, or move it to a better platform.',
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

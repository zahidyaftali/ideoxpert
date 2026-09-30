// Client stories for the homepage and About page testimonials, one per real
// project (ids from projects.ts).
//
// Until a client has approved a quote, the slide shows the project itself:
// logo, what we built and a link to the case study. No invented quotes are
// shown under a real client's name: publishing made-up reviews is illegal in
// the US (FTC rule on fake reviews) and the UK (DMCC Act 2024), and a client
// who spots one loses trust fast.
//
// To publish a quote:
//   1. Send the client the `draft` below (or ask them for a few lines of
//      their own) and ask if it can go on the website with their name.
//   2. Paste their approved words into `quote`, fill in `name` and `role`,
//      and set `approved: true`. The slide then shows the quote, 5 stars and
//      their name. `photo` is optional (a square headshot).
export type Testimonial = {
	project: string;
	approved: boolean;
	quote?: string;
	name?: string;
	role?: string;
	photo?: string;
	/** Suggested wording to send the client for approval. Never shown on the site. */
	draft?: string;
};

export const testimonials: Testimonial[] = [
	{
		project: 'jazbahost-com',
		approved: false,
		name: 'Pervaiz Akhtar',
		role: 'CEO, Jazba Host',
		draft:
			'We sell website builds and hosting, and our old site made that confusing. IdeoXpert rebuilt it so both offers are clear, prices are upfront and every page leads to a quote. Clear communication from start to finish. 5 stars.',
	},
	{
		project: 'smbelectrical-ca',
		approved: false,
		draft:
			'IdeoXpert built our website with a page for every electrical service we offer in Toronto. It looks professional, loads fast on phones and customers now find us for the exact job they need. Easy to work with, highly recommended.',
	},
	{
		project: 'abccranehire-com-au',
		approved: false,
		draft:
			'We needed to show up when site managers search for crane hire in Perth, Rockingham and Mandurah. IdeoXpert built our WordPress site with location pages and a blog, and it is easy for us to keep updated. Great result.',
	},
	{
		project: 'mut-umzug-de',
		approved: false,
		draft:
			'IdeoXpert built our website with a page for every service and city we move to, in German. The site is fast, customers can request a quote in a minute, and the team was quick to respond to every change we asked for.',
	},
	{
		project: 'thomwerk-nl',
		approved: false,
		draft:
			'Candidates want to see jobs, not marketing. IdeoXpert put our vacancies on the homepage and made applying take a few clicks. Our recruiters can update jobs themselves every day. Exactly what we asked for.',
	},
	{
		project: 'fijianrealestate-com',
		approved: false,
		draft:
			'Many of our buyers are overseas, so the website had to make browsing property in Fiji easy, in more than one language. IdeoXpert delivered a clean listings site that we can manage ourselves. Very happy with the work.',
	},
	{
		project: 'gahealthcaretraining-com',
		approved: false,
		draft:
			'Our students search for certified CPR and BLS classes near them. IdeoXpert built a website that lists every programme clearly and makes booking a seat simple. Professional, patient and on time.',
	},
];

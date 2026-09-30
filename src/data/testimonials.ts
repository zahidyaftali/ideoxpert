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
//      and set `approved: true`. `photo` is optional (a square headshot).
//   3. Once three or more are approved, the section switches from project
//      slides to quotes with name, role and 5 stars.
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
		role: 'Owner, Jazba Host',
		draft: 'Our old site mixed up the website builds and the hosting plans. Now each one has its own page with a clear price, and every page ends with a way to ask for a quote.',
	},
	{
		project: 'smbelectrical-ca',
		approved: false,
		draft: 'We wanted a page for every job we do, from panel upgrades to floor heating. That is exactly what we got. Easy to work with, and quick to answer.',
	},
	{
		project: 'abccranehire-com-au',
		approved: false,
		name: 'Gideon Oosthuizen',
		role: 'ABC Crane Hire',
		draft: 'We needed to show up when site managers in Rockingham and Mandurah look for crane hire. The new site has a page for each area, and we add blog posts ourselves.',
	},
	{
		project: 'mut-umzug-de',
		approved: false,
		name: 'Patrick Fialkowski',
		role: 'MUT Umzug',
		draft: 'Every service and every city we move to now has its own page. Customers can ask for a quote from any page, and it takes a minute.',
	},
	{
		project: 'thomwerk-nl',
		approved: false,
		// [[FILL: confirm the spelling of the name (owner wrote "Tamaravert")]]
		name: '',
		role: 'Thomwerk',
		draft: 'Candidates see our vacancies the moment they land, and applying takes a few clicks. Our recruiters update the jobs themselves every day.',
	},
	{
		project: 'fijianrealestate-com',
		approved: false,
		name: 'Farman Ali',
		role: 'Fijian Real Estate',
		draft: 'A lot of our buyers live overseas, so the site had to work in English and Chinese. Listings are easy to browse and we update them ourselves.',
	},
	{
		project: 'gahealthcaretraining-com',
		approved: false,
		name: 'Dr. Yolaine Nozile',
		role: 'CEO and Founder, GA Healthcare Training',
		draft: 'Students can see every class we run, from BLS to PALS, and book a seat online. Every course has its own page now.',
	},
];

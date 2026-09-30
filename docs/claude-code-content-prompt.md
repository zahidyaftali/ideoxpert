# Prompt for Claude Code: make the IdeoXpert website believable and turn visitors into leads

How to use this file:

1. Fill in **Part A (the fact sheet)** yourself. Only you know these answers. Leave a line blank if you don't know it yet. Claude will then leave a visible placeholder instead of making something up.
2. Open Claude Code in this repository and paste everything from **"START OF PROMPT"** to the end.
3. When it finishes, read the list of placeholders it gives you, fill them in, and deploy.

---

START OF PROMPT

You are editing the IdeoXpert website, an Astro site in this repository. Read `README.md` first: it explains where each kind of content lives. Most of the copy is in `src/data/*.ts`, `src/content/blog/*.md` and `src/pages/*.astro`.

## Goal

The site is technically sound, but the copy has two problems that cost us clients:

1. **Parts of it look fake.** The numbers contradict each other, a rating is shown with no reviews behind it, the "client stories" section has no client words, and no real person from the company appears anywhere.
2. **Parts of it read as AI-written boilerplate.** The same generic paragraphs ("We delve deep…", "visually stunning", "In today's digital landscape…") are copied across the service pages.

Fix both. When you're done, a small business owner in the UK, US, Canada, Australia, Germany or the Netherlands who lands on any page should:

- understand within 5 seconds what we do and who it's for;
- believe every claim, because each one is specific and can be checked;
- see a rough price;
- know exactly what happens when they get in touch;
- find it easy to message us from wherever they are on the page.

## Hard rules (never break these)

- **Never invent facts.** No made-up numbers, client names, quotes, reviews, ratings, results, awards, team members or years. Every fact must come from Part A, from `src/data/projects.ts` / `src/data/case-facts.json`, or from text already on the site that Part A doesn't contradict.
- **If a fact is missing,** write `[[FILL: what is needed]]` in the source and keep going. Where a placeholder would look broken on the live site, hide that element until it's filled. For example, hide the rating block while `site.reviewUrl` is empty.
- **Never publish a testimonial with `approved: false`.** Keep the approval system in `src/data/testimonials.ts` as it is. Fake reviews are illegal in the US (FTC rule) and the UK (DMCC Act 2024).
- **Never add `AggregateRating` or `Review` structured data** unless it points to real, public reviews.
- **No manipulative tricks:** no countdown timers, "only 2 spots left", pop-ups that block the page, or pre-ticked boxes. Build urgency honestly, by showing what the visitor is losing today (enquiries going to competitors) and how quick and free the first step is.
- **Don't change the visual design, layout system, colours or animations** unless a task below asks for it. Reuse the existing components (`Button`, `Select`, `Faq`, `ProjectCard` and so on).
- **Keep the SEO limits:** titles 55 characters or fewer, meta descriptions 155 or fewer. `npm run build` prints `[seo]` for any page that goes over, and it must print none.

## Writing style (applies to every word you write or rewrite)

Write like a senior freelancer talking to a business owner over coffee, not like a marketing brochure.

- Use short sentences, plain words and "you". One idea per sentence.
- Be specific. Prefer a number, a place, a client name or a concrete example over an adjective. "A page for every suburb ABC Crane Hire serves" beats "tailored local SEO solutions".
- Lead with the client's problem and result, not with our process or our feelings.
- Don't claim things you can't show. Replace "high-quality" and "expert" with the proof itself.
- Vary sentence length. Don't stack groups of three adjectives ("fast, secure and scalable") everywhere.
- Don't use em dashes (—). Use a full stop, a comma or a colon instead.
- Use the English variant set in Part A consistently across the whole site.

**Banned words and phrases.** Remove every existing occurrence and don't introduce new ones:

> delve, seamless, seamlessly, visually stunning, cutting-edge, robust, leverage, elevate, empower, unlock, tailored, bespoke, in today's (digital) world/landscape, digital landscape, digital reality, ever-evolving, comprehensive, holistic, synergy, top-notch, world-class, state-of-the-art, best-in-class, next level, game-changer, impactful, flawlessly, perfectly, exceeds your expectations, bring your vision to life, look no further, one-stop shop, a wide range of, our talented/skilled/dedicated/passionate team, latest technologies, best practices, highest quality standards, genuinely, absolutely, journey, craft/crafting (as in "we craft websites"), captivate, resonate, "not just X, but Y", "Whether you need X or Y, we have the expertise"

After editing, run a case-insensitive search for each banned term across `src/` and fix every hit, except inside blog posts where a word is used literally. For example, "technical best practices" in an SEO checklist is fine if it's genuinely needed.

## Tasks

Work through these in order. Commit after each numbered task with a clear message.

### 1. One set of true numbers

The site currently says "50+ websites delivered", "35+ websites live", "Trusted by 35+ businesses", "All 35 projects", "6+ years" and "since 2022", and "4.8/5, reviewed by 100+ clients". These contradict each other: you can't have 100+ reviewers and 50 websites.

- In `src/data/site.ts`, rebuild `stats` from Part A only: founding year, number of projects delivered, number of countries.
- Calculate "years of experience" from the founding year so it can never drift out of date.
- Delete the unused `clients` and `delivered` stats and the TODO comment.
- Everything that shows a number must read it from `stats`, never from hard-coded text. Search `src/` for hard-coded counts ("35+", "50+", "100+", "6+", "4.8") and replace them. This includes the logo marquee line in `LogoMarquee.astro` or its caller, `StatBars.astro`, the `index.astro` hero stats and `Testimonials.astro`.
- Rating: show the rating block **only** when `site.reviewUrl` and `stats.rating` are both filled in Part A. The rating must link to the real review page (Google Business Profile or Clutch), with the real number and count. Otherwise, replace that slot in the hero stats and on About with a stat we can prove, such as "Countries" (from `countries.length`) or "Projects live".
- Recount the portfolio: the "All N projects" link and "Trusted by N businesses" must use the same source (`projects.length` or the number of distinct clients, per Part A).

### 2. Honest client proof

- **`Testimonials.astro`:** while fewer than 3 testimonials have `approved: true`, the section heading must not say "Real clients, real websites" above a rating. Call it something honest and useful, such as "Recent client projects", and show the project slides as they are now. Once 3 or more are approved, switch to the quote layout with name, role and (optional) photo, plus the link to the public reviews.
- **Related projects:** Jazba Host, Jazba Studio, Jazba Entertainment and Jazba Tickets look like one group of companies, and four of the first five homepage projects are Jazba brands. That looks like padding. Follow Part A:
  - If they are one client, group them as one client with four sites in the logo marquee and client counts. Stop them filling most of the homepage "Recent work" carousel (show at most one or two), and interleave other clients.
  - If a project is the founder's own site (`zahid-ali-yaftali`), label it clearly as our own work, not a client, or move it out of the client portfolio, per Part A.
- **Results in case studies:** add an optional `result` field to `Entry` in `src/data/projects.ts`, for example "Ranks on page 1 for 'crane hire Rockingham'" or "Enquiries up from ~5 to ~20 a month". Show it prominently on the project card and at the top of `work/[slug].astro`, **only when filled**. Fill it only from Part A. For every project without a result, add a `// [[FILL: result]]` comment so the owner can find them.
- In `src/data/testimonials.ts`, rewrite each `draft` quote so it sounds like a real, slightly informal business owner, and keep them short (2–3 sentences, one concrete detail each). These are only suggestions we send clients for approval. They are never shown on the site.

### 3. Put a real person on the site

Buyers hiring an agency abroad want to know who they will actually talk to.

- On `about.astro`, add a short founder section: name, photo, role, 3–4 sentences in the first person about why they started IdeoXpert and how they work with clients, and a LinkedIn link. Use Part A. If the photo is missing, don't show a stock image: leave the section hidden and add a `[[FILL]]` note.
- If Part A lists team members, add them (name, role, photo). If it doesn't, don't invent a team.
- Near the contact form (in `DiscoverySession.astro` and `contact.astro`), add one line with the founder's photo and name, such as: "You'll talk to [Name], who will plan and oversee your project." Show it only when the data exists.
- Rewrite the About page "Who we are" copy in the same honest first-person-plural voice. Explain plainly why working with a team in Islamabad is a good deal for a foreign client, using only the reasons in Part A (for example: senior work at a lower price, working hours that overlap with yours, replies within X hours).

### 4. Rewrite the service pages (`src/data/service-pages.ts`)

The same `features` and `approach.steps` are copied across several service pages. Two services share "We delve deep…", and the CTA "Start your worldwide journey with a powerful website." appears on 7 of 9 pages. That is duplicate content for Google and reads as filler to humans.

For **each** of the 9 services, rewrite `overview`, `features`, `approach` and `cta` so they are unique to that service:

- **Overview (2 short paragraphs):** who this service is for, the problem they have, and what they get at the end. Mention one or two real projects from `projects.ts` that used this service, by name.
- **Features (4):** concrete deliverables, not adjectives. For example, for WordPress: "You edit pages yourself: we record a 10-minute video walkthrough at handover".
- **Approach (4–5 steps):** what actually happens in this service and roughly how long each step takes. Don't reuse the generic 5 steps.
- **Price and timeline line:** "Typical price: from [Part A price] · Typical timeline: [Part A timeline]". Use `[[FILL]]` if missing.
- **CTA:** specific to the service. For example, for SEO: "Want to know why you're not on page one? Send us your website and we'll tell you for free."
- Keep `meta.title` and `meta.description` within limits. Remove the unused `meta.keywords` field if nothing reads it (Google ignores meta keywords).
- Rewrite the homepage "From first call to launch day" steps (`src/components/Process.astro` or wherever they live) in the same plain style.

### 5. Homepage message

- The hero currently leads with "Web development agency in Islamabad, Pakistan". Keep "Islamabad" in the `<title>` and meta description for local search. Make the visible hero speak to the audience in Part A. For example, if Part A says small service businesses abroad: "Websites that bring local service businesses more calls from Google". Offer 3 headline options in your final summary, and use the one that best matches Part A.
- Under the hero buttons, keep "Free consultation. We reply within 24 hours." (use Part A's reply time), and add the lowest "from" price if Part A gives one.
- The "What is holding your website back?" section is the best-written part of the site. Use its tone as the reference for everything else.

### 6. Prices

- Add a short "What does it cost?" block (or a small pricing section on `services.astro` and the homepage) with the "from" prices in Part A, plus what's included and a typical timeline. Say clearly that the final quote depends on scope.
- Update the FAQ answer "How much does a website cost?" in `src/data/faqs.ts` to give the ranges instead of "We do not have a fixed price list".
- Update the blog post `src/content/blog/how-much-does-a-website-cost.md` so it gives real price ranges. Base them on Part A for our prices, and label anything else as a general market range. A searcher who reads that post must get numbers.
- If Part A has no prices, add `[[FILL]]` placeholders and hide the price blocks until they're filled.

### 7. Make contacting us the obvious, easy next step

- **Discovery form (`DiscoverySession.astro`):**
  - Cut it down to: name, email, website URL (optional), "What do you need?" (service select, optional) and message.
  - Remove Industry and "How did you hear about us?", or make them optional and collapsed.
  - Change the button to say what happens: "Get my free plan and quote".
  - If `site.calendarUrl` is set in Part A, add a "Prefer to pick a time? Book a 15-minute call" link. If it isn't set, rename the section from "Book your 30-minute discovery session", because there's no booking.
  - Under the button, add 3 short lines on what happens next: "1. We reply within X hours. 2. We look at your current site. 3. You get a plan and a price. No obligation."
  - Update `public/api/send-mail.php` so the new optional field (`website_url`) is included in the email, and removed fields don't cause errors.
- **Contact page (`contact.astro`):** apply the same "what happens next" copy and keep it consistent with the discovery form.
- **WhatsApp:** pre-fill the message on every WhatsApp link, for example `https://wa.me/<number>?text=` + URL-encoded "Hi IdeoXpert, I'm interested in <service or page name>. My website is: ". Build the link in one helper so every link uses it.
- **Mobile:** add a slim sticky bottom bar, on phones only, with two buttons: "WhatsApp" and "Get a quote" (the quote button jumps to `#discovery`). It must not cover the cookie banner (if any), the form or the footer links. Hide it while the form is in view, and respect reduced motion.
- **Free website review offer (only if Part A says yes):** add a clear secondary offer: "Send us your website. We'll record a short video with 3 things to fix, free, within 48 hours." Place it on the homepage, `/seo-optimization` and `/website-design`, using the same form with a hidden `offer=review` field.

### 8. Fix claims that can't be backed up

- `src/data/faqs.ts`: the answer to "Do you work with businesses outside of Islamabad?" claims projects in Karachi, Lahore and Dubai, which aren't in the portfolio. List only countries that appear in `projects.ts` (or Part A). Remove "Yes, absolutely." and the other filler openers ("Absolutely.").
- `src/data/locations.ts`: for each country page, check the claims against the portfolio.
  - The UAE page promises "Bilingual websites with a proper right-to-left Arabic layout". Keep that only if Part A confirms we have done it.
  - For a country with no client in `projects.ts`, follow the choice in Part A. Either say honestly that we work remotely with clients like X in Y, or set the page to `noindex`, remove it from `sitemap.xml.ts` and the menus.
  - Make each remaining page more distinct: lead with that country's own projects and local details (time-zone overlap, currency, language).
- Search the whole site for other unverifiable superlatives ("the best", "leading", "#1", "guaranteed rankings") and remove them.

### 9. Small technical fixes found in the audit

- Logo marquee links have empty `alt` text and no accessible name. Give each logo `alt="<Client name> logo"` (or an `aria-label` on the link). Flag images that are purely decorative can keep `alt=""`.
- Replace the social sharing image `site.defaultImage` (`/assets/images/bg/16.png`, 840 KB) with a 1200×630 JPG/WebP under 150 KB. It should show the logo and the homepage headline. Generate it from existing brand assets if you can; otherwise add a `[[FILL]]` note.
- **Analytics:** if Part A gives a GA4 ID or a Plausible/Clarity snippet, add it in `src/layouts/BaseLayout.astro`. Track these events: form submitted successfully (in `src/scripts/mail-form.ts`), WhatsApp click, `mailto:` click and `tel:` click. If Part A has none, add a clearly marked, commented-out slot and a `[[FILL]]`.
- If Part A gives the Google Business Profile or Clutch URL, add it to `site.socials` (it becomes schema `sameAs`) and to the footer.

### 10. Check your work before finishing

1. `npm run build` succeeds with **no** `[seo]` warnings.
2. The banned-word search returns nothing (apart from justified literal uses in blog posts).
3. Build a list of every number shown on the built site (`dist/**/*.html`): years, projects, countries, ratings, prices, reply times. Confirm each one matches Part A / `site.ts`, and that the same fact never shows two different values.
4. No testimonial with `approved: false` appears in `dist/`.
5. Open the homepage, a service page, a case study and the contact page at phone width (375 px) and desktop width (for example with `npm run preview` and Playwright). Check that the sticky bar, forms and WhatsApp links work and nothing overlaps.
6. Submit the form locally and confirm the request body contains the new fields.
7. Read 3 rewritten pages aloud to yourself. If a sentence would sound odd said to a plumber in Birmingham, rewrite it.

## When you finish, reply with

- A short summary of what changed, file by file.
- The 3 homepage headline options.
- **A checklist of every `[[FILL: …]]` placeholder**, with its file and line and what the owner needs to provide. Put the ones that block trust first: real numbers, founder photo, prices, review link.
- A list of anything you deliberately didn't change and why.

---

## Part A: Fact sheet (the site owner fills this in before running the prompt)

Write the true answer after each line. Leave it empty if you don't know. Claude will then insert a placeholder instead of guessing.

**Company**

- Year IdeoXpert started taking client work:
- Number of client websites/projects actually delivered (a number you could list if asked):
- Number of distinct clients:
- Countries you have delivered for:
- Your usual reply time to a new enquiry (for example "within 12 hours on weekdays"):
- English style to use across the site (US or UK):

**Reviews**

- Google Business Profile URL (create one if you don't have it):
- Clutch / GoodFirms / Upwork / Fiverr profile URL with reviews:
- Real average rating there, and number of reviews:

**People**

- Founder's full name and role:
- Founder photo file (put it in `public/assets/images/about/`):
- Founder LinkedIn URL:
- 3–4 true sentences, in your own words: why you started, how you work, what you care about:
- Other team members (name, role, photo), if you want them shown:
- Why a foreign client should work with a team in Islamabad (your real reasons):

**Portfolio**

- Are Jazba Host, Jazba Studio, Jazba Entertainment and Jazba Tickets one client/group? (yes/no):
- Is "Zahid Ali Yaftali" your own site? Show it as "our own work", or remove it from the client portfolio?
- Real results you can state for any project (project name → result, with numbers if you have them):
- Have you built a bilingual Arabic (right-to-left) website? (yes/no):
- For country pages with no client from that country: say it honestly, or remove the page? (honest / remove):

**Audience and offer**

- Your main target client (for example "small service businesses in the UK, US, Canada, Australia and Germany"):
- Starting prices ("from" amount and currency):
  - Business website (5–10 pages):
  - WordPress website:
  - Online store:
  - SEO (per month):
  - Maintenance (per month):
  - Mobile app:
- Typical timelines for the above:
- Will you do a free website review video within 48 hours? (yes/no):
- Booking calendar link (Calendly / Cal.com), if any:

**Tracking**

- Google Analytics 4 Measurement ID (G-XXXXXXX) or Plausible / Clarity snippet:
- Has Google Search Console been set up for ideoxpert.com? (yes/no):

# Prompt for Claude Code: Pricing page and website cost calculator

How to use this file:

1. **Check the price list in Part B.** These are suggested prices for a small, trustworthy agency: clearly lower than UK or US agencies, but not bargain-basement. Change any number you don't agree with. Every price on both pages is read from one file, so it's easy to change later too.
2. **Check the policies in Part C** (payment terms, hourly rate, cancellation and so on). Claude will publish them exactly as written.
3. Open Claude Code in this repository and paste everything from **"START OF PROMPT"** to the end.

The hosting prices come from your plan (£8, £18, £38 a month). I converted them at about **£1 = $1.30** and **£1 = €1.17**, rounded to clean numbers. Check the exchange rate on the day you publish and adjust if it has moved a lot.

---

START OF PROMPT

You are adding two new pages to the IdeoXpert website, an Astro site in this repository:

1. **`/pricing`**: clear starting prices for every service, the hosting and care plans, what's included, and how payment works.
2. **`/website-cost-calculator`**: an interactive calculator that gives a visitor an instant **price range and timeline** for a website, online store, SEO, app, or hosting and care. It then turns that into a lead with one click (quote form or WhatsApp).

Read `README.md` first. It explains where things live, the heading style, the animation attributes and the SEO length limits.

## Why these pages exist (keep this in mind for every decision)

IdeoXpert is a small agency in Islamabad. It builds websites for small businesses in the UK, the US, Europe and Australia. Our prices are lower than local agencies in those countries, and that's our biggest advantage. A low price from abroad makes buyers suspicious, though ("what's the catch?"). So these pages must do two jobs at once:

- **Show the price openly**, so visitors don't leave thinking "too expensive" or "they'll overcharge me".
- **Make the price feel trustworthy**, by explaining how it's worked out, what's included, what isn't, how payment works, and who they'll deal with.

The calculator is **not** a trick to collect emails. It shows the estimate straight away, with no email needed. Only then does it offer to turn the estimate into a fixed quote.

## Hard rules

- **Use the existing design system.** Build both pages with `BaseLayout`, `PageHero`, `Button`, `Faq` and the existing section, container, frame and texture classes, colours and tokens in `src/styles/global.css`. Use Geist type, the brand green `#2DB453`, `--paper` for light sections and `--card` for panels. Use the heading style from `src/middleware.ts` (thin start, bold ending, green dot), and the `data-reveal` / `data-split` animations from `src/scripts/motion.ts`. Look at `services.astro`, `contact.astro` and `DiscoverySession.astro` and match them. **Don't** add a CSS framework, UI library or a new colour. The highlighted "Most popular" plan uses the site's dark panel style with a **green** badge, not red.
- **One source of truth for prices.** Every price, timeline and option lives in a new file, `src/data/pricing.ts`. The pricing page, the calculator, the FAQ answers and the structured data all read from it. No price is ever typed directly into a page.
- **No new framework for the calculator.** Plain TypeScript in `src/scripts/pricing-calculator.ts`, loaded like `src/scripts/mail-form.ts`. Put the maths in a **pure function** (`calculateEstimate(answers, currency)`) that's separate from the DOM code, so it can be tested.
- **Search engines must see the content without JavaScript.** Render both pages fully in static HTML: all questions, explanations, the default estimate and the price tables. JavaScript only adds interactivity. Add a `<noscript>` price table on the calculator page.
- **Honest wording only.** Don't use "cheapest", "guaranteed", "#1", fake discounts, countdowns, fake "only X spots left", or made-up comparisons with other agencies' prices. Don't add review stars or `AggregateRating` markup.
- **SEO limits:** titles 55 characters or fewer, meta descriptions 155 or fewer. `npm run build` must print no `[seo]` warnings.
- **Accessibility:**
  - Every question is a `<fieldset>` with a `<legend>`.
  - Options are real `<input type="radio">` or `<input type="checkbox">` elements, styled as selectable cards.
  - Everything works with the keyboard.
  - The running total is announced through `aria-live="polite"`.
  - Visible focus states throughout.
  - Respect `prefers-reduced-motion`.
  - The layout works at 375 px wide with no sideways scrolling.

## Writing style for all copy

Use the copy in Part D **exactly as written**. Any extra text you need, such as button labels, error messages and small helper lines, must follow these rules:

- Short sentences, plain words, "you" and "we". Sound like a helpful person, not a brochure.
- Be specific: numbers, weeks, what's actually included.
- Don't use em dashes (—). Use a full stop, comma or colon.
- **Never use** these words: seamless, cutting-edge, robust, tailored, bespoke, elevate, unlock, empower, leverage, comprehensive, world-class, state-of-the-art, delve, journey, solutions, "take your business to the next level", "look no further". Also don't use "cheap"; say "affordable" or "good value" only when needed.
- Use US English spelling to match the rest of the site.

---

## Part A: Files to create or change

| File | What to do |
|---|---|
| `src/data/pricing.ts` | **New.** Holds all prices, options, timelines, plan features, currency settings, the pricing FAQs and the "included / not included" lists (Parts B and C). Export typed objects and helper functions. |
| `src/scripts/pricing-calculator.ts` | **New.** The pure `calculateEstimate()` function plus the DOM wiring (reading inputs, updating the summary, URL state, the quote and WhatsApp buttons). |
| `src/components/PriceCard.astro` | **New.** One pricing card, reused for the hosting plans, care plans and starting-price cards. |
| `src/components/ChoiceCard.astro` | **New.** A radio or checkbox styled as a selectable card, with a title, one-line description and price tag ("+$150"). |
| `src/pages/pricing.astro` | **New.** The pricing page (copy in Part D1). |
| `src/pages/website-cost-calculator.astro` | **New.** The calculator page (copy in Part D2). |
| `src/components/Header.astro` | Add **"Pricing"** to the main navigation between "Work" and "Industries" (or wherever it fits best without crowding), and to the mobile drawer. |
| `src/components/Footer.astro` | Add "Pricing" and "Cost calculator" links. |
| `src/data/faqs.ts` | Replace the "How much does a website cost?" answer (both places) with the new answer in Part D3, which reads prices from `pricing.ts` and links to `/pricing` and `/website-cost-calculator`. |
| `src/pages/[service].astro` | Next to each service page's main CTA, add a secondary link: "See prices" to `/pricing#<service-group>`, or "Estimate your cost" to `/website-cost-calculator?need=<group>`. |
| `src/content/blog/how-much-does-a-website-cost.md` | After the intro, add a short callout: "Want a number for your own project? Try our website cost calculator. It takes about a minute." Link it. Also add a short "What we charge" section with our starting prices from `pricing.ts`. Keep this post consistent with the price list. |
| `src/components/DiscoverySession.astro` and `src/pages/contact.astro` | Add a hidden `estimate` field. When the page opens with `?estimate=…` in the URL, or when the calculator's "Get my fixed quote" button is used, fill the hidden field **and** pre-fill the message box with the readable summary (see Part E). |
| `public/api/send-mail.php` | Include the `estimate` field in the email (under its own "Calculator estimate" heading). Limit it to 2,000 characters and escape it like the other fields. |
| `src/pages/sitemap.xml.ts` | Make sure both new pages are included (they should be automatically; check). |

---

## Part B: Price list (goes into `src/data/pricing.ts`)

All prices are one-off unless marked "/month". The base currency is **USD**.

### B1. Website (covers Website Design, Website Development, WordPress Website and CMS Development)

**Question 1: How many pages?**

| Option | Price | Page count used for per-page extras | Timeline |
|---|---|---|---|
| One page (landing page) | $450 | 1 | 1 week |
| 2–5 pages | $900 | 5 | 1–2 weeks |
| 6–10 pages | $1,400 | 8 | 2–3 weeks |
| 11–20 pages | $2,100 | 15 | 3 weeks |
| More than 20 pages | from $2,800 | 25 | 3–5 weeks (**complex**) |

**Question 2: Design**

| Option | Price |
|---|---|
| Built from our proven layouts, styled to your brand | +$0 |
| Fully custom design, drawn from scratch | +$500 (+$200 for a one-page site) |

**Question 3: Who writes the text?**

| Option | Price |
|---|---|
| I'll send you the text | +$0 |
| Please write it for me | +$50 per page |

**Question 4: Extras** (tick any)

| Option | Price |
|---|---|
| Blog | +$150 |
| Online booking or appointments | +$350 |
| Second language | +$350 |
| Extra forms (quote request, job application) | +$100 |
| Gallery or portfolio | +$100 |
| Newsletter sign-up | +$80 |

The contact form, WhatsApp button, Google Map and basic SEO setup are **always included**. Show them as ticked and disabled, with the label "Included".

**Question 5: Do you have a website now?**

| Option | Price |
|---|---|
| No, this is a new website | +$0 |
| Yes, replace my current site (we move your content and keep your Google rankings with redirects) | +$250 |

### B2. Online store (E-commerce Development)

**Question 1: How many products?**

| Option | Price | Product count used for upload | Timeline |
|---|---|---|---|
| Up to 25 | $1,900 | 25 | 2–3 weeks |
| 26–100 | $2,400 | 60 | 3 weeks |
| More than 100 | from $3,200 | 200 | 3–5 weeks (**complex**) |

**Question 2: Platform:** WooCommerce / Shopify / Not sure, advise me. This doesn't change the price.

- Under Shopify, show the note: "Shopify's own monthly plan is paid by you directly to Shopify."

**Question 3: Who adds the products?**

| Option | Price |
|---|---|
| I'll add them | +$0 |
| Please add them for me | +$3 per product |

**Question 4: Extras** (tick any)

| Option | Price |
|---|---|
| Product options (sizes, colors) | +$150 |
| Shipping rules by country or weight | +$150 |
| Extra payment methods (PayPal, Klarna and so on) | +$100 |
| Several currencies or languages | +$250 |
| Subscriptions or bookable products | +$400 |
| Move my products from another store | +$300 |

Card payments (Stripe or Shopify Payments), a basic SEO setup and order emails are **always included**.

### B3. SEO (SEO Optimization)

**Question 1: Where are your customers?**

| Option | Monthly price |
|---|---|
| One town or city | $300/month |
| Several cities or a region | $450/month |
| The whole country | $650/month |
| Several countries | Custom quote (don't show a number; show "We'll quote this after a quick look at your market.") |

**Question 2: Blog articles per month**

| Option | Monthly price |
|---|---|
| None | +$0 |
| 2 articles | +$120/month |
| 4 articles | +$240/month |

**Always added:** a one-off **SEO setup** of $350. This covers the audit, technical fixes, Google Business Profile setup, and Search Console and Analytics setup.

Always show the note: "SEO takes time. Most local businesses see real movement in 3 to 6 months. The minimum is 3 months, then it's month to month."

SEO has no build timeline. Show "Starts within 1 week".

### B4. Apps (Mobile App Development, custom web apps)

Show a **range only**. Never calculate an exact price.

| Option | Range | Timeline |
|---|---|---|
| Mobile app (Android, iPhone or both) | $4,000 – $12,000 | 6–12 weeks |
| Custom web app or client portal | $3,500 – $10,000 | 5–10 weeks |

Ask two optional questions just to add context to the quote request: "Do users need to log in?" (Yes / No) and "Does it need to connect to another system?" (Yes / No). These don't change the range.

Result text: "Apps vary too much to price with a calculator. This range covers most of the apps we're asked for. Book a free call and we'll give you a fixed quote within 48 hours."

### B5. Hosting (Hosting & Domain)

Monthly or annual toggle; **annual saves 20%**. Store explicit prices per currency. **Don't** convert these at runtime.

| Plan | GBP / month | USD / month | EUR / month | Annual (20% off), shown per month and billed yearly |
|---|---|---|---|---|
| **Basic**: "One brochure site, fully managed: hosting, SSL, backups and updates handled." | £8 | $11 | €9 | £6.40 (£76.80/yr) · $8.80 ($105.60/yr) · €7.20 (€86.40/yr) |
| **Business** (Most popular): "For growing sites that need more room, faster servers and a quicker response." | £18 | $24 | €21 | £14.40 (£172.80/yr) · $19.20 ($230.40/yr) · €16.80 (€201.60/yr) |
| **Enterprise**: "Built for online stores: checkout uptime, PCI-ready setup and room for traffic spikes." | £38 | $49 | €44 | £30.40 (£364.80/yr) · $39.20 ($470.40/yr) · €35.20 (€422.40/yr) |

Features:
- **Basic:** 1 website · 20 GB SSD storage · 100 GB bandwidth per month · Free SSL certificate · 5 email accounts · Daily backups (kept 30 days)
- **Business:** Up to 5 websites · 80 GB NVMe storage · Unlimited bandwidth · Free SSL certificates · 25 email accounts · Daily backups (kept 90 days)
- **Enterprise:** Unlimited websites · 200 GB NVMe storage · Unlimited bandwidth · Free SSL certificates · Unlimited email accounts · Hourly backups (kept 12 months)

Leave a clearly marked `// TODO(owner): remaining features` array on each plan so the owner can add the "more features" items. Render them behind a "Show all features" toggle, but only if the array isn't empty.

**Domain:** registration or transfer at cost, "usually about $15 a year". Not in the plans.

### B6. Website care (Website Maintenance)

| Plan | Monthly | Includes |
|---|---|---|
| **Care** | $49/month | WordPress, theme and plugin updates · security scans · uptime monitoring · monthly backup check · fixes if an update breaks something |
| **Care Plus** | $99/month | Everything in Care · up to 2 hours of content changes each month · monthly report (speed, uptime, updates done) · priority replies within 4 working hours |

Care plans work with our hosting or with the client's own hosting.

### B7. How the estimate is calculated (implement exactly)

- **One-off low estimate** = the sum of all one-off items for the chosen service, rounded to the nearest 10 in the display currency.
- **One-off high estimate** = low × 1.15, **rounded up to the nearest 50** in the display currency. Show it as a range: "$1,400 – $1,650".
- **"From" options** (20+ pages, 100+ products) show "From $X" instead of a range, and mark the project as **complex**.
- **Monthly items** (SEO, hosting, care) are shown as exact numbers on a separate "Monthly" line, never mixed into the one-off range.
- When a visitor picks more than one service, add up the one-off ranges and the monthly amounts. The timeline is the longest single timeline, not the sum.
- **Timeline rule:** start from the base timeline in the tables. Each of these adds half a week: fully custom design, online booking, second language, moving an existing site or store, subscriptions. **Websites and stores that aren't complex never show more than 3 weeks.** If the extras would push past that, show "3 weeks". Complex projects show "3–5 weeks, confirmed in your quote". Apps show their own range.
- **Currency:**
  - A USD / GBP / EUR switch at the top. Default to USD, or GBP when `navigator.language` is `en-GB`, or EUR for `de`, `nl`, `fr`, `es` or `it`. The static HTML shows USD.
  - Hosting uses the explicit prices in B5.
  - Everything else converts from USD with fixed rates in `pricing.ts` (`GBP: 0.75`, `EUR: 0.86`, with a comment telling the owner to review them). Round one-off prices to the nearest 10 and monthly prices to the nearest 1. Never fetch live rates.
- **URL state:** keep the answers in the query string, for example `?need=website&pages=6-10&design=layout&copy=own&extras=blog,booking&cur=USD`. Loading that URL restores the answers, so an estimate can be shared and bookmarked.

### B8. Test cases the function must pass (USD)

Write a small Node test (`node --test` or a plain script in `scripts/`, with no new dependencies) that checks:

| Case | Answers | Expected |
|---|---|---|
| A | Website, 6–10 pages, proven layouts, own text, no extras, new site | $1,400 – $1,650 · 2–3 weeks |
| B | Website, 2–5 pages, fully custom, we write the text, online booking | $2,000 – $2,300 · 2–3 weeks |
| C | Store, up to 25 products, we add them, product options | $2,125 → shown as $2,130 – $2,450 (low rounded to nearest 10, high rounded up to nearest 50) · 2–3 weeks |
| D | SEO, several cities, 2 articles per month | One-off $350 · Monthly $570/month · "Starts within 1 week" |
| E | Hosting Business, annual, USD | $19.20/month, $230.40 billed yearly |
| F | Website, 20+ pages | "From $2,800" · 3–5 weeks, complex |
| G | Website, 6–10 pages, fully custom, booking, second language, moving an existing site | Timeline capped at "3 weeks" |

---

## Part C: Policies to state on the pages (owner-approved wording)

- **Payment:** 50% to start, 50% when you've approved the finished site and before it goes live.
- **Changes:** two rounds of design changes are included.
- **After launch:** 30 days of free fixes.
- **Extra work:** $30 an hour, always agreed with you before we start.
- **Monthly plans** (hosting, care, SEO after the first 3 months): cancel any time with 30 days' notice.
- **Ownership:** you own your domain, website, content and logins from day one.
- **Invoices:** in USD, GBP or EUR. Pay by bank transfer, Wise or PayPal.
- **Taxes:** "Prices don't include any taxes that may apply in your country."

---

## Part D: Page copy (use exactly, fill prices from `pricing.ts`)

### D1. `/pricing`

**SEO**
- Title: `Website Pricing & Hosting Plans | IdeoXpert`
- Meta description: `Clear prices for websites, online stores, SEO and hosting. Business websites from $900, hosting from $11 a month. Fixed quote within 24 hours.`
- Breadcrumb: Home › Pricing

**Hero (use `PageHero`)**
- H1: `Clear prices. <b>No surprises.</b>`
- Lead: "Most agencies want a call before they'll talk about money. We'd rather show you. Here are our starting prices, what's included, and how payment works. Want a number for your own project? The calculator gives you one in about a minute."
- Buttons: **Estimate my project** (primary) → `/website-cost-calculator`; **Get a fixed quote** (ghost) → `#discovery`
- Under the buttons: "Fixed quote within 24 hours. No obligation."

**Section: Starting prices** (H2: `Where <b>prices start</b>`)

Six `PriceCard`s. Each card has an `id` so service pages can link to it.

1. `#website`: **Business website**: from $900. "A 5-page website for your business, built so you can edit it yourself. Ready in 1–2 weeks." Link: "Estimate my website" → calculator `?need=website`
2. `#store`: **Online store**: from $1,900. "WooCommerce or Shopify with up to 25 products and card payments set up and tested. Ready in 2–3 weeks." Link: "Estimate my store"
3. `#seo`: **Local SEO**: from $300/month. "Get found in your town: technical fixes, local pages and your Google Business Profile. Minimum 3 months." Link: "Estimate my SEO"
4. `#hosting`: **Hosting**: from $11/month. "Fast, managed hosting with SSL, daily backups and email accounts." Link: "See hosting plans" → `#hosting-plans`
5. `#care`: **Website care**: from $49/month. "We keep your site updated, secure and backed up, and fix it if something breaks." Link: "See care plans" → `#care-plans`
6. `#apps`: **Mobile and web apps**: usually $4,000–$12,000. "Every app is different, so we quote each one. Tell us your idea and we'll send a fixed quote within 48 hours." Link: "Talk about my app" → `#discovery`

**Section: Included in every website** (H2: `What's <b>always included</b>`, two columns on desktop)

Left column, "Always included":
- Works on phones, tablets and desktops
- Basic SEO setup: page titles, descriptions, sitemap, structured data and fast loading
- Contact form and WhatsApp button
- Google Analytics and Search Console connected
- Two rounds of design changes
- 30 days of free fixes after launch
- A short video showing you how to edit your site
- You own everything: domain, website, content and logins

Right column, "Not included, so there are no surprises":
- Premium plugins or themes, if your site needs one (at cost, and we'll ask first)
- Paid stock photos (we use free, licensed images unless you'd like paid ones)
- Your domain name (usually about $15 a year, paid at cost)
- Third-party fees, such as Shopify's monthly plan or payment processing fees

**Section: Hosting plans** (`id="hosting-plans"`, H2: `Hosting that's <b>looked after</b>`)
- Intro: "Your website needs a home. Ours is fast, backed up every day, and managed by the same team that built your site, so when something needs fixing, you talk to the people who know it."
- A Monthly / Annual toggle, styled like the site's existing tabs or segmented buttons. Annual label: "Annual: save 20%".
- Three `PriceCard`s (Basic, Business with a green "Most popular" badge in the dark panel style, Enterprise) with the prices and features from B5, and the line "£X a year billed monthly · switch to annual and pay £Y" in the selected currency.
- Buttons: "Choose Basic", "Choose Business", "Choose Enterprise". Each goes to `#discovery`, with the service set to "Hosting & Domain" and the message pre-filled "I'd like the Business hosting plan (monthly)".
- Small print: "Prices don't include any taxes that may apply in your country. Annual plans are billed once a year."

**Section: Website care** (`id="care-plans"`, H2: `Care plans, so <b>nothing breaks</b>`)
- Intro: "Websites need updates, like any software. Skip them and things break or get hacked. Our care plans handle it for you, on our hosting or yours."
- Two `PriceCard`s with the contents from B6.

**Section: How payment works** (H2: `How <b>payment works</b>`, a 4-step row reusing the numbered step style from `Process.astro`)
1. **Fixed quote.** "You tell us what you need. We send a fixed price and a timeline within 24 hours."
2. **50% to start.** "You pay half to book your project. We start within a few days."
3. **Design, build, review.** "You see the design before we build it. Two rounds of changes are included."
4. **50% at launch.** "You pay the rest when you've approved the finished site, before it goes live."
- Under the steps: "Invoices in USD, GBP or EUR. Pay by bank transfer, Wise or PayPal. You own your domain, website and content from day one."

**Section: Why our prices are lower** (H2: `Why we cost <b>less than local agencies</b>`)
- "We're a small team in Islamabad, Pakistan. Offices, salaries and everyday costs are lower here, so we can charge less for the same work. The standard is the same: you can open the live websites we've built for businesses in the UK, Germany, the Netherlands, Australia, Canada and the US."
- "You deal directly with the people designing and building your site. No account managers, no outsourcing, no one passing your project along."
- Button: **See our work** → `/portfolio`

**Section: FAQ** (H2: `Pricing <b>questions</b>`, using `Faq` with FAQPage schema). Questions from D3.

**Closing CTA** (just above the discovery form): "Not sure what you need? Tell us about your business and we'll recommend the simplest option that works, with a fixed price." Button: **Get my fixed quote** → `#discovery`

### D2. `/website-cost-calculator`

**SEO**
- Title: `Website Cost Calculator: Instant Estimate | IdeoXpert`
- Meta description: `How much will your website cost? Answer a few quick questions and get an instant price range and timeline. No email needed to see your estimate.`
- Breadcrumb: Home › Pricing › Cost calculator

**Hero** (a shorter hero than other pages, so the calculator is visible above the fold on desktop)
- H1: `How much will your <b>website cost?</b>`
- Lead: "Answer a few quick questions. You'll see a price range and a timeline straight away, with no email needed. When you're happy, send it to us and we'll turn it into a fixed quote."
- Three small trust points in a row, with icons from `Icon.astro`: "Takes about a minute" · "No email needed" · "Fixed quote within 24 hours"

**Calculator layout**
- **Desktop:** questions on the left (about 2/3 width), and a **sticky summary panel** on the right showing the running estimate.
- **Mobile:** questions stacked, with a **sticky bottom bar** showing "Estimate: $1,400 – $1,650" and a "See summary" button that scrolls to the full summary.
- The currency switch (USD / GBP / EUR) sits at the top of the summary panel.

**Step 1: legend "What do you need?"** (tick one or more; each is a `ChoiceCard`)
- **A website**: "For a business, service or personal brand"
- **An online store**: "Sell products with card payments"
- **More customers from Google**: "SEO, monthly"
- **An app**: "Mobile app or custom web app"
- **Hosting and care**: "For a site you already have, or one we build"

Only show the question groups for the needs that are ticked. Show and hide them smoothly (no animation with reduced motion).

**Every question gets a short "Why we ask" line** under its legend, in muted text. Use these:

Website:
- Pages: "Each page needs design, content and testing, so more pages means more work. Not sure? Most small businesses need 5 to 8: Home, About, one page per main service, and Contact."
- Design: "Our proven layouts are quicker and still look like your brand. A fully custom design is drawn from scratch, just for you."
- Text: "Good words win customers. If you don't have time, we'll write clear, search-friendly text for each page after a short questionnaire."
- Extras: "Only tick what you need now. You can add more later."
- Existing site: "We move your pages, images and blog posts across, and redirect the old addresses so you keep your Google rankings."

Store:
- Products: "Stores with more products need more setup, categories and testing."
- Platform: "Both are good. WooCommerce has no monthly platform fee. Shopify is the easiest to run yourself. Not sure? We'll advise."
- Who adds products: "Adding photos, prices and sizes takes time. We can do it for you."
- Extras: "Only tick what you need for launch."

SEO:
- Area: "Ranking in one town is quicker and costs less than ranking nationwide, because there's less competition."
- Articles: "Useful articles answer your customers' questions and bring in visitors from Google over time."

App:
- "Apps vary a lot, so we show a range. Your answers help us prepare for the call."

Hosting and care:
- Hosting plan (radio: None, Basic, Business, Enterprise; Monthly or Annual): "Every website needs hosting. Ours includes backups, SSL and support."
- Care plan (radio: None, Care, Care Plus): "Updates and security checks so nothing breaks."

**Summary panel**

- Heading: "Your estimate"
- Big number: the one-off range ("$1,400 – $1,650"), or "From $2,800".
- Line: "+ $24/month hosting" (and so on), when monthly items are chosen, with the monthly total.
- Line: "Ready in about 2–3 weeks". For complex projects: "3–5 weeks, confirmed in your quote".
- "What's included" list, built from the selected options plus the always-included items.
- Honest note, always visible: "This is an estimate, not an invoice. We'll confirm a fixed price after a short chat or a few messages. The fixed price is what you pay: anything extra is agreed with you first."
- Buttons:
  1. **Get my fixed quote** (primary): scrolls to `#discovery` and fills in the form (Part E).
  2. **Send to WhatsApp** (secondary): opens `https://wa.me/<site.whatsapp>?text=<encoded summary>`.
  3. **Start again** (text link): clears the answers and the URL.
- Empty state (nothing ticked yet): "Pick what you need on the left and your estimate appears here."

**Below the calculator**

Section H2: `How we work out <b>your price</b>`
- "We price by the time each part takes: pages, features and setup. We don't charge more because of your industry, your company size or where you're based."
- "The range covers the small things we only find out once we've talked, like how much content you have or a feature that needs extra work. Most fixed quotes land in the lower half."
- "Prefer to talk it through? Message us on WhatsApp and we'll help you pick the right options." (Link to WhatsApp.)

Section H2: `What <b>similar projects</b> cost`

Three cards. Each uses a **real project** from `src/data/projects.ts`, with its screenshot and a link to the case study. Choose projects that match these descriptions:
1. A service business site (for example SMB Electrical or CSFM Cleaning): "A site like this today: about 8 pages, our layouts, contact and quote forms." Show the calculated range for that setup.
2. A store (for example Flechtarbeiten or T-Shirt Studio): "A store like this today: up to 25 products, card payments."
3. A booking site (for example Jazba Studio or GA Healthcare Training): "A site like this today: 6–10 pages with online booking."

Label each card "Typical price for a similar site today". **Never** say or suggest what that client actually paid. Each card links to the calculator with those answers pre-filled.

Section: FAQ (the same pricing FAQ as `/pricing`, with FAQPage schema).

Closing: the standard discovery form (already added by `BaseLayout`).

### D3. Pricing FAQ (store in `src/data/pricing.ts`, shown on both pages)

1. **Is the calculator price the final price?**
   "It's a range to help you plan. After a short chat or a few messages, we send a fixed quote. The fixed quote is what you pay. If you ask for something extra later, we agree the cost with you before we start."
2. **Why is the estimate a range?**
   "Two 5-page websites can still be different: one might need more images, longer pages or a special form. The range covers that. Most fixed quotes land in the lower half."
3. **Why are you more affordable than agencies in the UK or US?**
   "We're based in Islamabad, where running a business costs less. We pass that on to you. The quality is the same, and you can check it on the live sites in our portfolio."
4. **Do I have to pay every month?**
   "No. Your website is a one-off payment. Hosting, care plans and SEO are optional monthly services, and you can cancel any time with 30 days' notice."
5. **Can I use my own hosting?**
   "Yes. We can build on your hosting, and our care plans work there too."
6. **How long will my website take?**
   "Most websites are ready in 1 to 3 weeks, and online stores in 2 to 3 weeks. Very large sites and apps take longer, and we'll tell you the exact timeline in your quote."
7. **How do I pay?**
   "50% to start and 50% when you've approved the finished site, before it goes live. Invoices are in USD, GBP or EUR, and you can pay by bank transfer, Wise or PayPal."
8. **What if I need changes after launch?**
   "You get 30 days of free fixes. After that, small changes are included in the Care Plus plan, or charged at $30 an hour, always agreed first."

Also replace the general "How much does a website cost?" answer in `src/data/faqs.ts` with:
"A business website with us starts at $900 for 5 pages, and online stores start at $1,900. The exact price depends on the number of pages and features. Try our cost calculator for an instant estimate, or ask for a fixed quote. We reply within 24 hours."
Include links to `/website-cost-calculator` and `/pricing`, and read the numbers from `pricing.ts`.

---

## Part E: Turning the estimate into a lead

- **Readable summary.** Build it from the answers, for example:
  ```
  Calculator estimate (USD)
  Website: 6–10 pages · our layouts · you write the text · Blog, Online booking
  Hosting: Business, annual
  One-off: $1,900 – $2,200 · Monthly: $19.20 · Timeline: about 3 weeks
  Link: https://ideoxpert.com/website-cost-calculator?need=website&pages=6-10&...
  ```
- **"Get my fixed quote":**
  - Put the summary into the hidden `estimate` field and the message box of the discovery form, with "Hi, here's my estimate. " added before it.
  - Pre-select the matching service in the form's service dropdown.
  - Scroll to the form and focus the name field.
- **"Send to WhatsApp":** the same summary, starting with "Hi IdeoXpert, I used your calculator:". Open it in a new tab.
- **Analytics:** if an analytics tool is already on the site, send the events `calculator_started` (first answer), `calculator_quote_click` and `calculator_whatsapp_click`, with the one-off low value. If there's no analytics tool, add these as no-op calls behind one small `track()` helper so they're ready later.

---

## Part F: SEO

- **Keywords to cover naturally, without stuffing:**
  - pricing page: "website design pricing", "web design prices", "small business website cost", "WordPress website price", "website hosting plans";
  - calculator: "website cost calculator", "how much does a website cost", "website price estimate", "e-commerce website cost".
  - Use them in the title, H1, first paragraph, one or two H2s, and image alt text where it fits naturally.
- **Structured data** (pass through `BaseLayout`'s `schema` prop):
  - `/pricing`: an `OfferCatalog` of the services. Each is an `Offer` with a `PriceSpecification` (`minPrice`, `priceCurrency: "USD"`) and a link to the service page. Hosting and care plans are `Offer`s with `price` and `priceCurrency`, and a `UnitPriceSpecification` with `unitCode: "MON"`. Plus `FAQPage`.
  - `/website-cost-calculator`: a `WebApplication` (`applicationCategory: "BusinessApplication"`, `offers.price: 0`, `isAccessibleForFree: true`) plus `FAQPage`.
  - Breadcrumbs through the existing `breadcrumbs` prop.
- **Word count:** each page should have at least 700 words of useful, visible text in the static HTML (questions, explanations, FAQ), so it isn't a thin page.
- **Internal links to these pages from:**
  - the header and footer;
  - every service page ("See prices" or "Estimate your cost");
  - the homepage hero line ("Business websites from $900", linking to `/pricing`);
  - the FAQ cost answer;
  - the "How much does a website cost?" blog post.
- **Links out from these pages to:** the portfolio, the contact form and each service page.
- **Social sharing:** set a suitable `image` for both pages. Reuse an existing brand image, for example `/assets/images/elements/service.svg` converted to a PNG or WebP, or a portfolio screenshot. Don't use the 840 KB `bg/16.png`.
- **No duplicate content:** the pricing FAQ appears on both pages, but emit the `FAQPage` schema for it only on `/pricing`. On the calculator page, emit it only if its questions differ. Otherwise use a shortened, different set of 4 questions: 1, 2, 6 and 8.

---

## Part G: Check your work before finishing

1. `npm run build` succeeds, with no `[seo]` warnings.
2. The calculator tests in B8 all pass.
3. Open both pages with `npm run preview` and Playwright at 375 px and 1440 px wide. Take screenshots and check:
   - the layout matches the rest of the site (fonts, colors, spacing, headings with the green dot);
   - nothing overflows sideways;
   - the sticky summary and the mobile sticky bar don't cover the form or the footer;
   - the currency switch, the monthly/annual toggle and the URL state all work;
   - "Start again" clears everything.
4. With JavaScript disabled, both pages still show every price, question and FAQ, and the `<noscript>` table.
5. Click "Get my fixed quote". The form message and hidden field are filled, and the right service is selected. Submit the form locally and confirm `send-mail.php` receives `estimate`.
6. Check that "Send to WhatsApp" opens the right URL with the full summary.
7. Search the new files for the banned words, em dashes and any hard-coded price. There should be none: every price comes from `pricing.ts`.
8. Compare every price on `/pricing`, the calculator, the FAQ and the blog post. They must all match `pricing.ts`.

## When you finish, reply with

- The files you created or changed, with one line on each.
- Screenshots of both pages (mobile and desktop).
- The test results for B8.
- Anything you couldn't do or had to assume.

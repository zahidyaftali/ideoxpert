# IdeoXpert website (Astro)

The ideoxpert.com site, built with [Astro](https://astro.build). Custom design (no CSS framework), Geist type, brand green `#2DB453`, smooth scrolling (Lenis) and scroll animations (GSAP). Company facts, services, projects and testimonials each live in one data file and are used across all pages.

## Commands

Requires Node.js 22.12 or newer.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (first time only) |
| `npm run dev` | Local dev server at http://localhost:4321, reloads on save |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before uploading |
| `npm test` | Check the cost calculator's maths (`scripts/pricing.test.mjs`) |

## Where things live

| To change… | Edit |
|---|---|
| Phone, email, social links, "based in" city | `site` in `src/data/site.ts` |
| Countries (flags in the footer, About menu and portfolio filter) | `countries` in `src/data/site.ts`, flag files in `public/assets/images/flags/` |
| Headline numbers (years, projects, rating) | `stats` in `src/data/site.ts` |
| The list of services (menus, footer, cards, structured data) | `services` in `src/data/site.ts` |
| A service page's text (hero, features, approach steps, SEO title) | `src/data/service-pages.ts` (all service pages use `src/pages/[service].astro`) |
| Portfolio projects | `src/data/projects.ts`, screenshots in `public/assets/images/work/` |
| Testimonials (client stories, approved quotes) | `src/data/testimonials.ts` (see "Testimonials" below) |
| Industry pages and the Industries menu tiles | `src/data/industries.ts`, tile art in `public/assets/images/industries/` |
| Country pages ("Where we work") | `src/data/locations.ts` |
| Blog articles | `src/content/blog/*.md` (covers in `public/assets/images/blog/`) |
| FAQs | `src/data/faqs.ts` |
| Prices, hosting and care plans, payment terms, pricing FAQ | `src/data/pricing.ts`: the only place prices live. `/pricing`, `/website-cost-calculator`, the FAQ cost answer and the cost blog post (`{{price:website}}`-style tokens) all read from it. Exchange rates for GBP and EUR are at the top of the file |
| The "Recently launched" bar at the top | the first project in `src/data/projects.ts` |
| Header, mega menus, mobile menu | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| "Book your 30-minute discovery session" form at the end of every page | `src/components/DiscoverySession.astro` (turn it off on a page with `discovery={false}`) |
| Heading style (thin start, bold ending, green dot) | applied automatically by `src/middleware.ts` |
| Dropdowns (forms, portfolio filters) | `src/components/Select.astro` |
| Where form messages are sent | `public/api/send-mail.php` (see "Contact forms" below) |
| Colours, type, buttons, textures | `src/styles/global.css` |
| Scroll and hover animations | `src/scripts/motion.ts` (smooth scrolling in `src/scripts/smooth.ts`) |
| Page title, meta description, structured data (JSON-LD) | `src/layouts/BaseLayout.astro`, plus the props at the top of each page. Keep titles to 55 characters and descriptions to 155: the build log prints `[seo]` for any page that goes over (limits in `src/data/seo.ts`) |

Adding a page: create `src/pages/new-page.astro` using another page as a template. It is published at `/new-page` and added to `/sitemap.xml` automatically.

Adding a portfolio project: save a screenshot as `public/assets/images/work/<id>.webp` (960px wide; the card scrolls through it on hover, so a tall capture of the homepage works best) and add a line to `recent` in `src/data/projects.ts`. The newest project goes first; it also appears in the top bar.

## Contact forms (email to info@ideoxpert.com)

The Contact page form and the discovery form on every page post to `/api/send-mail.php`, which emails **info@ideoxpert.com** through the Hostinger mailbox. The visitor's address is set as Reply-To, so you answer with a normal reply. Spam protection: a hidden honeypot field, a minimum fill time, a same-site check and a limit of 5 messages per visitor per 10 minutes.

The mailbox login is in `public/api/mail-config.php`. That file is **not in Git** (it is in `.gitignore`) and `.htaccess` refuses to serve it, but the build copies it to `dist/api/`, so uploading `dist/` sets up the mail. It was tested against smtp.hostinger.com on 30 Sept 2026.

- **Live site (Hostinger builds it from GitHub):** the password file is not in GitHub, so give the live site the password in one of two ways:
  1. In the Hostinger deployment settings, add the environment variable `IDEOXPERT_SMTP_PASS` with the mailbox password. The build then writes `dist/api/mail-config.php` itself (see `astro.config.mjs`). Or:
  2. In hPanel File Manager, upload `ideoxpert-mail-config.php` (a copy of the config with the password, kept in the project folder and ignored by Git) to the folder **above** `public_html`. Deploys never touch that folder.
  The build log warns `no mail password` when neither is set; the form then falls back to PHP `mail()`, which often lands in spam.
- On a fresh copy of the project (for example after cloning from GitHub) the local file is missing: copy `public/api/mail-config.sample.php` to `public/api/mail-config.php` and put the mailbox password in `smtp_pass`.
- If you change the mailbox password in hPanel, change it in this file too and upload it again.

Without the config file the script falls back to the server's built-in mail function, which is more likely to land in spam.

## Testimonials

The testimonials slider shows real projects. Until a client approves a quote, their slide shows the project itself (logo, what we built, link to the case study). Each entry in `src/data/testimonials.ts` has a suggested `draft` quote: send it to the client (or ask for their own words), and once they agree, paste the approved text into `quote`, add their `name` and `role`, and set `approved: true`. The slide then shows their quote with 5 stars. Do not publish quotes a client has not approved: fake reviews are illegal in the US and UK.

## Deploying to the current host (LiteSpeed / cPanel)

1. `npm run build`
2. Back up the current `public_html`.
3. Upload **the contents of** `dist/` into `public_html`, including the hidden `.htaccess` file.

`.htaccess` redirects `http://` and `www.` to `https://ideoxpert.com`, serves clean URLs (`/about` for `about.html`), redirects old URLs (`/integrations`, `/index.html`, `/website development`, `/ux-ui-design`), compresses text files, caches `/_astro/` files for a year, and uses `404.html` for missing pages.

### Check right after uploading

Run these commands. Each line shows the expected result.

```sh
curl -sI http://www.ideoxpert.com/about        # 301 -> https://ideoxpert.com/about
curl -sI https://www.ideoxpert.com/            # 301 -> https://ideoxpert.com/
curl -sI https://ideoxpert.com/about           # 200, content-type: text/html
curl -sI https://ideoxpert.com/about.html      # 301 -> /about
curl -sI https://ideoxpert.com/index.html      # 301 -> /
curl -sI https://ideoxpert.com/nope            # 404
curl -s  https://ideoxpert.com/sitemap.xml     # 73 URLs
```

If the site shows a redirect loop, see the note in `.htaccess` step 1.

Also ask the host to relax rate limiting and bot protection for known crawlers. The old site answered GPTBot with `429 Too Many Requests` when it fetched pages quickly. That is a server setting, not something in these files.

## Notes for developers

- Headings: any element with class `display`, `h1`, `h2`, `h3`, `shero__title` or `chero__title` is styled by `src/middleware.ts`. Its last words become bold and it ends with the green dot (not after "?" or "!"). To choose the bold words yourself, wrap them in `<b>` in the heading text.
- Colours: every light section uses one grey (`--paper`, #F5F5F5), and panels and inputs use `--card`. Both are in `src/styles/global.css`.
- Animations are opt-in data attributes (`data-reveal`, `data-split`, `data-autotabs`, `data-carousel`, …), each documented where it is implemented in `src/scripts/motion.ts`. Content is only hidden once the script has started (`html.js`), and everything shows if the script never runs. Visitors who ask for reduced motion get no animation.
- Text and images reveal as they scroll into view. A `data-reveal="clip"` element is watched through its parent, because Chrome ignores elements whose own `clip-path` hides them.
- CSS is inlined into every page (`inlineStylesheets: 'always'` in `astro.config.mjs`). Separate `/_astro/*.css` files are renamed whenever the CSS changes and the old file is deleted on deploy, so a crawler holding an older copy of a page reported a 404 stylesheet (Ahrefs, Oct 2026).
- `compressHTML` is off in `astro.config.mjs` on purpose. Astro's whitespace compression joins inline words and links together ("text link" becomes "textlink").
- Images under `public/assets/images` were resized to at most 1600px wide. The full-size originals are in `../assets/images`.
- Smaller variants are served where images show small: `hero-800.webp` for project cards (with a srcset), `logo*.webp` for client logos, `about/*.webp`, `icon-192.png` / `icon-256.png` for the mark, and `Logo-600.png` in the header. Menu images load only when a menu first opens.

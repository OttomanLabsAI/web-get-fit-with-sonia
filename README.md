# Get fit with Sonia — website

The website for **Get fit with Sonia**: Sonia Tonge's Zumba, keep fit, chair exercise, legs bums and tums, hoop and core, and line dancing classes across Southgate, Winchmore Hill, Palmers Green, Enfield, Whetstone and Barnet.

One fast page, served as static files by Cloudflare Workers. No framework and no build step: the files in `public/` are the site.

## Structure

```
public/
  index.html                the whole site: hero, facts, prices, classes, timetable, about, gallery, reviews, venues, contact
  404.html                  themed not-found page
  login/index.html          placeholder for a future members' area (noindex)
  register/index.html       placeholder for a future members' area (noindex)
  improvements/index.html   the old site and the new one side by side, for Sonia's review (noindex)
  favicon.svg               the logo mark on a lime square
  robots.txt, sitemap.xml
  _headers                  security headers, content-security policy, caching
  _redirects                the old WordPress page addresses, sent to the matching part of the page; old /original/ links, sent to the live site
  assets/
    css/site.css            all styling (Sonia's green brand tokens at the top)
    css/demo-bar.css        the site-pitch demo bar shown on every page while the site is under review
    js/site.js              small enhancements: today's classes, print button, tab deep links
    img/                    logo, Sonia's portrait, gallery photos, sharing image, before/after screenshots
  fonts/                    self-hosted Oswald and Open Sans (from @fontsource, OFL) + fonts.css
work/
  brief.json                every fact on the page, where it came from, and what is unconfirmed
prompt text/                the owner's prompt, reply and supplied files for the version in service
wrangler.jsonc              assets-only Worker config
package.json                wrangler devDependency + dev/deploy/check scripts
```

The page needs no JavaScript to work. `site.js` only highlights today's classes, reveals the print button, lets `#zumba`-style links open a class tab, and turns the photo links into a lightbox.

The header and the contact-details footer stay pinned to the screen at every width. Below 900px the section links become a one-line strip that scrolls sideways.

## Demo chrome

While Sonia reviews the site, every page carries the `site-pitch` demo bar at the top with three tabs: **New site** (`/`), **Current site**, which opens her live WordPress site at www.getfitwithsonia.co.uk in a new tab so the new site stays open beside it, and **Improvements** (`/improvements/`), whose first section has a button that opens the live site in a new tab too. The review page is `noindex` and disallowed in `robots.txt`. Up to v1.5 the Current site tab showed a working copy of the old site at `/original/`; that copy was removed in v1.6, and `_redirects` sends any old link to it on to the live site with a temporary (302) redirect.

To retire the demo chrome when the site goes live: remove the `demo-bar.css` link and the `#pitch-bar` nav from every page, delete `public/improvements/` (and the screenshots under `assets/img/improvements/`), drop the two `/original` lines from `_redirects` and the `/improvements/` disallow line from `robots.txt`, and in `site.css` remove the `.ext` rule (only the Improvements button uses it) and set the header back to `top: 0` and the anchor offsets back down by 48px.

## Local development

```bash
npm install
npm run dev            # wrangler dev, serves public/ at http://localhost:8787
```

Or, with nothing installed: `python3 -m http.server -d public 8000`.

## Editing the site

- **Timetable.** The twelve sessions appear three times in `public/index.html`: the hero card ("This week's classes"), the full timetable (`id="timetable"`) and the venue cards (`id="venues"`). Change all three. Each session carries a colour class (`c-zumba`, `c-keep`, `c-chair`, `c-lbt`, `c-hoop`, `c-line`) on its `slot__class` span, and the class panels under `id="classes"` repeat the "when and where" in words.
- **Prices** are in the facts strip, the prices cards (`id="prices"`), the timetable note and the JSON-LD block in the head.
- **Contact details.** The email and phone number appear in the hero, facts strip, timetable note, contact section, the pinned footer, the JSON-LD block, and every page under `login/`, `register/`, `improvements/` and `404.html`. Search for `sonia.tonge@gmail.com` and `447957971473`.
- **Social links.** Contact section and the JSON-LD `sameAs` list. Instagram is not linked: the handle is unconfirmed (see `work/brief.json`).
- **Gallery layout.** Every photo is shown at its own natural size and proportions, nothing enlarged, shrunk or cropped, in a centred flow whose rows fall where they fall. On phones a photo scales down to the screen width at its own ratio. Portrait originals will sit tall beside landscape ones.
- **Photos** live in `public/assets/img/`. The portrait has two sizes for `srcset`; gallery photos are the 400x284 thumbnails the old site served (the full-size originals are listed in `work/brief.json` and should replace them once supplied). Any photo wrapped in `<a class="zoom" data-group="…" href="large-image">` opens large when clicked; links in the same group step through each other with the arrows, and without JavaScript the link simply opens the image.
- **Improvements page.** A review page for Sonia. To retire it, delete `public/improvements/`, its screenshots under `assets/img/improvements/`, and the `nav__tab` link in the header of every page.
- **Cache stamp.** `site.css`, `site.js` and `fonts.css` are cached for a year. When any of them changes, bump the `?v=` stamp on their links in every HTML file.
- **Colours and type** are custom properties at the top of `site.css`. Lime is only ever used with dark text on it; the darker green carries text on light backgrounds.

## Verification before a release

Run both before every push to `main`; a push to `main` is a production deploy.

```bash
npx wrangler deploy --dry-run
```

Then serve `public/`, render every page with headless Chromium at desktop and phone widths, and look at the screenshots: fonts loaded, layout intact, nothing overflowing at 320px. The `cloudflare-static-site` skill's `render_check.py` and the `site-pitch` skill's `verify-layout.js` do this (routes `/`, `/404.html`, `/login/`, `/register/`, `/improvements/`; the verifier needs `playwright-core` and a system Chromium).

## Deployment

The repository connects to Cloudflare Workers Builds, so every push to `main` deploys to production. Add `www.getfitwithsonia.co.uk` as a custom domain on the Worker and point the DNS at it once Sonia has confirmed the open questions in `work/brief.json`.

## Facts and sources

`work/brief.json` records where every fact on the page came from. Since v1.1 the source is the site's own pages, supplied by the owner as saved copies (kept under `prompt text/`). The questions still open for Sonia are listed there and on the Improvements page.

## External resources

None at runtime. Fonts are self-hosted, there are no analytics or trackers, and the content-security policy in `_headers` allows nothing from other domains. Map links open Google Maps in the visitor's browser.

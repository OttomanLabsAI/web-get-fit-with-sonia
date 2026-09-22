# Get fit with Sonia — website

The website for **Get fit with Sonia**: Sonia Tonge's keep fit, Zumba, legs bums and tums, stretch, hula hooping and chair exercise classes across Winchmore Hill, Southgate, Palmers Green, Enfield and Barnet.

One fast page, served as static files by Cloudflare Workers. No framework and no build step: the files in `public/` are the site.

## Structure

```
public/
  index.html            the whole site: hero, facts, classes, timetable, about, venues, contact
  404.html              themed not-found page
  favicon.svg
  robots.txt            allows indexing; points at the sitemap
  sitemap.xml
  _headers              security headers, content-security policy, caching
  assets/
    css/site.css        all styling (tokens at the top)
    js/site.js          small enhancements: today's classes, print button, tab deep links
    img/og.png          social sharing image (1200 x 630)
  fonts/                self-hosted Oswald and Inter (from @fontsource, OFL) + fonts.css
work/
  brief.json            every fact on the page, where it came from, and what is unconfirmed
wrangler.jsonc          assets-only Worker config
package.json            wrangler devDependency + dev/deploy/check scripts
```

The page needs no JavaScript to work. `site.js` only highlights today's classes, reveals the print button and lets `#keep-fit`-style links open a class tab.

## Local development

```bash
npm install
npm run dev            # wrangler dev, serves public/ at http://localhost:8787
```

Or, with nothing installed: `python3 -m http.server -d public 8000`.

## Editing the site

- **Timetable.** The sessions appear three times in `public/index.html`: the hero card ("This week's classes"), the full timetable (`id="timetable"`) and the venue cards (`id="venues"`). Change all three. A session whose class name is not yet known is labelled "Fitness class"; give it a name and add the matching colour class (`c-keep`, `c-zumba`, `c-lbt`, `c-stretch`, `c-hoop`, `c-chair`) to the `slot__class` span.
- **Contact details.** The email and phone number appear in the hero, facts strip, timetable note, contact section, footer, the JSON-LD block in the head, and `404.html`. Search for `sonia.tonge@gmail.com` and `447957971473`.
- **Social links.** Contact section, footer and the JSON-LD `sameAs` list. Instagram is not linked yet: the handle is unconfirmed (see `work/brief.json`).
- **Cache stamp.** `site.css` and `site.js` are cached for a year. When either changes, bump the `?v=` stamp on their links in `index.html` and `404.html`.
- **Colours and type** are custom properties at the top of `site.css`.

## Verification before a release

Run both before every push to `main`; a push to `main` is a production deploy.

```bash
npx wrangler deploy --dry-run
```

Then serve `public/`, render it with headless Chromium at desktop and phone widths, and look at the screenshots: fonts loaded, layout intact, nothing overflowing at 320px. The `cloudflare-static-site` skill's `render_check.py` and the `site-pitch` skill's `verify-layout.js` do this (the verifier needs `playwright-core` and a system Chromium).

## Deployment

The repository connects to Cloudflare Workers Builds, so every push to `main` deploys to production. Connect it once in the Cloudflare dashboard (Workers & Pages → Create → Import a repository), then add `www.getfitwithsonia.co.uk` as a custom domain on the Worker and point the DNS at it.

## Facts and sources

`work/brief.json` records where every fact on the page came from and which ones are still unconfirmed, plus the questions to put to Sonia before the site goes live (class names for seven sessions, the phone number, Instagram handle, prices, photos and testimonials).

## External resources

None at runtime. Fonts are self-hosted, there are no analytics or trackers, and the content-security policy in `_headers` allows nothing from other domains. Map links open Google Maps in the visitor's browser.

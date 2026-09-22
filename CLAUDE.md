# CLAUDE.md

Standing policy for this repository. Read it before making any change here.

## What this repo is

The website for Get fit with Sonia (Sonia Tonge, fitness instructor, North London), built as a Cloudflare Workers static-assets site. Everything served lives in `public/` and there is no build step - the files in that directory are the site. The repo is connected to Cloudflare Workers Builds, so **every push to `main` deploys to production**.

```
public/            everything served
  index.html       the whole site on one page
  404.html, login/, register/, improvements/   themed side pages (the last three are noindex)
  original/        working copy of the old site for the demo bar's Current site tab (noindex)
  assets/css|js|img
  fonts/           self-hosted Oswald and Open Sans
  _headers         security + caching headers
  _redirects       old WordPress page addresses -> parts of the page
  robots.txt, sitemap.xml
work/brief.json    every fact on the page and its source
prompt text/       the owner's prompt, reply and supplied files for the version in service
wrangler.jsonc     assets-only config, no Worker script
package.json       wrangler devDependency + dev/deploy/check scripts
```

## Local development

```bash
npm install
npm run dev          # wrangler dev
```

## Verification - before every push to main

1. `npx wrangler deploy --dry-run`
2. Serve `public/`, render it with headless Chromium, and inspect the
   screenshots: styles applied, fonts loaded, layout intact, nothing
   overflowing at 320px.

Never leave pushed work unverified or half-finished. Work in small, complete
batches: implement, verify, commit, push.

## Git and release workflow

- Before committing: `git config user.name "Fid" && git config user.email "fid_kk@proton.me"`
- Develop on the working branch and push there first. Release verified work by
  fast-forwarding `main` onto it and pushing `main`.
- Every push to `main` is a release. Versions are an ascending `vMAJOR.MINOR`
  sequence starting at `v1.0`; every push bumps the minor regardless of size. A
  major bump is reserved for a ground-up overhaul.
- With every push to `main`, provide release-tag text in the reply, in exactly
  this shape. The owner creates the GitHub release manually - **never push tags**:

  ```
  Tag: v<next>  —  Title: <five to nine words, plain and evocative>
  Description: <one to three sentences of editorial prose describing what changed
  from the owner's point of view — outcomes, not implementation. No bullet lists,
  no jargon, no file names.>
  ```

- Append the release line to the ledger below as part of the same push.
- Commit messages: descriptive imperative first line (what the change does, not
  "update X"), then a short prose body; dash bullets are fine there. One commit
  per coherent piece of work; several may share a push, but each push gets
  exactly one version entry.
- Never include model names, AI attribution trailers, session links, or other
  tooling identifiers in commit messages, titles, or code.

## Prompt archive

`prompt text/` holds the records for the version currently in service -
nothing else. Shipping version N replaces the folder's contents wholesale, in
the same push that releases the version: remove the previous version's
folder(s) and add `prompt text/N/` containing `input.txt` (the prompt, byte for
byte), `output.txt` (the reply that shipped it, byte for byte), `ai model.txt`
(three lines: Anthropic / Claude / Fable 5 Max unless the owner directs
otherwise) and any input images or files the owner provided. The files are
owner-supplied records: never edit, reformat, trim or regenerate them.

## The page itself

The content is Sonia's and every fact on it traces to `work/brief.json`, whose
source since v1.1 is the saved copies of her own pages under `prompt text/`. Do
not add a price, a session, a claim or a link that the brief cannot source; put
the gap in the brief's `questions` instead. The social links are still
unconfirmed. The header and the contact footer stay pinned at every width. Every
page carries the site-pitch demo bar (New site, Current site, Improvements)
while Sonia reviews; the README's "Demo chrome" section says exactly what to
remove when the site goes live, including `public/original/`,
`public/improvements/`, the `/original/*` headers block and the robots lines. When `site.css`, `site.js` or `fonts.css` change, bump
their `?v=` stamps in every HTML file.

## Release ledger

| Version | Title | Description |
| --- | --- | --- |
| v1.0 | A new home for Sonia's classes | Everything a new face needs is now on one quick page: the week's classes with venues, postcodes and map links, what each kind of class is like, who Sonia is, and how to get in touch before a first session. It loads fast on a phone, reads clearly, and prints as a one-sheet timetable. |
| v1.1 | Sonia's own photos, prices and full timetable | The page now wears Sonia's green logo and colours, shows her photo and pictures from her classes, and carries every one of her twelve sessions by name, with prices and three reviews from regulars. Her number and email stay pinned to the bottom of the screen, the header stays in view, Log in and Register buttons are ready for a members' area, and an Improvements tab shows the old site and the new one side by side. |
| v1.2 | Every photo opens large when tapped | Tap any picture, Sonia's portrait, the gallery or the before-and-after shots, and it opens big with arrows to step through the set and a close button, on phone and desktop alike. The cropped gallery shots are noted for replacement with the full-size originals from the old site. |
| v1.3 | A demo bar to flick between old and new | Every page now has a bar at the very top with three tabs, the new site, a working copy of the current one, and the Improvements page, so Sonia can flick between them on her phone. The gallery is a centred composition where each photo keeps its own shape, the two group shots run larger, and the testimonial cards say so. |
| v1.4 | Enlarged photos keep their true shape | Tapping a photo now shows it at exactly its own proportions on every screen, with no black bars around portrait pictures on desktop. |

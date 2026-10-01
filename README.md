# SIX Website — V2 Concept Prototype

A second, independent concept build for the next SIX website, created as a
webmaster demonstration. It lives **separate** from the `six-website-prototype`
(V5) repo — nothing in the original was modified.

## What this is

- `index.html` — single-page concept build
- `assets/css/site.css` — original "stage light" design system (vanilla CSS, no framework)
- `assets/js/site.js` — navigation, modals, scroll reveals, interactive "anatomy of the sound"
- `assets/js/schedule.js` — **sample** schedule data generated from the standing show pattern
- `robots.txt` — disallow (concept builds stay out of search engines)
- Photography: working concept images carried over from the V5 prototype; final
  approved brother photography (including Kevin's licensed photo) is still pending.

## What V2 adds over V5

1. **A real schedule section** — filterable performance list (All / Evening / Matinee)
   rendered from a single data file, so swapping in the live ticket-seller feed is a
   one-file change. Clearly badged as sample data.
2. **Interactive "anatomy of the six-voice band"** — tap each voice part to see its role.
3. **Ticket & contact modals** that demonstrate the intended handoff UX while holding
   the deliberate prototype boundary (nothing sells, nothing submits).
4. **Webmaster fundamentals**: semantic HTML, JSON-LD `MusicGroup` structured data,
   Open Graph tags, `noindex`, skip link, ARIA states, keyboard-dismissable modals,
   `prefers-reduced-motion` support, lazy-loaded images, responsive down to phones.

## Prototype boundaries (unchanged)

- Not the live `thesixshow.com`. No tickets are sold here. Schedule dates are
  illustrative. Final copy, approved photography, trailer media, reviews/awards
  verification, contact routing and the ticket-seller decision remain open.

## Preview

Open `index.html` in a browser, or:

```sh
cd six-website-prototype-v2
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy

Static hosting only. For GitHub Pages: push to `main`, enable Pages from the
repository settings (Deploy from branch → `main` / root).

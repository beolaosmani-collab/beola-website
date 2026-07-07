# B.O. BEOLA — Website

A fast, static, **trilingual (Albanian · English · German)** website for
**B.O. BEOLA / BEOLA Sh.p.k.** — a family business in Tirana that imports, sells
and services **German household appliances** (Miele, Siemens, Bosch, AEG).

No database, no login, no server. Every page is plain HTML/CSS/JS and is hosted
for free on **GitHub Pages**.

- 🌍 Live: https://beolaosmani-collab.github.io/beola-website/
- ✏️ **To change content:** edit **[`data/site.mjs`](data/site.mjs)** — see **[OWNER_GUIDE.md](OWNER_GUIDE.md)**.
- 🧾 What changed recently: **[CHANGELOG.md](CHANGELOG.md)**
- ✅ Release checks: **[QA_CHECKLIST.md](QA_CHECKLIST.md)**

---

## How it works (single source of truth + generator)

All text, contact details, branches, categories, FAQ and reviews live in **one
file**: `data/site.mjs`. A tiny zero-dependency Node script, `build.mjs`, reads
that file and writes the finished pages:

```
/index.html              → language redirect (detects browser language)
/sq/  /en/  /de/          → home pages (Albanian is default)
/sq/yzberisht/  …        → one page per branch, per language (SEO)
sitemap.xml               → all URLs with hreflang
```

Because the content is **baked into the HTML**, the phone number, email and
addresses are correct even before any JavaScript runs. JS only adds the mobile
menu and the “send via WhatsApp/email” form — nothing essential depends on it.

### Rebuild after editing `data/site.mjs`

```bash
node build.mjs
```

You usually **don’t need to run this yourself**: a GitHub Action rebuilds the
site automatically whenever `data/site.mjs` (or styles/scripts/images) changes on
GitHub. See [OWNER_GUIDE.md](OWNER_GUIDE.md).

---

## Project structure

```
beola-website/
├── data/site.mjs         ← ✏️ EVERYTHING you edit (content, contacts, branches…)
├── build.mjs             ← generator (turns data into pages) — no need to edit
├── css/styles.css        ← design (colours in :root at the top)
├── js/main.js            ← mobile menu + contact form only
├── images/               ← photos (.jpg) + generated .webp
├── index.html  sq/ en/ de/   ← GENERATED — do not hand-edit
├── sitemap.xml  robots.txt  favicon.svg
├── server.js             ← local preview only (node server.js → localhost:4599)
├── OWNER_GUIDE.md  CHANGELOG.md  QA_CHECKLIST.md
└── .github/workflows/build.yml   ← auto-rebuild on GitHub
```

## Brands & content rules
German appliances only. Brands featured: **Miele, Siemens, Bosch, AEG**. No
Italian appliances, Samsung, Neff or Bauknecht. Claims that aren’t confirmed
(delivery, warranty, financing) are kept as clearly-marked `TODO` in
`data/site.mjs` and are **hidden** until you turn them on — the site never shows
something that isn’t true.

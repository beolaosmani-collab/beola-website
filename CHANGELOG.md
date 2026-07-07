# Changelog

## Production upgrade — trilingual static generator, SEO, conversion & performance

### Architecture
- **Single source of truth:** all content, contacts, branches, categories, FAQ and
  reviews now live in `data/site.mjs`. Added a zero-dependency Node generator
  `build.mjs`.
- **Per-language URLs for SEO:** replaced the single JS-switched page with real
  static pages `/sq/`, `/en/`, `/de/` (Albanian default) plus a root
  language-redirect at `/`.
- **Dedicated branch pages:** `/{lang}/yzberisht/`, `/{lang}/mezez/`,
  `/{lang}/vaqarr/` — each with address, both phones, hours, map, directions CTA,
  breadcrumb and localised title/description.
- **hreflang + canonical:** every page self-references its canonical and links all
  language alternates (+ `x-default`); regenerated `sitemap.xml` with hreflang.
- Removed the old runtime `js/config.js` and `js/translations.js` (content moved
  into `data/site.mjs`); `js/main.js` slimmed to mobile-menu + form only.

### Correctness (audit fixes)
- **No placeholder contact data in HTML.** Real phone/email/Instagram/addresses
  are baked into every page, so contact details are truthful **without JS**.
  Removed `+355 69 000 0000`, `info@beola.al`, `@beola`, and all `data-config`/
  `data-i18n` fallbacks.
- **Email:** replaced `kontakt@beolashpk.com` with **`beolashpk@gmail.com`**
  everywhere (pages, footer, JSON-LD, `mailto:`, form target, docs).

### Content & conversion
- Sharpened hero value proposition (what we sell + 20+ years + 3 branches).
- Primary actions kept prominent: **Call now**, **WhatsApp**, **Get directions**.
- New sections: **In focus / featured** (data-driven, WhatsApp CTA per card),
  **How it works** process, **branch cards**, **reviews** scaffold (honest empty
  state, no fake stars), and an **FAQ** (stock, showroom visits, service,
  locations) with `FAQPage` structured data.
- Product categories use **real photography** instead of generic icons.

### SEO / structured data
- `Organization` + `HomeGoodsStore` graph on home with `department` per branch,
  `openingHoursSpecification`, `sameAs`, email; `FAQPage`.
- Each branch page emits a branch-specific `HomeGoodsStore` + `BreadcrumbList`.
- Per-language `<title>`, meta description, Open Graph title/description/locale,
  Twitter card, and `<html lang>`.

### Performance
- Hero converted from CSS background to semantic `<picture>` with **WebP + JPEG**
  fallback; LCP image **preloaded** with `fetchpriority="high"`.
- All images get WebP variants; below-the-fold images stay `loading="lazy"`.
- Runtime JS reduced (no more client-side i18n/rendering).

### Accessibility
- Real `<a>` language-switch links between equivalent pages (with `hreflang` /
  `aria-current`); retained skip link, visible focus, reduced-motion.
- Form: `autocomplete` on inputs, visible required markers, inline error messages,
  `aria-invalid` handling, and a polite success status region.
- Comfortable tap targets; mobile nav unchanged and working.

### Tooling / maintainability
- `.github/workflows/build.yml` rebuilds the site automatically when
  `data/site.mjs` (or css/js/images) changes — the owner can edit on GitHub with
  no local tools.
- Added `OWNER_GUIDE.md`, `QA_CHECKLIST.md`; rewrote `README.md`.
- `server.js` local preview now serves directory indexes (e.g. `/sq/`).

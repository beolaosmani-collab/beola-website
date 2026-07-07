# QA Checklist

Status legend: ✅ verified in this pass · 🔎 spot-check on the **live** site
(Google Maps embeds and real phones are blocked in the local preview sandbox).

## Build / integrity
- ✅ `node build.mjs` generates root + 3 home pages + 9 branch pages + sitemap with no errors.
- ✅ No `kontakt@beolashpk.com`, `info@beola.al`, `+355 69 000 0000`, `@beola`, `[PLACEHOLDER]`, `data-config`, or `data-i18n` anywhere in the repo.
- ✅ `beolashpk@gmail.com` used consistently (pages, footer, JSON-LD, mailto, form).

## Desktop
- ✅ Home renders: hero → trust bar → featured → about → process → products → branches → reviews → locations → FAQ → contact → footer.
- ✅ Branch page renders: breadcrumb, branch hero + CTAs, address/phone/email/hours card, services, map area, directions.
- ✅ Hero image loads via `<picture>` (WebP) with correct overlay/legibility.
- 🔎 Google Maps embeds display (live only).

## Mobile
- ✅ Hamburger menu opens/closes; nav links close it (`aria-expanded` toggles).
- ✅ Header collapses to phone icon; language switch + call button reachable.
- 🔎 Tap “Call” / “WhatsApp” / “Get directions” on a real phone.

## No-JS fallback truthfulness
- ✅ With JS disabled, every page still shows the **real** phone(s), email,
  Instagram, addresses and hours (baked into HTML).
- ✅ `tel:`, `mailto:`, `wa.me`, Instagram and Google-directions links are real
  anchors that work without JS. (Only the pre-filled contact **form** needs JS.)

## Accessibility
- ✅ Skip link, visible `:focus-visible` outlines, `prefers-reduced-motion` respected.
- ✅ Language switch = real links with `hreflang`/`aria-current`.
- ✅ Form: `autocomplete` (name/tel), required markers, inline errors, `aria-invalid`,
  polite success status.
- ✅ Single `<h1>` per page; landmarks (`header`/`main`/`footer`/`nav`).
- 🔎 Screen-reader pass + colour-contrast audit (Lighthouse/axe) on live site.

## SEO
- ✅ Per-language `<title>`, meta description, OG title/description/locale, Twitter card, `<html lang>`.
- ✅ Self-referencing `canonical` + `hreflang` alternates (+ `x-default`) on every page.
- ✅ `sitemap.xml` lists all 12 content URLs with hreflang; `robots.txt` points to it.
- 🔎 Submit sitemap in Google Search Console; request indexing.

## Structured data
- ✅ JSON-LD parses on home (`Organization`+`HomeGoodsStore` graph with `department` per branch, `FAQPage`) and branch pages (`HomeGoodsStore` + `BreadcrumbList`).
- 🔎 Validate on https://search.google.com/test/rich-results (live URL).

## Links & contact actions
- ✅ Nav, footer, branch “view”, and cross-language links resolve (relative paths).
- ✅ Contact form builds a pre-filled WhatsApp/email message; validation blocks empty name/phone.
- 🔎 Click every CTA on the live site once (call, WhatsApp, directions ×3 branches, Instagram, email).

## Performance
- ✅ LCP hero preloaded (`fetchpriority="high"`), WebP+JPEG; below-fold images lazy.
- ✅ Minimal render-blocking JS (`defer`), no runtime rendering.
- 🔎 Run Lighthouse on the live URL (target: Performance & Best Practices 90+).

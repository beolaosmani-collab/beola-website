/* =============================================================================
   B.O. BEOLA — STATIC SITE GENERATOR  (zero dependencies)
   -----------------------------------------------------------------------------
   Reads data/site.mjs and writes fully-baked, per-language static pages:

       /index.html                 → language redirect + hreflang
       /sq/  /en/  /de/            → home pages (real content baked in)
       /sq/<branch>/ …            → one page per branch per language
       sitemap.xml                 → all URLs with hreflang alternates

   Every page contains the correct, production contact details in the HTML itself
   (no JavaScript is required for the contact info to be truthful).

   Run:   node build.mjs
============================================================================= */

import { SITE } from "./data/site.mjs";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const C = SITE.contact;

/* ---------- small helpers ---------- */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const enc = encodeURIComponent;
const prefix = (depth) => "../".repeat(depth);                     // to site root
const pagePath = (lang, slug) => slug ? `/${lang}/${slug}/` : `/${lang}/`;
const absUrl = (path) => SITE.baseUrl + path;                     // path starts with "/"
const telHref = (dial) => `tel:${dial}`;
const mailHref = () => `mailto:${C.email}`;
const waHref = (text) => `https://wa.me/${C.whatsapp}${text ? `?text=${enc(text)}` : ""}`;
const mapEmbed = (addr) => `https://www.google.com/maps?q=${enc(addr)}&output=embed`;
const mapDir = (addr) => `https://www.google.com/maps/dir/?api=1&destination=${enc(addr)}`;
const igLabel = C.instagramHandle || "Instagram";

/* responsive <picture> with webp + jpg fallback */
function pic(P, name, alt, w, h, opts = {}) {
  const load = opts.eager
    ? ' fetchpriority="high" decoding="async"'
    : ' loading="lazy" decoding="async"';
  const cls = opts.cls ? ` class="${opts.cls}"` : "";
  return `<picture${cls}><source srcset="${P}images/${name}.webp" type="image/webp">` +
    `<img src="${P}images/${name}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${load}></picture>`;
}

/* inline icons */
const IC = {
  call: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.7-.1 1.2z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.8-11.2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
  retail: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M3 9l2-4h14l2 4M4 9v10h16V9M3 9h18M9 13h6"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M2 7h12v8H2zM14 10h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z"/></svg>`,
  map: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z"/><circle cx="12" cy="9" r="2.4" fill="currentColor"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
};
const applianceStrip = `<svg class="appliance-strip" viewBox="0 0 116 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><g transform="translate(1,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="4" y1="6" x2="20" y2="6"/><rect x="4" y="9" width="16" height="12" rx="1"/></g><g transform="translate(30,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="1" y1="7" x2="23" y2="7"/><circle cx="12" cy="15.5" r="5.5"/><circle cx="12" cy="15.5" r="2.2"/></g><g transform="translate(60,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="1" y1="7" x2="23" y2="7"/><path d="M7 11c1.1 1.1 1.1 2.9 0 4M12 11c1.1 1.1 1.1 2.9 0 4M17 11c1.1 1.1 1.1 2.9 0 4"/></g><g transform="translate(90,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><circle cx="7" cy="6" r="2"/><circle cx="16" cy="6" r="2"/><rect x="4" y="11" width="16" height="10" rx="1"/></g></svg>`;
const brandLogo = `${applianceStrip}<span class="logo-word"><span class="brand-beola">BEOLA</span> <span class="brand-shpk">SHPK</span></span>`;

/* ---------- head ---------- */
function head(lang, P, { title, desc, canonicalPath, slug, isBranch }) {
  const alts = SITE.langs.map((l) =>
    `<link rel="alternate" hreflang="${l}" href="${absUrl(pagePath(l, isBranch ? slug : ""))}" />`).join("\n  ");
  const xdefault = `<link rel="alternate" hreflang="x-default" href="${absUrl(pagePath(SITE.defaultLang, isBranch ? slug : ""))}" />`;
  const ogImg = `${SITE.baseUrl}/images/hero.jpg`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="author" content="${esc(SITE.brand.legal)}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#1a1a1a" />

  <link rel="canonical" href="${absUrl(canonicalPath)}" />
  ${alts}
  ${xdefault}

  <meta property="og:type" content="${isBranch ? "business.business" : "website"}" />
  <meta property="og:site_name" content="B.O. BEOLA" />
  <meta property="og:url" content="${absUrl(canonicalPath)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:locale" content="${SITE.ogLocale[lang]}" />
  ${SITE.langs.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${SITE.ogLocale[l]}" />`).join("\n  ")}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${ogImg}" />

  <link rel="icon" href="${P}favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="preload" as="image" href="${P}images/hero.webp" type="image/webp" fetchpriority="high" />
  <link rel="stylesheet" href="${P}css/styles.css" />`;
}

/* ---------- header ---------- */
function header(lang, P, t, { slug, isBranch }) {
  const homeBase = `${P}${lang}/`;
  const nav = [
    ["about", t.nav_about], ["featured", t.nav_featured], ["products", t.nav_products],
    ["branches", t.nav_branches], ["locations", t.nav_locations], ["faq", t.nav_faq], ["contact", t.nav_contact],
  ].map(([id, label]) => `<a href="${homeBase}#${id}">${esc(label)}</a>`).join("\n        ");

  const langLinks = SITE.langs.map((l) => {
    const href = `${P}${l}/${isBranch ? slug + "/" : ""}`;
    const on = l === lang;
    return `<a href="${href}" lang="${l}" hreflang="${l}" class="lang-btn${on ? " is-active" : ""}"${on ? ' aria-current="true"' : ""} aria-label="${esc(SITE.langName[l])}">${SITE.langLabel[l]}</a>`;
  }).join("");

  return `
  <a href="#main" class="skip-link">${esc(t.skip)}</a>
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a href="${homeBase}" class="logo" aria-label="BEOLA SHPK — B.O. BEOLA">${brandLogo}</a>
      <nav class="main-nav" id="main-nav" aria-label="${esc(t.nav_about)}">
        ${nav}
      </nav>
      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="${esc(t.lang_switch)}">${langLinks}</div>
        <a href="${telHref(C.phone1Dial)}" class="btn btn-primary btn-call header-call" aria-label="${esc(t.call_aria)} ${esc(C.phone1Display)}">
          ${IC.call}<span>${esc(C.phone1Display)}</span>
        </a>
        <button type="button" class="nav-toggle" id="nav-toggle" aria-label="${esc(t.menu)}" aria-expanded="false" aria-controls="main-nav">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

/* ---------- footer ---------- */
function footer(lang, P, t) {
  const homeBase = `${P}${lang}/`;
  const branchLinks = SITE.branches.map((b) =>
    `<a href="${P}${lang}/${b.slug}/">${esc(b.area)}</a>`).join("\n        ");
  const phone2 = C.phone2Display
    ? `<a href="${telHref(C.phone2Dial)}">${esc(C.phone2Display)}</a>` : "";
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">${brandLogo}</div>
        <p>${esc(t.footer_tagline)}</p>
        <ul class="brand-list footer-brands">${SITE.brand.appliances.map((b) => `<li>${b}</li>`).join("")}</ul>
      </div>
      <div class="footer-links">
        <h4>${esc(t.footer_quick)}</h4>
        <a href="${homeBase}#about">${esc(t.nav_about)}</a>
        <a href="${homeBase}#products">${esc(t.nav_products)}</a>
        <a href="${homeBase}#locations">${esc(t.nav_locations)}</a>
        <a href="${homeBase}#faq">${esc(t.nav_faq)}</a>
        <a href="${homeBase}#contact">${esc(t.nav_contact)}</a>
      </div>
      <div class="footer-links">
        <h4>${esc(t.footer_branches)}</h4>
        ${branchLinks}
      </div>
      <div class="footer-contact">
        <h4>${esc(t.footer_contact)}</h4>
        <a href="${telHref(C.phone1Dial)}">${esc(C.phone1Display)}</a>
        ${phone2}
        <a href="${mailHref()}">${esc(C.email)}</a>
        <a href="${C.instagram}" target="_blank" rel="noopener">${esc(igLabel)}</a>
      </div>
    </div>
    <div class="footer-bottom"><div class="container">
      <span>&copy; ${YEAR} ${esc(SITE.brand.legal)} — ${esc(t.footer_rights)}</span>
    </div></div>
  </footer>
  <script src="${P}js/main.js" defer></script>
</body>
</html>`;
}
const YEAR = 2026; // build stamp (kept static so no Date() needed at generate time)

/* ---------- JSON-LD ---------- */
function hoursSpec() {
  return [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: SITE.hours.weekday.opens, closes: SITE.hours.weekday.closes },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: SITE.hours.sunday.opens, closes: SITE.hours.sunday.closes },
  ];
}
function branchLD(lang, b) {
  return {
    "@type": "HomeGoodsStore",
    "@id": absUrl(pagePath(lang, b.slug)) + "#store",
    name: `${SITE.brand.short} — ${b.area}`,
    image: `${SITE.baseUrl}/images/storefront.jpg`,
    url: absUrl(pagePath(lang, b.slug)),
    telephone: C.phone1Dial,
    email: C.email,
    priceRange: "$$",
    sameAs: [C.instagram],
    parentOrganization: { "@type": "Organization", name: SITE.brand.legal },
    address: {
      "@type": "PostalAddress", streetAddress: b.address, addressLocality: "Tiranë",
      addressRegion: "Tiranë", ...(b.postalCode ? { postalCode: b.postalCode } : {}), addressCountry: "AL",
    },
    areaServed: "Tiranë, Albania",
    brand: SITE.brand.appliances,
    openingHoursSpecification: hoursSpec(),
  };
}
function homeLD(lang, t) {
  const org = {
    "@type": ["Organization", "HomeGoodsStore"],
    "@id": SITE.baseUrl + "/#org",
    name: SITE.brand.legal,
    url: absUrl(pagePath(lang, "")),
    image: `${SITE.baseUrl}/images/hero.jpg`,
    logo: `${SITE.baseUrl}/favicon.svg`,
    telephone: C.phone1Dial,
    email: C.email,
    sameAs: [C.instagram],
    brand: SITE.brand.appliances,
    areaServed: "Tiranë, Albania",
    address: {
      "@type": "PostalAddress", streetAddress: SITE.branches[0].address, addressLocality: "Tiranë",
      addressRegion: "Tiranë", postalCode: SITE.branches[0].postalCode, addressCountry: "AL",
    },
    openingHoursSpecification: hoursSpec(),
    department: SITE.branches.map((b) => branchLD(lang, b)),
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: SITE.faq.map((f) => ({
      "@type": "Question", name: f.q[lang],
      acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
    })),
  };
  return { "@context": "https://schema.org", "@graph": [org, faq] };
}

/* ---------- HOME sections ---------- */
function heroSection(lang, P, t) {
  return `
    <section class="hero" id="home">
      ${pic(P, "hero", t.hero_h1, 1920, 1040, { eager: true, cls: "hero-media" })}
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <p class="hero-eyebrow">${esc(t.hero_eyebrow)}</p>
        <h1>${esc(t.hero_h1)}</h1>
        <p class="hero-sub">${esc(t.hero_sub)}</p>
        <div class="hero-phone">
          <span class="hero-phone-label">${esc(t.hero_call_label)}</span>
          <a href="${telHref(C.phone1Dial)}" class="hero-phone-number">${esc(C.phone1Display)}</a>
        </div>
        <div class="hero-buttons">
          <a href="${telHref(C.phone1Dial)}" class="btn btn-primary">${IC.call}<span>${esc(t.btn_call)}</span></a>
          <a href="${waHref(t.wa_greeting)}" class="btn btn-whatsapp" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.btn_wa)}</span></a>
          <a href="#locations" class="btn btn-outline">${IC.pin}<span>${esc(t.btn_locations)}</span></a>
          <a href="${C.instagram}" class="btn btn-outline" target="_blank" rel="noopener">${IC.ig}<span>${esc(t.btn_instagram)}</span></a>
        </div>
        <div class="hero-brands">
          <span class="hero-brands-label">${esc(t.brands_label)}</span>
          <ul class="brand-list">${SITE.brand.appliances.map((b) => `<li>${b}</li>`).join("")}</ul>
        </div>
      </div>
    </section>`;
}
function trustBar(t) {
  const items = [
    [IC.retail, t.trust_retail], [IC.truck, t.trust_germany],
    [IC.map, t.trust_albania], [IC.shield, t.trust_pro],
  ];
  return `
    <section class="trust-bar" aria-label="${esc(SITE.brand.short)}">
      <div class="container trust-inner">
        ${items.map(([ic, label]) => `<div class="trust-item">${ic}<span>${esc(label)}</span></div>`).join("\n        ")}
      </div>
    </section>`;
}
function featuredSection(lang, P, t) {
  const cards = SITE.featured.map((f) => `
        <article class="feature-card">
          ${pic(P, f.image, f.title[lang], 1000, 800, { cls: "feature-card-photo" })}
          <div class="feature-card-body">
            <h3>${esc(f.title[lang])}</h3>
            <p>${esc(f.note[lang])}</p>
            <a class="feature-card-cta" href="${waHref(t.wa_availability + " " + f.title[lang])}" target="_blank" rel="noopener">${esc(t.featured_cta)} ${IC.wa}</a>
          </div>
        </article>`).join("");
  return `
    <section class="section" id="featured">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.featured_kicker)}</span>
          <h2>${esc(t.featured_title)}</h2>
          <p class="section-sub">${esc(t.featured_sub)}</p>
        </div>
        <div class="feature-grid">${cards}
        </div>
      </div>
    </section>`;
}
function aboutSection(lang, P, t) {
  const feats = [
    [t.feat_family_t, t.feat_family_d], [t.feat_years_t, t.feat_years_d],
    [t.feat_import_t, t.feat_import_d], [t.feat_tech_t, t.feat_tech_d],
  ];
  return `
    <section class="section" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <span class="kicker">${esc(t.about_kicker)}</span>
            <h2>${esc(t.about_title)}</h2>
            <p>${esc(t.about_p1)}</p>
            <p>${esc(t.about_p2)}</p>
          </div>
          ${pic(P, "about-workshop", t.feat_tech_t, 1200, 900, { cls: "about-media" })}
        </div>
        <ul class="feature-list">
          ${feats.map(([tt, dd]) => `<li><h3>${esc(tt)}</h3><p>${esc(dd)}</p></li>`).join("\n          ")}
        </ul>
      </div>
    </section>`;
}
function processSection(lang, t) {
  return `
    <section class="section section-alt" id="process">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.process_kicker)}</span>
          <h2>${esc(t.process_title)}</h2>
        </div>
        <ol class="process-grid">
          ${SITE.process.map((s, i) => `<li class="process-step"><span class="process-num">${i + 1}</span><h3>${esc(s.title[lang])}</h3><p>${esc(s.desc[lang])}</p></li>`).join("\n          ")}
        </ol>
      </div>
    </section>`;
}
function productsSection(lang, P, t) {
  const cards = SITE.categories.map((c) => `
          <article class="product-card">
            ${pic(P, c.image, c.title[lang], 640, 420, { cls: "product-photo" })}
            <div class="product-body"><h3>${esc(c.title[lang])}</h3><p>${esc(c.desc[lang])}</p></div>
          </article>`).join("");
  const gallery = ["gallery-washers", "gallery-ovens", "gallery-warehouse"]
    .map((g, i) => `<figure>${pic(P, g, [t.gallery_title, t.gallery_title, t.gallery_title][i], 1000, 800)}</figure>`).join("\n          ");
  return `
    <section class="section" id="products">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.prod_kicker)}</span>
          <h2>${esc(t.prod_title)}</h2>
          <p class="section-sub">${esc(t.prod_sub)}</p>
        </div>
        <div class="product-grid">${cards}
        </div>
        <div class="gallery-head"><span class="kicker">${esc(t.gallery_kicker)}</span><h3>${esc(t.gallery_title)}</h3></div>
        <div class="product-gallery">
          ${gallery}
        </div>
        <p class="product-note">${esc(t.prod_note)}</p>
      </div>
    </section>`;
}
function branchesSection(lang, P, t) {
  const cards = SITE.branches.map((b) => {
    const services = t.branch_services.map((s) => `<li>${esc(s)}</li>`).join("");
    return `
        <article class="branch-card${b.isMain ? " is-main" : ""}">
          ${b.isMain ? `<span class="branch-badge">${esc(t.badge_main)}</span>` : ""}
          <h3>${esc(SITE.brand.short)} — ${esc(b.area)}</h3>
          <p class="branch-landmark">${esc(b.landmark[lang])}</p>
          <p class="branch-desc">${esc(t.branch_desc)}</p>
          <div class="branch-meta">
            <div class="row"><span>${esc(t.label_address)}</span><span>${esc(b.address)}</span></div>
            <div class="row"><span>${esc(t.label_hours)}</span><span>${SITE.hours.lines[lang].map(esc).join("<br>")}</span></div>
          </div>
          <div class="branch-actions">
            <a class="btn btn-primary btn-sm" href="${telHref(C.phone1Dial)}">${IC.call}<span>${esc(t.btn_call)}</span></a>
            <a class="btn btn-dark btn-sm" href="${mapDir(b.address)}" target="_blank" rel="noopener">${esc(t.btn_directions)}</a>
            <a class="btn btn-ghost btn-sm" href="${P}${lang}/${b.slug}/">${esc(t.branch_view)} →</a>
          </div>
        </article>`;
  }).join("");
  return `
    <section class="section section-alt" id="branches">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.branches_kicker)}</span>
          <h2>${esc(t.branches_title)}</h2>
          <p class="section-sub">${esc(t.branches_sub)}</p>
        </div>
        <div class="branch-grid">${cards}
        </div>
      </div>
    </section>`;
}
function reviewsSection(lang, t) {
  const hasReviews = SITE.reviews.length > 0;
  const body = hasReviews
    ? `<div class="review-grid">${SITE.reviews.map((r) => `<blockquote class="review"><p>${esc(r.textByLang[lang])}</p><cite>${esc(r.author)}</cite></blockquote>`).join("")}</div>`
    : `<div class="reviews-empty"><p>${esc(t.reviews_empty)}</p><a class="btn btn-dark" href="${C.instagram}" target="_blank" rel="noopener">${IC.ig}<span>${esc(t.reviews_cta)}</span></a></div>`;
  return `
    <section class="section" id="reviews">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.reviews_kicker)}</span>
          <h2>${esc(t.reviews_title)}</h2>
        </div>
        ${body}
      </div>
    </section>`;
}
function locationsSection(lang, P, t) {
  const cards = SITE.branches.map((b) => `
          <article class="location-card">
            <div class="location-map"><iframe src="${mapEmbed(b.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(b.area)} — ${esc(SITE.brand.short)}"></iframe></div>
            <div class="location-body">
              <h3>${esc(b.area)} <span class="loc-landmark">— ${esc(b.landmark[lang])}</span></h3>
              <p class="location-address">${esc(b.address)}</p>
              <p class="location-hours"><strong>${esc(t.label_hours)}</strong>${SITE.hours.lines[lang].map(esc).join("<br>")}</p>
              <div class="location-actions">
                <a class="btn btn-dark btn-sm" href="${mapDir(b.address)}" target="_blank" rel="noopener">${IC.pin}<span>${esc(t.btn_directions)}</span></a>
                <a class="btn btn-ghost btn-sm" href="${P}${lang}/${b.slug}/">${esc(t.branch_view)} →</a>
              </div>
            </div>
          </article>`).join("");
  return `
    <section class="section section-alt" id="locations">
      <div class="container">
        <div class="section-head">
          <span class="kicker">${esc(t.loc_kicker)}</span>
          <h2>${esc(t.loc_title)}</h2>
          <p class="section-sub">${esc(t.loc_sub)}</p>
        </div>
        <figure class="location-hero">${pic(P, "storefront", t.loc_title, 1400, 840)}</figure>
        <div class="location-grid">${cards}
        </div>
      </div>
    </section>`;
}
function faqSection(lang, t) {
  return `
    <section class="section" id="faq">
      <div class="container container-narrow">
        <div class="section-head">
          <span class="kicker">${esc(t.faq_kicker)}</span>
          <h2>${esc(t.faq_title)}</h2>
        </div>
        <div class="faq-list">
          ${SITE.faq.map((f) => `<details class="faq-item"><summary>${esc(f.q[lang])}</summary><div class="faq-answer"><p>${esc(f.a[lang])}</p></div></details>`).join("\n          ")}
        </div>
      </div>
    </section>`;
}
function contactSection(lang, t) {
  const phone2 = C.phone2Display
    ? `<a href="${telHref(C.phone2Dial)}">${esc(C.phone2Display)}</a>` : "";
  return `
    <section class="section section-alt" id="contact">
      <div class="container contact-grid">
        <div class="contact-info">
          <span class="kicker">${esc(t.contact_kicker)}</span>
          <h2>${esc(t.contact_title)}</h2>
          <p class="section-sub">${esc(t.contact_sub)}</p>
          <ul class="contact-list">
            <li><span class="contact-label">${esc(t.label_phone)}</span><a href="${telHref(C.phone1Dial)}">${esc(C.phone1Display)}</a>${phone2}</li>
            <li><span class="contact-label">${esc(t.label_email)}</span><a href="${mailHref()}">${esc(C.email)}</a></li>
            <li><span class="contact-label">${esc(t.label_instagram)}</span><a href="${C.instagram}" target="_blank" rel="noopener">${esc(igLabel)}</a></li>
          </ul>
          <div class="appointment-box">
            <h3>${esc(t.appt_title)}</h3>
            <p>${esc(t.appt_text)}</p>
            <a href="${waHref(t.wa_greeting)}" class="btn btn-whatsapp" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.btn_wa)}</span></a>
          </div>
        </div>
        <form class="contact-form" id="contact-form" novalidate
              data-wa="${C.whatsapp}" data-email="${esc(C.email)}"
              data-greeting="${esc(t.wa_greeting)}"
              data-l-name="${esc(t.form_name)}" data-l-phone="${esc(t.form_phone)}" data-l-time="${esc(t.form_time)}" data-l-message="${esc(t.form_message)}"
              data-err-name="${esc(t.form_err_name)}" data-err-phone="${esc(t.form_err_phone)}" data-ok="${esc(t.form_sent)}">
          <label>
            <span>${esc(t.form_name)} <span class="req" aria-hidden="true">*</span></span>
            <input type="text" name="name" autocomplete="name" placeholder="${esc(t.ph_name)}" required aria-required="true" />
          </label>
          <label>
            <span>${esc(t.form_phone)} <span class="req" aria-hidden="true">*</span></span>
            <input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="${esc(t.ph_phone)}" required aria-required="true" />
          </label>
          <label>
            <span>${esc(t.form_time)}</span>
            <input type="text" name="time" autocomplete="off" placeholder="${esc(t.ph_time)}" />
          </label>
          <label>
            <span>${esc(t.form_message)}</span>
            <textarea name="message" rows="4" maxlength="1500" placeholder="${esc(t.ph_message)}"></textarea>
          </label>
          <p class="form-required-hint">${esc(t.form_required)}</p>
          <div class="form-actions">
            <button type="submit" class="btn btn-whatsapp btn-block">${IC.wa}<span>${esc(t.form_submit)}</span></button>
            <span class="form-or">${esc(t.form_or)}</span>
            <button type="button" class="btn btn-outline btn-block" id="email-btn">${esc(t.form_email_btn)}</button>
          </div>
          <p class="form-status" id="form-status" role="status" aria-live="polite" hidden></p>
          <p class="form-note">${esc(t.form_note)}</p>
        </form>
      </div>
    </section>`;
}

/* ---------- page assembly ---------- */
function homePage(lang) {
  const t = SITE.i18n[lang];
  const P = prefix(1);
  const seo = SITE.seo.home[lang];
  const path = pagePath(lang, "");
  const h = head(lang, P, { title: seo.title, desc: seo.desc, canonicalPath: path, isBranch: false });
  const jsonld = `\n  <script type="application/ld+json">\n${JSON.stringify(homeLD(lang, t), null, 2)}\n  </script>\n</head>\n<body>`;
  const main = `
  <main id="main">
    ${heroSection(lang, P, t)}
    ${trustBar(t)}
    ${featuredSection(lang, P, t)}
    ${aboutSection(lang, P, t)}
    ${processSection(lang, t)}
    ${productsSection(lang, P, t)}
    ${branchesSection(lang, P, t)}
    ${reviewsSection(lang, t)}
    ${locationsSection(lang, P, t)}
    ${faqSection(lang, t)}
    ${contactSection(lang, t)}
  </main>`;
  return h + jsonld + header(lang, P, t, { isBranch: false }) + main + footer(lang, P, t);
}

function branchPage(lang, b) {
  const t = SITE.i18n[lang];
  const P = prefix(2);
  const path = pagePath(lang, b.slug);
  const title = `${SITE.brand.short} — ${b.area}, Tiranë | ${SITE.brand.appliances.join(", ")}`;
  const desc = `${SITE.brand.short} ${b.area}: ${t.branch_desc} ${b.landmark[lang]}. ${SITE.hours.lines[lang][0]}.`;
  const h = head(lang, P, { title, desc, canonicalPath: path, slug: b.slug, isBranch: true });
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.back_home, item: absUrl(pagePath(lang, "")) },
      { "@type": "ListItem", position: 2, name: b.area, item: absUrl(path) },
    ],
  };
  const jsonld = `\n  <script type="application/ld+json">\n${JSON.stringify({ "@context": "https://schema.org", ...branchLD(lang, b) }, null, 2)}\n  </script>\n  <script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n  </script>\n</head>\n<body>`;
  const phone2 = C.phone2Display ? `<a class="btn btn-dark" href="${telHref(C.phone2Dial)}">${IC.call}<span>${esc(C.phone2Display)}</span></a>` : "";
  const main = `
  <main id="main" class="branch-page">
    <nav class="breadcrumb container" aria-label="Breadcrumb">
      <a href="${P}${lang}/">${esc(t.back_home)}</a> <span aria-hidden="true">/</span> <span>${esc(b.area)}</span>
    </nav>
    <section class="branch-hero">
      <div class="container">
        <span class="kicker">${esc(SITE.brand.legal)}</span>
        <h1>${esc(SITE.brand.short)} — ${esc(b.area)}</h1>
        <p class="branch-hero-sub">${esc(t.branch_hero_sub)} ${esc(b.area)} — ${esc(b.landmark[lang])}.</p>
        <div class="hero-buttons">
          <a href="${telHref(C.phone1Dial)}" class="btn btn-primary">${IC.call}<span>${esc(t.btn_call)}</span></a>
          <a href="${waHref(t.wa_greeting + " (" + b.area + ")")}" class="btn btn-whatsapp" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.btn_wa)}</span></a>
          <a href="${mapDir(b.address)}" class="btn btn-dark" target="_blank" rel="noopener">${IC.pin}<span>${esc(t.btn_directions)}</span></a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container branch-detail">
        <div class="branch-detail-info">
          <div class="branch-meta card">
            <div class="row"><span>${esc(t.label_address)}</span><span>${esc(b.address)}</span></div>
            <div class="row"><span>${esc(t.label_phone)}</span><span><a href="${telHref(C.phone1Dial)}">${esc(C.phone1Display)}</a>${C.phone2Display ? ` · <a href="${telHref(C.phone2Dial)}">${esc(C.phone2Display)}</a>` : ""}</span></div>
            <div class="row"><span>${esc(t.label_email)}</span><span><a href="${mailHref()}">${esc(C.email)}</a></span></div>
            <div class="row"><span>${esc(t.label_hours)}</span><span>${SITE.hours.lines[lang].map(esc).join("<br>")}</span></div>
          </div>
          <h2 class="branch-services-title">${esc(t.label_services)}</h2>
          <ul class="branch-services">${t.branch_services.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          <div class="branch-cta">
            <h3>${esc(t.branch_cta_title)}</h3>
            <div class="hero-buttons">
              <a href="${telHref(C.phone1Dial)}" class="btn btn-primary">${IC.call}<span>${esc(t.btn_call)}</span></a>
              ${phone2}
            </div>
          </div>
        </div>
        <div class="branch-detail-map">
          <div class="location-map"><iframe src="${mapEmbed(b.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(b.area)} — ${esc(SITE.brand.short)}"></iframe></div>
          <a class="btn btn-dark btn-block" href="${mapDir(b.address)}" target="_blank" rel="noopener">${IC.pin}<span>${esc(t.btn_directions)}</span></a>
        </div>
      </div>
    </section>
  </main>`;
  return h + jsonld + header(lang, P, t, { isBranch: true, slug: b.slug }) + main + footer(lang, P, t);
}

/* root redirect + language chooser (works without JS) */
function rootPage() {
  const dl = SITE.defaultLang;
  const alts = SITE.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(pagePath(l, ""))}" />`).join("\n  ");
  const links = SITE.langs.map((l) => `<a href="${l}/" hreflang="${l}">${SITE.langName[l]}</a>`).join("\n    ");
  return `<!DOCTYPE html>
<html lang="${dl}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(SITE.seo.home[dl].title)}</title>
  <meta name="description" content="${esc(SITE.seo.home[dl].desc)}" />
  <link rel="canonical" href="${absUrl(pagePath(dl, ""))}" />
  ${alts}
  <link rel="alternate" hreflang="x-default" href="${absUrl(pagePath(dl, ""))}" />
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <meta http-equiv="refresh" content="0; url=./${dl}/" />
  <script>
    (function () {
      try {
        var s = ["${SITE.langs.join('","')}"];
        var p = (navigator.language || "sq").slice(0, 2).toLowerCase();
        var l = s.indexOf(p) > -1 ? p : "${dl}";
        location.replace("./" + l + "/");
      } catch (e) { location.replace("./${dl}/"); }
    })();
  </script>
  <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#141414;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center}a{color:#fff;display:inline-block;margin:.4rem .6rem;padding:.7rem 1.4rem;border:1px solid rgba(255,255,255,.4);border-radius:8px;text-decoration:none;font-weight:700}</style>
</head>
<body>
  <div>
    <p>B.O. BEOLA — Elektroshtëpiake Gjermane në Tiranë</p>
    <nav aria-label="Language">
    ${links}
    </nav>
  </div>
</body>
</html>`;
}

/* sitemap with hreflang alternates */
function sitemap() {
  const urls = [];
  const add = (slug) => {
    const links = SITE.langs.map((l) =>
      `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(pagePath(l, slug))}"/>`).join("\n");
    for (const l of SITE.langs) {
      urls.push(`  <url>\n    <loc>${absUrl(pagePath(l, slug))}</loc>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(pagePath(SITE.defaultLang, slug))}"/>\n    <changefreq>monthly</changefreq>\n  </url>`);
    }
  };
  add(""); // home
  SITE.branches.forEach((b) => add(b.slug));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

/* ---------- write everything ---------- */
function out(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("  ✓", relPath);
}

console.log("Building B.O. BEOLA site…");
out("index.html", rootPage());
for (const lang of SITE.langs) {
  out(`${lang}/index.html`, homePage(lang));
  for (const b of SITE.branches) out(`${lang}/${b.slug}/index.html`, branchPage(lang, b));
}
out("sitemap.xml", sitemap());
console.log("Done — %d languages × (1 home + %d branches) + root + sitemap.", SITE.langs.length, SITE.branches.length);

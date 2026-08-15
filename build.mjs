/* =============================================================================
   B.O. BEOLA SHPK — STATIC SITE GENERATOR  (zero dependencies)
   Reads data/site.mjs + data/products.mjs → per-language retail catalogue.
     /{lang}/                         home
     /{lang}/products/                catalogue (search + filters + sort)
     /{lang}/products/<category>/     category page
     /{lang}/product/<slug>/          product detail
     /{lang}/saved/                   saved appliances
     /{lang}/<branch>/                branch page
   Run:  node build.mjs
============================================================================= */

import { SITE } from "./data/site.mjs";
import { CATEGORIES, AVAIL, PRODUCTS } from "./data/products.mjs";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const C = SITE.contact;
const YEAR = 2026;

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const enc = encodeURIComponent;
const T = (v, lang) => (v && typeof v === "object" ? v[lang] : v);
const depthOf = (sub) => 1 + (sub ? sub.split("/").filter(Boolean).length : 0);
const prefixOf = (sub) => "../".repeat(depthOf(sub));
const pagePath = (lang, sub) => sub ? `/${lang}/${sub}/` : `/${lang}/`;
const absUrl = (p) => SITE.baseUrl + p;
const telHref = (dial) => `tel:${dial}`;
const mailHref = () => `mailto:${C.email}`;
const waHref = (text) => `https://wa.me/${C.whatsapp}${text ? `?text=${enc(text)}` : ""}`;
const mapEmbed = (a) => `https://www.google.com/maps?q=${enc(a)}&output=embed`;
const mapDir = (a) => `https://www.google.com/maps/dir/?api=1&destination=${enc(a)}`;
const igLabel = C.instagramHandle || "Instagram";

function pic(P, name, alt, w, h, opts = {}) {
  const load = opts.eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"';
  const cls = opts.cls ? ` class="${opts.cls}"` : "";
  return `<picture${cls}><source srcset="${P}images/${name}.webp" type="image/webp">` +
    `<img src="${P}images/${name}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${load}></picture>`;
}

const IC = {
  call: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.6 1 1.3 1.6.9.8 1.6 1 1.9 1.2.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.2.1.7-.1 1.2z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 12 18.6 6.6 6.6 0 0 0 12 5.4zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm6.8-11.2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path class="heart-path" fill="none" stroke="currentColor" stroke-width="1.8" d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5 7.5 5.5 9 6.8 12 9.5c3-2.7 4.5-4 6.5-4 3 0 4.5 3 3 6-2.5 4.15-9.5 8.5-9.5 8.5z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M8.5 12l2.5 2.5 4.5-5"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M2 7h12v8H2zM14 10h4l3 3v2h-7zM7 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z"/></svg>`,
  retail: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M3 9l2-4h14l2 4M4 9v10h16V9M3 9h18M9 13h6"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M14.7 6.3a3.5 3.5 0 0 0-4.6 4.2l-6 6 2.4 2.4 6-6a3.5 3.5 0 0 0 4.2-4.6l-2 2-1.9-1.9 2-2z"/></svg>`,
  pinB: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.3" fill="currentColor"/></svg>`,
  share: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M12 3v13M8 7l4-4 4 4"/></svg>`,
};
const WHY_IC = { check: IC.check, truck: IC.truck, retail: IC.retail, wrench: IC.wrench, pin: IC.pinB };

const applianceStrip = `<svg class="appliance-strip" viewBox="0 0 116 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><g transform="translate(1,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="4" y1="6" x2="20" y2="6"/><rect x="4" y="9" width="16" height="12" rx="1"/></g><g transform="translate(30,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="1" y1="7" x2="23" y2="7"/><circle cx="12" cy="15.5" r="5.5"/><circle cx="12" cy="15.5" r="2.2"/></g><g transform="translate(60,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><line x1="1" y1="7" x2="23" y2="7"/><path d="M7 11c1.1 1.1 1.1 2.9 0 4M12 11c1.1 1.1 1.1 2.9 0 4M17 11c1.1 1.1 1.1 2.9 0 4"/></g><g transform="translate(90,1)"><rect x="1" y="1" width="22" height="23" rx="1.5"/><circle cx="7" cy="6" r="2"/><circle cx="16" cy="6" r="2"/><rect x="4" y="11" width="16" height="10" rx="1"/></g></svg>`;
const brandLogo = `${applianceStrip}<span class="logo-word"><span class="brand-beola">BEOLA</span> <span class="brand-shpk">SHPK</span></span>`;

const BADGE = {
  new: { l: { sq: "E RE", en: "NEW", de: "NEU" }, c: "badge-new" },
  professional: { l: { sq: "PROFESIONALE", en: "PROFESSIONAL", de: "PROFI" }, c: "badge-soft" },
  wholesale: { l: { sq: "SHUMICË", en: "WHOLESALE", de: "GROSSHANDEL" }, c: "badge-soft" },
};
const badge = (id, lang) => BADGE[id] ? `<span class="badge ${BADGE[id].c}">${esc(T(BADGE[id].l, lang))}</span>` : "";

/* ---------- catalogue helpers ---------- */
const ACTIVE = PRODUCTS.filter((p) => p.active !== false);
const catById = (id) => CATEGORIES.find((c) => c.id === id);
const catBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);
const productUrl = (P, lang, slug) => `${P}${lang}/product/${slug}/`;
const catUrl = (P, lang, slug) => `${P}${lang}/products/${slug}/`;
const catalogueUrl = (P, lang) => `${P}${lang}/products/`;
const savedUrl = (P, lang) => `${P}${lang}/saved/`;
function productCatSlugs(p) {
  const arr = []; const c = catById(p.category); if (c) arr.push(c.slug);
  if (p.professional && !arr.includes("professional-equipment")) arr.push("professional-equipment");
  return arr;
}
function inCategory(p, cat) { return cat.flag ? !!p[cat.flag] : p.category === cat.id; }
const availOf = (p) => AVAIL[p.availability] || AVAIL.ask;
function priceText(p, lang, t) {
  if (typeof p.price === "number" && !p.priceOnRequest) return esc(p.price.toLocaleString("de-DE") + " €");
  return esc(t.c_ask_price);
}
function productBadges(p, lang) {
  const b = [];
  if (p.newArrival) b.push(badge("new", lang));
  if (p.brand) b.push(`<span class="badge badge-brand">${esc(p.brand.toUpperCase())}</span>`);
  if (p.professional) b.push(badge("professional", lang));
  return b.slice(0, 3).join("");
}
function waProductHref(lang, t, p) {
  const name = T(p.title, lang) + (p.model ? ` ${p.model}` : "") + (p.brand ? ` (${p.brand})` : "");
  const url = absUrl(pagePath(lang, "product/" + p.slug));
  return waHref(t.c_wa_product + "\n" + name + "\n" + url);
}
function searchText(p, lang) {
  const cn = catById(p.category); const cats = productCatSlugs(p).join(" ");
  return [T(p.title, lang), p.brand, p.model, cn ? T(cn.name, lang) : "", cats].filter(Boolean).join(" ").toLowerCase();
}

/* ---------- reusable product card ---------- */
function productCard(P, lang, p, t) {
  const url = productUrl(P, lang, p.slug);
  const av = availOf(p);
  const dCreated = (p.createdAt || "").replace(/-/g, "");
  return `
        <article class="pcard" data-id="${esc(p.id)}" data-slug="${esc(p.slug)}"
          data-cats="${esc(productCatSlugs(p).join(" "))}" data-brand="${esc((p.brand || "").toLowerCase())}"
          data-branch="${esc(p.branch || "")}" data-avail="${esc(p.availability || "ask")}"
          data-new="${p.newArrival ? 1 : 0}" data-featured="${p.featured ? 1 : 0}" data-created="${esc(dCreated)}"
          data-search="${esc(searchText(p, lang))}">
          <a class="pcard-photo" href="${url}">
            ${pic(P, p.images[0], T(p.title, lang), 640, 480)}
            ${productBadges(p, lang) ? `<div class="pcard-badges">${productBadges(p, lang)}</div>` : ""}
          </a>
          <button type="button" class="save-btn" data-save="${esc(p.id)}" aria-pressed="false" aria-label="${esc(t.c_save)}">${IC.heart}</button>
          <div class="pcard-body">
            ${p.brand ? `<span class="pcard-brand">${esc(p.brand)}</span>` : `<span class="pcard-brand">${esc(catById(p.category) ? T(catById(p.category).name, lang) : "")}</span>`}
            <a class="pcard-name" href="${url}">${esc(T(p.title, lang))}</a>
            <span class="pcard-avail avail-${av.tone}">${esc(T(av.label, lang))}</span>
            <span class="pcard-price">${priceText(p, lang, t)}</span>
            <div class="pcard-actions">
              <a class="btn btn-primary btn-sm" href="${url}">${esc(t.c_view)}</a>
              <a class="btn btn-line btn-sm pcard-wa" href="${waProductHref(lang, t, p)}" target="_blank" rel="noopener" aria-label="${esc(t.c_ask_wa)}">${IC.wa}</a>
            </div>
          </div>
        </article>`;
}

/* ---------- head / header / footer (all take `sub`) ---------- */
function head(lang, sub, P, { title, desc, jsonld }) {
  const alts = SITE.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(pagePath(l, sub))}" />`).join("\n  ");
  const ogImg = `${SITE.baseUrl}/images/hero.jpg`;
  const ld = (jsonld || []).map((j) => `\n  <script type="application/ld+json">\n${JSON.stringify(j, null, 2)}\n  </script>`).join("");
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="author" content="${esc(SITE.brand.legal)}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#171717" />
  <link rel="canonical" href="${absUrl(pagePath(lang, sub))}" />
  ${alts}
  <link rel="alternate" hreflang="x-default" href="${absUrl(pagePath(SITE.defaultLang, sub))}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="B.O. BEOLA" />
  <meta property="og:url" content="${absUrl(pagePath(lang, sub))}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:locale" content="${SITE.ogLocale[lang]}" />
  ${SITE.langs.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${SITE.ogLocale[l]}" />`).join("\n  ")}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:image" content="${ogImg}" />
  <link rel="icon" href="${P}favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${P}css/styles.css" />${ld}
</head>
<body>`;
}
function header(lang, sub, P, t) {
  const homeBase = `${P}${lang}/`;
  const langLinks = SITE.langs.map((l) => {
    const href = `${P}${l}/${sub ? sub + "/" : ""}`;
    const on = l === lang;
    return `<a href="${href}" lang="${l}" hreflang="${l}" class="lang-btn${on ? " is-active" : ""}"${on ? ' aria-current="true"' : ""} aria-label="${esc(SITE.langName[l])}">${SITE.langLabel[l]}</a>`;
  }).join("");
  const cats = CATEGORIES.map((c) => `<a href="${catUrl(P, lang, c.slug)}" class="catnav-link">${esc(T(c.name, lang))}</a>`).join("") +
    `<a href="${homeBase}#service" class="catnav-link">${esc(SITE.i18n[lang].nav_about ? T({ sq: "Servis", en: "Service", de: "Service" }, lang) : "Service")}</a>` +
    `<a href="${catalogueUrl(P, lang)}" class="catnav-link">${esc(t.c_view_all ? t.arrivals_kicker : "New")}</a>`;
  const siteLinks = [[`${homeBase}#branches`, t.nav_branches], [`${homeBase}#about`, t.nav_about], [`${homeBase}#gallery`, t.nav_gallery], [`${homeBase}#faq`, t.nav_faq], [`${homeBase}#contact`, t.nav_contact]]
    .map(([h, l]) => `<a href="${h}">${esc(l)}</a>`).join("");
  return `
  <a href="#main" class="skip-link">${esc(t.skip)}</a>
  <div class="topbar"><div class="container topbar-inner">
    <ul class="topbar-msgs">${t.topbar.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
    <span class="topbar-hours">${esc(T(SITE.hours.short, lang))}</span>
  </div></div>
  <header class="site-header" id="top">
    <div class="container header-main">
      <a href="${homeBase}" class="logo" aria-label="BEOLA SHPK — B.O. BEOLA">${brandLogo}</a>
      <form class="site-search" role="search" action="${catalogueUrl(P, lang)}" data-catalogue="${catalogueUrl(P, lang)}">
        <span class="search-ic" aria-hidden="true">${IC.search}</span>
        <input type="search" name="search" placeholder="${esc(t.search_ph)}" aria-label="${esc(t.search_aria)}" autocomplete="off" />
        <button type="submit">${esc(t.search_btn)}</button>
      </form>
      <div class="header-actions">
        <a href="${savedUrl(P, lang)}" class="saved-link" aria-label="${esc(t.c_saved)}">${IC.heart}<span class="saved-count" data-saved-count hidden>0</span></a>
        <div class="lang-switch" role="group" aria-label="${esc(t.lang_switch)}">${langLinks}</div>
        <a href="${telHref(C.phone1Dial)}" class="btn btn-primary header-call" aria-label="${esc(t.call_aria)} ${esc(C.phone1Display)}">${IC.call}<span>${esc(C.phone1Display)}</span></a>
        <button type="button" class="nav-toggle" id="nav-toggle" aria-label="${esc(t.menu)}" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span></button>
      </div>
    </div>
    <nav class="catnav" aria-label="${esc(t.c_products)}">
      <div class="container catnav-inner"><div class="catnav-cats">${cats}</div><div class="catnav-links">${siteLinks}</div></div>
    </nav>
    <nav class="mobile-nav" id="main-nav" aria-label="${esc(t.c_products)}">
      <a href="${catalogueUrl(P, lang)}">${esc(t.c_products)}</a>
      ${CATEGORIES.map((c) => `<a href="${catUrl(P, lang, c.slug)}">${esc(T(c.name, lang))}</a>`).join("\n      ")}
      <hr />
      ${siteLinks}
      <a href="${savedUrl(P, lang)}">${esc(t.c_saved)}</a>
    </nav>
  </header>`;
}
function footer(lang, P, t) {
  const homeBase = `${P}${lang}/`;
  const branchLinks = SITE.branches.map((b) => `<a href="${P}${lang}/${b.slug}/">${esc(b.area)}</a>`).join("\n        ");
  const phone2 = C.phone2Display ? `<a href="${telHref(C.phone2Dial)}">${esc(C.phone2Display)}</a>` : "";
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
        <a href="${catalogueUrl(P, lang)}">${esc(t.c_products)}</a>
        <a href="${homeBase}#branches">${esc(t.nav_branches)}</a>
        <a href="${homeBase}#gallery">${esc(t.nav_gallery)}</a>
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
    <div class="footer-bottom"><div class="container"><span>&copy; ${YEAR} ${esc(SITE.brand.legal)} — ${esc(t.footer_rights)}</span></div></div>
  </footer>`;
}
function scripts(P, extra) {
  return `\n  <script src="${P}js/main.js" defer></script>${extra ? `\n  <script src="${P}js/${extra}" defer></script>` : ""}\n</body>\n</html>`;
}
function breadcrumbs(P, lang, t, trail) {
  const items = trail.map((x, i) => x.href
    ? `<a href="${x.href}">${esc(x.label)}</a>`
    : `<span aria-current="page">${esc(x.label)}</span>`).join(' <span class="bc-sep" aria-hidden="true">›</span> ');
  return `<nav class="breadcrumb container" aria-label="Breadcrumb">${items}</nav>`;
}
function breadcrumbLD(lang, trail) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, ...(x.url ? { item: x.url } : {}) })) };
}

/* ---------- JSON-LD ---------- */
function hoursSpec() {
  return [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: SITE.hours.weekday.opens, closes: SITE.hours.weekday.closes },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: SITE.hours.sunday.opens, closes: SITE.hours.sunday.closes },
  ];
}
function branchLD(lang, b) {
  return {
    "@type": "HomeGoodsStore", "@id": absUrl(pagePath(lang, b.slug)) + "#store",
    name: `${SITE.brand.short} — ${b.area}`, image: `${SITE.baseUrl}/images/storefront.jpg`,
    url: absUrl(pagePath(lang, b.slug)), telephone: C.phone1Dial, email: C.email, priceRange: "$$",
    sameAs: [C.instagram], parentOrganization: { "@type": "Organization", name: SITE.brand.legal },
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: "Tiranë", addressRegion: "Tiranë", ...(b.postalCode ? { postalCode: b.postalCode } : {}), addressCountry: "AL" },
    areaServed: "Tiranë, Albania", brand: SITE.brand.appliances, openingHoursSpecification: hoursSpec(),
  };
}
function orgLD(lang) {
  return {
    "@type": ["Organization", "HomeGoodsStore"], "@id": SITE.baseUrl + "/#org",
    name: SITE.brand.legal, url: absUrl(pagePath(lang, "")), image: `${SITE.baseUrl}/images/hero.jpg`,
    logo: `${SITE.baseUrl}/favicon.svg`, telephone: C.phone1Dial, email: C.email, sameAs: [C.instagram],
    brand: SITE.brand.appliances, areaServed: "Tiranë, Albania",
    address: { "@type": "PostalAddress", streetAddress: SITE.branches[0].address, addressLocality: "Tiranë", addressRegion: "Tiranë", postalCode: SITE.branches[0].postalCode, addressCountry: "AL" },
    openingHoursSpecification: hoursSpec(), department: SITE.branches.map((b) => branchLD(lang, b)),
  };
}
function homeLD(lang) {
  const faq = { "@type": "FAQPage", mainEntity: SITE.faq.map((f) => ({ "@type": "Question", name: f.q[lang], acceptedAnswer: { "@type": "Answer", text: f.a[lang] } })) };
  return { "@context": "https://schema.org", "@graph": [orgLD(lang), faq] };
}
function productLD(lang, p) {
  const ld = { "@context": "https://schema.org", "@type": "Product", name: T(p.title, lang), image: p.images.map((i) => `${SITE.baseUrl}/images/${i}.jpg`), url: absUrl(pagePath(lang, "product/" + p.slug)) };
  if (p.brand) ld.brand = { "@type": "Brand", name: p.brand };
  if (p.model) ld.model = p.model;
  if (p.description) ld.description = T(p.description, lang);
  if (typeof p.price === "number" && !p.priceOnRequest) {
    ld.offers = { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: p.availability === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: ld.url };
  }
  return ld;
}

/* ---------- home sections ---------- */
function heroSection(lang, P, t) {
  const ticks = [t.trust_checked, t.trust_import, t.trust_retail, t.trust_service];
  return `
    <section class="hero" id="home">
      <div class="container hero-inner">
        <div class="hero-copy">
          <p class="hero-eyebrow">${esc(t.hero_eyebrow)}</p>
          <h1>${esc(t.hero_h1)}</h1>
          <p class="hero-sub">${esc(t.hero_sub)}</p>
          <div class="hero-buttons">
            <a href="${catalogueUrl(P, lang)}" class="btn btn-primary btn-lg">${esc(t.hero_cta1)}</a>
            <a href="#branches" class="btn btn-line btn-lg">${IC.pin}<span>${esc(t.hero_cta2)}</span></a>
          </div>
          <ul class="hero-ticks">${ticks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <div class="hero-figure">${pic(P, "hero", t.hero_h1, 1920, 1040, { eager: true })}</div>
      </div>
    </section>`;
}
function categoriesSection(lang, P, t) {
  const tiles = CATEGORIES.map((c) => `
        <a class="cat-tile" href="${catUrl(P, lang, c.slug)}">
          <div class="cat-tile-photo">${pic(P, c.image, T(c.name, lang), 640, 420)}</div>
          <span class="cat-tile-name">${esc(T(c.name, lang))}</span>
        </a>`).join("");
  return `
    <section class="section" id="categories">
      <div class="container">
        <div class="section-head"><span class="kicker">${esc(t.cat_kicker)}</span><h2>${esc(t.cat_title)}</h2></div>
        <div class="cat-tiles">${tiles}
        </div>
      </div>
    </section>`;
}
function arrivalsSection(lang, P, t) {
  const items = ACTIVE.filter((p) => p.newArrival).slice(0, 8);
  return `
    <section class="section section-alt" id="arrivals">
      <div class="container">
        <div class="section-head"><span class="kicker">${esc(t.arrivals_kicker)}</span><h2>${esc(t.arrivals_title)}</h2><p class="section-sub">${esc(t.arrivals_sub)}</p></div>
        <div class="pgrid">${items.map((p) => productCard(P, lang, p, t)).join("")}
        </div>
        <p class="center-link"><a href="${catalogueUrl(P, lang)}" class="text-link">${esc(t.c_view_all)} →</a></p>
      </div>
    </section>`;
}
function brandSection(lang, P, t) {
  const items = SITE.brands.map((b) => `<a class="brand-tile" href="${catalogueUrl(P, lang)}?brand=${enc(b.name.toLowerCase())}"><span class="brand-name">${esc(b.name)}</span><span class="brand-note">${esc(T(b.note, lang))}</span></a>`).join("");
  return `
    <section class="section brand-section" id="brands">
      <div class="container">
        <div class="section-head"><span class="kicker">${esc(t.brand_kicker)}</span><h2>${esc(t.brand_title)}</h2></div>
        <div class="brand-grid">${items}</div>
      </div>
    </section>`;
}
function whySection(lang, t) {
  const items = SITE.whyus.map((w) => `<li class="why-chip"><span class="why-ic">${WHY_IC[w.icon] || IC.check}</span><span>${esc(T(w.title, lang))}</span></li>`).join("");
  return `
    <section class="section section-alt" id="why">
      <div class="container">
        <div class="section-head"><h2>${esc(t.why_title)}</h2></div>
        <ul class="why-strip">${items}</ul>
      </div>
    </section>`;
}
function bandSection(id, kicker, data, waKey, lang, P, t, flip) {
  return `
    <section class="section" id="${id}">
      <div class="container band${flip ? " band-flip" : ""}">
        <div class="band-media">${pic(P, data.image, T(data.title, lang), 1000, 750)}</div>
        <div class="band-copy">
          <span class="kicker">${esc(kicker)}</span>
          <h2>${esc(T(data.title, lang))}</h2>
          <p>${esc(T(data.text, lang))}</p>
          <a class="btn btn-primary" href="${waHref(t[waKey] + " ")}" target="_blank" rel="noopener">${IC.wa}<span>${esc(T(data.cta, lang))}</span></a>
        </div>
      </div>
    </section>`;
}
function branchesSection(lang, P, t) {
  const cards = SITE.branches.map((b) => `
        <article class="branch-card${b.isMain ? " is-main" : ""}">
          <div class="branch-body">
            ${b.isMain ? `<span class="branch-badge">${esc(t.badge_main)}</span>` : ""}
            <h3>${esc(SITE.brand.short)} — ${esc(b.area)}</h3>
            <p class="branch-area"><span aria-hidden="true">${IC.pin}</span>${esc(b.landmark[lang])}</p>
            <p class="branch-addr">${esc(b.address)}</p>
            <p class="branch-hrs">${SITE.hours.lines[lang].map(esc).join(" · ")}</p>
            <div class="branch-actions">
              <a class="btn btn-primary btn-sm" href="${telHref(C.phone1Dial)}">${IC.call}<span>${esc(t.btn_call)}</span></a>
              <a class="btn btn-dark btn-sm" href="${mapDir(b.address)}" target="_blank" rel="noopener">${IC.pin}<span>${esc(t.btn_directions)}</span></a>
              <a class="btn btn-line btn-sm" href="${P}${lang}/${b.slug}/">${esc(t.branch_view)} →</a>
            </div>
          </div>
        </article>`).join("");
  return `
    <section class="section section-alt" id="branches">
      <div class="container">
        <div class="section-head"><span class="kicker">${esc(t.br_kicker)}</span><h2>${esc(t.br_title)}</h2><p class="section-sub">${esc(t.br_sub)}</p></div>
        <div class="branch-grid">${cards}
        </div>
      </div>
    </section>`;
}
function aboutSection(lang, P, t) {
  const stats = SITE.about.stats.map((s) => `<div class="stat"><span class="stat-num">${esc(T(s.num, lang))}</span><span class="stat-label">${esc(T(s.label, lang))}</span></div>`).join("");
  return `
    <section class="section" id="about">
      <div class="container band">
        <div class="band-media">${pic(P, SITE.about.image, t.ab_title, 1000, 750)}</div>
        <div class="band-copy">
          <span class="kicker">${esc(t.ab_kicker)}</span>
          <h2>${esc(t.ab_title)}</h2>
          <p>${esc(t.about_p1)}</p>
          <div class="stats">${stats}</div>
        </div>
      </div>
    </section>`;
}
function gallerySection(lang, P, t) {
  const figs = SITE.gallery.map((g) => `<button type="button" class="gcell" data-full="${P}images/${g.image}.jpg" aria-label="${esc(t.gal_zoom)}">${pic(P, g.image, T(g.alt, lang), 1000, 750)}</button>`).join("\n          ");
  return `
    <section class="section section-alt" id="gallery">
      <div class="container">
        <div class="section-head"><span class="kicker">${esc(t.gal_kicker)}</span><h2>${esc(t.gal_title)}</h2></div>
        <div class="gallery-grid">
          ${figs}
        </div>
      </div>
    </section>`;
}
function faqSection(lang, t) {
  return `
    <section class="section" id="faq">
      <div class="container container-narrow">
        <div class="section-head"><span class="kicker">${esc(t.faq_kicker)}</span><h2>${esc(t.faq_title)}</h2></div>
        <div class="faq-list">
          ${SITE.faq.map((f) => `<details class="faq-item"><summary>${esc(f.q[lang])}</summary><div class="faq-answer"><p>${esc(f.a[lang])}</p></div></details>`).join("\n          ")}
        </div>
      </div>
    </section>`;
}
function contactSection(lang, t) {
  const phone2 = C.phone2Display ? `<a href="${telHref(C.phone2Dial)}">${esc(C.phone2Display)}</a>` : "";
  const addrLines = SITE.branches.map((b) => `<li><strong>${esc(b.area)}</strong> — ${esc(b.address)}</li>`).join("");
  return `
    <section class="section section-alt" id="contact">
      <div class="container contact-grid">
        <div class="contact-info">
          <span class="kicker">${esc(t.co_kicker)}</span>
          <h2>${esc(t.co_title)}</h2>
          <p class="section-sub">${esc(t.co_sub)}</p>
          <ul class="contact-list">
            <li><span class="contact-label">${esc(t.label_phone)}</span><a href="${telHref(C.phone1Dial)}">${esc(C.phone1Display)}</a>${phone2}</li>
            <li><span class="contact-label">${esc(t.label_email)}</span><a href="${mailHref()}">${esc(C.email)}</a></li>
            <li><span class="contact-label">${esc(t.label_instagram)}</span><a href="${C.instagram}" target="_blank" rel="noopener">${esc(igLabel)}</a></li>
          </ul>
          <div class="contact-addr">
            <h3>${esc(t.co_address_label)}</h3>
            <ul>${addrLines}</ul>
            <p class="contact-hours"><strong>${esc(t.co_hours_label)}:</strong> ${SITE.hours.lines[lang].map(esc).join(" · ")}</p>
          </div>
        </div>
        <form class="contact-form" id="contact-form" novalidate
              data-wa="${C.whatsapp}" data-greeting="${esc(t.wa_generic)}"
              data-l-name="${esc(t.form_name)}" data-l-phone="${esc(t.form_phone)}" data-l-need="${esc(t.form_need)}"
              data-err-name="${esc(t.form_err_name)}" data-err-phone="${esc(t.form_err_phone)}" data-ok="${esc(t.form_ok)}">
          <h3>${esc(t.form_title)}</h3>
          <label><span>${esc(t.form_name)} <span class="req" aria-hidden="true">*</span></span>
            <input type="text" name="name" autocomplete="name" placeholder="${esc(t.ph_name)}" required aria-required="true" /></label>
          <label><span>${esc(t.form_phone)} <span class="req" aria-hidden="true">*</span></span>
            <input type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="${esc(t.ph_phone)}" required aria-required="true" /></label>
          <label><span>${esc(t.form_need)}</span>
            <textarea name="need" rows="3" maxlength="1000" placeholder="${esc(t.ph_need)}"></textarea></label>
          <p class="form-required-hint">${esc(t.form_required)}</p>
          <button type="submit" class="btn btn-whatsapp btn-block">${IC.wa}<span>${esc(t.form_submit)}</span></button>
          <p class="form-status" id="form-status" role="status" aria-live="polite" hidden></p>
          <p class="form-note">${esc(t.form_note)}</p>
        </form>
      </div>
    </section>`;
}
function lightbox() {
  return `
  <div class="lightbox" id="lightbox" hidden aria-hidden="true"><button type="button" class="lightbox-close" aria-label="×">×</button><img alt="" /></div>`;
}

/* ---------- filter UI (built from real data) ---------- */
function filterGroups(lang, t, products, opts) {
  opts = opts || {};
  const groups = [];
  if (!opts.fixedCategory) {
    const cats = CATEGORIES.filter((c) => products.some((p) => inCategory(p, c)));
    if (cats.length) groups.push({ key: "category", label: t.c_f_category, opts: cats.map((c) => ({ value: c.slug, label: T(c.name, lang), n: products.filter((p) => inCategory(p, c)).length })) });
  }
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
  if (brands.length) groups.push({ key: "brand", label: t.c_f_brand, opts: brands.map((b) => ({ value: b.toLowerCase(), label: b, n: products.filter((p) => p.brand === b).length })) });
  const avails = [...new Set(products.map((p) => p.availability || "ask"))];
  if (avails.length > 1) groups.push({ key: "availability", label: t.c_f_avail, opts: avails.map((a) => ({ value: a, label: T(AVAIL[a].label, lang), n: products.filter((p) => (p.availability || "ask") === a).length })) });
  const branches = [...new Set(products.map((p) => p.branch).filter(Boolean))];
  if (branches.length) groups.push({ key: "branch", label: t.c_f_branch, opts: branches.map((slug) => { const b = SITE.branches.find((x) => x.slug === slug); return { value: slug, label: b ? b.area : slug, n: products.filter((p) => p.branch === slug).length }; }) });
  return groups;
}
function filterSidebar(lang, t, groups) {
  const html = groups.map((g) => `
        <fieldset class="filter-group"><legend>${esc(g.label)}</legend>
          ${g.opts.map((o) => `<label class="filter-opt"><input type="checkbox" data-filter="${g.key}" value="${esc(o.value)}" /> <span>${esc(o.label)}</span> <span class="filter-count">${o.n}</span></label>`).join("\n          ")}
        </fieldset>`).join("");
  return `<div class="filter-body">${html}<button type="button" class="btn btn-line btn-sm filter-clear" data-clear>${esc(t.c_clear)}</button></div>`;
}

/* ---------- catalogue page (also used for category pages) ---------- */
function cataloguePage(lang, opts) {
  opts = opts || {};
  const t = SITE.i18n[lang];
  const cat = opts.category || null;
  const sub = cat ? `products/${cat.slug}` : "products";
  const P = prefixOf(sub);
  const products = (cat ? ACTIVE.filter((p) => inCategory(p, cat)) : ACTIVE).slice();
  const title = cat ? `${T(cat.name, lang)} | ${SITE.brand.short} Tiranë` : `${t.c_headline} | ${SITE.brand.short} Tiranë`;
  const desc = cat ? `${T(cat.name, lang)} — ${t.c_intro}` : t.c_intro;
  const groups = filterGroups(lang, t, products, { fixedCategory: !!cat });
  const trail = [{ label: t.back_home, href: `${P}${lang}/`, name: t.back_home, url: absUrl(pagePath(lang, "")) },
    { label: t.c_products, href: cat ? catalogueUrl(P, lang) : null, name: t.c_products, url: absUrl(pagePath(lang, "products")) }];
  if (cat) trail.push({ label: T(cat.name, lang), name: T(cat.name, lang), url: absUrl(pagePath(lang, sub)) });
  const grid = products.map((p) => productCard(P, lang, p, t)).join("");
  const jsonld = [breadcrumbLD(lang, trail)];
  const main = `
  <main id="main" class="catalogue" data-count-word="${esc(t.c_count)}">
    ${breadcrumbs(P, lang, t, trail)}
    <div class="container catalogue-head">
      <h1>${cat ? esc(T(cat.name, lang)) : esc(t.c_headline)}</h1>
      <p>${cat ? esc(t.c_intro) : esc(t.c_intro)}</p>
    </div>
    <div class="container catalogue-body">
      <aside class="filters" id="filters" aria-label="${esc(t.c_filters)}">
        <div class="filters-inner">
          <div class="filters-head"><h2>${esc(t.c_filters)}</h2><button type="button" class="filters-close" data-filters-close aria-label="${esc(t.c_close)}">×</button></div>
          ${filterSidebar(lang, t, groups)}
          <button type="button" class="btn btn-primary btn-block filters-apply" data-filters-close>${esc(t.c_apply)}</button>
        </div>
      </aside>
      <div class="catalogue-main">
        <div class="catalogue-controls">
          <button type="button" class="btn btn-line btn-sm filters-toggle" data-filters-open aria-controls="filters">${IC.search}<span>${esc(t.c_filters)}</span></button>
          <span class="results-count"><strong data-count>${products.length}</strong> ${esc(t.c_count)}</span>
          <label class="sort-label">${esc(t.c_sort)}
            <select class="sort-select" data-sort>
              <option value="newest">${esc(t.c_sort_new)}</option>
              <option value="brand-az">${esc(t.c_sort_az)}</option>
              <option value="brand-za">${esc(t.c_sort_za)}</option>
            </select>
          </label>
        </div>
        <div class="active-filters" data-active-filters hidden></div>
        <div class="pgrid" data-grid>${grid}
        </div>
        <div class="empty-state" data-empty hidden>
          <p class="empty-title">${esc(t.c_none_title)}</p>
          <p>${esc(t.c_none_sub)}</p>
          <div class="empty-actions">
            <button type="button" class="btn btn-line" data-clear>${esc(t.c_clear)}</button>
            <a class="btn btn-whatsapp" href="${waHref(t.wa_generic)}" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.btn_ask_wa)}</span></a>
          </div>
        </div>
      </div>
    </div>
  </main>
  ${lightbox()}`;
  return head(lang, sub, P, { title, desc, jsonld }) + header(lang, sub, P, t) + main + footer(lang, P, t) + scripts(P, "catalogue.js");
}

/* ---------- product detail page ---------- */
function productPage(lang, p) {
  const t = SITE.i18n[lang];
  const sub = `product/${p.slug}`;
  const P = prefixOf(sub);
  const cat = catById(p.category);
  const av = availOf(p);
  const title = `${T(p.title, lang)} | ${SITE.brand.short} Tiranë`;
  const desc = `${T(p.title, lang)}${p.brand ? " — " + p.brand : ""}${cat ? " · " + T(cat.name, lang) : ""}. ${T({ sq: "Pyet për çmimin dhe disponueshmërinë.", en: "Ask for price and availability.", de: "Preis und Verfügbarkeit anfragen." }, lang)}`;
  const trail = [
    { label: t.back_home, href: `${P}${lang}/`, name: t.back_home, url: absUrl(pagePath(lang, "")) },
    { label: t.c_products, href: catalogueUrl(P, lang), name: t.c_products, url: absUrl(pagePath(lang, "products")) },
  ];
  if (cat) trail.push({ label: T(cat.name, lang), href: catUrl(P, lang, cat.slug), name: T(cat.name, lang), url: absUrl(pagePath(lang, "products/" + cat.slug)) });
  trail.push({ label: T(p.title, lang), name: T(p.title, lang), url: absUrl(pagePath(lang, sub)) });

  const thumbs = p.images.length > 1 ? `<div class="pd-thumbs">${p.images.map((im, i) => `<button type="button" class="pd-thumb${i === 0 ? " is-active" : ""}" data-img="${P}images/${im}.jpg" aria-label="${i + 1}">${pic(P, im, T(p.title, lang), 160, 120)}</button>`).join("")}</div>` : "";
  const specs = (p.specs || []).length ? `<div class="pd-specs"><h2>${esc(t.c_specs)}</h2><dl>${p.specs.map((s) => `<div class="spec-row"><dt>${esc(T(s.label, lang))}</dt><dd>${esc(s.value)}</dd></div>`).join("")}</dl></div>` : "";
  const branch = p.branch ? (function () { const b = SITE.branches.find((x) => x.slug === p.branch); if (!b) return ""; return `<div class="pd-branch"><span class="pd-label">${esc(t.c_branch_at)}</span> <strong>${esc(SITE.brand.short)} — ${esc(b.area)}</strong> <a class="text-link" href="${mapDir(b.address)}" target="_blank" rel="noopener">${esc(t.btn_directions)} →</a></div>`; })() : "";
  const related = ACTIVE.filter((x) => x.slug !== p.slug && (x.category === p.category || (p.brand && x.brand === p.brand))).slice(0, 4);
  const relatedHtml = related.length ? `
    <section class="section section-alt">
      <div class="container">
        <div class="section-head"><h2>${esc(t.c_related)}</h2></div>
        <div class="pgrid">${related.map((r) => productCard(P, lang, r, t)).join("")}
        </div>
      </div>
    </section>` : "";
  const main = `
  <main id="main" class="product-page">
    ${breadcrumbs(P, lang, t, trail)}
    <div class="container pd">
      <div class="pd-gallery">
        <button type="button" class="pd-main" data-full="${P}images/${p.images[0]}.jpg" aria-label="${esc(t.gal_zoom)}">${pic(P, p.images[0], T(p.title, lang), 1000, 750, { eager: true, cls: "pd-main-pic" })}</button>
        ${thumbs}
      </div>
      <div class="pd-info">
        ${p.brand ? `<span class="pd-brand">${esc(p.brand)}</span>` : ""}
        <h1>${esc(T(p.title, lang))}</h1>
        ${p.model ? `<p class="pd-model"><span class="pd-label">${esc(t.c_model_label)}:</span> ${esc(p.model)}</p>` : ""}
        <p class="pd-avail avail-${av.tone}"><span class="dot" aria-hidden="true"></span>${esc(T(av.label, lang))}</p>
        ${p.condition ? `<p class="pd-condition">${esc(T(p.condition, lang))}</p>` : ""}
        <p class="pd-price">${priceText(p, lang, t)}</p>
        <div class="pd-actions">
          <a class="btn btn-primary btn-lg" href="${waProductHref(lang, t, p)}" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.c_ask_wa)}</span></a>
          <a class="btn btn-line btn-lg" href="${telHref(C.phone1Dial)}">${IC.call}<span>${esc(t.btn_call)}</span></a>
          <button type="button" class="btn btn-line btn-icon save-btn" data-save="${esc(p.id)}" aria-pressed="false" aria-label="${esc(t.c_save)}">${IC.heart}</button>
          <button type="button" class="btn btn-line btn-icon share-btn" data-share-title="${esc(T(p.title, lang))}" aria-label="${esc(t.c_share)}">${IC.share}</button>
        </div>
        ${p.description ? `<div class="pd-desc"><p>${esc(T(p.description, lang))}</p></div>` : ""}
        ${branch}
        ${specs}
      </div>
    </div>
    ${relatedHtml}
    <div class="pd-sticky">
      <a class="btn btn-whatsapp btn-block" href="${waProductHref(lang, t, p)}" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.c_ask_wa)}</span></a>
    </div>
  </main>
  ${lightbox()}`;
  return head(lang, sub, P, { title, desc, jsonld: [productLD(lang, p), breadcrumbLD(lang, trail)] }) + header(lang, sub, P, t) + main + footer(lang, P, t) + scripts(P);
}

/* ---------- saved page ---------- */
function savedPage(lang) {
  const t = SITE.i18n[lang];
  const sub = "saved"; const P = prefixOf(sub);
  const data = ACTIVE.map((p) => ({ id: p.id, html: productCard(P, lang, p, t) }));
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  const main = `
  <main id="main" class="catalogue">
    ${breadcrumbs(P, lang, t, [{ label: t.back_home, href: `${P}${lang}/`, name: t.back_home, url: absUrl(pagePath(lang, "")) }, { label: t.c_saved, name: t.c_saved }])}
    <div class="container catalogue-head"><h1>${esc(t.c_saved_title)}</h1></div>
    <div class="container">
      <div class="pgrid" data-saved-grid></div>
      <div class="empty-state" data-saved-empty>
        <p class="empty-title">${esc(t.c_saved_empty)}</p>
        <div class="empty-actions"><a class="btn btn-primary" href="${catalogueUrl(P, lang)}">${esc(t.c_browse)}</a></div>
      </div>
    </div>
  </main>
  <script type="application/json" id="saved-data">${json}</script>
  ${lightbox()}`;
  return head(lang, sub, P, { title: `${t.c_saved_title} | ${SITE.brand.short}`, desc: t.c_saved_title, jsonld: [] }) + header(lang, sub, P, t) + main + footer(lang, P, t) + scripts(P, "catalogue.js");
}

/* ---------- home / branch / root ---------- */
function homePage(lang) {
  const t = SITE.i18n[lang], sub = "", P = prefixOf(sub), seo = SITE.seo.home[lang];
  const main = `
  <main id="main">
    ${heroSection(lang, P, t)}
    ${categoriesSection(lang, P, t)}
    ${arrivalsSection(lang, P, t)}
    ${brandSection(lang, P, t)}
    ${whySection(lang, t)}
    ${bandSection("professional", t.prof_kicker, SITE.professional, "wa_prof", lang, P, t, false)}
    ${bandSection("service", t.service_kicker, SITE.service, "wa_service", lang, P, t, true)}
    ${branchesSection(lang, P, t)}
    ${aboutSection(lang, P, t)}
    ${gallerySection(lang, P, t)}
    ${faqSection(lang, t)}
    ${contactSection(lang, t)}
  </main>
  ${lightbox()}`;
  return head(lang, sub, P, { title: seo.title, desc: seo.desc, jsonld: [homeLD(lang)] }) + header(lang, sub, P, t) + main + footer(lang, P, t) + scripts(P);
}

function branchPage(lang, b) {
  const t = SITE.i18n[lang], sub = b.slug, P = prefixOf(sub);
  const title = `${SITE.brand.short} — ${b.area}, Tiranë | ${SITE.brand.appliances.join(", ")}`;
  const desc = `${SITE.brand.short} ${b.area}: ${t.branch_desc} ${b.landmark[lang]}. ${SITE.hours.lines[lang][0]}.`;
  const trail = [{ name: t.back_home, url: absUrl(pagePath(lang, "")) }, { name: b.area, url: absUrl(pagePath(lang, sub)) }];
  const phone2 = C.phone2Display ? `<a class="btn btn-dark" href="${telHref(C.phone2Dial)}">${IC.call}<span>${esc(C.phone2Display)}</span></a>` : "";
  const main = `
  <main id="main" class="branch-page">
    <nav class="breadcrumb container" aria-label="Breadcrumb"><a href="${P}${lang}/">${esc(t.back_home)}</a> <span class="bc-sep" aria-hidden="true">›</span> <span aria-current="page">${esc(b.area)}</span></nav>
    <section class="branch-hero">
      <div class="container">
        <span class="kicker">${esc(SITE.brand.legal)}</span>
        <h1>${esc(SITE.brand.short)} — ${esc(b.area)}</h1>
        <p class="branch-hero-sub">${esc(t.branch_hero_sub)} ${esc(b.area)} — ${esc(b.landmark[lang])}.</p>
        <div class="hero-buttons">
          <a href="${telHref(C.phone1Dial)}" class="btn btn-primary">${IC.call}<span>${esc(t.btn_call)}</span></a>
          <a href="${waHref(t.wa_generic + " (" + b.area + ")")}" class="btn btn-whatsapp" target="_blank" rel="noopener">${IC.wa}<span>${esc(t.btn_wa)}</span></a>
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
            <div class="hero-buttons"><a href="${telHref(C.phone1Dial)}" class="btn btn-primary">${IC.call}<span>${esc(t.btn_call)}</span></a>${phone2}</div>
          </div>
        </div>
        <div class="branch-detail-map">
          <div class="location-map"><iframe src="${mapEmbed(b.address)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(b.area)} — ${esc(SITE.brand.short)}"></iframe></div>
          <a class="btn btn-dark btn-block" href="${mapDir(b.address)}" target="_blank" rel="noopener">${IC.pin}<span>${esc(t.btn_directions)}</span></a>
        </div>
      </div>
    </section>
  </main>`;
  return head(lang, sub, P, { title, desc, jsonld: [{ "@context": "https://schema.org", ...branchLD(lang, b) }, breadcrumbLD(lang, trail)] }) + header(lang, sub, P, t) + main + footer(lang, P, t) + scripts(P);
}

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
  <script>(function(){try{var s=["${SITE.langs.join('","')}"];var p=(navigator.language||"sq").slice(0,2).toLowerCase();location.replace("./"+(s.indexOf(p)>-1?p:"${dl}")+"/");}catch(e){location.replace("./${dl}/");}})();</script>
  <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#171717;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center}a{color:#fff;display:inline-block;margin:.4rem .6rem;padding:.7rem 1.4rem;border:1px solid rgba(255,255,255,.4);border-radius:8px;text-decoration:none;font-weight:700}</style>
</head>
<body><div><p>B.O. BEOLA SHPK — Elektroshtëpiake Gjermane në Tiranë</p><nav aria-label="Language">
    ${links}
  </nav></div></body>
</html>`;
}

function sitemap() {
  const subs = [""]; // home
  subs.push("products", "saved");
  CATEGORIES.forEach((c) => subs.push("products/" + c.slug));
  ACTIVE.forEach((p) => subs.push("product/" + p.slug));
  SITE.branches.forEach((b) => subs.push(b.slug));
  const urls = subs.map((sub) => {
    const links = SITE.langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(pagePath(l, sub))}"/>`).join("\n");
    return SITE.langs.map((l) => `  <url>\n    <loc>${absUrl(pagePath(l, sub))}</loc>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(pagePath(SITE.defaultLang, sub))}"/>\n    <changefreq>weekly</changefreq>\n  </url>`).join("\n");
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
}

/* ---------- write ---------- */
function out(rel, content) {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}
console.log("Building B.O. BEOLA SHPK catalogue…");
let n = 0;
out("index.html", rootPage()); n++;
for (const lang of SITE.langs) {
  out(`${lang}/index.html`, homePage(lang)); n++;
  out(`${lang}/products/index.html`, cataloguePage(lang, {})); n++;
  out(`${lang}/saved/index.html`, savedPage(lang)); n++;
  for (const cat of CATEGORIES) { out(`${lang}/products/${cat.slug}/index.html`, cataloguePage(lang, { category: cat })); n++; }
  for (const p of ACTIVE) { out(`${lang}/product/${p.slug}/index.html`, productPage(lang, p)); n++; }
  for (const b of SITE.branches) { out(`${lang}/${b.slug}/index.html`, branchPage(lang, b)); n++; }
}
out("sitemap.xml", sitemap());
console.log(`Done — ${n} pages (${SITE.langs.length} langs × home + catalogue + ${CATEGORIES.length} categories + ${ACTIVE.length} products + ${SITE.branches.length} branches + saved) + sitemap.`);

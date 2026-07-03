/* =============================================================================
   B.O. BEOLA — MAIN SCRIPT
   Handles: language switching, filling contact links from config,
   building the business & location cards, mobile menu, and the contact form.
   You normally do NOT need to edit this file.
============================================================================= */

(function () {
  "use strict";

  var DEFAULT_LANG = "sq";                 // Albanian is the default
  var SUPPORTED = ["sq", "en", "de"];
  var STORAGE_KEY = "beola_lang";

  /* Small helpers ---------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function mapsEmbed(address) {
    return "https://www.google.com/maps?q=" + encodeURIComponent(address) + "&output=embed";
  }
  function mapsDirections(address) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
  }

  /* ---- Derived contact links (built once from CONFIG) -------------------- */
  function igLabel(url) {
    var m = String(url || "").match(/instagram\.com\/([^\/?#]+)/i);
    return m && m[1] ? "@" + m[1] : "Instagram";
  }
  var LINKS = {
    callHref: "tel:" + CONFIG.mainPhoneDial.replace(/\s+/g, ""),
    whatsappHref: "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, ""),
    emailHref: "mailto:" + CONFIG.email,
    instagramHref: CONFIG.instagram,
    instagramLabel: igLabel(CONFIG.instagram),
    phoneDisplay: CONFIG.mainPhoneDisplay,
    email: CONFIG.email,
    mainAddress: CONFIG.businesses[0] ? CONFIG.businesses[0].address : ""
  };

  /* ---- Apply config values to elements marked with data-config ----------- */
  function applyConfig() {
    $all("[data-config]").forEach(function (el) {
      var key = el.getAttribute("data-config");
      var val = LINKS[key];
      if (val == null) return;
      if (el.tagName === "A") {
        el.setAttribute("href", val);
      } else {
        el.textContent = val;
      }
    });
  }

  /* ---- Language handling ------------------------------------------------- */
  function currentLang() {
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return SUPPORTED.indexOf(stored) > -1 ? stored : DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    var dict = I18N[lang];
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    // <html lang> + meta for SEO
    document.documentElement.setAttribute("lang", lang);
    if (dict.meta_title) document.title = dict.meta_title;
    var metaDesc = $('meta[name="description"]');
    if (metaDesc && dict.meta_description) metaDesc.setAttribute("content", dict.meta_description);

    // Text nodes
    $all("[data-i18n]").forEach(function (el) {
      var val = dict[el.getAttribute("data-i18n")];
      if (typeof val === "string") el.textContent = val;
    });
    // Placeholders
    $all("[data-i18n-ph]").forEach(function (el) {
      var val = dict[el.getAttribute("data-i18n-ph")];
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });
    // Localized aria-labels (e.g. the icon-only mobile call button, menu toggle)
    $all("[data-i18n-aria]").forEach(function (el) {
      var val = dict[el.getAttribute("data-i18n-aria")];
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    // Active button state
    $all(".lang-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });

    // Re-render dynamic cards in the new language
    renderBusinesses(dict);
    renderLocations(dict);
  }

  /* ---- Business cards ---------------------------------------------------- */
  function renderBusinesses(dict) {
    var grid = $("#business-grid");
    if (!grid) return;
    // All branches share the same description/services (same company).
    // Only branches with a real address are shown (Branch 3 stays hidden until filled in).
    var branches = CONFIG.businesses.filter(function (b) {
      return b.address && b.address.trim() && !/\[|\]/.test(b.address);
    });
    var desc = dict.branch_desc || "";
    var services = dict.branch_services || [];
    var servicesHtml = services.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
    grid.innerHTML = branches.map(function (biz, i) {
      var isMain = i === 0;
      return '' +
        '<article class="business-card' + (isMain ? " is-main" : "") + '">' +
          (isMain ? '<span class="business-badge">' + esc(dict.biz_badge_main || "") + "</span>" : "") +
          "<h3>" + esc(biz.name) + "</h3>" +
          '<p class="business-desc">' + esc(desc) + "</p>" +
          "<h4>" + esc(dict.label_services || "Services") + "</h4>" +
          '<ul class="business-services">' + servicesHtml + "</ul>" +
          '<div class="business-meta">' +
            '<div class="row"><span>' + esc(dict.label_address || "Address") + "</span><span>" + esc(biz.address) + "</span></div>" +
            '<div class="row"><span>' + esc(dict.label_phone || "Phone") + '</span><a href="tel:' + esc(biz.phoneDial.replace(/\s+/g, "")) + '">' + esc(biz.phoneDisplay) + "</a></div>" +
            '<div class="row"><span>' + esc(dict.label_email || "Email") + '</span><a href="mailto:' + esc(biz.email) + '">' + esc(biz.email) + "</a></div>" +
            '<div class="row"><span>' + esc(dict.label_instagram || "Instagram") + '</span><a href="' + esc(biz.instagram) + '" target="_blank" rel="noopener">' + esc(igLabel(biz.instagram)) + "</a></div>" +
            '<div class="row"><span>' + esc(dict.label_hours || "Hours") + "</span><span>" + esc(dict.hours_line1 || "") + "<br>" + esc(dict.hours_line2 || "") + "</span></div>" +
          "</div>" +
        "</article>";
    }).join("");
  }

  /* ---- Location cards (maps + directions) -------------------------------- */
  function renderLocations(dict) {
    var grid = $("#location-grid");
    if (!grid) return;
    grid.innerHTML = CONFIG.locations.map(function (loc) {
      var title = dict[loc.key + "_title"] || loc.address;
      return '' +
        '<article class="location-card">' +
          '<div class="location-map">' +
            '<iframe src="' + esc(mapsEmbed(loc.address)) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + esc(title) + '"></iframe>' +
          "</div>" +
          '<div class="location-body">' +
            "<h3>" + esc(title) + "</h3>" +
            '<p class="location-address">' + esc(loc.address) + "</p>" +
            '<p class="location-hours"><strong>' + esc(dict.label_hours || "Opening hours") + "</strong>" +
              esc(dict.hours_line1 || "") + "<br>" + esc(dict.hours_line2 || "") + "</p>" +
            '<div class="location-actions">' +
              '<a class="btn btn-dark" href="' + esc(mapsDirections(loc.address)) + '" target="_blank" rel="noopener">' + esc(dict.btn_directions || "Get Directions") + "</a>" +
            "</div>" +
          "</div>" +
        "</article>";
    }).join("");
  }

  /* ---- Contact form -> WhatsApp / email ---------------------------------- */
  function buildMessage() {
    var dict = I18N[currentLang()];
    var form = $("#contact-form");
    var name = (form.name.value || "").trim();
    var phone = (form.phone.value || "").trim();
    var time = (form.time.value || "").trim();
    var message = (form.message.value || "").trim();

    var lines = [dict.wa_greeting || "Hello B.O. BEOLA:"];
    lines.push((dict.form_name || "Name") + ": " + name);
    lines.push((dict.form_phone || "Phone") + ": " + phone);
    if (time) lines.push((dict.form_time || "Preferred time") + ": " + time);
    if (message) lines.push((dict.form_message || "Message") + ": " + message);
    return lines.join("\n");
  }

  function validForm() {
    var form = $("#contact-form");
    if (!form.name.value.trim() || !form.phone.value.trim()) {
      form.reportValidity();
      return false;
    }
    return true;
  }

  function setupForm() {
    var form = $("#contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validForm()) return;
      var text = encodeURIComponent(buildMessage());
      var url = "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") + "?text=" + text;
      var w = window.open(url, "_blank");
      if (w) w.opener = null;
    });

    var emailBtn = $("#email-btn");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        if (!validForm()) return;
        var subject = encodeURIComponent("B.O. BEOLA — " + (I18N[currentLang()].appointment_title || "Contact"));
        var body = encodeURIComponent(buildMessage());
        window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
      });
    }
  }

  /* ---- Mobile menu ------------------------------------------------------- */
  function setupNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $all("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Warn the owner (in the browser console) if placeholders remain ---- */
  function checkConfig() {
    var warns = [];
    if (CONFIG.whatsappNumber.replace(/\D/g, "").length < 8) warns.push("whatsappNumber");
    if (CONFIG.mainPhoneDial.replace(/[^\d+]/g, "").length < 8) warns.push("mainPhoneDial");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(CONFIG.email)) warns.push("email");
    if (!/instagram\.com\/[^\/?#]+/i.test(CONFIG.instagram)) warns.push("instagram (no profile set)");
    CONFIG.businesses.forEach(function (b, i) {
      if (/\[|\]/.test(b.name)) warns.push("businesses[" + i + "].name");
    });
    if (warns.length) {
      console.warn("[BEOLA] These config values in js/config.js still need real data before going live: " + warns.join(", "));
    }
  }

  /* ---- Init -------------------------------------------------------------- */
  function init() {
    checkConfig();
    applyConfig();
    setupNav();
    setupForm();
    $all(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLang(btn.getAttribute("data-lang")); });
    });
    applyLang(currentLang());
    var year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

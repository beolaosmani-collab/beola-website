/* =============================================================================
   B.O. BEOLA SHPK — runtime enhancements (small, optional)
   Loaded on every page. Adds: header shadow, mobile menu, favorites (localStorage),
   contact form → WhatsApp, product gallery, share, and the image lightbox.
   The header search submits natively to /products/?search=… (works without JS).
============================================================================= */
(function () {
  "use strict";
  var qs = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Sticky header shadow ---- */
  var header = document.getElementById("top");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    qsa("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---- Favorites (Save) — localStorage, delegated ---- */
  var SKEY = "beola_saved";
  function getSaved() { try { return JSON.parse(localStorage.getItem(SKEY) || "[]"); } catch (e) { return []; } }
  function setSaved(a) { try { localStorage.setItem(SKEY, JSON.stringify(a)); } catch (e) {} }
  function syncSaved() {
    var s = getSaved();
    qsa(".save-btn").forEach(function (b) {
      var on = s.indexOf(b.getAttribute("data-save")) > -1;
      b.classList.toggle("is-saved", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    qsa("[data-saved-count]").forEach(function (c) {
      if (s.length) { c.hidden = false; c.textContent = s.length; } else { c.hidden = true; }
    });
  }
  window.beolaGetSaved = getSaved;
  window.beolaSyncSaved = syncSaved;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".save-btn") : null;
    if (!btn) return;
    e.preventDefault();
    var id = btn.getAttribute("data-save"), s = getSaved(), i = s.indexOf(id);
    if (i > -1) s.splice(i, 1); else s.push(id);
    setSaved(s); syncSaved();
    if (window.beolaRenderSaved) window.beolaRenderSaved();
  });
  syncSaved();

  /* ---- Contact form → WhatsApp ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var d = form.dataset;
    var field = function (n) { return form.elements[n]; };
    var setStatus = function (text, ok) {
      if (!status) return;
      status.hidden = false; status.textContent = text;
      status.classList.toggle("is-ok", ok); status.classList.toggle("is-error", !ok);
    };
    var message = function () {
      var lines = [d.greeting];
      lines.push(d.lName + ": " + field("name").value.trim());
      lines.push(d.lPhone + ": " + field("phone").value.trim());
      if (field("need") && field("need").value.trim()) lines.push(d.lNeed + ": " + field("need").value.trim());
      return lines.join("\n");
    };
    var validate = function () {
      var errs = [];
      [["name", d.errName], ["phone", d.errPhone]].forEach(function (p) {
        var el = field(p[0]); var empty = !el.value.trim();
        el.setAttribute("aria-invalid", empty ? "true" : "false");
        if (empty) errs.push(p[1]);
      });
      if (errs.length) { setStatus(errs.join(" "), false); (field("name").value.trim() ? field("phone") : field("name")).focus(); return false; }
      return true;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      var w = window.open("https://wa.me/" + d.wa + "?text=" + encodeURIComponent(message()), "_blank");
      if (w) w.opener = null;
      setStatus(d.ok, true);
    });
    ["name", "phone"].forEach(function (n) {
      var el = field(n);
      if (el) el.addEventListener("input", function () { el.setAttribute("aria-invalid", "false"); });
    });
  }

  /* ---- Product gallery (thumbnail swap) ---- */
  var pdMain = qs(".pd-main");
  if (pdMain) {
    var pdImg = qs("img", pdMain);
    var pdSource = qs("source", pdMain);
    qsa(".pd-thumb").forEach(function (th) {
      th.addEventListener("click", function () {
        var jpg = th.getAttribute("data-img");
        var webp = jpg.replace(/\.jpg$/, ".webp");
        if (pdSource) pdSource.srcset = webp;
        if (pdImg) pdImg.src = jpg;
        pdMain.setAttribute("data-full", jpg);
        qsa(".pd-thumb").forEach(function (x) { x.classList.remove("is-active"); });
        th.classList.add("is-active");
      });
    });
  }

  /* ---- Share ---- */
  function toast(msg) {
    var el = document.createElement("div");
    el.className = "beola-toast"; el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.classList.add("show"); }, 10);
    setTimeout(function () { el.classList.remove("show"); setTimeout(function () { el.remove(); }, 300); }, 1800);
  }
  qsa(".share-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var data = { title: b.getAttribute("data-share-title") || document.title, url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(function () { toast(b.getAttribute("data-copied") || "Link copied"); }).catch(function () {}); }
    });
  });

  /* ---- Lightbox (any [data-full]) ---- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = qs("img", lb), close = qs(".lightbox-close", lb);
    var openLb = function (src) { lbImg.src = src; lb.hidden = false; lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; close.focus(); };
    var hideLb = function () { lb.hidden = true; lb.setAttribute("aria-hidden", "true"); lbImg.src = ""; document.body.style.overflow = ""; };
    document.addEventListener("click", function (e) {
      var el = e.target.closest ? e.target.closest("[data-full]") : null;
      if (el) { e.preventDefault(); openLb(el.getAttribute("data-full")); }
    });
    close.addEventListener("click", hideLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) hideLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) hideLb(); });
  }
})();

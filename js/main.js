/* =============================================================================
   B.O. BEOLA SHPK — runtime enhancements (small, optional)
   Everything is readable and all contact details/links are truthful WITHOUT JS.
   This adds: sticky-header shadow, mobile menu, search → WhatsApp enquiry,
   contact form → WhatsApp, and the gallery lightbox. No content/data lives here.
============================================================================= */
(function () {
  "use strict";
  var qs = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.getElementById("top");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Header search → pre-filled WhatsApp enquiry (no fake results) ---- */
  var search = qs(".site-search");
  if (search) {
    search.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = qs("input", search);
      var q = (input && input.value || "").trim();
      if (!q) { if (input) input.focus(); return; }
      var text = (search.dataset.greeting || "") + " " + q;
      var w = window.open("https://wa.me/" + search.dataset.wa + "?text=" + encodeURIComponent(text), "_blank");
      if (w) w.opener = null;
    });
  }

  /* ---- Contact form → WhatsApp / validation / status ---- */
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

  /* ---- Gallery lightbox ---- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = qs("img", lb);
    var close = qs(".lightbox-close", lb);
    var open = function (src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.hidden = false; lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      close.focus();
    };
    var hide = function () {
      lb.hidden = true; lb.setAttribute("aria-hidden", "true");
      lbImg.src = ""; document.body.style.overflow = "";
    };
    qsa(".gcell").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = qs("img", btn);
        open(btn.getAttribute("data-full"), img ? img.alt : "");
      });
    });
    close.addEventListener("click", hide);
    lb.addEventListener("click", function (e) { if (e.target === lb) hide(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) hide(); });
  }
})();

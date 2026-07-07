/* =============================================================================
   B.O. BEOLA — runtime enhancements (tiny, optional)
   The site is fully readable and all contact details are truthful WITHOUT this
   file. It only adds: the mobile menu, and turning the contact form into a
   pre-filled WhatsApp / email message. No content or contact data lives here.
============================================================================= */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Contact form → WhatsApp / email ---- */
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var d = form.dataset;

  function setStatus(text, ok) {
    if (!status) return;
    status.hidden = false;
    status.textContent = text;
    status.classList.toggle("is-ok", ok);
    status.classList.toggle("is-error", !ok);
  }
  function field(name) { return form.elements[name]; }

  function message() {
    var lines = [d.greeting];
    lines.push(d.lName + ": " + field("name").value.trim());
    lines.push(d.lPhone + ": " + field("phone").value.trim());
    if (field("need") && field("need").value.trim()) lines.push(d.lNeed + ": " + field("need").value.trim());
    return lines.join("\n");
  }

  function validate() {
    var errs = [];
    [["name", d.errName], ["phone", d.errPhone]].forEach(function (pair) {
      var el = field(pair[0]);
      var empty = !el.value.trim();
      el.setAttribute("aria-invalid", empty ? "true" : "false");
      if (empty) errs.push(pair[1]);
    });
    if (errs.length) {
      setStatus(errs.join(" "), false);
      var first = !field("name").value.trim() ? field("name") : field("phone");
      first.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    var url = "https://wa.me/" + d.wa + "?text=" + encodeURIComponent(message());
    var w = window.open(url, "_blank");
    if (w) w.opener = null;
    setStatus(d.ok, true);
  });

  var emailBtn = document.getElementById("email-btn");
  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      if (!validate()) return;
      var subject = "B.O. BEOLA — " + d.lName + ": " + field("name").value.trim();
      window.location.href = "mailto:" + d.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(message());
      setStatus(d.ok, true);
    });
  }

  /* Clear the invalid state as the user types */
  ["name", "phone"].forEach(function (n) {
    var el = field(n);
    if (el) el.addEventListener("input", function () { el.setAttribute("aria-invalid", "false"); });
  });
})();

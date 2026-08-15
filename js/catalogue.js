/* =============================================================================
   B.O. BEOLA SHPK — catalogue behaviour (loaded on /products/, categories, /saved/)
   Filters/sorts/searches the REAL pre-rendered product cards (never fabricates
   results), syncs state to the URL, and renders the saved-appliances page.
============================================================================= */
(function () {
  "use strict";
  var qs = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ===== Saved appliances page ===== */
  var savedGrid = qs("[data-saved-grid]");
  if (savedGrid) {
    var dataEl = qs("#saved-data");
    var all = []; try { all = JSON.parse(dataEl.textContent); } catch (e) {}
    var map = {}; all.forEach(function (x) { map[x.id] = x.html; });
    var savedEmpty = qs("[data-saved-empty]");
    window.beolaRenderSaved = function () {
      var ids = window.beolaGetSaved ? window.beolaGetSaved() : [];
      savedGrid.innerHTML = ids.map(function (id) { return map[id] || ""; }).join("");
      var has = savedGrid.children.length > 0;
      savedGrid.hidden = !has;
      if (savedEmpty) savedEmpty.hidden = has;
      if (window.beolaSyncSaved) window.beolaSyncSaved();
    };
    window.beolaRenderSaved();
  }

  /* ===== Catalogue filtering ===== */
  var grid = qs("[data-grid]");
  if (!grid) return;
  var cards = qsa(".pcard", grid);
  var checks = qsa("[data-filter]");
  var sortSel = qs("[data-sort]");
  var countEl = qs("[data-count]");
  var chipsEl = qs("[data-active-filters]");
  var emptyEl = qs("[data-empty]");
  var searchInput = qs(".site-search input");
  var searchForm = qs(".site-search");
  var GROUPS = ["category", "brand", "availability", "branch"];
  var searchQuery = "";

  function selected(group) { return checks.filter(function (c) { return c.getAttribute("data-filter") === group && c.checked; }).map(function (c) { return c.value; }); }
  function labelFor(group, value) {
    var c = checks.filter(function (x) { return x.getAttribute("data-filter") === group && x.value === value; })[0];
    if (c) { var sp = c.parentNode.querySelector("span"); return sp ? sp.textContent : value; }
    return value;
  }
  function clearLabel() { var b = qs("[data-clear]"); return b ? b.textContent.trim() : "Clear"; }

  function apply(pushUrl) {
    var sel = {}; GROUPS.forEach(function (g) { sel[g] = selected(g); });
    var q = searchQuery.trim().toLowerCase();
    var visible = [];
    cards.forEach(function (card) {
      var ok = true;
      if (q && (card.getAttribute("data-search") || "").indexOf(q) === -1) ok = false;
      if (ok && sel.category.length) { var cc = (card.getAttribute("data-cats") || "").split(" "); ok = sel.category.some(function (v) { return cc.indexOf(v) > -1; }); }
      if (ok && sel.brand.length) ok = sel.brand.indexOf(card.getAttribute("data-brand")) > -1;
      if (ok && sel.availability.length) ok = sel.availability.indexOf(card.getAttribute("data-avail")) > -1;
      if (ok && sel.branch.length) ok = sel.branch.indexOf(card.getAttribute("data-branch")) > -1;
      card.hidden = !ok;
      if (ok) visible.push(card);
    });
    var mode = sortSel ? sortSel.value : "newest";
    visible.sort(function (a, b) {
      if (mode === "brand-az" || mode === "brand-za") {
        var ba = a.getAttribute("data-brand") || "￿", bb = b.getAttribute("data-brand") || "￿";
        if (ba < bb) return mode === "brand-za" ? 1 : -1;
        if (ba > bb) return mode === "brand-za" ? -1 : 1;
        return 0;
      }
      var fa = (a.getAttribute("data-new") === "1" || a.getAttribute("data-featured") === "1") ? 1 : 0;
      var fb = (b.getAttribute("data-new") === "1" || b.getAttribute("data-featured") === "1") ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return (b.getAttribute("data-created") || "").localeCompare(a.getAttribute("data-created") || "");
    });
    visible.forEach(function (c) { grid.appendChild(c); });
    if (countEl) countEl.textContent = visible.length;
    if (emptyEl) emptyEl.hidden = visible.length > 0;
    grid.hidden = visible.length === 0;
    renderChips(sel);
    if (pushUrl !== false) syncUrl(sel, q);
  }

  function renderChips(sel) {
    if (!chipsEl) return;
    var chips = [];
    GROUPS.forEach(function (g) {
      sel[g].forEach(function (v) {
        chips.push('<button type="button" class="chip" data-remove-group="' + g + '" data-remove-value="' + esc(v) + '">' + esc(labelFor(g, v)) + ' <span aria-hidden="true">×</span></button>');
      });
    });
    if (searchQuery.trim()) chips.push('<button type="button" class="chip" data-remove-search>“' + esc(searchQuery.trim()) + '” <span aria-hidden="true">×</span></button>');
    if (chips.length) chips.push('<button type="button" class="chip chip-clear" data-clear>' + esc(clearLabel()) + '</button>');
    chipsEl.innerHTML = chips.join("");
    chipsEl.hidden = chips.length === 0;
  }

  function syncUrl(sel, q) {
    var params = new URLSearchParams();
    GROUPS.forEach(function (g) { if (sel[g].length) params.set(g, sel[g].join(",")); });
    if (q) params.set("search", q);
    if (sortSel && sortSel.value && sortSel.value !== "newest") params.set("sort", sortSel.value);
    var s = params.toString();
    try { history.replaceState(null, "", location.pathname + (s ? "?" + s : "")); } catch (e) {}
  }
  function readUrl() {
    var params = new URLSearchParams(location.search);
    GROUPS.forEach(function (g) {
      var v = params.get(g); if (!v) return;
      var vals = v.split(",");
      checks.forEach(function (c) { if (c.getAttribute("data-filter") === g && vals.indexOf(c.value) > -1) c.checked = true; });
    });
    var s = params.get("search"); if (s) { searchQuery = s; if (searchInput) searchInput.value = s; }
    var so = params.get("sort"); if (so && sortSel) sortSel.value = so;
  }

  checks.forEach(function (c) { c.addEventListener("change", function () { apply(); }); });
  if (sortSel) sortSel.addEventListener("change", function () { apply(); });
  if (searchInput) searchInput.addEventListener("input", function () { searchQuery = searchInput.value; apply(); });
  if (searchForm) searchForm.addEventListener("submit", function (e) { e.preventDefault(); searchQuery = searchInput ? searchInput.value : ""; apply(); });

  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-clear]")) { checks.forEach(function (c) { c.checked = false; }); searchQuery = ""; if (searchInput) searchInput.value = ""; apply(); return; }
    var rem = e.target.closest ? e.target.closest("[data-remove-group]") : null;
    if (rem) { var g = rem.getAttribute("data-remove-group"), v = rem.getAttribute("data-remove-value"); checks.forEach(function (c) { if (c.getAttribute("data-filter") === g && c.value === v) c.checked = false; }); apply(); return; }
    if (e.target.closest && e.target.closest("[data-remove-search]")) { searchQuery = ""; if (searchInput) searchInput.value = ""; apply(); return; }
  });

  /* mobile filters drawer */
  var filters = qs("#filters");
  function openF() { if (filters) { filters.classList.add("is-open"); document.body.style.overflow = "hidden"; } }
  function closeF() { if (filters) { filters.classList.remove("is-open"); document.body.style.overflow = ""; } }
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("[data-filters-open]")) openF();
    else if (e.target.closest && e.target.closest("[data-filters-close]")) closeF();
    else if (e.target === filters) closeF();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeF(); });

  readUrl();
  apply(false);
})();

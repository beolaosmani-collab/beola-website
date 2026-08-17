/* =============================================================================
   B.O. BEOLA SHPK — CATALOGUE CONFIG (categories + availability statuses)
   -----------------------------------------------------------------------------
   👉 Individual APPLIANCES now live as one file each in  content/products/*.json
      and are edited through the Pages CMS admin (or directly on GitHub).
      See OWNER_GUIDE.md → "Add a product".

   This file only holds the category list and availability statuses, which
   change rarely. After editing, run `node build.mjs`.
============================================================================= */

/* Catalogue categories (Service & Repairs is intentionally NOT here). */
export const CATEGORIES = [
  { id: "washers", slug: "washing-machines", image: "prod-washers", name: { sq: "Lavatriçe", en: "Washing Machines", de: "Waschmaschinen" } },
  { id: "dryers", slug: "dryers", image: "prod-dryers", name: { sq: "Tharëse", en: "Dryers", de: "Trockner" } },
  { id: "ovens", slug: "ovens-cookers", image: "prod-ovens", name: { sq: "Furra & Kuzhina", en: "Ovens & Cookers", de: "Backöfen & Herde" } },
  { id: "dishwashers", slug: "dishwashers", image: "prod-dishwashers", name: { sq: "Lavastovilje", en: "Dishwashers", de: "Geschirrspüler" } },
  { id: "fridges", slug: "fridges", image: "prod-fridges", name: { sq: "Frigoriferë", en: "Fridges", de: "Kühlschränke" } },
  { id: "professional", slug: "professional-equipment", image: "gallery-5", flag: "professional", name: { sq: "Pajisje Profesionale", en: "Professional Equipment", de: "Profigeräte" } },
];

/* Availability statuses (UI colour tone + label). Only the ones you use appear. */
export const AVAIL = {
  available: { tone: "ok", label: { sq: "E disponueshme", en: "Available", de: "Verfügbar" } },
  ask: { tone: "neutral", label: { sq: "Pyet për disponueshmërinë", en: "Ask about availability", de: "Verfügbarkeit anfragen" } },
  reserved: { tone: "warn", label: { sq: "E rezervuar", en: "Reserved", de: "Reserviert" } },
  sold: { tone: "muted", label: { sq: "E shitur", en: "Sold", de: "Verkauft" } },
};

export default { CATEGORIES, AVAIL };

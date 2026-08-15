/* =============================================================================
   B.O. BEOLA SHPK — PRODUCT CATALOGUE DATA
   -----------------------------------------------------------------------------
   This is where appliances live. Add one object to PRODUCTS and it automatically
   appears in: the catalogue, its category page, brand & search filtering, its own
   product page, related products, new-arrivals, and the WhatsApp enquiry — no page
   editing needed. Then run `node build.mjs` (or push to GitHub).

   🔴 HONESTY RULES (important):
   - Only fill fields you can stand behind. EVERY field except id/slug/title/
     brand/category/images is OPTIONAL — missing fields simply don't show.
   - Never invent prices, model numbers, specifications, condition or stock.
   - Brand & model names are NOT translated (e.g. "Miele W1" stays "Miele W1").
   - `priceOnRequest: true` shows "Ask for price". Set a numeric `price` only when
     it is a real, current price.

   Product schema (all optional unless marked required):
     id           required, unique, e.g. "p-001"
     slug         required, URL-safe, unique, e.g. "miele-washing-machine-1"
     title        required, { sq, en, de }  (category label may be translated)
     brand        e.g. "Miele" ("" if unbranded)
     model        e.g. "W1 WCG370"          (omit if unknown)
     category     required, one of the CATEGORIES ids below
     images       required, array of image basenames in /images (no extension)
     description  { sq, en, de }             (omit if none)
     specs        [{ label:{sq,en,de}, value:"8 kg" }]  (omit rows you don't have)
     condition    { sq, en, de }             (only if you classify condition)
     availability "available" | "ask" | "reserved" | "sold"   (default "ask")
     branch       branch slug: "yzberisht" | "mezez" | "vaqarr"  (omit if n/a)
     price        number (real price only)   |  priceOnRequest: true
     featured     true → highlighted
     newArrival   true → shown in homepage New Arrivals + "NEW" badge
     professional true → also listed under Professional Equipment
     wholesale    true → "wholesale" note
     active       false → hidden from the public catalogue (keeps the data)
     createdAt    "YYYY-MM-DD" (used for "Newest" sorting)
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

/* Availability statuses (UI colour + label). Only the ones you use need appear. */
export const AVAIL = {
  available: { tone: "ok", label: { sq: "E disponueshme", en: "Available", de: "Verfügbar" } },
  ask: { tone: "neutral", label: { sq: "Pyet për disponueshmërinë", en: "Ask about availability", de: "Verfügbarkeit anfragen" } },
  reserved: { tone: "warn", label: { sq: "E rezervuar", en: "Reserved", de: "Reserviert" } },
  sold: { tone: "muted", label: { sq: "E shitur", en: "Sold", de: "Verkauft" } },
};

/* -----------------------------------------------------------------------------
   Starter appliances — HONEST, brand+category level (real photos, no invented
   models/specs/prices). Replace/extend with your real stock.
--------------------------------------------------------------------------------*/
export const PRODUCTS = [
  { id: "p-001", slug: "miele-washing-machine", brand: "Miele", category: "washers", images: ["prod-washers"],
    title: { sq: "Lavatriçe Miele", en: "Miele washing machine", de: "Miele Waschmaschine" },
    availability: "ask", priceOnRequest: true, newArrival: true, featured: true, active: true, createdAt: "2026-07-08" },

  { id: "p-002", slug: "miele-washing-machine-premium", brand: "Miele", category: "washers", images: ["gallery-3"],
    title: { sq: "Lavatriçe premium Miele", en: "Miele premium washing machine", de: "Miele Premium-Waschmaschine" },
    availability: "ask", priceOnRequest: true, newArrival: true, active: true, createdAt: "2026-07-07" },

  { id: "p-003", slug: "bosch-stainless-oven", brand: "Bosch", category: "ovens", images: ["prod-ovens"],
    title: { sq: "Furrë inox Bosch", en: "Bosch stainless oven", de: "Bosch Edelstahl-Backofen" },
    availability: "ask", priceOnRequest: true, newArrival: true, active: true, createdAt: "2026-07-07" },

  { id: "p-004", slug: "built-in-oven", brand: "", category: "ovens", images: ["gallery-2"],
    title: { sq: "Furrë e integruar", en: "Built-in oven", de: "Einbau-Backofen" },
    availability: "ask", priceOnRequest: true, active: true, createdAt: "2026-07-06" },

  { id: "p-005", slug: "ceramic-hob-cooker", brand: "", category: "ovens", images: ["gallery-1"],
    title: { sq: "Kuzhinë me pianurë qeramike", en: "Cooker with ceramic hob", de: "Herd mit Ceranfeld" },
    availability: "ask", priceOnRequest: true, newArrival: true, active: true, createdAt: "2026-07-06" },

  { id: "p-006", slug: "siemens-dishwasher", brand: "Siemens", category: "dishwashers", images: ["prod-dishwashers"],
    title: { sq: "Lavastovilje Siemens", en: "Siemens dishwasher", de: "Siemens Geschirrspüler" },
    availability: "ask", priceOnRequest: true, featured: true, active: true, createdAt: "2026-07-05" },

  { id: "p-007", slug: "aeg-dryer", brand: "AEG", category: "dryers", images: ["prod-dryers"],
    title: { sq: "Tharëse AEG", en: "AEG dryer", de: "AEG Trockner" },
    availability: "ask", priceOnRequest: true, active: true, createdAt: "2026-07-05" },

  { id: "p-008", slug: "german-fridge", brand: "", category: "fridges", images: ["prod-fridges"],
    title: { sq: "Frigorifer gjerman", en: "German fridge", de: "Deutscher Kühlschrank" },
    availability: "ask", priceOnRequest: true, newArrival: true, active: true, createdAt: "2026-07-04" },

  { id: "p-009", slug: "professional-range-cooker", brand: "", category: "ovens", images: ["gallery-5"],
    title: { sq: "Kuzhinë profesionale", en: "Professional range cooker", de: "Profi-Standherd" },
    availability: "ask", priceOnRequest: true, professional: true, wholesale: true, active: true, createdAt: "2026-07-03" },

  { id: "p-010", slug: "professional-ovens", brand: "", category: "ovens", images: ["gallery-2"],
    title: { sq: "Furra profesionale", en: "Professional ovens", de: "Profi-Backöfen" },
    availability: "ask", priceOnRequest: true, professional: true, active: true, createdAt: "2026-07-02" },
];

export default { CATEGORIES, AVAIL, PRODUCTS };

/* =============================================================================
   B.O. BEOLA SHPK — SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   Edit this file, then rebuild:  node build.mjs
   (or edit it on GitHub — the GitHub Action rebuilds automatically.)

   A phone number, email or address is written ONCE here and appears correctly
   on every page and in every language. See OWNER_GUIDE.md.

   🔴 Anything marked TODO is left empty/false on purpose so the site never shows
      a claim that isn't true. Fill it in only when it is real.
============================================================================= */

export const SITE = {
  /* ---------- Deployment ---------- */
  baseUrl: "https://beolaosmani-collab.github.io/beola-website",
  basePath: "/beola-website",            // "" for a root custom domain
  defaultLang: "sq",
  langs: ["sq", "en", "de"],
  langLabel: { sq: "AL", en: "EN", de: "DE" },
  langName: { sq: "Shqip", en: "English", de: "Deutsch" },
  ogLocale: { sq: "sq_AL", en: "en_US", de: "de_DE" },

  /* ---------- Brand ---------- */
  brand: {
    short: "B.O. BEOLA",
    legal: "B.O. BEOLA SHPK",
    appliances: ["Miele", "Siemens", "Bosch", "AEG"],
  },

  /* ---------- Contact (edit here, updates everywhere) ---------- */
  contact: {
    phone1Display: "+355 68 207 3024",
    phone1Dial: "+355682073024",
    phone2Display: "+355 68 901 1606",   // "" to hide the second number
    phone2Dial: "+355689011606",
    whatsapp: "355682073024",            // digits only, no +
    email: "beolashpk@gmail.com",
    instagram: "https://www.instagram.com/elektroshtepiake_beola",
    instagramHandle: "@elektroshtepiake_beola",
  },

  /* ---------- Opening hours ---------- */
  hours: {
    weekday: { opens: "09:00", closes: "17:00" }, // Mon–Sat
    sunday: { opens: "09:00", closes: "12:30" },
    lines: {
      sq: ["E Hënë – E Shtunë: 09:00 – 17:00", "E Diel: 09:00 – 12:30"],
      en: ["Monday – Saturday: 09:00 – 17:00", "Sunday: 09:00 – 12:30"],
      de: ["Montag – Samstag: 09:00 – 17:00", "Sonntag: 09:00 – 12:30"],
    },
  },

  /* ---------- Unconfirmed claims — leave false/null until true ---------- */
  claims: {
    freeDelivery: false, warrantyMonths: null, sameDayRepair: false, financing: false,
  },

  /* ---------- Branches (all one company; each has its own page) ---------- */
  branches: [
    {
      slug: "yzberisht", area: "Yzberisht",
      address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001",
      postalCode: "1001",
      landmark: { sq: "Përballë Spitalit Amerikan", en: "Opposite the American Hospital", de: "Gegenüber dem Amerikanischen Krankenhaus" },
      isMain: true,
    },
    {
      slug: "mezez", area: "Mëzez",
      address: "Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë", postalCode: "",
      landmark: { sq: "Pranë Burger Ija", en: "Near Burger Ija", de: "Nahe Burger Ija" },
      isMain: false,
    },
    {
      slug: "vaqarr", area: "Vaqarr",
      address: "Rruga Demir Çela, Vaqarr, pranë Bar-Restorant Trëndelina, Tiranë", postalCode: "",
      landmark: { sq: "Pranë Bar-Restorant Trëndelina", en: "Near Bar-Restaurant Trëndelina", de: "Nahe Bar-Restaurant Trëndelina" },
      isMain: false,
    },
  ],

  /* ---------- Product categories (real photos in /images) ---------- */
  categories: [
    { id: "washers", image: "prod-washers",
      title: { sq: "Lavatriçe", en: "Washing Machines", de: "Waschmaschinen" },
      desc: { sq: "Lavatriçe gjermane Miele, Siemens, Bosch e AEG — të kontrolluara dhe gati për përdorim.", en: "German Miele, Siemens, Bosch and AEG washing machines — inspected and ready to use.", de: "Deutsche Waschmaschinen von Miele, Siemens, Bosch und AEG — geprüft und einsatzbereit." } },
    { id: "dryers", image: "prod-dryers",
      title: { sq: "Tharëse", en: "Dryers", de: "Trockner" },
      desc: { sq: "Tharëse gjermane efikase për rroba, ideale për familjet shqiptare.", en: "Efficient German dryers, ideal for Albanian family homes.", de: "Effiziente deutsche Trockner, ideal für albanische Familien." } },
    { id: "ovens", image: "prod-ovens",
      title: { sq: "Furra & Kuzhina", en: "Ovens & Cookers", de: "Backöfen & Herde" },
      desc: { sq: "Furra inox dhe kuzhina gjermane me pianura qeramike, gati për montim.", en: "Stainless German ovens and ceramic-hob cookers, ready to install.", de: "Edelstahl-Backöfen und deutsche Herde mit Ceranfeld, montagebereit." } },
    { id: "dishwashers", image: "prod-dishwashers",
      title: { sq: "Lavastovilje", en: "Dishwashers", de: "Geschirrspüler" },
      desc: { sq: "Lavastovilje gjermane që kursejnë ujë e energji, me performancë të lartë.", en: "German dishwashers that save water and energy, with high performance.", de: "Deutsche Geschirrspüler, die Wasser und Energie sparen, mit hoher Leistung." } },
    { id: "fridges", image: "prod-fridges",
      title: { sq: "Frigoriferë", en: "Fridges", de: "Kühlschränke" },
      desc: { sq: "Frigoriferë gjermanë të kontrolluar, për çdo madhësi kuzhine.", en: "Inspected German fridges, for every kitchen size.", de: "Geprüfte deutsche Kühlschränke, für jede Küchengröße." } },
    { id: "repair", image: "prod-repair",
      title: { sq: "Servis & Riparime", en: "Service & Repairs", de: "Service & Reparaturen" },
      desc: { sq: "Servis dhe riparim i pajisjeve elektroshtëpiake, nga një ekip me përvojë.", en: "Service and repair of household appliances, from an experienced team.", de: "Service und Reparatur von Haushaltsgeräten durch ein erfahrenes Team." } },
  ],

  /* ---------- Products in focus (edit any time to match current stock) ---------- */
  featured: [
    { image: "gallery-3",
      title: { sq: "Lavatriçe premium", en: "Premium washing machines", de: "Premium-Waschmaschinen" },
      note: { sq: "Miele, Bosch & Siemens të kontrolluara — stok që ndryshon çdo javë.", en: "Inspected Miele, Bosch & Siemens — stock that changes weekly.", de: "Geprüfte Miele, Bosch & Siemens — Bestand wechselt wöchentlich." } },
    { image: "prod-ovens",
      title: { sq: "Furra & kuzhina", en: "Ovens & cookers", de: "Backöfen & Herde" },
      note: { sq: "Furra inox dhe kuzhina me pianura qeramike — gati për montim.", en: "Stainless ovens and ceramic-hob cookers — ready to install.", de: "Edelstahl-Backöfen und Herde mit Ceranfeld — montagebereit." } },
    { image: "gallery-4",
      title: { sq: "Të sapoardhura nga Gjermania", en: "Fresh arrivals from Germany", de: "Neu aus Deutschland" },
      note: { sq: "Ngarkesa të reja çdo muaj në tri degët tona.", en: "New shipments every month across our three branches.", de: "Jeden Monat neue Lieferungen in unseren drei Filialen." } },
    { image: "gallery-1",
      title: { sq: "Oferta për shumicë", en: "Wholesale offers", de: "Großhandelsangebote" },
      note: { sq: "Çmime të favorshme për blerje me shumicë — pyetni për ofertën.", en: "Favourable prices for wholesale buyers — ask for the offer.", de: "Günstige Preise für Großabnehmer — fragen Sie nach dem Angebot." } },
  ],

  /* ---------- Why choose us (4 practical reasons) ---------- */
  whyus: [
    { icon: "check", title: { sq: "Të kontrolluara & gati për përdorim", en: "Inspected & ready to use", de: "Geprüft & einsatzbereit" },
      desc: { sq: "Çdo pajisje kontrollohet nga teknikët tanë përpara se të dalë në shitje.", en: "Every appliance is checked by our technicians before it goes on sale.", de: "Jedes Gerät wird vor dem Verkauf von unseren Technikern geprüft." } },
    { icon: "truck", title: { sq: "Import direkt nga Gjermania", en: "Direct import from Germany", de: "Direktimport aus Deutschland" },
      desc: { sq: "Sjellim pajisjet drejtpërdrejt nga Gjermania, pa ndërmjetës.", en: "We bring appliances straight from Germany, with no middlemen.", de: "Wir bringen Geräte direkt aus Deutschland, ohne Zwischenhändler." } },
    { icon: "retail", title: { sq: "Shumicë & Pakicë", en: "Wholesale & Retail", de: "Groß- & Einzelhandel" },
      desc: { sq: "Blerje për familje dhe për biznese, me çmime konkurruese.", en: "For households and for businesses, at competitive prices.", de: "Für Haushalte und Unternehmen, zu wettbewerbsfähigen Preisen." } },
    { icon: "wrench", title: { sq: "Servis & ekspertizë teknike", en: "Service & technical expertise", de: "Service & technische Expertise" },
      desc: { sq: "Ju qëndrojmë pranë edhe pas blerjes, me servis dhe këshilla.", en: "We stay by your side after the sale, with service and advice.", de: "Wir bleiben auch nach dem Kauf an Ihrer Seite — mit Service und Beratung." } },
  ],

  /* ---------- Warehouse gallery (6 curated photos) ---------- */
  gallery: [
    { image: "gallery-1", alt: { sq: "Kuzhina dhe furra gjermane në radhë", en: "German cookers and ovens lined up", de: "Deutsche Herde und Backöfen in Reihe" } },
    { image: "gallery-2", alt: { sq: "Korsia e furrave në magazinën tonë", en: "Aisle of ovens in our warehouse", de: "Backofen-Gang in unserem Lager" } },
    { image: "gallery-3", alt: { sq: "Lavatriçe gjermane të rreshtuara", en: "German washing machines lined up", de: "Deutsche Waschmaschinen in Reihe" } },
    { image: "gallery-4", alt: { sq: "Frigoriferë dhe pajisje në magazinë", en: "Fridges and appliances in the warehouse", de: "Kühlschränke und Geräte im Lager" } },
    { image: "gallery-5", alt: { sq: "Furra dhe kuzhina në magazinën tonë", en: "Ovens and cookers in our warehouse", de: "Backöfen und Herde in unserem Lager" } },
    { image: "gallery-6", alt: { sq: "Tabela e B.O. BEOLA në hyrje", en: "B.O. BEOLA sign at the entrance", de: "B.O. BEOLA Schild am Eingang" } },
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: { sq: "A ndryshon stoku?", en: "Does the stock change?", de: "Ändert sich der Bestand?" },
      a: { sq: "Po. Stoku përditësohet vazhdimisht me ngarkesa të reja nga Gjermania. Na shkruani në WhatsApp për disponueshmërinë e sotme.", en: "Yes. Stock updates constantly with new shipments from Germany. Message us on WhatsApp for today's availability.", de: "Ja. Der Bestand wird ständig mit neuen Lieferungen aus Deutschland aktualisiert. Schreiben Sie uns auf WhatsApp für die aktuelle Verfügbarkeit." } },
    { q: { sq: "A mund të vij në showroom?", en: "Can I visit the showroom?", de: "Kann ich den Showroom besuchen?" },
      a: { sq: "Sigurisht. Jeni të mirëpritur në orarin tonë të hapjes në secilën nga tri degët.", en: "Of course. You are welcome during our opening hours at any of the three branches.", de: "Natürlich. Sie sind während unserer Öffnungszeiten in jeder der drei Filialen willkommen." } },
    { q: { sq: "A ofroni servis?", en: "Do you offer service?", de: "Bieten Sie Service an?" },
      a: { sq: "Po. Ekipi ynë ofron servis dhe riparime për pajisjet elektroshtëpiake gjermane.", en: "Yes. Our team offers service and repairs for German household appliances.", de: "Ja. Unser Team bietet Service und Reparaturen für deutsche Haushaltsgeräte." } },
    { q: { sq: "Ku ndodhen degët?", en: "Where are the branches?", de: "Wo sind die Filialen?" },
      a: { sq: "Kemi tri degë: Yzberisht, Mëzez dhe Vaqarr. Shihni adresat dhe hartat te seksioni Degët.", en: "We have three branches: Yzberisht, Mëzez and Vaqarr. See addresses and maps in the Branches section.", de: "Wir haben drei Filialen: Yzberisht, Mëzez und Vaqarr. Adressen und Karten im Bereich Filialen." } },
    { q: { sq: "Si mund të pyes për çmim?", en: "How can I ask about a price?", de: "Wie kann ich nach einem Preis fragen?" },
      a: { sq: "Na telefononi ose shkruani në WhatsApp me modelin që ju intereson dhe ju kthejmë çmimin menjëherë.", en: "Call us or message us on WhatsApp with the model you want and we'll send the price right away.", de: "Rufen Sie uns an oder schreiben Sie uns auf WhatsApp mit dem gewünschten Modell — wir nennen Ihnen sofort den Preis." } },
  ],

  /* ---------- Interface text (per language) ---------- */
  i18n: {
    sq: {
      dir: "Elektroshtëpiake Gjermane",
      nav_products: "Produktet", nav_branches: "Degët", nav_about: "Rreth Nesh", nav_gallery: "Galeria", nav_faq: "Pyetje", nav_contact: "Kontakt",
      skip: "Kalo te përmbajtja", menu: "Menyja", call_aria: "Na telefononi", lang_switch: "Gjuha",

      hero_eyebrow: "Elektroshtëpiake gjermane · Tiranë",
      hero_h1: "Elektroshtëpiake Gjermane në Tiranë",
      hero_sub: "Lavatriçe, tharëse, furra, lavastovilje dhe frigoriferë nga Gjermania — të kontrolluara, gati për përdorim.",
      hero_call_label: "Na telefononi",
      btn_call: "Telefono Tani", btn_wa: "WhatsApp", btn_products: "Shiko Produktet", btn_branches: "Shiko Degët", btn_directions: "Merr Udhëzime",
      brands_label: "Markat",

      cat_kicker: "Produktet", cat_title: "Kategoritë e produkteve",
      cat_sub: "Elektroshtëpiake gjermane të kontrolluara — zgjidhni kategorinë dhe na pyesni për disponueshmërinë.",
      cat_cta: "Pyet për disponueshmëri",

      feat_kicker: "Në fokus", feat_title: "Produkte në fokus",
      feat_sub: "Stoku ndryshon shpesh. Na shkruani në WhatsApp për disponueshmërinë e sotme.",
      feat_cta: "Pyet në WhatsApp",

      why_kicker: "Pse ne", why_title: "Pse të zgjidhni B.O. BEOLA",

      br_kicker: "Degët tona", br_title: "Degët Tona",
      br_sub: "Tri degë në zonën e Tiranës — e njëjta cilësi dhe i njëjti besim në çdo vendndodhje.",
      badge_main: "Dega kryesore", branch_view: "Shiko degën",
      label_address: "Adresa", label_phone: "Telefoni", label_email: "Email", label_instagram: "Instagram", label_hours: "Orari", label_services: "Shërbimet",
      branch_desc: "Shitje, import dhe servis i pajisjeve elektroshtëpiake gjermane — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Shitje pajisjesh elektroshtëpiake gjermane", "Import direkt nga Gjermania", "Servis dhe riparime teknike", "Këshillim për blerje"],
      maps_title: "Hartat e degëve",

      gal_kicker: "Galeria", gal_title: "Nga magazina jonë",

      ab_kicker: "Rreth Nesh", ab_title: "Një biznes familjar që familjet shqiptare e besojnë",
      about_p1: "B.O. BEOLA është biznes familjar në Tiranë me mbi 20 vite eksperiencë në importin, shitjen dhe servisimin e pajisjeve elektroshtëpiake gjermane. Sjellim pajisje nga marka si Miele, Siemens, Bosch dhe AEG, të kontrolluara dhe të gatshme për përdorim.",
      feat_family_t: "Biznes familjar", feat_family_d: "I udhëhequr nga vlerat e familjes dhe kujdesi për çdo klient.",
      feat_years_t: "Mbi 20 vite eksperiencë", feat_years_d: "Dy dekada pune dhe besimi në tregun shqiptar.",
      feat_import_t: "Import nga Gjermania", feat_import_d: "Pajisje cilësore të sjella drejtpërdrejt nga Gjermania.",
      feat_tech_t: "Servis & ekspertizë teknike", feat_tech_d: "Kontroll dhe servis profesional i çdo pajisjeje.",

      faq_kicker: "Pyetje", faq_title: "Pyetje të shpeshta",

      co_kicker: "Kontakt", co_title: "Na kontaktoni",
      co_sub: "Telefononi, shkruani në WhatsApp ose na vizitoni në një nga tri degët tona.",
      co_address_label: "Adresat", co_hours_label: "Orari",
      form_title: "Na shkruani në WhatsApp",
      form_name: "Emri", form_phone: "Numri i telefonit", form_need: "Çfarë po kërkoni?",
      ph_name: "Emri juaj", ph_phone: "p.sh. +355 68 …", ph_need: "p.sh. Lavatriçe Bosch, furrë inox…",
      form_submit: "Dërgo në WhatsApp",
      form_required: "* Fusha të detyrueshme",
      form_note: "Duke klikuar, hapet WhatsApp me mesazhin tuaj gati për dërgim.",
      form_err_name: "Ju lutemi shkruani emrin tuaj.", form_err_phone: "Ju lutemi shkruani një numër telefoni.",
      form_ok: "Po hapet WhatsApp me mesazhin tuaj. Nëse nuk hapet, na telefononi.",
      wa_greeting: "Përshëndetje B.O. BEOLA, dëshiroj të pyes:", wa_availability: "Përshëndetje B.O. BEOLA, dua të pyes për disponueshmërinë:",

      footer_tagline: "Elektroshtëpiake gjermane të besueshme për familjet shqiptare.",
      footer_quick: "Lidhje të shpejta", footer_contact: "Kontakt", footer_branches: "Degët",
      footer_rights: "Të gjitha të drejtat e rezervuara.",
      back_home: "Kreu", branch_hero_sub: "Elektroshtëpiake gjermane — shitje, import dhe servis. Na vizitoni në degën tonë në",
      branch_cta_title: "Na vizitoni ose na shkruani",
    },

    en: {
      dir: "German Household Appliances",
      nav_products: "Products", nav_branches: "Branches", nav_about: "About", nav_gallery: "Gallery", nav_faq: "FAQ", nav_contact: "Contact",
      skip: "Skip to content", menu: "Menu", call_aria: "Call us", lang_switch: "Language",

      hero_eyebrow: "German household appliances · Tirana",
      hero_h1: "German Appliances in Tirana",
      hero_sub: "German washing machines, dryers, ovens, dishwashers and fridges — inspected and ready to use.",
      hero_call_label: "Call us",
      btn_call: "Call Now", btn_wa: "WhatsApp", btn_products: "See Products", btn_branches: "See Branches", btn_directions: "Get Directions",
      brands_label: "Brands",

      cat_kicker: "Products", cat_title: "Product categories",
      cat_sub: "Inspected German appliances — pick a category and ask us about availability.",
      cat_cta: "Ask about availability",

      feat_kicker: "In focus", feat_title: "Products in focus",
      feat_sub: "Stock changes often. Message us on WhatsApp for today's availability.",
      feat_cta: "Ask on WhatsApp",

      why_kicker: "Why us", why_title: "Why choose B.O. BEOLA",

      br_kicker: "Our branches", br_title: "Our Branches",
      br_sub: "Three branches around Tirana — the same quality and trust at every location.",
      badge_main: "Main branch", branch_view: "View branch",
      label_address: "Address", label_phone: "Phone", label_email: "Email", label_instagram: "Instagram", label_hours: "Opening hours", label_services: "Services",
      branch_desc: "Sales, import and service of German household appliances — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Sales of German household appliances", "Direct import from Germany", "Technical service and repairs", "Purchase advice"],
      maps_title: "Branch maps",

      gal_kicker: "Gallery", gal_title: "From our warehouse",

      ab_kicker: "About Us", ab_title: "A family business Albanian families trust",
      about_p1: "B.O. BEOLA is a family business in Tirana with over 20 years of experience importing, selling and servicing German household appliances. We bring appliances from brands like Miele, Siemens, Bosch and AEG — inspected and ready to use.",
      feat_family_t: "Family business", feat_family_d: "Led by family values and genuine care for every customer.",
      feat_years_t: "Over 20 years of experience", feat_years_d: "Two decades of work and trust in the Albanian market.",
      feat_import_t: "Import from Germany", feat_import_d: "Quality appliances brought directly from Germany.",
      feat_tech_t: "Service & technical expertise", feat_tech_d: "Professional checking and service of every appliance.",

      faq_kicker: "FAQ", faq_title: "Frequently asked questions",

      co_kicker: "Contact", co_title: "Get in touch",
      co_sub: "Call, message us on WhatsApp, or visit one of our three branches.",
      co_address_label: "Addresses", co_hours_label: "Opening hours",
      form_title: "Message us on WhatsApp",
      form_name: "Name", form_phone: "Phone number", form_need: "What are you looking for?",
      ph_name: "Your name", ph_phone: "e.g. +355 68 …", ph_need: "e.g. Bosch washing machine, stainless oven…",
      form_submit: "Send on WhatsApp",
      form_required: "* Required fields",
      form_note: "Clicking opens WhatsApp with your message ready to send.",
      form_err_name: "Please enter your name.", form_err_phone: "Please enter a phone number.",
      form_ok: "WhatsApp is opening with your message. If it doesn't, please call us.",
      wa_greeting: "Hello B.O. BEOLA, I'd like to ask:", wa_availability: "Hello B.O. BEOLA, I'd like to ask about availability:",

      footer_tagline: "Trusted German household appliances for Albanian homes.",
      footer_quick: "Quick links", footer_contact: "Contact", footer_branches: "Branches",
      footer_rights: "All rights reserved.",
      back_home: "Home", branch_hero_sub: "German household appliances — sales, import and service. Visit us at our branch in",
      branch_cta_title: "Visit us or message us",
    },

    de: {
      dir: "Deutsche Haushaltsgeräte",
      nav_products: "Produkte", nav_branches: "Filialen", nav_about: "Über uns", nav_gallery: "Galerie", nav_faq: "FAQ", nav_contact: "Kontakt",
      skip: "Zum Inhalt springen", menu: "Menü", call_aria: "Rufen Sie uns an", lang_switch: "Sprache",

      hero_eyebrow: "Deutsche Haushaltsgeräte · Tirana",
      hero_h1: "Deutsche Haushaltsgeräte in Tirana",
      hero_sub: "Deutsche Waschmaschinen, Trockner, Backöfen, Geschirrspüler und Kühlschränke — geprüft und einsatzbereit.",
      hero_call_label: "Rufen Sie uns an",
      btn_call: "Jetzt anrufen", btn_wa: "WhatsApp", btn_products: "Produkte ansehen", btn_branches: "Filialen ansehen", btn_directions: "Route planen",
      brands_label: "Marken",

      cat_kicker: "Produkte", cat_title: "Produktkategorien",
      cat_sub: "Geprüfte deutsche Geräte — wählen Sie eine Kategorie und fragen Sie nach der Verfügbarkeit.",
      cat_cta: "Nach Verfügbarkeit fragen",

      feat_kicker: "Im Fokus", feat_title: "Produkte im Fokus",
      feat_sub: "Der Bestand wechselt oft. Schreiben Sie uns auf WhatsApp für die aktuelle Verfügbarkeit.",
      feat_cta: "Auf WhatsApp fragen",

      why_kicker: "Warum wir", why_title: "Warum B.O. BEOLA",

      br_kicker: "Unsere Filialen", br_title: "Unsere Filialen",
      br_sub: "Drei Filialen rund um Tirana — dieselbe Qualität und dasselbe Vertrauen an jedem Standort.",
      badge_main: "Hauptfiliale", branch_view: "Filiale ansehen",
      label_address: "Adresse", label_phone: "Telefon", label_email: "E-Mail", label_instagram: "Instagram", label_hours: "Öffnungszeiten", label_services: "Leistungen",
      branch_desc: "Verkauf, Import und Service deutscher Haushaltsgeräte — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Verkauf deutscher Haushaltsgeräte", "Direktimport aus Deutschland", "Technischer Service und Reparaturen", "Kaufberatung"],
      maps_title: "Karten der Filialen",

      gal_kicker: "Galerie", gal_title: "Aus unserem Lager",

      ab_kicker: "Über uns", ab_title: "Ein Familienunternehmen, dem albanische Familien vertrauen",
      about_p1: "B.O. BEOLA ist ein Familienunternehmen in Tirana mit über 20 Jahren Erfahrung im Import, Verkauf und Service deutscher Haushaltsgeräte. Wir bringen Geräte von Marken wie Miele, Siemens, Bosch und AEG — geprüft und einsatzbereit.",
      feat_family_t: "Familienunternehmen", feat_family_d: "Geleitet von Familienwerten und echter Sorgfalt für jeden Kunden.",
      feat_years_t: "Über 20 Jahre Erfahrung", feat_years_d: "Zwei Jahrzehnte Arbeit und Vertrauen auf dem albanischen Markt.",
      feat_import_t: "Import aus Deutschland", feat_import_d: "Hochwertige Geräte, direkt aus Deutschland gebracht.",
      feat_tech_t: "Service & technische Expertise", feat_tech_d: "Professionelle Prüfung und Wartung jedes Geräts.",

      faq_kicker: "FAQ", faq_title: "Häufige Fragen",

      co_kicker: "Kontakt", co_title: "Kontakt aufnehmen",
      co_sub: "Rufen Sie an, schreiben Sie uns auf WhatsApp oder besuchen Sie eine unserer drei Filialen.",
      co_address_label: "Adressen", co_hours_label: "Öffnungszeiten",
      form_title: "Schreiben Sie uns auf WhatsApp",
      form_name: "Name", form_phone: "Telefonnummer", form_need: "Wonach suchen Sie?",
      ph_name: "Ihr Name", ph_phone: "z. B. +355 68 …", ph_need: "z. B. Bosch-Waschmaschine, Edelstahl-Backofen…",
      form_submit: "Auf WhatsApp senden",
      form_required: "* Pflichtfelder",
      form_note: "Ein Klick öffnet WhatsApp mit Ihrer fertigen Nachricht.",
      form_err_name: "Bitte geben Sie Ihren Namen ein.", form_err_phone: "Bitte geben Sie eine Telefonnummer ein.",
      form_ok: "WhatsApp öffnet sich mit Ihrer Nachricht. Falls nicht, rufen Sie uns an.",
      wa_greeting: "Hallo B.O. BEOLA, ich möchte fragen:", wa_availability: "Hallo B.O. BEOLA, ich möchte nach der Verfügbarkeit fragen:",

      footer_tagline: "Zuverlässige deutsche Haushaltsgeräte für albanische Familien.",
      footer_quick: "Schnelllinks", footer_contact: "Kontakt", footer_branches: "Filialen",
      footer_rights: "Alle Rechte vorbehalten.",
      back_home: "Startseite", branch_hero_sub: "Deutsche Haushaltsgeräte — Verkauf, Import und Service. Besuchen Sie uns in unserer Filiale in",
      branch_cta_title: "Besuchen oder schreiben Sie uns",
    },
  },

  /* ---------- Per-language SEO ---------- */
  seo: {
    home: {
      sq: { title: "B.O. BEOLA SHPK – Elektroshtëpiake Gjermane në Tiranë | Miele, Siemens, Bosch, AEG",
            desc: "Biznes familjar në Tiranë me mbi 20 vite përvojë: import, shitje dhe servis i elektroshtëpiakeve gjermane. Lavatriçe, tharëse, furra, lavastovilje, frigoriferë. Tri degë: Yzberisht, Mëzez, Vaqarr." },
      en: { title: "B.O. BEOLA SHPK – German Household Appliances in Tirana | Miele, Siemens, Bosch, AEG",
            desc: "Family business in Tirana with 20+ years importing, selling and servicing German appliances. Washing machines, dryers, ovens, dishwashers, fridges. Three branches: Yzberisht, Mëzez, Vaqarr." },
      de: { title: "B.O. BEOLA SHPK – Deutsche Haushaltsgeräte in Tirana | Miele, Siemens, Bosch, AEG",
            desc: "Familienunternehmen in Tirana mit über 20 Jahren: Import, Verkauf und Service deutscher Haushaltsgeräte. Waschmaschinen, Trockner, Backöfen, Geschirrspüler, Kühlschränke. Drei Filialen." },
    },
  },
};

export default SITE;

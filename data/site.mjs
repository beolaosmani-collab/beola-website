/* =============================================================================
   B.O. BEOLA SHPK — SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   Edit this file, then rebuild:  node build.mjs
   (or edit it on GitHub — the GitHub Action rebuilds automatically.)

   A phone number, email, address or product is written ONCE here and appears
   correctly on every page and in every language. See OWNER_GUIDE.md.

   🔴 TODO markers are left empty/false on purpose so the site never shows a claim
      that isn't true. Never invent prices, models, specs, stock counts or reviews.
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
    appliances: ["Miele", "Bosch", "Siemens", "AEG"],
  },

  /* ---------- Contact ---------- */
  contact: {
    phone1Display: "+355 68 207 3024",
    phone1Dial: "+355682073024",
    phone2Display: "+355 68 901 1606",   // "" to hide
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
    short: { sq: "Hën–Sht 9:00–17:00 · Diel 9:00–12:30", en: "Mon–Sat 9:00–17:00 · Sun 9:00–12:30", de: "Mo–Sa 9:00–17:00 · So 9:00–12:30" },
  },

  /* ---------- Unconfirmed claims — leave false/null until true ---------- */
  claims: { freeDelivery: false, warrantyMonths: null, sameDayRepair: false, financing: false },

  /* ---------- Branches ---------- */
  branches: [
    { slug: "yzberisht", area: "Yzberisht",
      address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001", postalCode: "1001",
      landmark: { sq: "Përballë Spitalit Amerikan", en: "Opposite the American Hospital", de: "Gegenüber dem Amerikanischen Krankenhaus" }, isMain: true },
    { slug: "mezez", area: "Mëzez",
      address: "Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë", postalCode: "",
      landmark: { sq: "Pranë Burger Ija", en: "Near Burger Ija", de: "Nahe Burger Ija" }, isMain: false },
    { slug: "vaqarr", area: "Vaqarr",
      address: "Rruga Demir Çela, Vaqarr, pranë Bar-Restorant Trëndelina, Tiranë", postalCode: "",
      landmark: { sq: "Pranë Bar-Restorant Trëndelina", en: "Near Bar-Restaurant Trëndelina", de: "Nahe Bar-Restaurant Trëndelina" }, isMain: false },
  ],

  /* ---------- Shop-by-category tiles ---------- */
  categories: [
    { id: "washers", image: "prod-washers", title: { sq: "Lavatriçe", en: "Washing Machines", de: "Waschmaschinen" } },
    { id: "dryers", image: "prod-dryers", title: { sq: "Tharëse", en: "Dryers", de: "Trockner" } },
    { id: "ovens", image: "prod-ovens", title: { sq: "Furra & Kuzhina", en: "Ovens & Cookers", de: "Backöfen & Herde" } },
    { id: "dishwashers", image: "prod-dishwashers", title: { sq: "Lavastovilje", en: "Dishwashers", de: "Geschirrspüler" } },
    { id: "fridges", image: "prod-fridges", title: { sq: "Frigoriferë", en: "Fridges", de: "Kühlschränke" } },
    { id: "repair", image: "prod-repair", title: { sq: "Servis & Riparime", en: "Service & Repairs", de: "Service & Reparaturen" } },
  ],

  /* ---------- Category nav row (retail header sub-nav) ---------- */
  catnav: [
    { label: { sq: "Lavatriçe", en: "Washing Machines", de: "Waschmaschinen" }, href: "#categories" },
    { label: { sq: "Tharëse", en: "Dryers", de: "Trockner" }, href: "#categories" },
    { label: { sq: "Furra & Kuzhina", en: "Ovens & Cookers", de: "Backöfen & Herde" }, href: "#categories" },
    { label: { sq: "Lavastovilje", en: "Dishwashers", de: "Geschirrspüler" }, href: "#categories" },
    { label: { sq: "Frigoriferë", en: "Fridges", de: "Kühlschränke" }, href: "#categories" },
    { label: { sq: "Pajisje Profesionale", en: "Professional", de: "Profigeräte" }, href: "#professional" },
    { label: { sq: "Servis", en: "Service", de: "Service" }, href: "#service" },
    { label: { sq: "Të reja", en: "New Arrivals", de: "Neu" }, href: "#arrivals" },
  ],

  /* ---------- Products / New arrivals ------------------------------------------
     👉 OWNER: replace/extend these with your real current stock. Each card shows a
     photo, brand, name, category, honest badges and "Ask for price" (opens WhatsApp).
     NEVER add prices, model numbers, specs or stock counts you can't stand behind.
     Badges available: "new", "miele", "bosch", "siemens", "aeg", "import",
     "checked", "professional", "wholesale".                                       */
  products: [
    { image: "prod-washers", brand: "Miele", badges: ["miele", "checked"],
      name: { sq: "Lavatriçe Miele", en: "Miele washing machine", de: "Miele Waschmaschine" }, cat: "washers" },
    { image: "prod-ovens", brand: "Bosch", badges: ["bosch", "import"],
      name: { sq: "Furrë inox Bosch", en: "Bosch stainless oven", de: "Bosch Edelstahl-Backofen" }, cat: "ovens" },
    { image: "prod-dishwashers", brand: "Siemens", badges: ["siemens", "checked"],
      name: { sq: "Lavastovilje Siemens", en: "Siemens dishwasher", de: "Siemens Geschirrspüler" }, cat: "dishwashers" },
    { image: "prod-dryers", brand: "AEG", badges: ["aeg", "import"],
      name: { sq: "Tharëse AEG", en: "AEG dryer", de: "AEG Trockner" }, cat: "dryers" },
    { image: "prod-fridges", brand: "", badges: ["import", "checked"],
      name: { sq: "Frigorifer gjerman", en: "German fridge", de: "Deutscher Kühlschrank" }, cat: "fridges" },
    { image: "gallery-1", brand: "", badges: ["new"],
      name: { sq: "Kuzhinë me pianurë qeramike", en: "Cooker with ceramic hob", de: "Herd mit Ceranfeld" }, cat: "ovens" },
    { image: "gallery-3", brand: "Miele", badges: ["miele", "new"],
      name: { sq: "Lavatriçe premium", en: "Premium washing machine", de: "Premium-Waschmaschine" }, cat: "washers" },
    { image: "gallery-2", brand: "", badges: ["import"],
      name: { sq: "Furrë e integruar", en: "Built-in oven", de: "Einbau-Backofen" }, cat: "ovens" },
  ],

  /* ---------- Shop by brand (text treatment — no downloaded logos) ---------- */
  brands: [
    { name: "Miele", note: { sq: "Cilësi premium", en: "Premium quality", de: "Premium-Qualität" } },
    { name: "Bosch", note: { sq: "Besueshmëri", en: "Reliability", de: "Zuverlässigkeit" } },
    { name: "Siemens", note: { sq: "Teknologji", en: "Technology", de: "Technologie" } },
    { name: "AEG", note: { sq: "Efikasitet", en: "Efficiency", de: "Effizienz" } },
  ],

  /* ---------- Why choose (compact trust strip) ---------- */
  whyus: [
    { icon: "check", title: { sq: "Të kontrolluara & gati për përdorim", en: "Inspected & ready to use", de: "Geprüft & einsatzbereit" } },
    { icon: "truck", title: { sq: "Import direkt nga Gjermania", en: "Direct import from Germany", de: "Direktimport aus Deutschland" } },
    { icon: "pin", title: { sq: "3 degë në Tiranë", en: "3 locations in Tirana", de: "3 Filialen in Tirana" } },
    { icon: "retail", title: { sq: "Shumicë & Pakicë", en: "Wholesale & Retail", de: "Groß- & Einzelhandel" } },
    { icon: "wrench", title: { sq: "Servis & ekspertizë teknike", en: "Service & technical expertise", de: "Service & technische Expertise" } },
  ],

  /* ---------- Professional / commercial equipment ---------- */
  professional: {
    image: "gallery-5",
    title: { sq: "Pajisje profesionale", en: "Professional equipment", de: "Profigeräte" },
    text: {
      sq: "Furra, kuzhina dhe pajisje elektroshtëpiake gjermane për restorante, kafene dhe biznese. Blerje me shumicë dhe këshillim.",
      en: "German ovens, cookers and appliances for restaurants, cafés and businesses. Wholesale supply and advice.",
      de: "Deutsche Backöfen, Herde und Geräte für Restaurants, Cafés und Betriebe. Großhandel und Beratung.",
    },
    cta: { sq: "Pyet për pajisje profesionale", en: "Ask about professional equipment", de: "Profigeräte anfragen" },
  },

  /* ---------- Service & repairs ---------- */
  service: {
    image: "about-workshop",
    title: { sq: "Servis & Riparime", en: "Service & Repairs", de: "Service & Reparaturen" },
    text: {
      sq: "Ekspertizë teknike para dhe pas blerjes. Ekipi ynë kontrollon dhe servison pajisjet elektroshtëpiake gjermane.",
      en: "Technical expertise before and after purchase. Our team checks and services German household appliances.",
      de: "Technische Expertise vor und nach dem Kauf. Unser Team prüft und wartet deutsche Haushaltsgeräte.",
    },
    cta: { sq: "Kontakto servisin", en: "Contact service", de: "Service kontaktieren" },
  },

  /* ---------- About + stats ---------- */
  about: {
    image: "about-workshop",
    stats: [
      { num: "20+", label: { sq: "Vite përvojë", en: "Years of experience", de: "Jahre Erfahrung" } },
      { num: "3", label: { sq: "Degë në Tiranë", en: "Locations in Tirana", de: "Filialen in Tirana" } },
      { num: { sq: "Gjermani", en: "Germany", de: "Deutschland" }, label: { sq: "Import direkt", en: "Direct imports", de: "Direktimport" } },
    ],
  },

  /* ---------- Gallery ---------- */
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
      topbar: ["Import direkt nga Gjermania", "Mbi 20 vite përvojë", "3 degë në Tiranë"],
      search_ph: "Kërko: lavatriçe, furra, Miele, Bosch…",
      search_aria: "Kërko produkte", search_btn: "Kërko",
      nav_products: "Produktet", nav_branches: "Degët", nav_about: "Rreth Nesh", nav_gallery: "Galeria", nav_faq: "Pyetje", nav_contact: "Kontakt",
      skip: "Kalo te përmbajtja", menu: "Menyja", call_aria: "Na telefononi", lang_switch: "Gjuha",

      hero_eyebrow: "Elektroshtëpiake gjermane · Tiranë",
      hero_h1: "Elektroshtëpiake gjermane cilësore për shtëpinë tuaj.",
      hero_sub: "Miele, Bosch, Siemens, AEG dhe të tjera — të importuara nga Gjermania, të kontrolluara dhe gati për përdorim.",
      hero_cta1: "Shiko produktet", hero_cta2: "Vizito degët",
      trust_checked: "Të kontrolluara", trust_import: "Import nga Gjermania", trust_retail: "Shumicë & Pakicë", trust_service: "Servis teknik",
      brands_label: "Markat",

      cat_kicker: "Bli sipas kategorisë", cat_title: "Kategoritë e produkteve",
      arrivals_kicker: "Të reja", arrivals_title: "Të sapoardhura nga Gjermania",
      arrivals_sub: "Inventari ynë ndryshon shpesh. Na kontaktoni për të konfirmuar disponueshmërinë e sotme.",
      pd_ask_price: "Pyet për çmimin", pd_avail: "Pyet për disponueshmërinë",

      brand_kicker: "Markat", brand_title: "Bli sipas markës",

      why_title: "Pse të zgjidhni B.O. BEOLA",

      prof_kicker: "Për biznese", service_kicker: "Mbështetje",

      br_kicker: "Degët tona", br_title: "Degët Tona",
      br_sub: "Tri degë në zonën e Tiranës — e njëjta cilësi dhe i njëjti besim në çdo vendndodhje.",
      badge_main: "Dega kryesore", branch_view: "Shiko degën",
      label_address: "Adresa", label_phone: "Telefoni", label_email: "Email", label_instagram: "Instagram", label_hours: "Orari", label_services: "Shërbimet",
      branch_desc: "Shitje, import dhe servis i pajisjeve elektroshtëpiake gjermane — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Shitje pajisjesh elektroshtëpiake gjermane", "Import direkt nga Gjermania", "Servis dhe riparime teknike", "Këshillim për blerje"],

      ab_kicker: "Rreth Nesh", ab_title: "Mbi 20 vite përvojë",
      about_p1: "Biznes familjar me bazë në Tiranë, B.O. BEOLA importon me kujdes pajisje elektroshtëpiake të përzgjedhura drejtpërdrejt nga Gjermania — të kontrolluara dhe të gatshme për përdorim.",

      gal_kicker: "Galeria", gal_title: "Nga dyqanet tona", gal_zoom: "Zmadho foton",

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
      wa_generic: "Përshëndetje B.O. BEOLA, dëshiroj të pyes:",
      wa_price: "Përshëndetje B.O. BEOLA, sa kushton:",
      wa_search: "Përshëndetje B.O. BEOLA, po kërkoj:",
      wa_prof: "Përshëndetje B.O. BEOLA, dua të pyes për pajisje profesionale / shumicë:",
      wa_service: "Përshëndetje B.O. BEOLA, kam nevojë për servis:",

      btn_call: "Telefono", btn_wa: "WhatsApp", btn_directions: "Merr Udhëzime", btn_ask_wa: "Pyet në WhatsApp",
      footer_tagline: "Elektroshtëpiake gjermane të besueshme për familjet shqiptare.",
      footer_quick: "Lidhje të shpejta", footer_contact: "Kontakt", footer_branches: "Degët",
      footer_rights: "Të gjitha të drejtat e rezervuara.",
      back_home: "Kreu", branch_hero_sub: "Elektroshtëpiake gjermane — shitje, import dhe servis. Na vizitoni në degën tonë në",
      branch_cta_title: "Na vizitoni ose na shkruani",
    },

    en: {
      dir: "German Household Appliances",
      topbar: ["Direct import from Germany", "20+ years of experience", "3 locations in Tirana"],
      search_ph: "Search: washing machines, ovens, Miele, Bosch…",
      search_aria: "Search products", search_btn: "Search",
      nav_products: "Products", nav_branches: "Branches", nav_about: "About", nav_gallery: "Gallery", nav_faq: "FAQ", nav_contact: "Contact",
      skip: "Skip to content", menu: "Menu", call_aria: "Call us", lang_switch: "Language",

      hero_eyebrow: "German appliances · Tirana",
      hero_h1: "Quality German appliances for your home.",
      hero_sub: "Miele, Bosch, Siemens, AEG and more — imported from Germany, inspected and ready to use.",
      hero_cta1: "Shop appliances", hero_cta2: "Visit our stores",
      trust_checked: "Inspected", trust_import: "Imported from Germany", trust_retail: "Retail & Wholesale", trust_service: "Technical service",
      brands_label: "Brands",

      cat_kicker: "Shop by category", cat_title: "Product categories",
      arrivals_kicker: "New", arrivals_title: "New arrivals from Germany",
      arrivals_sub: "Our inventory changes frequently. Contact us to confirm today's availability.",
      pd_ask_price: "Ask for price", pd_avail: "Ask about availability",

      brand_kicker: "Brands", brand_title: "Shop by brand",

      why_title: "Why choose B.O. BEOLA",

      prof_kicker: "For businesses", service_kicker: "Support",

      br_kicker: "Our branches", br_title: "Our Branches",
      br_sub: "Three branches around Tirana — the same quality and trust at every location.",
      badge_main: "Main branch", branch_view: "View branch",
      label_address: "Address", label_phone: "Phone", label_email: "Email", label_instagram: "Instagram", label_hours: "Opening hours", label_services: "Services",
      branch_desc: "Sales, import and service of German household appliances — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Sales of German household appliances", "Direct import from Germany", "Technical service and repairs", "Purchase advice"],

      ab_kicker: "About Us", ab_title: "More than 20 years of experience",
      about_p1: "Family-run and based in Tirana, B.O. BEOLA carefully imports selected household appliances directly from Germany — inspected and ready to use.",

      gal_kicker: "Gallery", gal_title: "Inside our stores", gal_zoom: "Enlarge photo",

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
      wa_generic: "Hello B.O. BEOLA, I'd like to ask:",
      wa_price: "Hello B.O. BEOLA, what's the price of:",
      wa_search: "Hello B.O. BEOLA, I'm looking for:",
      wa_prof: "Hello B.O. BEOLA, I'd like to ask about professional / wholesale equipment:",
      wa_service: "Hello B.O. BEOLA, I need service for:",

      btn_call: "Call", btn_wa: "WhatsApp", btn_directions: "Get Directions", btn_ask_wa: "Ask on WhatsApp",
      footer_tagline: "Trusted German household appliances for Albanian homes.",
      footer_quick: "Quick links", footer_contact: "Contact", footer_branches: "Branches",
      footer_rights: "All rights reserved.",
      back_home: "Home", branch_hero_sub: "German household appliances — sales, import and service. Visit us at our branch in",
      branch_cta_title: "Visit us or message us",
    },

    de: {
      dir: "Deutsche Haushaltsgeräte",
      topbar: ["Direktimport aus Deutschland", "Über 20 Jahre Erfahrung", "3 Filialen in Tirana"],
      search_ph: "Suche: Waschmaschinen, Backöfen, Miele, Bosch…",
      search_aria: "Produkte suchen", search_btn: "Suchen",
      nav_products: "Produkte", nav_branches: "Filialen", nav_about: "Über uns", nav_gallery: "Galerie", nav_faq: "FAQ", nav_contact: "Kontakt",
      skip: "Zum Inhalt springen", menu: "Menü", call_aria: "Rufen Sie uns an", lang_switch: "Sprache",

      hero_eyebrow: "Deutsche Haushaltsgeräte · Tirana",
      hero_h1: "Hochwertige deutsche Haushaltsgeräte für Ihr Zuhause.",
      hero_sub: "Miele, Bosch, Siemens, AEG und mehr — importiert aus Deutschland, geprüft und einsatzbereit.",
      hero_cta1: "Geräte ansehen", hero_cta2: "Filialen besuchen",
      trust_checked: "Geprüft", trust_import: "Import aus Deutschland", trust_retail: "Groß- & Einzelhandel", trust_service: "Technischer Service",
      brands_label: "Marken",

      cat_kicker: "Nach Kategorie", cat_title: "Produktkategorien",
      arrivals_kicker: "Neu", arrivals_title: "Neu aus Deutschland",
      arrivals_sub: "Unser Bestand wechselt häufig. Kontaktieren Sie uns für die heutige Verfügbarkeit.",
      pd_ask_price: "Preis anfragen", pd_avail: "Verfügbarkeit anfragen",

      brand_kicker: "Marken", brand_title: "Nach Marke",

      why_title: "Warum B.O. BEOLA",

      prof_kicker: "Für Betriebe", service_kicker: "Unterstützung",

      br_kicker: "Unsere Filialen", br_title: "Unsere Filialen",
      br_sub: "Drei Filialen rund um Tirana — dieselbe Qualität und dasselbe Vertrauen an jedem Standort.",
      badge_main: "Hauptfiliale", branch_view: "Filiale ansehen",
      label_address: "Adresse", label_phone: "Telefon", label_email: "E-Mail", label_instagram: "Instagram", label_hours: "Öffnungszeiten", label_services: "Leistungen",
      branch_desc: "Verkauf, Import und Service deutscher Haushaltsgeräte — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Verkauf deutscher Haushaltsgeräte", "Direktimport aus Deutschland", "Technischer Service und Reparaturen", "Kaufberatung"],

      ab_kicker: "Über uns", ab_title: "Über 20 Jahre Erfahrung",
      about_p1: "Familiengeführt und in Tirana ansässig, importiert B.O. BEOLA sorgfältig ausgewählte Haushaltsgeräte direkt aus Deutschland — geprüft und einsatzbereit.",

      gal_kicker: "Galerie", gal_title: "In unseren Geschäften", gal_zoom: "Foto vergrößern",

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
      wa_generic: "Hallo B.O. BEOLA, ich möchte fragen:",
      wa_price: "Hallo B.O. BEOLA, was kostet:",
      wa_search: "Hallo B.O. BEOLA, ich suche:",
      wa_prof: "Hallo B.O. BEOLA, ich möchte nach Profi-/Großhandelsgeräten fragen:",
      wa_service: "Hallo B.O. BEOLA, ich brauche Service für:",

      btn_call: "Anrufen", btn_wa: "WhatsApp", btn_directions: "Route planen", btn_ask_wa: "Auf WhatsApp fragen",
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

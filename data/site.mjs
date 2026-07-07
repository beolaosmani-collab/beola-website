/* =============================================================================
   B.O. BEOLA — SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   THIS is the only file you normally edit. After changing it, rebuild the site:

       node build.mjs

   (or just edit this file on GitHub — the GitHub Action rebuilds automatically.)

   Everything below flows into every page and every language, so a phone number,
   email or address is written ONCE here and appears correctly everywhere.

   🔴 Anything marked  TODO:  is a value we could not confirm. It is intentionally
      left empty/false so the site never shows a claim that isn't true. Fill it in
      when you have it, or leave it — the site simply hides those parts.
============================================================================= */

export const SITE = {
  /* ---------- Deployment ---------- */
  // No trailing slash. Used for canonical/hreflang/OpenGraph/sitemap URLs.
  // 👉 When you connect a custom domain (e.g. https://beola.al), change this and
  //    add a CNAME file (see OWNER_GUIDE.md), then rebuild.
  baseUrl: "https://beolaosmani-collab.github.io/beola-website",
  basePath: "/beola-website",            // sub-path GitHub Pages serves from ("" for a root domain)

  defaultLang: "sq",
  langs: ["sq", "en", "de"],
  langLabel: { sq: "AL", en: "EN", de: "DE" },
  langName: { sq: "Shqip", en: "English", de: "Deutsch" },
  ogLocale: { sq: "sq_AL", en: "en_US", de: "de_DE" },

  /* ---------- Brand ---------- */
  brand: {
    short: "B.O. BEOLA",
    legal: "B.O. BEOLA / BEOLA Sh.p.k.",
    appliances: ["Miele", "Siemens", "Bosch", "AEG"],
    foundedYearsText: "20+",
  },

  /* ---------- Contact (edit here, updates everywhere) ---------- */
  contact: {
    phone1Display: "+355 68 207 3024",
    phone1Dial: "+355682073024",
    phone2Display: "+355 68 901 1606",   // second number from the banner ("" to hide)
    phone2Dial: "+355689011606",
    whatsapp: "355682073024",            // digits only, no +
    email: "beolashpk@gmail.com",        // main business email
    instagram: "https://www.instagram.com/elektroshtepiake_beola",
    instagramHandle: "@elektroshtepiake_beola",
  },

  /* ---------- Opening hours (one place; used in display + structured data) ---------- */
  hours: {
    // 24h values feed Google structured data:
    weekday: { opens: "09:00", closes: "17:00" }, // Mon–Sat
    sunday: { opens: "09:00", closes: "12:30" },
    // Human text per language:
    lines: {
      sq: ["E Hënë – E Shtunë: 09:00 – 17:00", "E Diel: 09:00 – 12:30"],
      en: ["Monday – Saturday: 09:00 – 17:00", "Sunday: 09:00 – 12:30"],
      de: ["Montag – Samstag: 09:00 – 17:00", "Sonntag: 09:00 – 12:30"],
    },
  },

  /* ---------- Unconfirmed claims — leave false/null until true ----------
     The site NEVER shows these unless set. Do not invent them.               */
  claims: {
    freeDelivery: false,          // TODO: set true only if you truly offer free delivery
    deliveryNote: { sq: "", en: "", de: "" },  // TODO: e.g. "Transport në Tiranë"
    warrantyMonths: null,         // TODO: e.g. 6 or 12 (months) — leave null if none
    sameDayRepair: false,         // TODO
    financing: false,             // TODO
  },

  /* ---------- Branches (all one company; each gets its own page) ---------- */
  branches: [
    {
      slug: "yzberisht",
      area: "Yzberisht",
      address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001",
      postalCode: "1001",
      landmark: {
        sq: "Përballë Spitalit Amerikan",
        en: "Opposite the American Hospital",
        de: "Gegenüber dem Amerikanischen Krankenhaus",
      },
      isMain: true,
    },
    {
      slug: "mezez",
      area: "Mëzez",
      address: "Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë",
      postalCode: "",
      landmark: {
        sq: "Pranë Burger Ija",
        en: "Near Burger Ija",
        de: "Nahe Burger Ija",
      },
      isMain: false,
    },
    {
      slug: "vaqarr",
      area: "Vaqarr",
      address: "Rruga Demir Çela, Vaqarr, pranë Bar-Restorant Trëndelina, Tiranë",
      postalCode: "",
      landmark: {
        sq: "Pranë Bar-Restorant Trëndelina",
        en: "Near Bar-Restaurant Trëndelina",
        de: "Nahe Bar-Restaurant Trëndelina",
      },
      isMain: false,
    },
  ],

  /* ---------- Product & service categories (photos in /images) ---------- */
  categories: [
    {
      id: "washers", image: "prod-washers",
      title: { sq: "Lavatriçe", en: "Washing Machines", de: "Waschmaschinen" },
      desc: {
        sq: "Lavatriçe gjermane nga Miele, Siemens, Bosch dhe AEG — performancë dhe qëndrueshmëri.",
        en: "German washing machines from Miele, Siemens, Bosch and AEG — performance and durability.",
        de: "Deutsche Waschmaschinen von Miele, Siemens, Bosch und AEG — Leistung und Langlebigkeit.",
      },
    },
    {
      id: "dryers", image: "prod-dryers",
      title: { sq: "Tharëse", en: "Dryers", de: "Trockner" },
      desc: {
        sq: "Tharëse gjermane efikase për rroba, ideale për familjet shqiptare.",
        en: "Efficient German dryers, ideal for Albanian family homes.",
        de: "Effiziente deutsche Trockner, ideal für albanische Familien.",
      },
    },
    {
      id: "ovens", image: "prod-ovens",
      title: { sq: "Furra & Kuzhina", en: "Ovens & Cookers", de: "Backöfen & Herde" },
      desc: {
        sq: "Furra e kuzhina gjermane moderne për gatim të përsosur, cilësi dhe siguri.",
        en: "Modern German ovens and cookers for perfect cooking, quality and safety.",
        de: "Moderne deutsche Backöfen und Herde für perfektes Kochen, Qualität und Sicherheit.",
      },
    },
    {
      id: "dishwashers", image: "prod-dishwashers",
      title: { sq: "Lavastovilje", en: "Dishwashers", de: "Geschirrspüler" },
      desc: {
        sq: "Lavastovilje gjermane që kursejnë ujë e energji, me performancë të lartë.",
        en: "German dishwashers that save water and energy, with high performance.",
        de: "Deutsche Geschirrspüler, die Wasser und Energie sparen, mit hoher Leistung.",
      },
    },
    {
      id: "repair", image: "prod-repair",
      title: { sq: "Riparime / Servis Teknik", en: "Repairs / Technical Service", de: "Reparaturen / Technischer Service" },
      desc: {
        sq: "Ekspertizë teknike dhe servis për pajisjet elektroshtëpiake, nga një ekip me përvojë.",
        en: "Technical expertise and service for household appliances, from an experienced team.",
        de: "Technische Expertise und Service für Haushaltsgeräte von einem erfahrenen Team.",
      },
    },
    {
      id: "import", image: "prod-import",
      title: { sq: "Import nga Gjermania", en: "Import from Germany", de: "Import aus Deutschland" },
      desc: {
        sq: "Importojmë drejtpërdrejt nga Gjermania pajisje cilësore për shtëpitë shqiptare.",
        en: "We import quality appliances directly from Germany for Albanian homes.",
        de: "Wir importieren hochwertige Geräte direkt aus Deutschland für albanische Haushalte.",
      },
    },
  ],

  /* ---------- Highlighted / featured (easy to edit — change any time) ----------
     Use this for "in focus" or current arrivals. Each card can open WhatsApp so
     customers ask about availability. Edit freely; keep 2–4 for a clean look.   */
  featured: [
    {
      image: "gallery-washers",
      title: { sq: "Lavatriçe premium", en: "Premium washing machines", de: "Premium-Waschmaschinen" },
      note: {
        sq: "Miele, Bosch & Siemens të kontrolluara — stok që ndryshon çdo javë.",
        en: "Inspected Miele, Bosch & Siemens — stock that changes weekly.",
        de: "Geprüfte Miele, Bosch & Siemens — Bestand wechselt wöchentlich.",
      },
    },
    {
      image: "prod-ovens",
      title: { sq: "Furra & kuzhina", en: "Ovens & cookers", de: "Backöfen & Herde" },
      note: {
        sq: "Furra inox, kuzhina me pianura qeramike — gati për montim.",
        en: "Stainless ovens, ceramic-hob cookers — ready to install.",
        de: "Edelstahl-Backöfen, Herde mit Ceranfeld — montagebereit.",
      },
    },
    {
      image: "gallery-warehouse",
      title: { sq: "Të sapoardhura nga Gjermania", en: "Fresh arrivals from Germany", de: "Neu aus Deutschland" },
      note: {
        sq: "Ngarkesa të reja çdo muaj në të tri degët tona.",
        en: "New shipments every month across our three branches.",
        de: "Jeden Monat neue Lieferungen in unseren drei Filialen.",
      },
    },
  ],

  /* ---------- "How it works" process ---------- */
  process: [
    {
      title: { sq: "Importojmë nga Gjermania", en: "We import from Germany", de: "Wir importieren aus Deutschland" },
      desc: {
        sq: "Zgjedhim pajisje cilësore gjermane dhe i sjellim drejtpërdrejt në Tiranë.",
        en: "We select quality German appliances and bring them directly to Tirana.",
        de: "Wir wählen hochwertige deutsche Geräte und bringen sie direkt nach Tirana.",
      },
    },
    {
      title: { sq: "Kontrollohen & testohen", en: "Inspected & tested", de: "Geprüft & getestet" },
      desc: {
        sq: "Çdo pajisje kontrollohet nga teknikët tanë përpara se të dalë në shitje.",
        en: "Every appliance is checked by our technicians before it goes on sale.",
        de: "Jedes Gerät wird von unseren Technikern geprüft, bevor es verkauft wird.",
      },
    },
    {
      title: { sq: "Zgjidhni në degë", en: "Choose in-store", de: "Vor Ort auswählen" },
      desc: {
        sq: "Vizitoni një nga tri degët tona në Tiranë dhe zgjidhni nga afër.",
        en: "Visit one of our three branches in Tirana and choose in person.",
        de: "Besuchen Sie eine unserer drei Filialen in Tirana und wählen Sie vor Ort.",
      },
    },
    {
      title: { sq: "Servis & mbështetje", en: "Service & support", de: "Service & Unterstützung" },
      desc: {
        sq: "Ju qëndrojmë pranë edhe pas blerjes, me servis dhe këshilla teknike.",
        en: "We stay by your side after purchase, with service and technical advice.",
        de: "Wir sind auch nach dem Kauf für Sie da — mit Service und Beratung.",
      },
    },
  ],

  /* ---------- Reviews ----------
     TODO: add real customer reviews here when you collect them. Leave empty and
     the site shows a friendly "leave us a review" prompt instead of fake stars. */
  reviews: [
    // { author: "…", rating: 5, textByLang: { sq: "…", en: "…", de: "…" } }
  ],

  /* ---------- FAQ ---------- */
  faq: [
    {
      q: { sq: "A ndryshon stoku dhe si e di çfarë keni?", en: "Does the stock change, and how do I know what you have?", de: "Ändert sich der Bestand und wie erfahre ich, was Sie haben?" },
      a: {
        sq: "Po — stoku përditësohet vazhdimisht me ngarkesa të reja nga Gjermania. Na shkruani në WhatsApp ose telefononi për disponueshmërinë e modelit që kërkoni.",
        en: "Yes — stock updates constantly with new shipments from Germany. Message us on WhatsApp or call to check availability of the model you want.",
        de: "Ja — der Bestand wird ständig mit neuen Lieferungen aus Deutschland aktualisiert. Schreiben Sie uns auf WhatsApp oder rufen Sie an, um die Verfügbarkeit zu prüfen.",
      },
    },
    {
      q: { sq: "A mund të vij pa lajmëruar në showroom?", en: "Can I visit the showroom without an appointment?", de: "Kann ich ohne Termin in den Showroom kommen?" },
      a: {
        sq: "Sigurisht. Jeni të mirëpritur në orarin tonë të hapjes në secilën nga tri degët. Për një vizitë të dedikuar, na shkruani paraprakisht.",
        en: "Of course. You are welcome during our opening hours at any of the three branches. For a dedicated visit, message us in advance.",
        de: "Natürlich. Sie sind während unserer Öffnungszeiten in jeder der drei Filialen willkommen. Für einen persönlichen Termin schreiben Sie uns vorab.",
      },
    },
    {
      q: { sq: "A ofroni servis dhe riparime?", en: "Do you offer service and repairs?", de: "Bieten Sie Service und Reparaturen an?" },
      a: {
        sq: "Po. Ekipi ynë ka përvojë në servisimin e pajisjeve elektroshtëpiake gjermane. Na kontaktoni për të përshkruar nevojën tuaj.",
        en: "Yes. Our team is experienced in servicing German household appliances. Contact us to describe what you need.",
        de: "Ja. Unser Team hat Erfahrung mit der Wartung deutscher Haushaltsgeräte. Kontaktieren Sie uns und beschreiben Sie Ihr Anliegen.",
      },
    },
    {
      q: { sq: "Ku ndodheni?", en: "Where are you located?", de: "Wo befinden Sie sich?" },
      a: {
        sq: "Kemi tri degë në zonën e Tiranës: Yzberisht (përballë Spitalit Amerikan), Mëzez dhe Vaqarr. Shihni hartat dhe merrni udhëzime në seksionin Vendndodhjet.",
        en: "We have three branches around Tirana: Yzberisht (opposite the American Hospital), Mëzez and Vaqarr. See the maps and get directions in the Locations section.",
        de: "Wir haben drei Filialen rund um Tirana: Yzberisht (gegenüber dem Amerikanischen Krankenhaus), Mëzez und Vaqarr. Karten und Routen finden Sie im Bereich Standorte.",
      },
    },
  ],

  /* ---------- All interface text (per language) ---------- */
  i18n: {
    sq: {
      dir: "Elektroshtëpiake Gjermane",
      nav_about: "Rreth Nesh", nav_featured: "Në fokus", nav_products: "Produkte & Shërbime",
      nav_branches: "Degët Tona", nav_locations: "Vendndodhjet", nav_faq: "Pyetje", nav_contact: "Kontakt",
      skip: "Kalo te përmbajtja", menu: "Menyja", call_aria: "Na telefononi",
      lang_switch: "Gjuha",

      hero_eyebrow: "Elektroshtëpiake gjermane · Tiranë",
      hero_h1: "Elektroshtëpiake Gjermane në Tiranë",
      hero_sub: "Lavatriçe, tharëse, furra e lavastovilje gjermane — të importuara, të kontrolluara dhe të gatshme për shtëpinë tuaj. Mbi 20 vjet përvojë familjare, tri degë në Tiranë.",
      hero_call_label: "Na telefononi",
      btn_call: "Telefono Tani", btn_wa: "WhatsApp", btn_locations: "Shiko Degët", btn_directions: "Merr Udhëzime",
      btn_instagram: "Instagram", brands_label: "Markat kryesore",

      trust_retail: "Shumicë & Pakicë", trust_germany: "Porosi nga Gjermania",
      trust_albania: "Në të gjithë Shqipërinë", trust_pro: "Korrektesë & profesionalizëm",

      featured_kicker: "Në fokus", featured_title: "Të përzgjedhura këtë periudhë",
      featured_sub: "Stoku ndryshon shpesh. Na shkruani për disponueshmërinë e sotme.",
      featured_cta: "Pyet për disponueshmërinë",

      about_kicker: "Rreth Nesh",
      about_title: "Një biznes familjar që familjet shqiptare e besojnë",
      about_p1: "B.O. BEOLA është një biznes familjar në Tiranë me mbi 20 vjet eksperiencë në importimin, shitjen dhe servisimin e pajisjeve elektroshtëpiake gjermane. Sjellim drejtpërdrejt nga Gjermania pajisje cilësore Miele, Siemens, Bosch dhe AEG, të kontrolluara me profesionalizëm dhe të gatshme për shtëpitë shqiptare.",
      about_p2: "Me njohuri të thella teknike dhe përvojë në servisim, ne ofrojmë jo vetëm produkte, por edhe siguri dhe besim. Familjet shqiptare na besojnë prej vitesh për cilësinë, ndershmërinë dhe shërbimin tonë.",
      feat_family_t: "Biznes familjar", feat_family_d: "Të udhëhequr nga vlerat e familjes dhe kujdesi i vërtetë për çdo klient.",
      feat_years_t: "Mbi 20 vjet eksperiencë", feat_years_d: "Dy dekada besimi dhe pune në tregun shqiptar.",
      feat_import_t: "Import nga Gjermania", feat_import_d: "Pajisje cilësore të sjella drejtpërdrejt nga Gjermania.",
      feat_tech_t: "Ekspertizë teknike", feat_tech_d: "Njohuri servisimi dhe kontroll profesional i çdo pajisjeje.",

      process_kicker: "Si funksionon", process_title: "Nga Gjermania te shtëpia juaj",

      prod_kicker: "Çfarë ofrojmë", prod_title: "Produkte & Shërbime",
      prod_sub: "Pajisje elektroshtëpiake gjermane të kontrolluara me profesionalizëm nga markat kryesore.",
      prod_note: "Ky seksion është informativ. Për disponueshmërinë dhe çmimet, na kontaktoni.",
      gallery_kicker: "Galeria", gallery_title: "Nga magazina jonë",

      branches_kicker: "B.O. BEOLA Sh.p.k.", branches_title: "Degët Tona",
      branches_sub: "Të gjitha degët tona i përkasin B.O. BEOLA Sh.p.k. — e njëjta cilësi dhe i njëjti besim në çdo vendndodhje.",
      badge_main: "Dega kryesore", branch_view: "Shiko degën",
      branch_desc: "Shitje, import dhe servis i pajisjeve elektroshtëpiake gjermane — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Shitje pajisjesh elektroshtëpiake gjermane", "Import direkt nga Gjermania", "Servis dhe riparime teknike", "Këshillim për blerje"],
      label_address: "Adresa", label_phone: "Telefoni", label_email: "Email", label_instagram: "Instagram", label_hours: "Orari", label_services: "Shërbimet",

      reviews_kicker: "Klientët tanë", reviews_title: "Çfarë thonë klientët",
      reviews_empty: "Jemi krenarë për besimin e familjeve shqiptare prej mbi 20 vitesh. Keni blerë te ne? Ndajeni përvojën tuaj në Instagram ose Google — na ndihmon shumë.",
      reviews_cta: "Na ndiqni në Instagram",

      loc_kicker: "Na gjeni", loc_title: "Vendndodhjet", loc_sub: "Na vizitoni në një nga tri degët tona në zonën e Tiranës.",

      faq_kicker: "Pyetje", faq_title: "Pyetje të shpeshta",

      contact_kicker: "Na kontaktoni", contact_title: "Kontakt",
      contact_sub: "Keni një pyetje ose dëshironi një takim? Na shkruani — ju përgjigjemi shpejt.",
      appt_title: "Cakto një takim",
      appt_text: "Na kontaktoni për të caktuar një takim në showroom ose për këshillim. Plotësoni formularin ose na shkruani direkt në WhatsApp.",
      form_name: "Emri", form_phone: "Numri i telefonit", form_time: "Koha e preferuar për takim", form_message: "Mesazhi",
      ph_name: "Emri juaj", ph_phone: "p.sh. +355 68 …", ph_time: "p.sh. E premte, pasdite", ph_message: "Si mund t'ju ndihmojmë?",
      form_submit: "Dërgo në WhatsApp", form_or: "ose", form_email_btn: "Dërgo me Email",
      form_required: "* Fusha të detyrueshme", form_note: "Duke klikuar, hapet WhatsApp me mesazhin tuaj gati për dërgim.",
      form_err_name: "Ju lutemi shkruani emrin tuaj.", form_err_phone: "Ju lutemi shkruani një numër telefoni.",
      form_sent: "Faleminderit! Po hapet WhatsApp me mesazhin tuaj. Nëse nuk hapet, na telefononi.",
      wa_greeting: "Përshëndetje B.O. BEOLA, dëshiroj të kontaktoj:", wa_availability: "Përshëndetje B.O. BEOLA, dua të pyes për disponueshmërinë:",

      footer_tagline: "Elektroshtëpiake gjermane të besueshme për familjet shqiptare.",
      footer_quick: "Lidhje të shpejta", footer_contact: "Kontakt", footer_branches: "Degët",
      footer_rights: "Të gjitha të drejtat e rezervuara.",
      back_home: "Kreu", on_this_page: "Në këtë faqe",
      branch_hero_sub: "Elektroshtëpiake gjermane — shitje, import dhe servis. Na vizitoni në degën tonë në",
      branch_cta_title: "Na vizitoni ose na shkruani",
    },

    en: {
      dir: "German Household Appliances",
      nav_about: "About", nav_featured: "In focus", nav_products: "Products & Services",
      nav_branches: "Our Branches", nav_locations: "Locations", nav_faq: "FAQ", nav_contact: "Contact",
      skip: "Skip to content", menu: "Menu", call_aria: "Call us",
      lang_switch: "Language",

      hero_eyebrow: "German household appliances · Tirana",
      hero_h1: "German Appliances in Tirana",
      hero_sub: "German washing machines, dryers, ovens and dishwashers — imported, inspected and ready for your home. 20+ years of family experience, three branches in Tirana.",
      hero_call_label: "Call us",
      btn_call: "Call Now", btn_wa: "WhatsApp", btn_locations: "See Branches", btn_directions: "Get Directions",
      btn_instagram: "Instagram", brands_label: "Main brands",

      trust_retail: "Wholesale & Retail", trust_germany: "Order from Germany",
      trust_albania: "Throughout Albania", trust_pro: "Integrity & professionalism",

      featured_kicker: "In focus", featured_title: "Selected right now",
      featured_sub: "Stock changes often. Message us for today's availability.",
      featured_cta: "Ask about availability",

      about_kicker: "About Us",
      about_title: "A family business Albanian families trust",
      about_p1: "B.O. BEOLA is a family business in Tirana with over 20 years of experience importing, selling and servicing German household appliances. We bring quality Miele, Siemens, Bosch and AEG appliances directly from Germany — professionally checked and ready for Albanian homes.",
      about_p2: "With deep technical knowledge and repair experience, we offer not only products but also confidence and trust. Albanian families have relied on us for years for our quality, honesty and service.",
      feat_family_t: "Family business", feat_family_d: "Guided by family values and genuine care for every customer.",
      feat_years_t: "Over 20 years of experience", feat_years_d: "Two decades of trust and work in the Albanian market.",
      feat_import_t: "Imported from Germany", feat_import_d: "Quality appliances brought directly from Germany.",
      feat_tech_t: "Technical expertise", feat_tech_d: "Repair knowledge and professional checking of every appliance.",

      process_kicker: "How it works", process_title: "From Germany to your home",

      prod_kicker: "What we offer", prod_title: "Products & Services",
      prod_sub: "German household appliances, professionally checked, from the leading brands.",
      prod_note: "This section is informational. For availability and prices, please contact us.",
      gallery_kicker: "Gallery", gallery_title: "From our warehouse",

      branches_kicker: "B.O. BEOLA Sh.p.k.", branches_title: "Our Branches",
      branches_sub: "All our branches belong to B.O. BEOLA Sh.p.k. — the same quality and trust at every location.",
      badge_main: "Main branch", branch_view: "View branch",
      branch_desc: "Sales, import and service of German household appliances — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Sales of German household appliances", "Direct import from Germany", "Technical service and repairs", "Purchase advice"],
      label_address: "Address", label_phone: "Phone", label_email: "Email", label_instagram: "Instagram", label_hours: "Opening hours", label_services: "Services",

      reviews_kicker: "Our customers", reviews_title: "What customers say",
      reviews_empty: "We're proud to have earned Albanian families' trust for over 20 years. Bought from us? Share your experience on Instagram or Google — it helps a lot.",
      reviews_cta: "Follow us on Instagram",

      loc_kicker: "Find us", loc_title: "Locations", loc_sub: "Visit us at one of our three branches around Tirana.",

      faq_kicker: "FAQ", faq_title: "Frequently asked questions",

      contact_kicker: "Get in touch", contact_title: "Contact",
      contact_sub: "Have a question or want an appointment? Write to us — we reply quickly.",
      appt_title: "Book an appointment",
      appt_text: "Contact us to arrange a showroom visit or advice. Fill in the form or message us directly on WhatsApp.",
      form_name: "Name", form_phone: "Phone number", form_time: "Preferred appointment time", form_message: "Message",
      ph_name: "Your name", ph_phone: "e.g. +355 68 …", ph_time: "e.g. Friday afternoon", ph_message: "How can we help you?",
      form_submit: "Send via WhatsApp", form_or: "or", form_email_btn: "Send by Email",
      form_required: "* Required fields", form_note: "Clicking opens WhatsApp with your message ready to send.",
      form_err_name: "Please enter your name.", form_err_phone: "Please enter a phone number.",
      form_sent: "Thank you! WhatsApp is opening with your message. If it doesn't, please call us.",
      wa_greeting: "Hello B.O. BEOLA, I would like to get in touch:", wa_availability: "Hello B.O. BEOLA, I'd like to ask about availability:",

      footer_tagline: "Trusted German household appliances for Albanian homes.",
      footer_quick: "Quick links", footer_contact: "Contact", footer_branches: "Branches",
      footer_rights: "All rights reserved.",
      back_home: "Home", on_this_page: "On this page",
      branch_hero_sub: "German household appliances — sales, import and service. Visit us at our branch in",
      branch_cta_title: "Visit us or message us",
    },

    de: {
      dir: "Deutsche Haushaltsgeräte",
      nav_about: "Über uns", nav_featured: "Im Fokus", nav_products: "Produkte & Service",
      nav_branches: "Unsere Filialen", nav_locations: "Standorte", nav_faq: "FAQ", nav_contact: "Kontakt",
      skip: "Zum Inhalt springen", menu: "Menü", call_aria: "Rufen Sie uns an",
      lang_switch: "Sprache",

      hero_eyebrow: "Deutsche Haushaltsgeräte · Tirana",
      hero_h1: "Deutsche Haushaltsgeräte in Tirana",
      hero_sub: "Deutsche Waschmaschinen, Trockner, Backöfen und Geschirrspüler — importiert, geprüft und bereit für Ihr Zuhause. Über 20 Jahre Familienerfahrung, drei Filialen in Tirana.",
      hero_call_label: "Rufen Sie uns an",
      btn_call: "Jetzt anrufen", btn_wa: "WhatsApp", btn_locations: "Filialen ansehen", btn_directions: "Route planen",
      btn_instagram: "Instagram", brands_label: "Top-Marken",

      trust_retail: "Groß- & Einzelhandel", trust_germany: "Bestellung aus Deutschland",
      trust_albania: "In ganz Albanien", trust_pro: "Zuverlässigkeit & Professionalität",

      featured_kicker: "Im Fokus", featured_title: "Aktuelle Auswahl",
      featured_sub: "Der Bestand wechselt oft. Schreiben Sie uns für die heutige Verfügbarkeit.",
      featured_cta: "Nach Verfügbarkeit fragen",

      about_kicker: "Über uns",
      about_title: "Ein Familienunternehmen, dem albanische Familien vertrauen",
      about_p1: "B.O. BEOLA ist ein Familienunternehmen in Tirana mit über 20 Jahren Erfahrung im Import, Verkauf und Service deutscher Haushaltsgeräte. Wir bringen hochwertige Geräte von Miele, Siemens, Bosch und AEG direkt aus Deutschland — fachmännisch geprüft und bereit für albanische Haushalte.",
      about_p2: "Mit fundiertem technischem Wissen und Reparaturerfahrung bieten wir nicht nur Produkte, sondern auch Sicherheit und Vertrauen. Albanische Familien schätzen uns seit Jahren für unsere Qualität, Ehrlichkeit und unseren Service.",
      feat_family_t: "Familienunternehmen", feat_family_d: "Geleitet von Familienwerten und aufrichtiger Fürsorge für jeden Kunden.",
      feat_years_t: "Über 20 Jahre Erfahrung", feat_years_d: "Zwei Jahrzehnte Vertrauen und Arbeit auf dem albanischen Markt.",
      feat_import_t: "Import aus Deutschland", feat_import_d: "Hochwertige Geräte, direkt aus Deutschland gebracht.",
      feat_tech_t: "Technische Expertise", feat_tech_d: "Reparatur-Know-how und professionelle Prüfung jedes Geräts.",

      process_kicker: "So funktioniert es", process_title: "Von Deutschland zu Ihnen nach Hause",

      prod_kicker: "Was wir bieten", prod_title: "Produkte & Service",
      prod_sub: "Deutsche Haushaltsgeräte, fachmännisch geprüft, von den führenden Marken.",
      prod_note: "Dieser Bereich dient zur Information. Für Verfügbarkeit und Preise kontaktieren Sie uns bitte.",
      gallery_kicker: "Galerie", gallery_title: "Aus unserem Lager",

      branches_kicker: "B.O. BEOLA Sh.p.k.", branches_title: "Unsere Filialen",
      branches_sub: "Alle unsere Filialen gehören zu B.O. BEOLA Sh.p.k. — dieselbe Qualität und dasselbe Vertrauen an jedem Standort.",
      badge_main: "Hauptfiliale", branch_view: "Filiale ansehen",
      branch_desc: "Verkauf, Import und Service deutscher Haushaltsgeräte — Miele, Siemens, Bosch, AEG.",
      branch_services: ["Verkauf deutscher Haushaltsgeräte", "Direktimport aus Deutschland", "Technischer Service und Reparaturen", "Kaufberatung"],
      label_address: "Adresse", label_phone: "Telefon", label_email: "E-Mail", label_instagram: "Instagram", label_hours: "Öffnungszeiten", label_services: "Leistungen",

      reviews_kicker: "Unsere Kunden", reviews_title: "Was Kunden sagen",
      reviews_empty: "Wir sind stolz, seit über 20 Jahren das Vertrauen albanischer Familien zu genießen. Bei uns gekauft? Teilen Sie Ihre Erfahrung auf Instagram oder Google — das hilft uns sehr.",
      reviews_cta: "Folgen Sie uns auf Instagram",

      loc_kicker: "So finden Sie uns", loc_title: "Standorte", loc_sub: "Besuchen Sie uns in einer unserer drei Filialen rund um Tirana.",

      faq_kicker: "FAQ", faq_title: "Häufige Fragen",

      contact_kicker: "Kontakt aufnehmen", contact_title: "Kontakt",
      contact_sub: "Haben Sie eine Frage oder möchten einen Termin? Schreiben Sie uns — wir antworten schnell.",
      appt_title: "Termin vereinbaren",
      appt_text: "Kontaktieren Sie uns für einen Showroom-Besuch oder eine Beratung. Füllen Sie das Formular aus oder schreiben Sie uns direkt auf WhatsApp.",
      form_name: "Name", form_phone: "Telefonnummer", form_time: "Bevorzugte Terminzeit", form_message: "Nachricht",
      ph_name: "Ihr Name", ph_phone: "z. B. +355 68 …", ph_time: "z. B. Freitagnachmittag", ph_message: "Wie können wir Ihnen helfen?",
      form_submit: "Über WhatsApp senden", form_or: "oder", form_email_btn: "Per E-Mail senden",
      form_required: "* Pflichtfelder", form_note: "Ein Klick öffnet WhatsApp mit Ihrer fertigen Nachricht.",
      form_err_name: "Bitte geben Sie Ihren Namen ein.", form_err_phone: "Bitte geben Sie eine Telefonnummer ein.",
      form_sent: "Danke! WhatsApp öffnet sich mit Ihrer Nachricht. Falls nicht, rufen Sie uns an.",
      wa_greeting: "Hallo B.O. BEOLA, ich möchte Kontakt aufnehmen:", wa_availability: "Hallo B.O. BEOLA, ich möchte nach der Verfügbarkeit fragen:",

      footer_tagline: "Zuverlässige deutsche Haushaltsgeräte für albanische Familien.",
      footer_quick: "Schnelllinks", footer_contact: "Kontakt", footer_branches: "Filialen",
      footer_rights: "Alle Rechte vorbehalten.",
      back_home: "Startseite", on_this_page: "Auf dieser Seite",
      branch_hero_sub: "Deutsche Haushaltsgeräte — Verkauf, Import und Service. Besuchen Sie uns in unserer Filiale in",
      branch_cta_title: "Besuchen oder schreiben Sie uns",
    },
  },

  /* ---------- Per-language SEO (title + meta description) ---------- */
  seo: {
    home: {
      sq: {
        title: "B.O. BEOLA – Elektroshtëpiake Gjermane në Tiranë | Miele, Siemens, Bosch, AEG",
        desc: "Biznes familjar në Tiranë me mbi 20 vjet përvojë: import, shitje dhe servis i elektroshtëpiakeve gjermane. Lavatriçe, tharëse, furra, lavastovilje. Tri degë: Yzberisht, Mëzez, Vaqarr.",
      },
      en: {
        title: "B.O. BEOLA – German Household Appliances in Tirana | Miele, Siemens, Bosch, AEG",
        desc: "Family business in Tirana with 20+ years' experience importing, selling and servicing German appliances. Washing machines, dryers, ovens, dishwashers. Three branches: Yzberisht, Mëzez, Vaqarr.",
      },
      de: {
        title: "B.O. BEOLA – Deutsche Haushaltsgeräte in Tirana | Miele, Siemens, Bosch, AEG",
        desc: "Familienunternehmen in Tirana mit über 20 Jahren Erfahrung: Import, Verkauf und Service deutscher Haushaltsgeräte. Waschmaschinen, Trockner, Backöfen, Geschirrspüler. Drei Filialen.",
      },
    },
  },
};

export default SITE;

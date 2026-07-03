/* =============================================================================
   B.O. BEOLA — SITE CONFIGURATION
   -----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTACT DETAILS.
   Change a value here once and it updates everywhere on the website.

   👉 Everything in [SQUARE BRACKETS] is a placeholder — replace it with real
      information. Keep the quotation marks " " around each value.
============================================================================= */

const CONFIG = {

  /* ---- MAIN CONTACT (used in header, hero, contact section, footer) ------- */

  // The phone number exactly as you want it shown on screen:
  mainPhoneDisplay: "+355 68 207 3024",          // Father's phone number

  // The same number for the "click to call" link — digits only, keep the +:
  mainPhoneDial: "+355682073024",                // same number, no spaces

  // Second phone number (shown in Contact + footer). Leave "" to hide it.
  phone2Display: "+355 68 901 1606",             // second number (from the banner)
  phone2Dial: "+355689011606",                   // second number, no spaces

  // WhatsApp number — international format, DIGITS ONLY (no +, no spaces):
  whatsappNumber: "355682073024",                // same number, digits only

  // Main business email:
  email: "kontakt@beolashpk.com",                // business email

  // Main Instagram profile link:
  instagram: "https://www.instagram.com/elektroshtepiake_beola",  // Instagram profile


  /* ---- OUR BRANCHES -------------------------------------------------------
     All three are the SAME company (B.O. BEOLA Sh.p.k.) — just branches.
     They share the same phone, email and Instagram.
     A branch is only shown on the site once it has an address filled in,
     so Branch 3 stays hidden until you add its address below.               */

  businesses: [
    {
      id: "biz1",
      name: "B.O. BEOLA Sh.p.k. — Yzberisht",
      address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001",
      phoneDisplay: "+355 68 207 3024",
      phoneDial: "+355682073024",
      email: "kontakt@beolashpk.com",
      instagram: "https://www.instagram.com/elektroshtepiake_beola"
    },
    {
      id: "biz2",
      name: "B.O. BEOLA Sh.p.k. — Mëzez",
      address: "Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë",
      phoneDisplay: "+355 68 207 3024",
      phoneDial: "+355682073024",
      email: "kontakt@beolashpk.com",
      instagram: "https://www.instagram.com/elektroshtepiake_beola"
    },
    {
      id: "biz3",
      name: "B.O. BEOLA Sh.p.k.",
      address: "",                               // 👈 ADD Branch 3 address here to show it (leave "" to keep it hidden)
      phoneDisplay: "+355 68 207 3024",
      phoneDial: "+355682073024",
      email: "kontakt@beolashpk.com",
      instagram: "https://www.instagram.com/elektroshtepiake_beola"
    }
  ],


  /* ---- LOCATIONS (embedded Google Maps + directions) ---------------------
     No Google API key needed. The map and the "Get Directions" button are
     generated automatically from the address text below.                    */

  locations: [
    {
      key: "loc1",
      address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001"
    },
    {
      key: "loc2",
      address: "Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë"
    }
  ]

};

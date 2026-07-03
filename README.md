# B.O. BEOLA — Website

A simple, fast, professional informational website for **B.O. BEOLA / BEOLA Sh.p.k.** —
a family business in Tirana specializing in **German household appliances**
(Miele, Siemens, Bosch, AEG).

It is a **static website**: plain HTML, CSS and JavaScript. No database, no login,
no server needed. It works in three languages — **Albanian (default), English, German**.

---

## 🚀 How to view it

- **On your computer:** double-click `index.html` — it opens in your browser.
- **To publish it online (free):** upload this whole folder to
  [Netlify Drop](https://app.netlify.com/drop) or **GitHub Pages**. Ask your
  developer for a custom domain like `beola.al` when you're ready.

> Note: the embedded Google Maps and WhatsApp links work best on the published
> (online) version and on your phone.

---

## ✏️ What YOU can edit (and exactly where)

You only need two files. Everything is written in plain text with comments.

### 1. `js/config.js` — phone, email, Instagram, addresses, business names
Open this file. Change anything inside quotes `" "`. The parts marked `👈 CHANGE`
and anything in `[SQUARE BRACKETS]` are placeholders waiting for your real info.

| What you want to change | Where in `js/config.js` |
|---|---|
| **Main phone number** (father's phone) | `mainPhoneDisplay` and `mainPhoneDial` |
| **WhatsApp number** | `whatsappNumber` (digits only, no `+`) |
| **Email** | `email` |
| **Instagram** | `instagram` |
| **Your branches (name, address, phone, email, IG)** | inside `businesses: [ ... ]` |
| **Location addresses (the maps)** | inside `locations: [ ... ]` |

> ⚠️ The phone number appears in **three** fields so both the display text and the
> "tap to call" link are correct:
> - `mainPhoneDisplay` = how it looks on screen, e.g. `+355 69 123 4567`
> - `mainPhoneDial` = the call link, digits + `+`, no spaces, e.g. `+355691234567`
> - `whatsappNumber` = WhatsApp, digits only, no `+`, e.g. `355691234567`

### 2. `js/translations.js` — all the words on the site (3 languages)
Each block of text exists three times: `sq` (Albanian), `en` (English), `de` (German).
Change the text inside the quotes. **Keep the keys** (the words before the `:`) as they are.

### 3. `images/` — your photos
Put your best warehouse/appliance photo here named `hero.jpg`.
See `images/README.txt` for tips (brightness, cropping, blurring plates, file size).

### Opening hours
Edit the `hours_line1` and `hours_line2` values in `js/translations.js`
(there is one set per language). They currently say:
`Monday – Saturday: 09:00 – 19:00` / `Sunday: Closed`.

---

## ✅ Your real details are already in the site

- ✅ Phone / WhatsApp: **+355 68 207 3024**
- ✅ Email: **kontakt@beolashpk.com**
- ✅ Instagram: **@elektroshtepiake_beola**
- ✅ Branch 1 — Yzberisht: Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001
- ✅ Branch 2 — Mëzez: Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë
- ✅ Opening hours: Mon–Sat 09:00–17:00 · Sunday 09:00–12:30

> **Note on "branches":** all three are the same company, **B.O. BEOLA Sh.p.k.** —
> just branches. They share the same phone, email and Instagram. The site now
> calls this section **"Our Branches" (Degët Tona)**, not "three businesses".

## 📌 Only 2 things left (add whenever you have them)

- [ ] **Branch 3 address** → `js/config.js`, in the `biz3` block set `address: "..."`.
      Branch 3 stays **hidden** on the site until you add its address, so nothing
      ever looks broken or half-finished.
- [ ] **Hero photo** → add a file named **`images/hero.jpg`** (your best clean
      warehouse / washing-machine photo). Until then, a tidy dark background shows.
      Tips (brightness, cropping, file size) are in `images/README.txt`.

---

## 📁 File structure

```
beola-website/
├── index.html            ← the page structure (rarely needs editing)
├── favicon.svg           ← little browser-tab icon
├── css/
│   └── styles.css        ← design & colours (edit --red / --charcoal here if needed)
├── js/
│   ├── config.js         ← ✏️ YOUR contact details & business info
│   ├── translations.js   ← ✏️ ALL text in Albanian / English / German
│   └── main.js           ← the engine (language switch, maps, form) — no need to edit
├── images/
│   └── (put hero.jpg here)
└── README.md             ← this file
```

## 🎨 Design

- Colours: white / light-gray background, charcoal text, deep-red accent (edit in `css/styles.css` → `:root`).
- Font: Manrope (loaded from Google Fonts).
- Fully responsive (desktop / tablet / phone), SEO-friendly, semantic HTML.

## 📨 Contact form

The form is **static** — no backend required. When a visitor submits it, it opens
**WhatsApp** (or their **email** app) with the message pre-filled and sent to your
number/email from `config.js`. This is the simplest, cost-free option.

> Want submissions to arrive as real emails in your inbox instead? The easiest
> upgrade is a free [Formspree](https://formspree.io) form (5 minutes, no server).
> Ask and it can be wired in.

## 🌐 Your domain name

The site currently uses `https://www.beola.al` as a placeholder domain (in the SEO
tags, `robots.txt` and `sitemap.xml`). **If your real domain is different**, do a
find-and-replace for `www.beola.al` across these files: `index.html`,
`robots.txt`, `sitemap.xml`. Everything else keeps working regardless.

> 💡 The site prints a friendly reminder in the browser's developer console
> (F12 → Console) listing any contact details in `config.js` that still contain
> placeholder/dummy data — handy as a pre-launch checklist.

## 🔮 Future ideas (not built yet)
- **Per-language URLs for SEO** (`/en/`, `/de/`) with `hreflang` tags — this would
  let Google rank the English/German versions separately. Not needed for v1 (the
  main audience is Albanian), but easy to add later if you expand.
- Online catalogue with prices.
- Simple AI chatbot to collect name / phone / preferred time and forward it.

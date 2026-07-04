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
- ✅ Second phone: **+355 68 901 1606** (shown in Contact + footer; edit/remove in `config.js` → `phone2Display`/`phone2Dial`)
- ✅ Email: **kontakt@beolashpk.com**
- ✅ Instagram: **@elektroshtepiake_beola**
- ✅ Branch 1 — Yzberisht: Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001
- ✅ Branch 2 — Mëzez: Rruga Gani Toptani, Mëzez, pranë Burger Ija, Tiranë
- ✅ Branch 3 — Vaqarr: Rruga Demir Çela, Vaqarr, pranë Bar-Restorant Trëndelina, Tiranë
- ✅ Opening hours: Mon–Sat 09:00–17:00 · Sunday 09:00–12:30
- ✅ **Real photos** added (hero, About workshop, product gallery, storefront) — see below

> **Note on "branches":** all three are the same company, **B.O. BEOLA Sh.p.k.** —
> just branches. They share the same phone, email and Instagram. The site now
> calls this section **"Our Branches" (Degët Tona)**, not "three businesses".

## ✅ All three branches are live

Yzberisht, Mëzez and Vaqarr each appear on the site with their own Google Map.
Everything you gave me is filled in — there are no remaining placeholders.

## 🖼️ The photos on the site

Your real photos have been cropped straight, brightened, compressed for fast
loading, and placed here (the car number plate on the storefront was blurred):

| File in `images/` | Where it shows |
|---|---|
| `hero.jpg` | Big banner at the top (oven aisle) |
| `about-workshop.jpg` | About section (your technician at work) |
| `gallery-washers.jpg` · `gallery-ovens.jpg` · `gallery-warehouse.jpg` | "From our warehouse" gallery in Products |
| `storefront.jpg` | Locations section (your **"B.O BEOLA" road sign**) |

There is also a **trust bar** under the hero with four points taken from your
marketing material: *Shumicë & Pakicë · Porosi nga Gjermania · Në të gjithë
Shqipërinë · Korrektesë & profesionalizëm* (edit these in `js/translations.js`,
keys `trust_*`).

**To swap any photo later:** just replace the file in `images/` with a new one of
the **same name** (ideally similar shape/landscape). Send me a new photo any time
and I'll crop/brighten/place it for you.

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

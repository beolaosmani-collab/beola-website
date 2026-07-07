# Owner’s Guide — editing the B.O. BEOLA website

You can run the whole site by editing **one file: `data/site.mjs`**.
You do **not** need to be a programmer. This guide shows exactly what to change.

> 💡 **The golden rule:** only change the text **between the quotation marks
> `"..."`**. Don’t remove commas, quotes or the words before the colon (`:`).

There are two ways to make a change:

- **Easiest (on GitHub, no software):** open `data/site.mjs` on github.com, click
  the ✏️ pencil, edit, then **Commit changes**. A robot rebuilds and publishes the
  site in ~1 minute. Nothing else to do.
- **On your computer:** edit `data/site.mjs`, then run `node build.mjs`, then
  upload/commit the changes.

---

## 1. Phone, email, WhatsApp, Instagram
In `data/site.mjs`, find the **`contact:`** block:

```js
contact: {
  phone1Display: "+355 68 207 3024",   // how the main number looks on screen
  phone1Dial:    "+355682073024",      // same number, no spaces (for tap-to-call)
  phone2Display: "+355 68 901 1606",   // second number ("" to hide it)
  phone2Dial:    "+355689011606",
  whatsapp:      "355682073024",       // digits only, no +
  email:         "beolashpk@gmail.com",
  instagram:     "https://www.instagram.com/elektroshtepiake_beola",
  instagramHandle: "@elektroshtepiake_beola",
},
```
Change a number in **both** its `Display` and `Dial` lines so the text and the
tap-to-call link match. WhatsApp is digits only.

## 2. Branch information (address, which branches exist)
Find the **`branches:`** list. Each branch looks like:
```js
{
  slug: "yzberisht",                 // used in the web address — avoid spaces/accents
  area: "Yzberisht",
  address: "Rruga Sabaudin Gabrani, Yzberisht, përballë Spitalit Amerikan, Tiranë 1001",
  landmark: { sq: "Përballë Spitalit Amerikan", en: "Opposite the American Hospital", de: "Gegenüber dem Amerikanischen Krankenhaus" },
  isMain: true,                      // true only for the main branch
},
```
The map and “Get directions” button are generated automatically from `address`.
To add a branch, copy one `{ … }` block; to remove one, delete its block.

## 3. Opening hours
Find **`hours:`**. Change the display text (per language) **and** the 24-hour
values that feed Google:
```js
hours: {
  weekday: { opens: "09:00", closes: "17:00" },   // Mon–Sat
  sunday:  { opens: "09:00", closes: "12:30" },
  lines: {
    sq: ["E Hënë – E Shtunë: 09:00 – 17:00", "E Diel: 09:00 – 12:30"],
    en: ["Monday – Saturday: 09:00 – 17:00", "Sunday: 09:00 – 12:30"],
    de: ["Montag – Samstag: 09:00 – 17:00", "Sonntag: 09:00 – 12:30"],
  },
},
```

## 4. “In focus” / featured items
Find **`featured:`**. Each card has a photo, a title and a note in all three
languages, plus a WhatsApp “ask about availability” button (automatic). Edit the
titles/notes any time to reflect current stock. Keep 2–4 cards for a clean look.

## 5. FAQ and reviews
- **`faq:`** — questions & answers in all three languages. Add/edit freely.
- **`reviews:`** — empty by default (the site shows a friendly “leave a review”
  prompt). When you collect real reviews, add them like the commented example.
  Never invent reviews.

## 6. Replace or add photos
Photos live in the **`images/`** folder. The site looks for these names:
`hero.jpg`, `about-workshop.jpg`, `storefront.jpg`, `gallery-washers.jpg`,
`gallery-ovens.jpg`, `gallery-warehouse.jpg`, and `prod-washers.jpg`,
`prod-dryers.jpg`, `prod-ovens.jpg`, `prod-dishwashers.jpg`, `prod-repair.jpg`,
`prod-import.jpg`.

To swap a photo, replace the `.jpg` with the same name (landscape looks best;
keep the hero wide). Then a `.webp` copy should be made for speed:
```bash
# one-time tool: pip install Pillow
python3 - <<'PY'
from PIL import Image; import glob
for f in glob.glob("images/*.jpg"):
    Image.open(f).convert("RGB").save(f[:-4]+".webp","WEBP",quality=80,method=6)
PY
```
(If you edit on GitHub, just upload the new `.jpg`; ask your helper to regenerate
the `.webp`, or the site still works with the `.jpg` alone.)

## 7. Claims you must NOT fake
Find **`claims:`**. Delivery, warranty length, financing and same-day repair are
**off** (`false`/`null`) until they are genuinely true. Turn one on only if it is
real, then rebuild.

---

## Publishing / deployment
The site is hosted on **GitHub Pages** from the `main` branch.
- Edit `data/site.mjs` on GitHub → **Commit** → the **build** GitHub Action
  rebuilds the pages and pushes them → GitHub Pages publishes in ~1 minute.
- Locally: `node build.mjs`, then commit & push.
- Preview locally before publishing: `node server.js` then open
  `http://localhost:4599`.

### Custom domain (e.g. beola.al) — optional, later
1. In `data/site.mjs`, set `baseUrl: "https://beola.al"` and `basePath: ""`, then rebuild.
2. Create a file named **`CNAME`** in the project root containing just:
   `beola.al`
3. At your domain registrar, point the domain to GitHub Pages (GitHub shows the
   exact DNS records under **Settings → Pages**).
> Do this only once you own the domain; until then leave `baseUrl` as-is.

# Under the Hood

An interactive guide to how cars work. Choose a powertrain on the start page, then scroll to
take that car apart in 3D and click any part to see it working and read what it does.

| Page | Car | Highlights |
| --- | --- | --- |
| `gas.html` | 1964 Chevrolet Impala Sport Coupe | V8, X-frame, drum brakes, four-stroke (Otto) cycle |
| `diesel.html` | Mercedes-Benz GLK 250 BlueTEC 4MATIC | Turbo diesel, common rail, DPF + AdBlue, 4MATIC all-wheel drive, diesel cycle |
| `electric.html` | Tesla Model Y Long Range (dual motor) | Battery pack, two drive units, inverters, heat pump, regenerative braking, electric-motor diagram |

Each car page also has **"At the car service"** tips, so people don't get tricked into paying for work
their car doesn't need: every part lists real warning signs, common upsells ("they say" → reality) and
questions to ask the mechanic. The start page has 8 general rules for any visit.

Languages: English (default), Ukrainian, Russian.

Every car is built entirely in code from simple shapes (no model files) and is a simplified,
educational model — not an official product of the car makers.

## Run it

It's a static site with no build step and no backend. Either open `index.html` directly in a browser,
or serve the folder:

```bash
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765. Add `?lang=uk` or `?lang=ru` to open it in another language.

An internet connection is needed for three.js (CDN) and the Google Fonts.

## Files

| File | What's inside |
| --- | --- |
| `index.html` | Start page: choose Gas / Diesel / Electric, comparison table |
| `gas.html`, `diesel.html`, `electric.html` | The car pages (just `<body data-car="…">` plus scripts) |
| `css/style.css` | All styles, including the mobile layout |
| `js/content.js` | Shared texts in all three languages (UI, start page, generic part descriptions) |
| `js/cars/gas.js`, `diesel.js`, `electric.js` | One file per car: its 3D model, part list, take-apart timing and car-specific texts |
| `js/service.js` | "At the car service" tips in all three languages: general rules, per-part tips, and diesel/electric-specific ones |
| `js/layout.js` | Page markup shared by the three car pages |
| `js/scene.js` | Shared 3D engine: lighting, scroll take-apart, picking, part previews and start-page turntables |
| `js/engine-cycle.js` | Animated four-stroke diagram (petrol and diesel modes) |
| `js/motor-cycle.js` | Animated electric-motor diagram |
| `js/app.js` | Car page logic: languages, scrolling, part panel, catalogue |
| `js/home.js` | Start page logic |

To change a text, edit `js/content.js` (shared) or the car's file in `js/cars/` (car-specific — these
win over the shared ones). Service tips are in `js/service.js`: `parts` holds the tips shared by all cars and
`byCar` the ones that replace them for one powertrain. Each car's `service` list picks which parts are
featured in its "Common upsells" section.

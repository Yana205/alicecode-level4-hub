# { alicecode } Level 4 Hub 💜

The home base for **AliceCode הסמכה 4 (2026–27)** — the final-year program where ~10 amazing builders go *from users to builders* of AI agents.

**Live site:** https://alicecode-level4-hub.vercel.app (Vercel, auto-deploys on every push)
**Backup mirror:** https://yana205.github.io/alicecode-level4-hub/ (GitHub Pages)

## What's inside

| Page | What it does |
|---|---|
| `index.html` | Year intro, TikTok Studio pipeline, roadmap to the hackathon |
| `lessons.html` | All 6 pre-hackathon lessons |
| `slides.html?n=1…6` | Web presentations for lessons 1–6 (simple English, click/arrow navigation) |
| `tasks.html` | Mission board with progress bar (saved in the browser) + link to the class Trello |
| `setup.html` | opencode install guide + animated terminal demo |
| `learn-more.html` | Curated free resources: W3Schools, freeCodeCamp, Frontend Masters, MongoDB U, YouTube |
| `calendar.html` | The class calendar in AliceCode style: month grid + coming up. Served by `api/calendar-page.js` from the template `pages/calendar.html`, with the dates from the class Google Calendar already inside (rewrite in `vercel.json`). **Edit dates in Google Calendar**, not in the code |
| `api/_calendar.js`, `api/calendar.js` | Reads the public Google Calendar feed (shared code) · the same dates as JSON |
| `demos.js` | Live slide demos for Lesson 1: chat vs. agent race, TikTok Studio loop, live PokeAPI fetch |
| `db-demo.html` + `db-demo.jsx` | "Variables vs. Database" slides as **React + Tailwind** components (`VariablesForget`, `MongoRemembers`). Shown in the deck in a frame; open `db-demo.html` alone to see both. `db-demo.js` + `db-demo.css` are pre-built from it: after editing `db-demo.jsx`, run `sh scripts/build-db-demo.sh` |
| `assets/fonts`, `assets/brand`, `assets/vendor` | Fonts, logos and React served from this site (no outside servers = faster first load) |
| `starter/class-db/` | **The class database, ready for Lesson 1:** 30 ready-made TikTok videos (`videos.json`), `npm run setup` (load data + print Part 1 answers), `npm run check` (test the student login), optional `atlas-setup.sh` (whole cluster via Atlas CLI). Start with its README |
| `starter/idea-tracker/` | Lesson 1 Part 2: a TikTok Idea Tracker (Express + MongoDB). The teacher connects it live on the "Watch: connect the wires" slide; students do it at home with their **own** free Atlas database (the "Try it yourself" slide links its README) |
| `api/tasks.js` | Tiny Vercel function behind the "MongoDB remembers" slide (needs `MONGODB_URI`, see below) |
| `api/videos.js` | Read-only query on the class `videos` collection (`?filter=…&sort=…`) for the Part 1 task slide — the girls query the real database from the website |
| `api/class-db.js` | Open `/api/class-db` to set up + check the class database from the browser (loads the 30 videos if missing, tests insert/find/delete) |
| `SLIDE-UPGRADE-RULES.md` | Before/after of the Lesson 1 Button Lab upgrade + the global "juice" rules for all decks |
| `locks.json` | Which lessons are hidden from students (`true` = locked). Edit it on GitHub; the magic password opens locked lessons on one device |

## Class Trello

Template board: https://trello.com/b/wPXqrlUT — teams copy it (Menu → More → Copy board).

## Connect the real MongoDB (Lesson 1 · "MongoDB remembers" slide)

Until this is set up, the slide runs in **demo mode** (badge: 🟡 *demo · simulated database*). Once connected the badge turns 🟢 *live · MongoDB Atlas* and every device in class shares the same tasks.

1. Create a free **M0** cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. *Database Access* → add a user + password. *Network Access* → allow `0.0.0.0/0` (Vercel has no fixed IP).
3. *Connect → Drivers* → copy the `mongodb+srv://…` connection string (put the password in).
4. Vercel → this project → *Settings → Environment Variables* → add `MONGODB_URI` = that string → redeploy.

Data goes to database `alicecode`, collection `tasks` (max 50 tasks, 60 characters each; the 🧹 button on the slide clears them).

## Editing

All lesson content lives in **`lessons-data.js`** — slides, missions and tutorial links per lesson. Edit that one file and every page updates. Design tokens are at the top of `style.css` (palette taken from the הסמכה 4 deck masters).

No build step. Push to `main` → GitHub Pages redeploys.

Made with 💜 by Yan + Claude for the Level 4 builders.

# { alicecode } Level 4 Hub 💜

The home base for **AliceCode הסמכה 4 (2026–27)** — the final-year program where ~10 amazing builders go *from users to builders* of AI agents.

**Live site:** https://alicecode-level4-hub.vercel.app (Vercel, auto-deploys on every push)
**Backup mirror:** https://yana205.github.io/alicecode-level4-hub/ (GitHub Pages)

## What's inside

| Page | What it does |
|---|---|
| `index.html` | Year intro, TikTok Studio pipeline, roadmap to the hackathon |
| `lessons.html` | All 7 pre-hackathon lessons |
| `slides.html?n=1…7` | Web presentations for lessons 1–7 (simple English, click/arrow navigation) |
| `tasks.html` | Mission board with progress bar (saved in the browser) + link to the class Trello |
| `setup.html` | opencode install guide + animated terminal demo |
| `learn-more.html` | Curated free resources: W3Schools, freeCodeCamp, Frontend Masters, MongoDB U, YouTube |
| `calendar.html` | The whole year — Thursday lessons + fixed events, with an .ics download |
| `admin.html` | Instructor sign-in (fine-grained GitHub PAT, stored only in the browser) to lock/unlock lessons |
| `demos.js` | Live slide demos for Lesson 1: chat vs. agent race, TikTok Studio loop, live PokeAPI fetch, to-do "forget vs. remember" lab |
| `api/tasks.js` | Tiny Vercel function behind the "MongoDB remembers" slide (needs `MONGODB_URI`, see below) |
| `SLIDE-UPGRADE-RULES.md` | Before/after of the Lesson 1 Button Lab upgrade + the global "juice" rules for all decks |
| `locks.json` | Which lessons are hidden from students (`true` = locked). Edited by the admin page |

## Class Trello

Template board: https://trello.com/b/wPXqrlUT — teams copy it (Menu → More → Copy board).

## Connect the real MongoDB (Lesson 1 · "MongoDB remembers" slide)

Until this is set up, the slide runs in **demo mode** (badge: 🟡 *demo · saved in this browser*). Once connected the badge turns 🟢 *live · MongoDB Atlas* and every device in class shares the same tasks.

1. Create a free **M0** cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. *Database Access* → add a user + password. *Network Access* → allow `0.0.0.0/0` (Vercel has no fixed IP).
3. *Connect → Drivers* → copy the `mongodb+srv://…` connection string (put the password in).
4. Vercel → this project → *Settings → Environment Variables* → add `MONGODB_URI` = that string → redeploy.

Data goes to database `alicecode`, collection `tasks` (max 50 tasks, 60 characters each; the 🧹 button on the slide clears them).

## Editing

All lesson content lives in **`lessons-data.js`** — slides, missions and tutorial links per lesson. Edit that one file and every page updates. Design tokens are at the top of `style.css` (palette taken from the הסמכה 4 deck masters).

No build step. Push to `main` → GitHub Pages redeploys.

Made with 💜 by Yan + Claude for the Level 4 builders.

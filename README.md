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
| `locks.json` | Which lessons are hidden from students (`true` = locked). Edited by the admin page |

## Class Trello

Template board: https://trello.com/b/wPXqrlUT — teams copy it (Menu → More → Copy board).

## Editing

All lesson content lives in **`lessons-data.js`** — slides, missions and tutorial links per lesson. Edit that one file and every page updates. Design tokens are at the top of `style.css` (palette taken from the הסמכה 4 deck masters).

No build step. Push to `main` → GitHub Pages redeploys.

Made with 💜 by Yan + Claude for the Level 4 builders.

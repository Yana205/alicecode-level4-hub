# 🍃 The class database — ready for Lesson 1

Everything the lesson needs in one MongoDB Atlas cluster (free M0):

| Collection | Used by | What's in it |
|---|---|---|
| `videos` | **Part 1 · Task** (read, filter, count, sort) | 30 ready-made TikTok videos — this folder's `videos.json` |
| `ideas` | **Part 2 · Watch: connect the wires** (teacher demo, optional) | what the Idea Tracker saves if you demo it on the class database |
| `tasks` | "After: MongoDB remembers" slide | the live to-do demo |

All in the database **`alicecode`**.

## Option A · one script (Atlas CLI) — about 10 minutes
```bash
npx degit Yana205/alicecode-level4-hub/starter/class-db class-db
cd class-db
./atlas-setup.sh
```
It logs you in, creates the project + free cluster, opens network access, makes a **teacher** user (admin) and a **student** user (read + write on `alicecode` only), writes `.env`, loads the data and tests the student login.
*(Not tested against a live Atlas account from here — if a step errors, Option B does the same by clicking.)*

## Option B · click it in Atlas — about 15 minutes
1. [cloud.mongodb.com](https://cloud.mongodb.com) → new project **AliceCode Level 4** → **Create cluster → M0 (free)**.
2. **Database Access → Add user**:
   - `teacher` · role **Atlas admin** (for you and the hub).
   - `student` · **Specific privileges → readWrite @ alicecode** (the one the hub uses — only this database).
3. **Network Access → Add IP → Allow access from anywhere** (`0.0.0.0/0`).
4. **Connect → Drivers** → copy the `mongodb+srv://…` string. Make two copies: one with `teacher:PASSWORD`, one with `student:PASSWORD`.
5. Here: `cp .env.example .env`, paste both strings, then:
   ```bash
   npm install
   npm run setup   # loads the 30 videos, prints the Part 1 answers
   npm run check   # tests the student login like the girls will use it
   ```

## Then connect everything
- **The hub (live slides):** Vercel → *Settings → Environment Variables* → `MONGODB_URI` = the **student** string (it only needs `alicecode`) → *Redeploy*. The "MongoDB remembers" and "Part 1 · Task" slides switch to 🟢 live.
- **No terminal? Let the hub do setup + check:** open `https://alicecode-level4-hub.vercel.app/api/class-db` — it loads the 30 videos if they're missing and runs the same checks as `npm run check` (all `"ok": true` = ready). `?reset=1` reloads the videos.
- **The girls:** nothing to paste. Part 1 happens on the website (no install, no Atlas account): the Part 1 slide asks the real database through `/api/videos`. Part 2 is a teacher demo; at home they make their **own** free database (Idea Tracker README).

## Part 1 answers (teacher only)
1. Total videos: **30**
2. Dance videos `{ "category": "dance" }`: **5**
3. More than 10,000 likes `{ "likes": { "$gt": 10000 } }`: **13**
4. Most likes (sort `{ "likes": -1 }`): **"y2k outfit check"** by @tamar.style — 48,200 ❤️

Someone deleted the videos? Run `npm run setup` again — it reloads them and keeps the ideas.

> 🔒 Keep both connection strings out of this repo and off the public site — anyone who has one can write to the database.

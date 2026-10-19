# 🍃 The class database — ready for Lesson 1

Everything the lesson needs in one MongoDB Atlas cluster (free M0):

| Collection | Used by | What's in it |
|---|---|---|
| `videos` | **Part 1 · Task** (read, filter, count, sort) | 30 ready-made TikTok videos — this folder's `videos.json` |
| `ideas` | **Part 2 · Connect the wires** + "Find it in the vault" slide | what the girls save from the Idea Tracker |
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
   - `student` · **Specific privileges → readWrite @ alicecode** (the one you share in class).
3. **Network Access → Add IP → Allow access from anywhere** (`0.0.0.0/0`).
4. **Connect → Drivers** → copy the `mongodb+srv://…` string. Make two copies: one with `teacher:PASSWORD`, one with `student:PASSWORD`.
5. Here: `cp .env.example .env`, paste both strings, then:
   ```bash
   npm install
   npm run setup   # loads the 30 videos, prints the Part 1 answers
   npm run check   # tests the student login like the girls will use it
   ```

## Then connect everything
- **The hub (live slides):** Vercel → *Settings → Environment Variables* → `MONGODB_URI` = the **teacher** string → *Redeploy*. The "MongoDB remembers" and "Find it in the vault" slides switch to 🟢 live.
- **The girls:** in class, paste the **student** string into the **🔑 Class database** box on the *Part 1 · Task* slide (it stays in your browser only) and share it in the class chat. They use it in their Idea Tracker `.env`.
- **To see the data in Atlas:** *Project → Access Manager → Invite* each girl as **Project Read Only** (or they open it in MongoDB Compass with the student string).

## Part 1 answers (teacher only)
1. Total videos: **30**
2. Dance videos `{ "category": "dance" }`: **5**
3. More than 10,000 likes `{ "likes": { "$gt": 10000 } }`: **13**
4. Most likes (sort `{ "likes": -1 }`): **"y2k outfit check"** by @tamar.style — 48,200 ❤️

Someone deleted the videos? Run `npm run setup` again — it reloads them and keeps the girls' ideas.

> 🔒 The student password is safe to share in class, but don't put it in this repo or on the public site — anyone could write to the database.

# 📱 TikTok Idea Tracker — try it yourself 🏠

AliceCode Level 4 · Lesson 1. You watched it in class, now make it yours.
A tiny app (Express + a web page) that saves TikTok ideas. Right now it keeps them in a **variable**, so they disappear when the server stops. Your job: make **MongoDB** remember them, with **your own free database**.

🎬 Like videos better? [MongoDB & Node.js: Connecting (MongoDB on YouTube)](https://www.youtube.com/watch?v=fbYExfeFsI0)
📖 Atlas step by step, with pictures: [mongodb.com/docs/get-started](https://www.mongodb.com/docs/get-started/)

## 0 · Make your free database (about 10 minutes)
1. Sign up at [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register). No credit card.
2. **Create a cluster → M0 (Free)**. Any region is fine.
3. **Database Access → Add user.** Pick a name and a password.
   Safer: under *Database User Privileges* choose **Specific privileges → readWrite** on the database `alicecode` only.
4. **Network Access → Add IP → Add current IP address.** (At school or a friend's house? Add that IP too.)
5. **Connect → Drivers** → copy the `mongodb+srv://…` string and put your password where it says `<db_password>`.

That string is your **key**. 🔑 Whoever has it can read, change or delete your data.

## 1 · Clone
```bash
npx degit Yana205/alicecode-level4-hub/starter/idea-tracker idea-tracker
cd idea-tracker
npm install
```
No Node.js on your computer? Open the hub in **GitHub Codespaces** (`https://codespaces.new/Yana205/alicecode-level4-hub`), then `cd starter/idea-tracker && npm install`.
*(StackBlitz won't work here: it runs in the browser, and browsers can't open a direct connection to a database.)*

## 2 · Add the code
1. Copy `.env.example` to `.env` and paste **your** key after `MONGODB_URI=`.
2. In `server.js`, find the two 🎯 STEP comments and swap in:
   ```js
   await db.collection("ideas").insertOne(idea);
   ```
   ```js
   const all = await db.collection("ideas").find().sort({ createdAt: -1 }).toArray();
   ```

## 3 · Test
`npm start` → open http://localhost:3000 → add an idea → stop the server (**Ctrl + C**) → `npm start` again → refresh.
Your idea is still there? 🎉 The database remembered.

See it in Atlas: *Browse Collections → alicecode → ideas.* Try the filter `{ "name": "YourName" }`.

## 🔒 Keep your key secret
- The key lives in `.env` only. `server.js` just says `process.env.MONGODB_URI`.
- `.env` is in `.gitignore`, so `git push` never uploads it. Don't remove that line!
- Never paste the key in a chat, a screenshot or a GitHub issue.
- Leaked it by mistake? Atlas → **Database Access → Edit → Edit Password.** The old key stops working.

Stuck? Bring a screenshot of the error to the next lesson. We fix it together. 💜

---

### For the teacher: the class demo
Run it live on the "Watch: connect the wires" slide with your own `.env` (your own cluster, or the class cluster's **student** string from `starter/class-db`). Don't show the full string on the projector.

# 📱 TikTok Idea Tracker — connect it to MongoDB

AliceCode Level 4 · Lesson 1 exercise. A tiny app (Express + a web page) that saves TikTok ideas.
Right now it keeps them in a **variable**, so they disappear when the server stops. Your job: make **MongoDB** remember them.

## 1 · Clone
```bash
npx degit Yana205/alicecode-level4-hub/starter/idea-tracker idea-tracker
cd idea-tracker
npm install
```
No Node.js on your computer? Open the hub in **GitHub Codespaces** (`https://codespaces.new/Yana205/alicecode-level4-hub`), then `cd starter/idea-tracker && npm install`.
*(StackBlitz won't work here: it runs in the browser, and browsers can't open a direct connection to a database.)*

## 2 · Add the code
1. Copy `.env.example` to `.env` and paste the class connection string your teacher gives you.
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

Then find **your** document in MongoDB Atlas: *Browse Collections → alicecode → ideas →* filter `{ "name": "YourName" }`.

---

### For the teacher: one-time setup
- Use the same free Atlas cluster as the hub (see the hub README).
- *Database Access* → add a user just for the class with **readWrite** on the `alicecode` database. Build the connection string with that user and share it **in class only** (whiteboard, class chat). Never commit it.
- *Network Access* → `0.0.0.0/0` (students connect from home and school).
- So students can see the data in Atlas: *Project → Access Manager → Invite* each student as **Project Read Only**. (Or they can use MongoDB Compass with the connection string.)
- The hub's "Find your document" slide shows the real `ideas` collection once `MONGODB_URI` is set on Vercel.

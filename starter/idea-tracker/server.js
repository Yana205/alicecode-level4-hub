/* 📱 TikTok Idea Tracker — AliceCode Level 4 · Lesson 1 exercise
   Right now the ideas live in a plain variable: stop the server and they're gone.
   Your mission: make MongoDB remember them. Look for the 🎯 STEP comments. */

require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let db = null;      // your MongoDB database (connects below if .env has MONGODB_URI)
let ideas = [];     // ❌ a plain variable — it forgets everything when the server stops

/* ---------- save one idea ---------- */
app.post("/api/ideas", async (req, res) => {
  const idea = {
    name: String(req.body.name || "").trim().slice(0, 30),
    idea: String(req.body.idea || "").trim().slice(0, 120),
    createdAt: new Date()
  };
  if (!idea.name || !idea.idea) return res.status(400).json({ error: "Write your name and an idea first." });

  // 🎯 STEP 2a — replace the next line with:
  //     await db.collection("ideas").insertOne(idea);
  ideas.push(idea);

  res.status(201).json(idea);
});

/* ---------- read all ideas ---------- */
app.get("/api/ideas", async (req, res) => {
  // 🎯 STEP 2b — replace the next line with:
  //     const all = await db.collection("ideas").find().sort({ createdAt: -1 }).toArray();
  const all = [...ideas].reverse();

  res.json(all);
});

/* friendly errors (e.g. using db before the .env is ready) */
app.use((err, req, res, next) => {
  console.error("❌", err.message);
  res.status(500).json({ error: db ? err.message
    : "The database isn't connected. Is MONGODB_URI in your .env file? Restart the server after you add it." });
});

async function start() {
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith("paste-")) {
    const client = await new MongoClient(process.env.MONGODB_URI).connect();
    db = client.db(process.env.MONGODB_DB || "alicecode");
    console.log("🍃 Connected to MongoDB");
  } else {
    console.log("⚠️  No MONGODB_URI in .env yet — ideas live in memory only.");
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Idea Tracker running on http://localhost:${port}`));
}

start().catch(err => {
  console.error("❌ Could not connect to MongoDB:", err.message);
  console.error("   Check the connection string in .env (password, no spaces).");
  process.exit(1);
});

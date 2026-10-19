/* AliceCode Level 4 — load the class database (run once before Lesson 1).
   Uses MONGODB_URI (an admin user) from .env. Safe to run again: it resets
   the ready-made "videos" and keeps the students' "ideas" and "tasks". */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { MongoClient, BSON } = require("mongodb");

const DB = process.env.MONGODB_DB || "alicecode";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("PASSWORD")) throw new Error("Put your admin connection string in .env as MONGODB_URI (see .env.example).");

  const client = await new MongoClient(uri).connect();
  const db = client.db(DB);
  console.log(`🍃 Connected · database "${DB}"`);

  /* 1 · the ready-made collection for Part 1 */
  const videos = BSON.EJSON.parse(fs.readFileSync(path.join(__dirname, "videos.json"), "utf8"));
  await db.collection("videos").deleteMany({});
  await db.collection("videos").insertMany(videos);
  await db.collection("videos").createIndex({ likes: -1 });
  await db.collection("videos").createIndex({ category: 1 });
  console.log(`📼 videos: ${videos.length} documents loaded`);

  /* 2 · empty collections the slides and the exercise write to */
  const existing = (await db.listCollections({}, { nameOnly: true }).toArray()).map(c => c.name);
  for (const name of ["ideas", "tasks"]) {
    if (!existing.includes(name)) await db.createCollection(name);
  }
  await db.collection("ideas").createIndex({ createdAt: -1 });
  await db.collection("ideas").createIndex({ name: 1 });
  console.log(`💡 ideas: ${await db.collection("ideas").countDocuments()} · 📝 tasks: ${await db.collection("tasks").countDocuments()} (kept)`);

  /* 3 · answers for the Part 1 exercises (teacher only) */
  const v = db.collection("videos");
  const top = await v.find().sort({ likes: -1 }).limit(1).next();
  console.log("\n🔑 Part 1 answers");
  console.log(`  1 · total videos ............ ${await v.countDocuments()}`);
  console.log(`  2 · dance videos ............ ${await v.countDocuments({ category: "dance" })}`);
  console.log(`  3 · more than 10,000 likes .. ${await v.countDocuments({ likes: { $gt: 10000 } })}`);
  console.log(`  4 · most likes .............. "${top.title}" by ${top.creator} (${top.likes} ❤️)`);

  await client.close();
  console.log("\n✅ Class database ready. Next: npm run check");
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });

/* AliceCode Level 4 — test the STUDENT login exactly like the girls will use it.
   Uses STUDENT_URI from .env: reads videos, saves + reads + deletes a test idea. */

require("dotenv").config();
const { MongoClient } = require("mongodb");

const DB = process.env.MONGODB_DB || "alicecode";

async function step(label, fn) {
  try { const r = await fn(); console.log(`✅ ${label}${r !== undefined ? ` — ${r}` : ""}`); return true; }
  catch (e) { console.log(`❌ ${label} — ${e.message}`); return false; }
}

async function main() {
  const uri = process.env.STUDENT_URI;
  if (!uri || uri.includes("PASSWORD")) throw new Error("Put the student connection string in .env as STUDENT_URI (see .env.example).");
  let client, ok = true;
  ok &= await step("connect as the student user", async () => { client = await new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect(); });
  if (!client) process.exit(1);
  const db = client.db(DB);
  ok &= await step("read the ready-made videos (Part 1)", async () => `${await db.collection("videos").countDocuments()} videos`);
  let id;
  ok &= await step("save an idea with insertOne (Part 2)", async () => { id = (await db.collection("ideas").insertOne({ name: "infra-check", idea: "test", createdAt: new Date() })).insertedId; });
  ok &= await step("read it back with find", async () => { if (!(await db.collection("ideas").findOne({ _id: id }))) throw new Error("not found"); });
  ok &= await step("clean up the test idea", async () => { await db.collection("ideas").deleteOne({ _id: id }); });
  await client.close();
  console.log(ok ? "\n🎉 Ready for class — the student login works." : "\n⚠️ Fix the ❌ lines above (user roles? Network Access 0.0.0.0/0?).");
  process.exit(ok ? 0 : 1);
}

main().catch(err => { console.error("❌", err.message); process.exit(1); });

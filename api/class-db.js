/* AliceCode Level 4 — set up + check the class database from the website
   (the same jobs as "npm run setup" and "npm run check" in starter/class-db).
   Uses MONGODB_URI from the Vercel settings — the login never goes in this repo.
   GET /api/class-db         → loads the 30 ready-made videos if they're missing, then checks everything
   GET /api/class-db?reset=1 → reloads the videos (someone deleted them?) — the girls' ideas and tasks stay */

const fs = require("fs");
const path = require("path");
const { BSON } = require("mongodb");
const { database } = require("./_db");

const VIDEOS = path.join(__dirname, "..", "starter", "class-db", "videos.json");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "GET only" }); }
  const db$ = database();
  if (!db$) return res.status(503).json({ ok: false, error: "MONGODB_URI is not set in Vercel → Settings → Environment Variables" });

  const steps = [];
  const step = async (name, fn) => {
    try { steps.push({ name, ok: true, info: (await fn()) || "" }); }
    catch (e) { steps.push({ name, ok: false, info: e.message }); }
  };
  try {
    const db = await db$;
    const videos = db.collection("videos");
    const ready = BSON.EJSON.parse(fs.readFileSync(VIDEOS, "utf8"));
    const reset = req.query && req.query.reset === "1";

    await step(reset ? "reload the 30 videos" : "load the videos (only if missing)", async () => {
      const have = await videos.countDocuments();
      if (!reset && have === ready.length) return `already there (${have})`;
      await videos.deleteMany({});
      await videos.insertMany(ready);
      return `${ready.length} loaded`;
    });
    await step("indexes + empty collections", async () => {
      await videos.createIndex({ likes: -1 });
      await videos.createIndex({ category: 1 });
      const names = (await db.listCollections({}, { nameOnly: true }).toArray()).map(c => c.name);
      for (const n of ["ideas", "tasks"]) if (!names.includes(n)) await db.createCollection(n);
      await db.collection("ideas").createIndex({ createdAt: -1 });
      await db.collection("ideas").createIndex({ name: 1 });
    });
    await step("read the videos (Part 1)", async () => `${await videos.countDocuments()} videos`);
    let id;
    await step("save an idea with insertOne (Part 2)", async () => {
      id = (await db.collection("ideas").insertOne({ name: "infra-check", idea: "test", createdAt: new Date() })).insertedId;
    });
    await step("read it back with find", async () => { if (!(await db.collection("ideas").findOne({ _id: id }))) throw new Error("not found"); });
    await step("clean up the test idea", async () => { await db.collection("ideas").deleteOne({ _id: id }); });

    const counts = {
      videos: await videos.countDocuments(),
      ideas: await db.collection("ideas").countDocuments(),
      tasks: await db.collection("tasks").countDocuments()
    };
    const ok = steps.every(s => s.ok);
    return res.status(ok ? 200 : 500).json({ ok, database: db.databaseName, counts, steps });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message, steps });
  }
};

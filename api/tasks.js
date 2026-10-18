/* AliceCode Level 4 — tiny backend for the "MongoDB remembers" slide.
   Vercel serverless function: GET lists tasks, POST {text} adds one,
   DELETE ?id=<id>|all removes. Needs MONGODB_URI in the Vercel project
   settings; without it the slide falls back to the browser's storage. */

const { ObjectId } = require("mongodb");
const { database } = require("./_db");

const MAX_DOCS = 50;

function tasks() {
  const db$ = database();
  return db$ && db$.then(db => db.collection("tasks"));
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const col$ = tasks();
  if (!col$) return res.status(503).json({ ok: false, error: "MONGODB_URI is not set" });

  try {
    const col = await col$;

    if (req.method === "GET") {
      const docs = await col.find({}).sort({ createdAt: 1 }).limit(MAX_DOCS).toArray();
      return res.status(200).json({ ok: true, docs });
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const text = String(body.text || "").trim().slice(0, 60);
      if (!text) return res.status(400).json({ ok: false, error: "text is required" });
      if (await col.countDocuments() >= MAX_DOCS) {
        return res.status(429).json({ ok: false, error: `The collection is full (${MAX_DOCS}). Clear it first.` });
      }
      const doc = { text, done: false, createdAt: new Date() };
      const r = await col.insertOne(doc);
      return res.status(201).json({ ok: true, doc: { ...doc, _id: r.insertedId } });
    }

    if (req.method === "DELETE") {
      const id = req.query && req.query.id;
      if (id === "all") { await col.deleteMany({}); return res.status(200).json({ ok: true }); }
      if (!id || !ObjectId.isValid(id)) return res.status(400).json({ ok: false, error: "a valid id is required" });
      await col.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ ok: false, error: "method not allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "database error" });
  }
};

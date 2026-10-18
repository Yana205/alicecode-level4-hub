/* AliceCode Level 4 — read-only view of the "ideas" collection that students
   fill from the Idea Tracker exercise (starter/idea-tracker). Feeds the
   "Find your document" slide. GET only; ?name= filters to one student. */

const { database } = require("./_db");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "read only" }); }
  const db$ = database();
  if (!db$) return res.status(503).json({ ok: false, error: "MONGODB_URI is not set" });
  try {
    const db = await db$;
    const name = req.query && typeof req.query.name === "string" ? req.query.name.slice(0, 30) : null;
    const docs = await db.collection("ideas").find(name ? { name } : {}).sort({ createdAt: -1 }).limit(100).toArray();
    return res.status(200).json({ ok: true, docs });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "database error" });
  }
};

/* AliceCode Level 4 — query the class "videos" collection from the website (Part 1 task).
   GET /api/videos?filter={...}&sort={...} → { ok, count, docs }
   Read only. Simple operators only, so a query can't run code on the server. */

const { database } = require("./_db");

const OPS = new Set(["$gt", "$gte", "$lt", "$lte", "$ne", "$eq", "$in", "$nin", "$exists", "$regex", "$options", "$and", "$or", "$not"]);

/* every $key must be a simple operator; field names can't start with $ */
function safe(v) {
  if (Array.isArray(v)) return v.every(safe);
  if (v && typeof v === "object") return Object.entries(v).every(([k, x]) => (!k.startsWith("$") || OPS.has(k)) && safe(x));
  return true;
}

function parse(text, what) {
  if (!text) return {};
  let v;
  try { v = JSON.parse(text); } catch (e) { throw new Error(`The ${what} isn't valid JSON — check the { } and the quotes.`); }
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error(`The ${what} must be one { … } object.`);
  return v;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "read only" }); }
  const db$ = database();
  if (!db$) return res.status(503).json({ ok: false, error: "MONGODB_URI is not set" });

  let filter, sort;
  try {
    filter = parse(req.query && req.query.filter, "filter");
    sort = parse(req.query && req.query.sort, "sort");
    if (!safe(filter)) throw new Error("Use simple operators only: $gt $gte $lt $lte $ne $in $nin $exists $regex $and $or $not.");
    if (!Object.entries(sort).every(([k, d]) => !k.startsWith("$") && (d === 1 || d === -1))) throw new Error("Sort looks like { \"likes\": -1 } — use 1 or -1.");
  } catch (e) {
    return res.status(400).json({ ok: false, error: e.message });
  }

  try {
    const videos = (await db$).collection("videos");
    const [count, docs] = await Promise.all([
      videos.countDocuments(filter, { maxTimeMS: 3000 }),
      videos.find(filter).sort(sort).limit(50).maxTimeMS(3000).toArray()
    ]);
    return res.status(200).json({ ok: true, count, docs });
  } catch (e) {
    return res.status(400).json({ ok: false, error: e.message });
  }
};

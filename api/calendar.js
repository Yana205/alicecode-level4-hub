/* AliceCode Level 4 — the class Google Calendar as JSON.
   GET /api/calendar → { ok, events: [{ title, desc, location, allDay, start, end }] }
   (calendar.html gets the same events built into the page by api/calendar-page.js) */

const { loadEvents, fingerprint, CACHE } = require("./_calendar");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", CACHE);
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "GET only" }); }
  try {
    const events = await loadEvents();
    const etag = fingerprint(JSON.stringify(events));
    res.setHeader("ETag", etag);
    if (req.headers && req.headers["if-none-match"] === etag) return res.status(304).end();
    return res.status(200).json({ ok: true, events });
  } catch (e) {
    return res.status(502).json({ ok: false, error: e.message });
  }
};

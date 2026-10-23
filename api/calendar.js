/* AliceCode Level 4 — the class Google Calendar as JSON for calendar.html.
   GET /api/calendar → { ok, events: [{ title, desc, location, allDay, start, end }] }
   Reads the PUBLIC iCal feed (the calendar is public), so no login or secret is needed.
   All-day: start/end are "YYYY-MM-DD" (end inclusive). Timed: Israel local time "YYYY-MM-DDTHH:MM". */

const FEED = "https://calendar.google.com/calendar/ical/" +
  "c_6d22cbd2ae6fd284126cc19bd7c099314c847f952b6941bd46466f3e870a28a6%40group.calendar.google.com/public/basic.ics";
const TZ = "Asia/Jerusalem";
const DAY = 86400000;

/* "20261029T150000Z" | "20261029T170000" + TZID | "20261029" → { allDay, ms (UTC or wall-clock) } */
function when(v, params) {
  const m = v.match(/^(\d{4})(\d\d)(\d\d)(?:T(\d\d)(\d\d)(\d\d)(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s, z] = m;
  if (h === undefined || /VALUE=DATE(?!-)/.test(params)) return { allDay: true, ms: Date.UTC(+y, mo - 1, +d) };
  const ms = Date.UTC(+y, mo - 1, +d, +h, +mi, +s);
  return { allDay: false, ms, utc: !!z };
}

/* UTC instant → Israel wall-clock "YYYY-MM-DDTHH:MM" */
function local(ms) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(new Date(ms)).map(x => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

const unesc = s => s.replace(/\\n/gi, "\n").replace(/\\([,;\\])/g, "$1");

function parse(text) {
  const lines = text.replace(/\r\n[ \t]/g, "").split(/\r?\n/);
  const out = [];
  let ev = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { ev = { exdates: [] }; continue; }
    if (line === "END:VEVENT") { if (ev && ev.start) out.push(ev); ev = null; continue; }
    if (!ev) continue;
    const i = line.indexOf(":");
    if (i < 0) continue;
    const [name, ...rest] = line.slice(0, i).split(";");
    const params = rest.join(";"), val = line.slice(i + 1);
    if (name === "SUMMARY") ev.title = unesc(val);
    else if (name === "DESCRIPTION") ev.desc = unesc(val);
    else if (name === "LOCATION") ev.location = unesc(val);
    else if (name === "DTSTART") ev.start = when(val, params);
    else if (name === "DTEND") ev.end = when(val, params);
    else if (name === "RRULE") ev.rrule = Object.fromEntries(val.split(";").map(kv => kv.split("=")));
    else if (name === "EXDATE") val.split(",").forEach(x => { const w = when(x, params); if (w) ev.exdates.push(w.ms); });
    else if (name === "STATUS") ev.status = val;
  }
  return out.filter(e => e.status !== "CANCELLED");
}

/* weekly / daily repeats (e.g. "Lesson every Thursday"), up to a year ahead */
function expand(ev, until) {
  const len = (ev.end ? ev.end.ms : ev.start.ms + (ev.start.allDay ? DAY : 3600000)) - ev.start.ms;
  const r = ev.rrule;
  if (!r || !/^(DAILY|WEEKLY)$/.test(r.FREQ)) return [{ ms: ev.start.ms, len }];
  const step = (r.FREQ === "DAILY" ? DAY : 7 * DAY) * (+r.INTERVAL || 1);
  const stop = r.UNTIL ? Math.min(when(r.UNTIL, "").ms + DAY, until) : until;
  const max = +r.COUNT || 400;
  const res = [];
  for (let t = ev.start.ms, n = 0; t <= stop && n < max; t += step, n++)
    if (!ev.exdates.includes(t)) res.push({ ms: t, len });
  return res;
}

module.exports = async (req, res) => {
  /* the CDN answers at once from its copy, and refreshes it from Google in the background */
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=604800");
  if (req.method !== "GET") { res.setHeader("Allow", "GET"); return res.status(405).json({ ok: false, error: "GET only" }); }
  try {
    const r = await fetch(FEED);
    if (!r.ok) throw new Error("Google Calendar answered " + r.status);
    const until = Date.now() + 400 * DAY;
    const events = [];
    for (const ev of parse(await r.text())) {
      for (const { ms, len } of expand(ev, until)) {
        const allDay = ev.start.allDay;
        const wall = t => (allDay ? new Date(t).toISOString().slice(0, 10)
          : ev.start.utc ? local(t) : new Date(t).toISOString().slice(0, 16));
        events.push({
          title: ev.title || "(no title)", desc: ev.desc || "", location: ev.location || "", allDay,
          start: wall(ms), end: wall(allDay ? ms + len - DAY : ms + len)
        });
      }
    }
    events.sort((a, b) => a.start.localeCompare(b.start));
    return res.status(200).json({ ok: true, events });
  } catch (e) {
    return res.status(502).json({ ok: false, error: e.message });
  }
};

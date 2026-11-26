// Usage stats for mncardboard.com and the app (README.md). Keeps only what
// mncardboard.com/help/usage-stats/ says: never an IP address, a cookie or
// anything that says who someone is.
//  - POST /hit
//     the site's pages (assets/js/stats.js): a view, leaving it, a download,
//     a link to another site, a script that broke
//  - POST /app
//     an app's usage stats (README.md, "An app's report"), only sent once
//     its user said yes
//  - every day (cron)
//     GitHub's download counts for the releases, and yesterday's salt gone
//
// Settings: ALLOWED_ORIGINS and RELEASES_REPO in wrangler.jsonc, the DB
// binding (D1, schema.sql). GITHUB_TOKEN is an optional secret (more GitHub
// requests an hour).

const HIT_BYTES = 8_000;
const APP_BYTES = 256_000;
const APP_REPORTS_A_DAY = 24; // from one app
const ERRORS_A_VIEW = 5;
const MOST_NAMES = 500;
const MOST_SECONDS = 4 * 60 * 60;

// Not people (bots, crawlers, link previews, scripts)
const NOT_PEOPLE =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|monitor|scan|curl|wget|python|java\/|go-http|node-fetch|axios|okhttp|libwww|facebookexternalhit|embedly|discord|slack|whatsapp|telegram/i;
const TV = /smart-?tv|tizen|web0s|webos|hbbtv|netcast|crkey|\baft[a-z]|bravia|android tv|googletv|roku|playstation|xbox|nintendo/i;

// What mncb's own names look like (usage stats and the about's keys)
const NAME = /^[a-z0-9._:-]{1,64}$/;
const ABOUT_TEXT = /^[A-Za-z0-9 ._:()+-]{0,64}$/;
const ABOUT_KEYS = ["app", "version", "build", "system", "install"];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return answer(request, env, 204);
    if (request.method === "POST" && url.pathname === "/hit") return hit(request, env);
    if (request.method === "POST" && url.pathname === "/app") return appReport(request, env);
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(
        "Usage stats for mncardboard.com and the app. What's kept, and why: " +
          "https://mncardboard.com/help/usage-stats/\n",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      );
    }
    return new Response("Not found", { status: 404 });
  },

  async scheduled(_event, env) {
    await forgetOldSalts(env);
    await countReleaseDownloads(env);
  },
};

// The site ---------------------------------------------------------------------

/** A page's hit. Always 204: a page never waits on (or breaks over) stats. */
async function hit(request, env) {
  const userAgent = request.headers.get("User-Agent") ?? "";
  if (!allowedOrigin(request, env) || askedNotTo(request) || NOT_PEOPLE.test(userAgent)) {
    return answer(request, env, 204);
  }

  const body = await jsonOf(request, HIT_BYTES);
  if (!body || typeof body !== "object") return answer(request, env, 204);

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const id = typeof body.id === "string" && /^[a-z0-9]{16,32}$/.test(body.id) ? body.id : "";
  const path = pathOf(body.path);

  if (body.kind === "leave" && id) {
    await env.DB.prepare(
      `UPDATE views SET seconds = max(seconds, ?), scrolled = max(scrolled, ?),
         load_ms = coalesce(load_ms, ?)
       WHERE id = ?`,
    )
      .bind(whole(body.seconds, MOST_SECONDS), whole(body.scrolled, 100), wholeOrNull(body.load_ms, 600_000), id)
      .run();
    return answer(request, env, 204);
  }

  const event = body.kind === "download" || body.kind === "out" || body.kind === "error";
  const what = event ? whatOf(body.kind, body.what) : "";
  if (!path || !((body.kind === "view" && id) || (event && what))) return answer(request, env, 204);

  const visitor = await visitorOf(request, env, day, userAgent);
  const system = systemOf(userAgent);
  const width = Math.round(whole(body.width, 10_000) / 10) * 10;
  const device = deviceOf(userAgent, width, body.touch === true, system);
  const country = String(request.cf?.country ?? "").slice(0, 2);

  if (body.kind === "view" && id) {
    await env.DB.prepare(
      `INSERT INTO views (id, day, at, visitor, path, came_from, country, region, device,
         width, browser, system, language, look)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO NOTHING`,
    )
      .bind(
        id, day, now.toISOString(), visitor, path, siteOf(body.from, request), country,
        String(request.cf?.region ?? "").slice(0, 64), device, width, browserOf(userAgent), system,
        languageOf(body.language), body.look === "dark" ? "dark" : body.look === "light" ? "light" : "",
      )
      .run();
  } else {
    // A page that breaks over and over says so a few times, not thousands
    if (body.kind === "error" && id) {
      const errors = await env.DB.prepare(
        "SELECT count(*) AS n FROM events WHERE day = ? AND visitor = ? AND kind = 'error' AND path = ?",
      )
        .bind(day, visitor, path)
        .first();
      if ((errors?.n ?? 0) >= ERRORS_A_VIEW) return answer(request, env, 204);
    }

    await env.DB.prepare(
      `INSERT INTO events (day, at, visitor, path, kind, what, country, device, system)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(day, now.toISOString(), visitor, path, body.kind, what, country, device, system)
      .run();
  }

  return answer(request, env, 204);
}

// Today's salt, kept between requests (it's the same all day)
let todays = { day: "", salt: "" };

/** Today's hash of who's visiting: the same all day, different tomorrow, and
never the IP address itself. */
async function visitorOf(request, env, day, userAgent) {
  if (todays.day !== day) {
    await env.DB.prepare("INSERT INTO salts (day, salt) VALUES (?, ?) ON CONFLICT (day) DO NOTHING")
      .bind(day, crypto.randomUUID() + crypto.randomUUID())
      .run();
    const row = await env.DB.prepare("SELECT salt FROM salts WHERE day = ?").bind(day).first();
    todays = { day, salt: String(row?.salt ?? "") };
  }

  const address = request.headers.get("CF-Connecting-IP") ?? "";
  const bytes = new TextEncoder().encode(`${todays.salt}|${address}|${userAgent}`);
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(hash.slice(0, 8), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** "/try/" from a page's path: no ?query, no #part, 200 characters at most */
function pathOf(value) {
  if (typeof value !== "string" || !value.startsWith("/")) return "";
  const path = value.split(/[?#]/)[0] ?? "";
  return path.length <= 200 && /^[\x21-\x7e]+$/.test(path) ? path : "";
}

/** Another site's name ("google.com"), "" for this one or none */
function siteOf(value, request) {
  if (typeof value !== "string") return "";
  const site = value.toLowerCase().replace(/^www\./, "");
  const own = new URL(request.headers.get("Origin") ?? "https://mncardboard.com").hostname;
  if (!/^[a-z0-9.-]{1,100}$/.test(site) || site === own.replace(/^www\./, "")) return "";
  return site === "localhost" || site === "127.0.0.1" ? "" : site;
}

/** download: "working/MinnesotaCardboard-working-windows.zip" (a release's tag
and file); out: another site's name; error: its first line, 160 at most */
function whatOf(kind, value) {
  if (typeof value !== "string") return "";
  if (kind === "download") return /^[A-Za-z0-9._-]{1,40}\/[A-Za-z0-9._-]{1,120}$/.test(value) ? value : "";
  if (kind === "out") return /^[a-z0-9.-]{1,100}$/.test(value) ? value : "";
  return value.split("\n")[0]?.replace(/[^\x20-\x7e]/g, "").slice(0, 160) ?? "";
}

function browserOf(userAgent) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/OPR\/|Opera/.test(userAgent)) return "Opera";
  if (/SamsungBrowser\//.test(userAgent)) return "Samsung Internet";
  if (/Firefox\/|FxiOS\//.test(userAgent)) return "Firefox";
  if (/Chrome\/|CriOS\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function systemOf(userAgent) {
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  if (/CrOS/.test(userAgent)) return "ChromeOS";
  if (/Mac OS X|Macintosh/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  return "Other";
}

/** phone, tablet, computer or tv: from the window's width (an iPad says
it's a Mac, but has a touch screen) */
function deviceOf(userAgent, width, touch, system) {
  if (TV.test(userAgent)) return "tv";
  if (/iPad/.test(userAgent) || (system === "macOS" && touch)) return "tablet";
  if (/Mobi|iPhone|iPod/.test(userAgent) || (width > 0 && width < 600)) return "phone";
  if (system === "Android" || (touch && width > 0 && width < 1024)) return "tablet";
  return "computer";
}

/** "en" from "en-US" */
function languageOf(value) {
  if (typeof value !== "string") return "";
  const language = value.toLowerCase().split("-")[0] ?? "";
  return /^[a-z]{2,3}$/.test(language) ? language : "";
}

// The app ----------------------------------------------------------------------

/** An app's usage stats. 400: it isn't one (the app won't send it again),
429: too many today, 204: kept. */
async function appReport(request, env) {
  const body = await jsonOf(request, APP_BYTES);
  const report = body ? cleanReport(body) : null;
  if (!report) return answer(request, env, 400);

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  if (report.about.install) {
    const sent = await env.DB.prepare("SELECT count(*) AS n FROM app_reports WHERE install = ? AND day = ?")
      .bind(report.about.install, day)
      .first();
    if ((sent?.n ?? 0) >= APP_REPORTS_A_DAY) return answer(request, env, 429);
  }

  await env.DB.prepare(
    `INSERT INTO app_reports (day, at, install, app, version, build, system, country, since, until,
       calls, counts, time_limits_us)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      day, now.toISOString(), report.about.install, report.about.app, report.about.version,
      report.about.build, report.about.system, String(request.cf?.country ?? "").slice(0, 2),
      report.since, report.until, JSON.stringify(report.calls), JSON.stringify(report.counts),
      JSON.stringify(report.time_limits_us),
    )
    .run();
  return answer(request, env, 204);
}

/** Only what a report is supposed to have (README.md), or null if it
isn't one. Anything else in it is left out, never stored. */
function cleanReport(body) {
  if (typeof body !== "object" || body.report !== 1) return null;
  const day = /^\d{4}-\d{2}-\d{2}$/;
  if (!day.test(body.since) || !day.test(body.until)) return null;
  const limits = body.time_limits_us;
  if (!Array.isArray(limits) || limits.length > 40 || !limits.every((n) => Number.isSafeInteger(n) && n > 0)) {
    return null;
  }
  if (!isObject(body.calls) || !isObject(body.counts)) return null;

  const about = {};
  const given = isObject(body.about) ? body.about : {};
  for (const key of ABOUT_KEYS) {
    const value = given[key];
    about[key] = typeof value === "string" && ABOUT_TEXT.test(value) ? value : "";
  }
  if (!/^[0-9a-f]{16}$/.test(about.install)) about.install = "";

  const calls = {};
  for (const [name, call] of Object.entries(body.calls).slice(0, MOST_NAMES)) {
    if (!NAME.test(name) || !isObject(call)) continue;
    const errors = {};
    for (const [kind, n] of Object.entries(isObject(call.errors) ? call.errors : {}).slice(0, 20)) {
      if (NAME.test(kind) && count(n) > 0) errors[kind] = count(n);
    }
    const times = Array.isArray(call.times) && call.times.length === limits.length + 1 ? call.times.map(count) : [];
    calls[name] = {
      calls: count(call.calls),
      failed: count(call.failed),
      stopped: count(call.stopped),
      total_us: count(call.total_us),
      max_us: count(call.max_us),
      times,
      errors,
    };
  }

  const counts = {};
  for (const [name, n] of Object.entries(body.counts).slice(0, MOST_NAMES)) {
    if (NAME.test(name) && count(n) > 0) counts[name] = count(n);
  }

  return { about, since: body.since, until: body.until, time_limits_us: limits, calls, counts };
}

// Every day --------------------------------------------------------------------

async function forgetOldSalts(env) {
  const today = new Date().toISOString().slice(0, 10);
  await env.DB.prepare("DELETE FROM salts WHERE day < ?").bind(today).run();
}

/** GitHub's download count of every file in every release, as of today */
async function countReleaseDownloads(env) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "mncardboard-stats",
  };
  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${env.RELEASES_REPO}/releases?per_page=100`, {
    headers,
  });
  if (!response.ok) {
    console.log(`GitHub said ${response.status} to the release list`);
    return;
  }

  const day = new Date().toISOString().slice(0, 10);
  const statements = [];
  for (const release of await response.json()) {
    for (const asset of release.assets ?? []) {
      statements.push(
        env.DB.prepare(
          `INSERT INTO release_downloads (day, tag, asset, file, count) VALUES (?, ?, ?, ?, ?)
           ON CONFLICT (day, asset) DO UPDATE SET count = excluded.count`,
        ).bind(day, String(release.tag_name), Number(asset.id), String(asset.name), count(asset.download_count)),
      );
    }
  }
  if (statements.length > 0) await env.DB.batch(statements);
}

// Helpers ----------------------------------------------------------------------

/** Global Privacy Control, or Do Not Track: nothing's kept */
function askedNotTo(request) {
  return request.headers.get("Sec-GPC") === "1" || request.headers.get("DNT") === "1";
}

function origins(env) {
  return (env.ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim());
}

function allowedOrigin(request, env) {
  return origins(env).includes(request.headers.get("Origin") ?? "");
}

function answer(request, env, status) {
  const headers = { "Cache-Control": "no-store" };
  if (allowedOrigin(request, env)) {
    headers["Access-Control-Allow-Origin"] = request.headers.get("Origin");
    headers["Access-Control-Allow-Methods"] = "POST";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers.Vary = "Origin";
  }
  return new Response(null, { status, headers });
}

/** The body as JSON, or null when it isn't (or is bigger than most) */
async function jsonOf(request, most) {
  if (Number(request.headers.get("Content-Length") ?? 0) > most) return null;
  const text = await request.text();
  if (text.length > most) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A count: a whole number, 0 or more (anything else is 0) */
function count(value) {
  return Number.isSafeInteger(value) && value > 0 ? value : 0;
}

function whole(value, most) {
  return Math.min(count(typeof value === "number" ? Math.round(value) : 0), most);
}

function wholeOrNull(value, most) {
  return typeof value === "number" && value >= 0 ? whole(value, most) : null;
}

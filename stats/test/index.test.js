// The stats Worker, on a database of its own (Node's built-in SQLite standing
// in for D1). No internet: GitHub's answer is made up. `npm test` here.

import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { beforeEach, test } from "node:test";

import worker from "../src/index.js";

const SCHEMA = readFileSync(new URL("../schema.sql", import.meta.url), "utf8");
const SITE = "https://mncardboard.com";
const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1";
const WINDOWS =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";

// D1's prepare/bind/run/first/all/batch, on node:sqlite
class Statement {
  constructor(db, sql, args = []) {
    this.db = db;
    this.sql = sql;
    this.args = args;
  }
  bind(...args) {
    return new Statement(this.db, this.sql, args);
  }
  async run() {
    this.db.prepare(this.sql).run(...this.args);
    return { success: true };
  }
  async first() {
    return this.db.prepare(this.sql).get(...this.args) ?? null;
  }
  async all() {
    return { results: this.db.prepare(this.sql).all(...this.args) };
  }
}

class FakeD1 {
  constructor() {
    this.db = new DatabaseSync(":memory:");
    this.db.exec(SCHEMA);
  }
  prepare(sql) {
    return new Statement(this.db, sql);
  }
  async batch(statements) {
    return Promise.all(statements.map((statement) => statement.run()));
  }
  rows(sql, ...args) {
    return this.db.prepare(sql).all(...args);
  }
}

let env;
beforeEach(() => {
  env = {
    DB: new FakeD1(),
    ALLOWED_ORIGINS: `${SITE},http://localhost:4000`,
    RELEASES_REPO: "cooldood155/MinnesotaCardboard-Site",
  };
});

// GitHub's answer to the release list, made up
async function withGitHub(answer, work) {
  const realFetch = globalThis.fetch;
  const asked = [];
  globalThis.fetch = async (url) => {
    asked.push(String(url));
    return answer;
  };
  try {
    await work();
  } finally {
    globalThis.fetch = realFetch;
  }
  return asked;
}

// A day that isn't today (the salt is the day's)
function on(day, work) {
  const RealDate = Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length > 0 ? args : [`${day}T12:00:00Z`]));
    }
  };
  return work().finally(() => {
    globalThis.Date = RealDate;
  });
}

function hit(body, { agent = WINDOWS, origin = SITE, address = "203.0.113.9", headers = {} } = {}) {
  const request = new Request("https://stats.example/hit", {
    method: "POST",
    headers: { "Content-Type": "text/plain", "User-Agent": agent, Origin: origin, "CF-Connecting-IP": address, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  Object.defineProperty(request, "cf", { value: { country: "US", region: "Minnesota" } });
  return worker.fetch(request, env);
}

function report(overrides = {}) {
  return {
    report: 1,
    about: { app: "desktop", version: "0.1.2", build: "test", system: "Windows 11", install: "0123456789abcdef" },
    since: "2026-11-24",
    until: "2026-11-25",
    time_limits_us: [10, 20, 50],
    calls: {
      "import.scryfall": { calls: 2, failed: 1, stopped: 0, total_us: 900, max_us: 600, times: [0, 0, 1, 1], errors: { io: 1 } },
    },
    counts: { "page.collection": 4 },
    ...overrides,
  };
}

function send(body) {
  const request = new Request("https://stats.example/app", {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "MinnesotaCardboard (+https://mncardboard.com)" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  Object.defineProperty(request, "cf", { value: { country: "CA" } });
  return worker.fetch(request, env);
}

const ID = "abcdefghij0123456789";

test("a page view is kept, without who it was", async () => {
  const response = await hit(
    { kind: "view", id: ID, path: "/try/?from=email#windows", from: "www.Google.com", width: 393, touch: true, language: "en-US", look: "dark" },
    { agent: IPHONE },
  );
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), SITE);

  const [view] = env.DB.rows("SELECT * FROM views");
  assert.equal(view.path, "/try/");
  assert.equal(view.came_from, "google.com");
  assert.equal(view.device, "phone");
  assert.equal(view.width, 390);
  assert.equal(view.browser, "Safari");
  assert.equal(view.system, "iOS");
  assert.equal(view.language, "en");
  assert.equal(view.look, "dark");
  assert.equal(view.country, "US");
  assert.match(view.visitor, /^[0-9a-f]{16}$/);
  assert.ok(!JSON.stringify(view).includes("203.0.113.9"));
});

test("the same visitor all day, a different one the next", async () => {
  await on("2030-01-01", async () => {
    await hit({ kind: "view", id: "aaaaaaaaaaaaaaaa", path: "/" });
    await hit({ kind: "view", id: "bbbbbbbbbbbbbbbb", path: "/news/" });
    await hit({ kind: "view", id: "cccccccccccccccc", path: "/" }, { address: "198.51.100.4" });
  });
  await on("2030-01-02", async () => {
    await hit({ kind: "view", id: "dddddddddddddddd", path: "/" });
  });

  const visitors = env.DB.rows("SELECT visitor FROM views ORDER BY id").map((row) => row.visitor);
  assert.equal(visitors[0], visitors[1]);
  assert.notEqual(visitors[0], visitors[2]);
  assert.notEqual(visitors[0], visitors[3]);

  // Yesterday's salt goes: nobody can work out yesterday's visitors again
  await withGitHub(new Response("", { status: 503 }), () => on("2030-01-02", () => worker.scheduled({}, env)));
  assert.deepEqual(env.DB.rows("SELECT day FROM salts").map((row) => row.day), ["2030-01-02"]);
});

test("nothing is kept when the browser asks, or it isn't a person, or another site sends it", async () => {
  await hit({ kind: "view", id: ID, path: "/" }, { headers: { "Sec-GPC": "1" } });
  await hit({ kind: "view", id: ID, path: "/" }, { headers: { DNT: "1" } });
  await hit({ kind: "view", id: ID, path: "/" }, { agent: "Mozilla/5.0 (compatible; Googlebot/2.1)" });
  await hit({ kind: "view", id: ID, path: "/" }, { origin: "https://someone-else.example" });
  await hit("not json");
  await hit({ kind: "view", id: "short", path: "/" });
  await hit({ kind: "view", id: ID, path: "no slash" });
  assert.equal(env.DB.rows("SELECT * FROM views").length, 0);
  assert.equal(env.DB.rows("SELECT * FROM salts").length, 0);
});

test("leaving a page says how long, how far down and how fast it was", async () => {
  await hit({ kind: "view", id: ID, path: "/" });
  await hit({ kind: "leave", id: ID, seconds: 42, scrolled: 70, load_ms: 380 });
  await hit({ kind: "leave", id: ID, seconds: 12, scrolled: 30, load_ms: 999 });
  await hit({ kind: "leave", id: ID, seconds: 999_999, scrolled: 500 });

  const [view] = env.DB.rows("SELECT seconds, scrolled, load_ms FROM views");
  assert.deepEqual({ ...view }, { seconds: 4 * 60 * 60, scrolled: 100, load_ms: 380 });
});

test("downloads, links to other sites and broken scripts", async () => {
  await hit({ kind: "download", id: ID, path: "/try/", what: "app/MinnesotaCardboard-0.1.2-test-windows.zip" });
  await hit({ kind: "download", id: ID, path: "/try/", what: "../../etc/passwd" });
  await hit({ kind: "out", id: ID, path: "/", what: "github.com" });
  await hit({ kind: "out", id: ID, path: "/", what: "https://github.com/x?y" });
  for (let i = 0; i < 8; ++i) {
    await hit({ kind: "error", id: ID, path: "/news/", what: "TypeError: x is null (news-tabs.js:12)\nat ..." });
  }

  const events = env.DB.rows("SELECT kind, what FROM events ORDER BY id");
  assert.deepEqual(events.slice(0, 2).map((row) => ({ ...row })), [
    { kind: "download", what: "app/MinnesotaCardboard-0.1.2-test-windows.zip" },
    { kind: "out", what: "github.com" },
  ]);
  assert.equal(events.filter((row) => row.kind === "error").length, 5);
  assert.equal(events[2].what, "TypeError: x is null (news-tabs.js:12)");
});

test("an app's report keeps only what a report has", async () => {
  const response = await send(
    report({
      about: { app: "desktop", version: "0.1.2", build: "test", system: "Windows 11", install: "0123456789abcdef", name: "Evan" },
      calls: {
        "import.scryfall": { calls: 2, failed: 1, total_us: 900, max_us: 600, times: [0, 0, 1, 1], errors: { io: 1, "C:\\x": 2 }, file: "C:\\cards.json" },
        "Charizard (TST 4)": { calls: 1 },
      },
      counts: { "page.collection": 4, "someone's binder": 2, "page.add": -3 },
      cards: ["Charizard"],
    }),
  );
  assert.equal(response.status, 204);

  const [row] = env.DB.rows("SELECT * FROM app_reports");
  assert.equal(row.app, "desktop");
  assert.equal(row.install, "0123456789abcdef");
  assert.equal(row.country, "CA");
  assert.deepEqual(JSON.parse(row.calls), {
    "import.scryfall": { calls: 2, failed: 1, stopped: 0, total_us: 900, max_us: 600, times: [0, 0, 1, 1], errors: { io: 1 } },
  });
  assert.deepEqual(JSON.parse(row.counts), { "page.collection": 4 });
  for (const kept of Object.values(row)) {
    assert.ok(!String(kept).includes("Evan") && !String(kept).includes("Charizard") && !String(kept).includes("C:\\"));
  }
});

test("a report that isn't one is refused, and an app can't send too many", async () => {
  assert.equal((await send("nope")).status, 400);
  assert.equal((await send(report({ report: 2 }))).status, 400);
  assert.equal((await send(report({ since: "yesterday" }))).status, 400);
  assert.equal((await send(report({ calls: [] }))).status, 400);
  assert.equal((await send("x".repeat(300_000))).status, 400);

  for (let i = 0; i < 24; ++i) assert.equal((await send(report())).status, 204);
  assert.equal((await send(report())).status, 429);
  assert.equal(env.DB.rows("SELECT * FROM app_reports").length, 24);
});

test("GitHub's download counts, once a day", async () => {
  const releases = [
    { tag_name: "app", assets: [{ id: 11, name: "MinnesotaCardboard-0.1.2-test-windows.zip", download_count: 40 }] },
    { tag_name: "working", assets: [{ id: 12, name: "MinnesotaCardboard-working-linux.tar.gz", download_count: 3 }] },
  ];
  const asked = await withGitHub(Response.json(releases), () => worker.scheduled({}, env));
  // Again the same day: updated, not doubled
  releases[0].assets[0].download_count = 41;
  await withGitHub(Response.json(releases), () => worker.scheduled({}, env));

  assert.match(asked[0] ?? "", /repos\/cooldood155\/MinnesotaCardboard-Site\/releases/);
  const rows = env.DB.rows("SELECT tag, file, count FROM release_downloads ORDER BY asset");
  assert.deepEqual(rows.map((row) => ({ ...row })), [
    { tag: "app", file: "MinnesotaCardboard-0.1.2-test-windows.zip", count: 41 },
    { tag: "working", file: "MinnesotaCardboard-working-linux.tar.gz", count: 3 },
  ]);
});

test("what it is, and nothing else", async () => {
  const home = await worker.fetch(new Request("https://stats.example/"), env);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /help\/usage-stats/);
  assert.equal((await worker.fetch(new Request("https://stats.example/views"), env)).status, 404);
});

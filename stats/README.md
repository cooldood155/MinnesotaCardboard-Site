# stats/

The usage stats Worker for mncardboard.com and the app: a Cloudflare Worker
with a D1 database. Not part of the site (`_config.yml` excludes it). What
it keeps is exactly what [the usage stats
page](https://mncardboard.com/help/usage-stats/) (`help/usage-stats.md`)
says.

| Path | What it is |
| :-- | :-- |
| `src/index.js` | the Worker |
| `schema.sql` | its tables (every column says what it is) |
| `wrangler.jsonc` | its settings |
| `test/index.test.js` | its tests (Node's own test runner and SQLite, no internet) |

| It gets | From | Keeps |
| :-- | :-- | :-- |
| `POST /hit` | `assets/js/stats.js` on every page | a view (`views`), then how long and how far down; downloads, links to other sites, broken scripts (`events`) |
| `POST /app` | the app, once its user said yes | the report, with anything that isn't supposed to be in one left out (`app_reports`) |
| every day, 06:17 UTC | the cron | GitHub's download counts for every release (`release_downloads`), and yesterday's salt deleted |

Never kept: IP addresses, cookies, anything that says who someone is. A
visitor is a hash of the IP address and browser with the day's salt, and the
salt is deleted the next day.

It's at `https://mncardboard-stats.evanrileyreumann.workers.dev` (`stats_url`
in `_config.yml`). The app sends to the same address.

## An app's report

The app's code isn't public, so this is what it sends (and all `/app`
keeps, `cleanReport()` in `src/index.js` drops everything else):

| Part | Is |
| :-- | :-- |
| `report` | `1` (what a report looks like) |
| `about` | `app` (desktop, android, ios), `version`, `build` (release or test), `system` ("Windows 11"), `install` (16 random hex digits, new every month) |
| `since`, `until` | the first and last day in it (UTC) |
| `time_limits_us` | the time ranges calls are counted in, in µs: `[10, 20, 50, ...]` |
| `calls` | each part of mncb by its own name (`import.scryfall`): `calls`, `failed`, `stopped`, `total_us`, `max_us`, `times` (how many in each range) and `errors` (how many of each kind: `io`, `not_found`) |
| `counts` | things counted by name: `app.sessions`, `app.seconds`, `page.collection`, `page.collection.seconds` |

A name is lowercase letters, numbers and `._:-` only, 64 at most. Never a
card, a file, an error's message or anything typed.

## Looking at it

Until the stats page is made:

```sql
-- Views and visitors a day (a visitor is one person for one day)
SELECT day, count(*) AS views, count(DISTINCT visitor) AS visitors
FROM views GROUP BY day ORDER BY day DESC LIMIT 30;

-- The pages, the last 30 days
SELECT path, count(*) AS views, count(DISTINCT day || visitor) AS visitors,
       round(avg(seconds)) AS seconds, round(avg(scrolled)) AS scrolled
FROM views WHERE day >= date('now', '-30 days')
GROUP BY path ORDER BY views DESC LIMIT 20;

-- What it's looked at on
SELECT device, system, browser, count(*) AS views
FROM views WHERE day >= date('now', '-30 days')
GROUP BY device, system, browser ORDER BY views DESC;

-- Downloads from the site, and GitHub's own counts (everyone's)
SELECT what, count(*) AS clicks, count(DISTINCT day || visitor) AS people
FROM events WHERE kind = 'download' GROUP BY what ORDER BY clicks DESC;
SELECT tag, file, max(count) AS downloads
FROM release_downloads GROUP BY asset ORDER BY tag, downloads DESC;

-- Apps a month (an install is one computer for one month)
SELECT substr(day, 1, 7) AS month, app, count(DISTINCT install) AS installs,
       count(*) AS reports
FROM app_reports GROUP BY month, app ORDER BY month DESC;

-- Every part of the core: how often, how often it failed, how long
SELECT c.key AS name,
       sum(json_extract(c.value, '$.calls')) AS calls,
       sum(json_extract(c.value, '$.failed')) AS failed,
       round(100.0 * sum(json_extract(c.value, '$.failed')) /
             sum(json_extract(c.value, '$.calls')), 1) AS failed_pct,
       round(sum(json_extract(c.value, '$.total_us')) / 1000.0 /
             sum(json_extract(c.value, '$.calls')), 2) AS avg_ms,
       max(json_extract(c.value, '$.max_us')) / 1000.0 AS max_ms
FROM app_reports, json_each(app_reports.calls) AS c
WHERE day >= date('now', '-30 days')
GROUP BY name ORDER BY calls DESC;

-- What went wrong, by kind
SELECT c.key AS name, e.key AS kind, sum(e.value) AS times
FROM app_reports, json_each(app_reports.calls) AS c,
     json_each(c.value, '$.errors') AS e
GROUP BY name, kind ORDER BY times DESC;

-- The app's pages (and how many times it was opened)
SELECT n.key AS name, sum(n.value) AS times
FROM app_reports, json_each(app_reports.counts) AS n
GROUP BY name ORDER BY times DESC;
```

## Limits

D1's free plan: 100,000 rows written and 5 million read a day, 5 GB. A view
is one row written (and again each time it's left), a download or link one
more, an app's report one. Rows are kept until they're deleted by hand (nothing in
them says who anyone is).

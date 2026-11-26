-- Usage stats for mncardboard.com and the app (README.md). What's kept is
-- what mncardboard.com/help/usage-stats/ says: no IP addresses, no cookies,
-- nothing that says who someone is. A visitor is a hash that's different
-- every day, an app is a random number that's different every month.

-- Today's random salt for the visitor hash. Yesterday's is deleted (cron),
-- so nobody can work out a visitor again, not even with the IP address.
CREATE TABLE IF NOT EXISTS salts (
    day  TEXT PRIMARY KEY, -- UTC "2026-11-25"
    salt TEXT NOT NULL
) STRICT;

-- A page looked at
CREATE TABLE IF NOT EXISTS views (
    id        TEXT PRIMARY KEY,           -- made up by the page, for this view only
    day       TEXT NOT NULL,              -- UTC
    at        TEXT NOT NULL,              -- UTC "2026-11-25T18:30:00.000Z"
    visitor   TEXT NOT NULL,              -- today's hash
    path      TEXT NOT NULL,              -- "/try/" (no ?query or #part)
    came_from TEXT NOT NULL DEFAULT '',   -- another site's name, '' for none
    country   TEXT NOT NULL DEFAULT '',   -- "US" (Cloudflare's guess)
    region    TEXT NOT NULL DEFAULT '',   -- "Minnesota"
    device    TEXT NOT NULL DEFAULT '',   -- phone, tablet, computer or tv
    width     INTEGER NOT NULL DEFAULT 0, -- the window's, CSS pixels (to 10)
    browser   TEXT NOT NULL DEFAULT '',   -- Chrome, Safari, Firefox, Edge...
    system    TEXT NOT NULL DEFAULT '',   -- Windows, macOS, iOS, Android...
    language  TEXT NOT NULL DEFAULT '',   -- "en"
    look      TEXT NOT NULL DEFAULT '',   -- light or dark
    seconds   INTEGER NOT NULL DEFAULT 0, -- on the page while it was shown
    scrolled  INTEGER NOT NULL DEFAULT 0, -- % of the page, the most
    load_ms   INTEGER                     -- until the page was ready
) STRICT;
CREATE INDEX IF NOT EXISTS views_day ON views (day);
CREATE INDEX IF NOT EXISTS views_path ON views (path, day);

-- Something done on a page: a download, a link to another site, a script
-- that broke
CREATE TABLE IF NOT EXISTS events (
    id      INTEGER PRIMARY KEY,
    day     TEXT NOT NULL,
    at      TEXT NOT NULL,
    visitor TEXT NOT NULL,
    path    TEXT NOT NULL,
    kind    TEXT NOT NULL, -- download, out or error
    what    TEXT NOT NULL, -- the file ("working/MinnesotaCardboard-working-windows.zip"),
                           -- the site ("tcgplayer.com"), the error's first line
    country TEXT NOT NULL DEFAULT '',
    device  TEXT NOT NULL DEFAULT '',
    system  TEXT NOT NULL DEFAULT ''
) STRICT;
CREATE INDEX IF NOT EXISTS events_day ON events (day, kind);

-- GitHub's own download counts for the releases (every download, from the
-- site or not), once a day
CREATE TABLE IF NOT EXISTS release_downloads (
    day   TEXT NOT NULL,
    tag   TEXT NOT NULL,    -- app, working, catalog
    asset INTEGER NOT NULL, -- GitHub's id (a file uploaded again is a new one)
    file  TEXT NOT NULL,
    count INTEGER NOT NULL, -- downloads so far
    PRIMARY KEY (day, asset)
) STRICT;

-- What an app sent (README.md, "An app's report"): only when its user said
-- yes
CREATE TABLE IF NOT EXISTS app_reports (
    id             INTEGER PRIMARY KEY,
    day            TEXT NOT NULL,
    at             TEXT NOT NULL,
    install        TEXT NOT NULL DEFAULT '', -- random, a new one every month
    app            TEXT NOT NULL DEFAULT '', -- desktop, android or ios
    version        TEXT NOT NULL DEFAULT '', -- "0.1.2"
    build          TEXT NOT NULL DEFAULT '', -- release or test
    system         TEXT NOT NULL DEFAULT '', -- "Windows 11"
    country        TEXT NOT NULL DEFAULT '',
    since          TEXT NOT NULL,            -- the first day in it
    until          TEXT NOT NULL,            -- the last
    calls          TEXT NOT NULL,            -- JSON {"import.scryfall": {"calls": 1, ...}}
    counts         TEXT NOT NULL,            -- JSON {"page.collection": 4}
    time_limits_us TEXT NOT NULL             -- JSON [10, 20, 50, ...]
) STRICT;
CREATE INDEX IF NOT EXISTS app_reports_day ON app_reports (day);
CREATE INDEX IF NOT EXISTS app_reports_install ON app_reports (install, day);

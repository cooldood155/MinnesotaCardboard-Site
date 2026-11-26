# Working on mncardboard.com

Every time an update is pushed upstream to the [GitHub repository's][repo]
`main` branch, `.github/workflows/jekyll-gh-pages.yml` builds and publishes the
site to GitHub Pages.

### Run it locally:

`bundle install` only needs to be run when:

- you haven't run it at least once for the site already
- a Ruby library (a "gem") is added/removed or has its version changed
- the Gemfile.lock needs to be regenerated
- you switch between branches with different gems
- you update your local version of Ruby

`bundle exec jekyll serve` is used to build and serve the site locally on your
system.

`exec` uses the project's current bundle (the project's gems in Gemfile.lock
rather than your system's installed gems). `jekyll serve` builds the site, with
the compiled output being placed into a `_site/` directory, starts a local web
server (usually at http\://localhost:4000), and watches for file changes,
automatically rebuilding the site in the background (requiring you to refresh
the page to see changes).

- `serve` can be shorthanded to `s`
- `--livereload`/`-l`: Injects a small script into the compiled site,
  automatically refreshing the page when the source is recompiled.
- `--open-url`/`-o`: If the site is correctly served, it is automatically
  opened for you (in your system's default web browser).

*Even though the site is automatically rebuilt, certain circumstances require a
server restart:*

- Edited `_config.yml`
- Added/Removed a Gem (`Gemfile`)
- Modified files in `_plugins/`
- Changed Data Files (`_data/`)
- *any settings/Ruby edits*

```sh
bundle install
bundle exec jekyll serve --open-url
```

## Files

| File | What it's for |
| :-- | :-- |
| `_config.yml` | Site settings: title, theme, plugins, header menu, defaults |
| `index.md` | The home page: what mncb is, how it works, who it's for, the card games, where it's at, the latest news |
| `features.md` | `/features/` (*What it does*): setups, selling, and every card and mncb word explained |
| `try.html` | `/try/` (*Try it*): the newest test build, from `_data/test_build.json` (the app's app-updates workflow writes it) |
| `working-build.html` | `/working-build/` (*Working build*): the newest code that builds and passes its tests (not a release), from `_data/working_build.json` (the app's working-build workflow writes it) |
| `news.html` | `/news/`: how to follow the feeds, then every post in full under All, App and Website tabs |
| `authors.html` | `/authors/`: everyone who writes for the site |
| `archive.html` | `/news/archive/`: archived posts |
| `feed.xml`, `feed/` | The feeds for feed readers: `/feed.xml` (everything), `/feed/app.xml` and `/feed/website.xml` |
| `404.md` | The "page not found" page |
| `credits.md` | `/credits/`: everyone whose cards, prices, pictures and code the app and the site use (linked in the footer) |
| `_posts/` | Updates, one file each, named `YYYY-MM-DD-title.md` |
| `_authors/` | One file per author; each gets a page at `/authors/<file name>/` |
| `_layouts/` | `default.html` (every page: head, header, page, footer), `home.html`, `post.html` and `author.html` |
| `_includes/` | Pieces of HTML used by the pages and layouts. Each file says what it's for at the top. `seo.html` is the title and link previews |
| `assets/main.scss` | The site's stylesheet: the files in `_sass/`, `_base.scss` first |
| `_sass/` | One file per part of the site. See `docs/_sass-RULES.md` |
| `assets/js/` | `copy-button.js` (the Copy buttons on the news and working build pages), `news-tabs.js` (the All, App and Website tabs on the news page), `post-nav.js` (switching the Older/Newer links under a post between all posts, its topic and its authors), `local-dates.js` (dates in the reader's time zone), `theme-button.js` (the light/dark button in the header), `stats.js` (the site's usage stats, only on the real site) and `stats-choice.js` (*Don't Count My Visits* in the footer and on `/help/usage-stats/`) |
| `admin/` | The post editor at `/admin/` (Decap CMS); settings in `admin/config.yml` |
| `cms-auth/` | The Cloudflare Worker that handles "Sign in with GitHub" for the editor; not part of the site |
| `stats/` | The Cloudflare Worker (and its D1 database) that keeps the site's and the app's usage stats; not part of the site. See `stats/README.md` |
| `tsconfig.json`, `package.json` | Type-checking, and `npm run editor` for editing locally; not part of the site |

`_includes/atom-feed.xml` started as the jekyll-feed plugin's template
(archived posts left out), it's used by all three feeds.

No theme and no plugins: Jekyll is the only gem the site needs (plus TZInfo
for the time zone). Everything it used minima, jekyll-feed and jekyll-seo-tag
for is the site's own now (`_layouts/default.html`, `_sass/_base.scss`,
`_includes/seo.html`, the feeds).

Files/directories not part of the site, like this markdown document, go under
the `exclude:` section within the `_config.yml` *site settings* file, or they
will be published.

## Posting an Update

Use [the editor](#the-editor-admin) at <https://mncardboard.com/admin/>, or add
a file to `_posts/`, then commit and push it to be built and published by the
`.github/workflows/jekyll-gh-pages.yml` workflow.

Write the time it went out in your time zone (or whatever time zone you want),
ensuring the offset is used and correct (if it's not UTC time directly).
Example for *Minnesota time* (CDT/CST):

```yaml
---
title: The app has a name
date: 2026-11-02 18:30 -0600
topic: app
authors:
  - First Last
  - Another Author
---
```

- **With a time:** pages show the date and time in the reader's own time zone
  (in UTC, labeled "UTC", if they have scripts off).
- **Date only:** add `date_only: true` (the "Show only the date" switch in the
  editor), or write `date:` with no time (`date: 2026-11-02`).
- **Always write the UTC offset** (the `-0600` above). Without it, the time is
  read as UTC.
- **Topic:** `topic: app` or `topic: website` (the "Topic" choice in the
  editor). App and website posts get separate tabs on the news page and
  separate feeds. Without `topic:`, a post is an app post.

Every post links to its `authors` (one or more), and only trusted members are
allowed to be granted this title. To become an author, you must follow these
steps:

- Contact *me* (Evan R.) via email <evanrileyreumann@gmail.com>
- Wait to be added as a collaborator on the GitHub repo
- Add yourself under Authors in the editor, choosing **your** name (and anyone
  who wrote it with you) when making a post

To show an "Updated" date, add `last_modified_at: <current date/time>` (more
than an hour after `date:`).

Don't change a post's file name or `date:` after it has been posted. The feed
uses them to tell posts apart (some readers would see it as a new post).

## Archiving a Post

Turn on "Archived" within the editor, or add `archived: true` to the post file.
The post leaves the news page, the home page and the feed, but keeps its own
page (with a note that it's archived), so old links still work. Archived posts
are listed on `/news/archive/`, and still show on their author's page.

Bringing back an archived post requires you to (within the editor) turn
"Archived" off, or (within the post's file) remove the `archived: true` line.

## Adding an Author

Add an author in the editor under "Authors", or copy
`docs/_templates/author-template.md` into `_authors/`, rename it to
`firstname-lastname.md` and fill it out. The file name becomes the page address
for the author. The author's `name:` must exactly match the name in their
posts' `authors:` lists.

## The Editor (/admin/)

`/admin/` lists the site's posts and authors and allows writing, editing and
deleting them. Saving any changes updates the corresponding files and commits
to `main`, and the site then rebuilds and republishes itself.

Saving within the editor rewrites the file's front matter block, removing any
extra comments/attributes/etc. added outside the editor.

The editor's script comes from unpkg with an `integrity` hash in
`admin/index.html`, so the browser only runs that exact file. A new Decap
version needs its new hash:

```sh
npm pack decap-cms@3.16.3
tar -xzf decap-cms-3.16.3.tgz package/dist/decap-cms.js
echo "sha384-$(openssl dgst -sha384 -binary package/dist/decap-cms.js | openssl base64 -A)"
```

Signing in only gives the editor the site's repo and other public repos
(`public_repo`), never the private ones.

### Local Editing (test editor)

No sign-in required; changes the files in your local copy of the site. Within one
terminal, [serve the site locally](#run-it-locally):

```sh
npm install
bundle exec jekyll s -o
```

In another terminal, run the editor locally:

```sh
npm run editor
```

The editor is now being served locally at <http://localhost:4000/admin/>.

- your device may be serving the site under a different *port* than 4000, which
  should be printed out by Jekyll.

**Note:** The URL must say `localhost` (e.g., <http://localhost:4000/admin/>).
`127.0.0.1` (IPv4) and `::1` (IPv6) will not work.

### Sign-in on the Live Site [one-time setup]

GitHub sign-in uses a small server to swap its sign-in code for a token,
keeping the secret off and away from the site. The worker in `cms-auth/` is
responsible for the swapping.

1. Deploy the worker. In `cms-auth/`, run `npx wrangler login`, then
   `npx wrangler deploy`. Note the **worker address** printed (e.g.,
   `https://mncardboard-cms-auth.<you>.workers.dev`).
2. On GitHub, go to Settings > Developer settings > OAuth Apps > New OAuth App.
   Use `https://mncardboard.com` as the homepage and
   `<worker address>/callback` as the callback URL.
3. Put the app's Client ID in `cms-auth/wrangler.jsonc`. Generate a client
   secret and run `npx wrangler secret put GITHUB_CLIENT_SECRET` (inputting the
   secret when asked). Run `npx wrangler deploy` again.
4. Put the worker's address in `base_url` in `admin/config.yml`, then commit
   and push.

Anyone can sign in via GitHub, but **only** accounts that can push to this repo
can see or change anything. The sign-in lasts until you log out (top right of
the editor). **Log out** on computers you don't own: the token can push to your
repos.

## Usage Stats

Every page on the real site (built with `JEKYLL_ENV=production`, like the
workflow does) loads `assets/js/stats.js`, which sends to the `stats/`
Worker at `stats_url` in `_config.yml`. Running the site locally sends
nothing. The app sends its own, once its user says yes.

What's counted is on `/help/usage-stats/` (`help/usage-stats.md`), and it
has to stay true: counting something new means saying so there first. What
the Worker keeps, and queries for looking at it: `stats/README.md`.

## JavaScript `<script>` tags

JavaScript scripts are loaded with plain `<script>` tags, meaning they share
global variables (two scripts can't both have a top-level `const` with the same
name).

## Type-checking the scripts

The scripts are plain JavaScript with types in JSDoc comments (`@param`,
`@type`). TypeScript checks them; nothing gets compiled, and the site serves
the files as they are.

```sh
npm install # if needed
npm run typecheck
```

The GitHub workflow also runs typecheck before publishing the site, so a
failing check you forgot to run never goes live.

`tsconfig.json` only allows JavaScript up to ES2020; using something newer
results in a type error, preventing scripts/pages that break in older browsers.

[repo]: https://github.com/cooldood155/MinnesotaCardboard-Site

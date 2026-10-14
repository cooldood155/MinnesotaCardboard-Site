# Working on mncardboard.com

GitHub Pages builds the site with Jekyll (version GitHub Pages ships) on every
push to `main`, through `.github/workflows/jekyll-gh-pages.yml` (their default
workflow).

## Files

| File | Its purpose |
| :-- | :-- |
| `_config.yml` | Configuration file (used by Jekyll) to define global site metadata, URL/routing architectures, active plugins/themes, markdown rendering preferences, and file build/exclusion rules. |
| `index.md` | the home page, listing every `_posts/` update below its main content |
| `_posts/` | updates, one file each and named `YYYY-MM-DD-title.md` |
| `404.md` | Custom error page automatically served when a request to a URL that does not exist is made |
| `feed.xml` | *Syndication* feed file (Atom/RSS) to aggregate site updates into a structured format for feed readers |
| `assets/feed.css`, `assets/feed.js` | Add interactivity (and/or browser-side rendering, etc.) and visually format `feed.xml` |
| `tsconfig.json`, `package.json`, `package-lock.json` | Strict type-checking for `assets/*.js` (TypeScript, nothing compiled); not part of the site |

Any file not part of the site, like this one, must be listed under the
`exclude:` *section* within `_config.yml`. Otherwise Jekyll will publish it as
a page.

## Posting an update

Posting a new update is simply creating a new file in `_posts/`. Write, commit,
test and push it to the repository, and the site (along with its feed
`/feed.xml`) automatically rebuild.

Give each update the time it went out, in **Minnesota time**:

```yaml
---
title: The app has a name
date: 2026-11-02 18:30 -0600
---
```

Use `-0500` while daylight saving time is on (March to November) and `-0600`
for the rest of the year.

- **With a time and offset**, the feed page shows the date and time, converted
  to each reader's own time zone (based on their device's time zone setting).
- **With no `date:`, or a date with no time**, the post is *made* at midnight
  Minnesota time. The feed page will only show the calendar date.
- **Always write the offset.** A time with seconds and no offset
  (`2026-11-02 18:30:00`) is stored as UTC, making the post appear as if it
  were posted five or six hours earlier.

## How the feed page works

`feed.xml` is built from my own template; jekyll-feed doesn't build it if the
repo has one. It links two files for browsers to load and is placed next to
the plain Atom feed readers use:

- `assets/feed.js` replaces the feed with a readable page: an explanation of
  feeds with a button that copies the address for feed readers if needed, and
  each post in its entirety. Time is converted based on the browser's time zone
  settings, displaying the time zone used on the bottom of the page.
- `assets/feed.css` styles the feed, giving it a dark mode option, and styles
  the raw feed for browsers with scripts turned off.

The page does not use XSLT (old feed stlying way) because Chrome is going to
stop supporting it on November 17, 2026.

## Type-checking the scripts

`assets/feed.js` is just plain JavaScript with types written in JSDoc comments
(`@param`, `@returns`, `@typedef`). TypeScript checks it in strict mode,
configured up in `tsconfig.json`, and compiles nothing; GitHub Pages serves the
file as written.

```powershell
npm install # installs pinned TypeScript into node_modules/ (needed one time)
npm run typecheck
```

The workflow also runs `npm run typecheck` before building. A type error will
prevent the site from deploying until it is fixed.

`lib` in `tsconfig.json` is ES2020 plus the DOM (current browsers support it).
Using a newer JavaScript API would results in a type error and no a broken
page on an old browser.

Keep entry ids in `feed.xml` as they are (`post.id | absolute_url`), as
changing them makes feed readers show every old post as new again.

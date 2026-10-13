# MinnesotaCardboard-Site

The source of [mncardboard.com](https://mncardboard.com), built by GitHub Pages
with Jekyll on every push to `main`.

| File | What it is |
| :-- | :-- |
| `_config.yml` | site title, description, theme and plugins |
| `index.md` | the home page; it lists every update below its text |
| `_posts/` | updates, one file each, named `YYYY-MM-DD-title.md` |
| `404.md` | the page shown for an address that does not exist |

A new update is a new file in `_posts/`. Push it and the site, and its RSS feed
at `/feed.xml`, rebuild by themselves.

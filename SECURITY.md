# Security

Found a way to hurt someone's collection, their computer or their accounts
through mncb? Tell me **privately** and **as soon as possible**, not in a
public issue.

## Reporting one

Email [evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com) with
**Security** at the start of the subject:

- what it is and what someone could do with it
- how to make it happen (steps, a file, a picture, a link)
- the version (*Help > About*), the system, and test build or not

You'll get an answer within **3 days** saying I read it. I maintain mncb
myself, so a fix can take longer than that, but you'll hear from me how it's
going at least once a week until it's fixed. Please don't tell anyone else
about it until there's a fix out (or 90 days have gone by, whichever comes
first). You'll be named in the fix's changelog line only if you want to be.

## What's covered

| Part | Where |
| :-- | :-- |
| the desktop app | Windows, macOS, Linux: releases, test builds and the working build |
| the phone apps | Android and iPhone/iPad (once they work) |
| the core | `database` and `api`: the collection files, imports, the zip and gzip unpacker, scanning |
| the card catalog | what `catalog.yml` builds and the app downloads |
| mncardboard.com | the site, its editor (`/admin/`) and its sign-in worker (`cms-auth/`) |
| the workflows | anything that could get a secret (`MNCB_SITE_PAT`) out of CI, or change what's published |

Good examples: a CSV, backup or catalog zip that writes outside mncb's
folders, runs code or crashes the app; a collection file that does
something it shouldn't when it's opened; a way to get into the site's editor
without being one of its authors; a test build that touches a real
collection.

## What isn't

These are known:

- A test build's 30 days go by the computer's clock (it's free, keeps its own
  collection, has no account, token or server behind it).
- Builds aren't signed yet: Windows warns, macOS asks for the quarantine flag
  to be taken off.
- Anyone can take the app apart. Nothing in it is secret (no keys, no
  tokens, no server of mine to get into).

Not known: problems on the sites mncb links to or gets cards from (Scryfall,
TCGplayer, TCGCSV, eBay, Cardmarket, PriceCharting). Tell them about it by
following their reporting procedure(s).

## Supported versions

Only the newest. Fixes go in the next version, not old ones.

| Version | Fixed |
| :-- | :-- |
| the newest `0.1.x` | yes |
| the working build | yes (it's the newest code) |
| anything older | no: get the newest from [mncardboard.com](https://mncardboard.com) |

## What mncb does to stay safe

- **Nothing is sent anywhere.** No account, no server, no tracking. The app
  only downloads (HTTPS): the card catalogs and card pictures.
- **Files are checked before they're trusted.** Every collection, extras and
  scan index file has its own `application_id`, a newer one is refused, and
  the zip unpacker skips any name with `..`, a drive or a leading slash and
  checks every file's CRC-32.
- **Test builds can't touch a real collection.** They keep their own in a
  `test-build` folder.
- **Builds come from GitHub, not a laptop.** Release and test builds are
  made by CI, with a SHA-256 for every download.
- **The site's editor can only push to the site.** Signing in asks for
  `public_repo` only, and only people who can push to the site's repo get in.

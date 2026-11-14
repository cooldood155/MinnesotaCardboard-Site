---
title: "Minnesota Cardboard 0.1.1: Look It Up, Real Prices and a Price Sheet"
date: 2026-11-14 04:30 -0600
topic: app
authors:
  - Evan R. Reumann
---

**0.1.1** is up (Windows, macOS and Linux)! Still a **test build**.. this one
fixes the *worst* parts of 0.1.0: **Look It Up**, **prices** and adding cards
that can't exist. It also looks newer: **red** like the site, not the old
gray and blue (more styling soon).

## Look It Up Actually Works Now

Look It Up was wrong *almost every time* in 0.1.0. Now it goes to the copy you
picked, with its finish, condition and language:

- **TCGplayer** opens the card's own page with your printing, condition and
  language already picked.
- **eBay** only shows single cards in that condition, plus a new link for what
  it's **sold** for (what a card is *really* worth).
- **PriceCharting** opens the card itself when it can.
- **Cardmarket** is new: Magic cards open their own page, other games search
  the card's exact name.
- **Scryfall** for Magic cards.

## Prices Go By Your Copy

Prices were always the *Near Mint* price before, even for a beat up card. Now
it's what **your copy** goes for:

| Condition | Worth (of Near Mint) |
| :-- | --: |
| Lightly Played | about 80% |
| Moderately Played | about 65% |
| Heavily Played | about 45% |
| Damaged | about 25% |

- Foils and holos lose a bit more (scratches show on them).
- The card panel says where the price came from, and the card table puts a
  **~** in front of a worked out one (`~$0.26`).
- What your collection is worth uses them too.
- Not English? The price is an *English* copy's for now (Japanese, Korean,
  etc. can sell for more OR less, card by card, so it doesn't guess).

## A Price For Every Card

Before, a card nobody bought lately just had **no price** (like a Beta Black
Lotus). Not selling lately doesn't mean it never sold, so now it goes:

1. What it **sold for lately** (TCGplayer's market price).
2. Nothing lately? The **last price it sold for**, with the day ("last sold
   Mar 14, 2025"). This goes back to February 2024, and fills in over the
   next few days.
3. Never sold? The **middle listing** on TCGplayer (or the lowest, or the
   highest).

The only cards without a price are ones that *never* sold or got listed, and
those say so (Look It Up still has eBay's sold listings).

## The Price Sheet

The right side has every price there is for your card now, like TCGplayer's
seller page:

- Your copy's price, big, and where it came from.
- The **lowest**, **middle** and **highest** listing on TCGplayer right now.
- What each condition goes for. Yours is in **red**.
- How much it moved in the last 3 months, and the day it last sold.
- **Prices from:** TCGplayer (US$) or Cardmarket (€). No price from that one?
  It shows the other one's, and says so.

## Sharper Pictures

Older Pokémon cards only have tiny pictures on TCGplayer (200 pixels wide),
so they were blurry. Most Pokémon cards get a **big** one now (734 x 1024),
from the Pokémon TCG API's data. Magic's were already big (Scryfall).

Magic foils TCGplayer sells on their own (like a **Surge Foil** Sol Ring)
have a price now too.

## No More Impossible Cards

Adding a card (or changing one) only lets you pick what it **actually** comes
in:

- **Finish:** only the ones that card was printed in (no Etched Lightning
  Bolt). Pokémon, One Piece and Yu-Gi-Oh! cards know theirs once their cards
  update (by themselves, once a day).
- **Language:** only the ones its game is printed in, picked from a list
  instead of typed (no Russian Yu-Gi-Oh!).
- A CSV with a card that can't exist skips that line and tells you why.
- A card you already have in a finish it doesn't come in (from before) says
  so and shows what its real finishes go for. Pick the right one under
  **Finish** and it's priced.

## Credits

**Help > Credits** lists everyone whose cards, prices, pictures and code mncb
uses (Scryfall, TCGplayer, the games' makers and artists, and every library
in it, with its license). The same credits are on the site too:
[mncardboard.com/credits](https://mncardboard.com/credits/), linked at the
bottom of every page.

## Also Fixed

- Blurry card pictures (at 150% and 200% screen scaling, after moving the
  window to another screen, and shrunk down in the card panel).
- The card panel cutting off text and big prices, and getting way too wide
  on Windows. It fits whatever width you drag it to now.
- Card names and the status bar getting cut off on a screen with different
  scaling.
- Magic cards downloading again (Scryfall changed its files).
- Foil and holo copies coming in as non-foil from a CSV on macOS.
- Sorting the card table by price crashing.

Found something wrong, or have an idea? Email me at
[evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com)!

## Try it

- **Windows:** [MinnesotaCardboard-0.1.1-test-windows.zip](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.1-test-windows.zip) (6.7 MB). Unzip it, run `bin/mncb.exe`. Windows may say it doesn't know the app (it isn't signed yet): *More info* > *Run anyway*.
  SHA-256: `26bbbbd980d230fa22e79aa5e4f76f28081c3d8edf1b64272feb72616651d8fe`
- **macOS:** [MinnesotaCardboard-0.1.1-test-macos.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.1-test-macos.tar.gz) (3.7 MB). Apple silicon (M1 or newer). Double-click it, then in Terminal (in the folder it made): `xattr -dr com.apple.quarantine . && ./bin/mncb` (macOS blocks apps that aren't notarized yet).
  SHA-256: `e8282d6e2b4dd5eeceeffcaef5b59a253e6521fa48c655a009bcdd3e645fff20`
- **Linux:** [MinnesotaCardboard-0.1.1-test-linux.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.1-test-linux.tar.gz) (16.8 MB). x86_64, GTK 3 (any desktop has it), glibc 2.39 or newer (e.g., Ubuntu 24.04, Fedora 40, Debian 13). `tar xf` it, run `bin/mncb`.
  SHA-256: `13a7db667eafe7fd609ecc4c38af56ec3de7c8d91816ca71d75388f9f29eaeb0`

Nothing gets installed. A test build keeps its own collection and settings
(a real one is never touched), and works for 30 days after it was built
(2026-11-14).

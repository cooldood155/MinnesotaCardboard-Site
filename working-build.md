---
layout: page
title: Current Working Build
permalink: /working-build/
---

> **This is not a release.** It's the newest MinnesotaCardboard code that
> builds and passes its tests, so you can try what's coming before it's
> out. It can have bugs a release wouldn't, and it's replaced every time
> something changes. For the newest release, see [Try it](/try/).

After **0.1.2**, built **2026-11-20** (`6b148ee`). It works until
**2026-12-20** (30 days), then download the newest one here.

Nothing gets installed. It keeps its own collection and settings (a real
one is never touched).

## Download

### Windows

[MinnesotaCardboard-working-windows.zip](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/working/MinnesotaCardboard-working-windows.zip) (7.2 MB). 64-bit Windows.

1. Unzip it.
2. Open the `bin` folder and run `mncb.exe`.
3. Windows might say it doesn't know the app (it isn't signed yet). Click *More info*, then *Run anyway*.

SHA-256: `c1def7edd58cdc0d46f4839e9865ef2b85c9eb707fed6944dcde34c741b8e5d3`

### macOS

[MinnesotaCardboard-working-macos.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/working/MinnesotaCardboard-working-macos.tar.gz) (4.1 MB). A Mac with Apple silicon (M1 or newer).

1. Double-click it to unpack it.
2. Open Terminal in the folder it made and run `xattr -dr com.apple.quarantine . && ./bin/mncb`
3. That command is needed because macOS blocks apps that aren't notarized yet.

SHA-256: `c0f5b280f2e6e5a70413ba1cd140d4efae7faf3871f0822ac3593d18d6d0254e`

### Linux

[MinnesotaCardboard-working-linux.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/working/MinnesotaCardboard-working-linux.tar.gz) (17.3 MB). x86_64 with GTK 3 and glibc 2.39 or newer (Ubuntu 24.04, Fedora 40, Debian 13, etc.).

1. Unpack it with `tar xf`.
2. Run `bin/mncb`.

SHA-256: `2cd8b88a185305635d65c0a1a79645a6543b7040b271d520bfe2d4bd298a0d50`

## What's new since 0.1.2

#### Added

- Setups for where new cards go: Keep it simple, A binder for each set, Good
  ones apart, Playing: 4 of each, Selling and Played ones apart. One click
  makes their places and rules, then change them any way you like.
- Rules can fit a card's language, condition, name and how many of it you
  have already (4 sends what's past a playset somewhere else), and several
  finishes at once.
- A rule can leave a card where it is, and add a note to it ("Trade").
- Sets, rarities, finishes, languages and conditions in a rule are picked
  from the game's real ones (as many as you like), or typed.
- Better pricing: price from the higher or lower of market and the lowest
  listing, or TCGplayer's middle listing; ask under it (-0.05); a most;
  foils and holos at a % of their own; LP, MP, HP and DMG copies at a %; never
  under what you paid.
- Cheap and pricey cards can have rules of their own ("Under $1.00: $0.25
  each", "$20.00 or more: 85%").
- **Price All** and **Reset to Rules** on the Sell page (Undo puts them back).
- A rule for where new cards go can price them too (85%, or 4.99).

#### Added

#### Changed

#### Deprecated

#### Removed

#### Fixed

#### Security -->

Found a bug? [Tell us](https://github.com/cooldood155/MinnesotaCardboard-Site/issues/new/choose)
(say it was the working build, and when you downloaded it).

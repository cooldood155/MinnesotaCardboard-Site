---
title: "Minnesota Cardboard 0.1.0: The First Test Build"
date: 2026-11-07 08:20 -0600
topic: app
authors:
  - Evan R. Reumann
---

The **first version** (*0.1.0*) of Minnesota Cardboard anyone can *actually* try is
now here (Windows, macOS and Linux)! It's a **test build**.. meant for trying
the app out and seeing where it's at, NOT for keeping your real collection in
(yet).

## Wat To Expect

- **Almost everything will change** in the following updates; this is only an
  initial test build and concept of what MNCB could be (and mostly a test to
  see what I can do).. lots more is expected to come don't worry.
- **Nothing is styled** in any way, everything is shown as their default OS or
  `wxWidget` styles (this means light mode only (oh-no)).

## What You Can Do

- Keep your cards in binders, decks and boxes (or leave them in *Unsorted*).
  Pick one on the left to see its cards in the middle, then pick a card to see
  its picture, price and everything about your copy on the right. Every change
  made is saved instantly.
- Add cards with **Add Cards** (Ctrl+N): type part of a name, pick the right
  printing and add it. The window stays open until you close it (a whole stack
  of cards can go in without stopping), and adding the same card again just
  adds to its quantity.
- Keep a want list. Add a card as "I want it" and it goes on your want list
  instead (it **doesn't** count toward what your collection is worth).
- See today's prices for Magic: The Gathering, Pokémon, One Piece and Yu-Gi-Oh!
  cards (currently just using TCGplayer's market price, plus Cardmarket's in
  euros for Magic). Cards and prices download in the background and update
  themselves once a day.
- Look a card up on TCGplayer, eBay or PriceCharting with one click (current
  queries are extremely terrible, not correct 99% of the time and will change).
- Bring your cards in from another app's CSV (e.g., Moxfield, ManaBox, Deckbox,
  TCGplayer, Archidekt, DragonShield, etc.).
- Export your collection to a CSV file (can be opened it in Excel, Google
  Sheets, etc.) or back up the whole thing.

## Where It Stands

Currently, the core of the app *is done* (things always need updates): the
database, the main window, adding cards, prices and imports/exports. Next up is
making the GUI look *nice*, adding cards with a scanner or a photo, selling and
other features.. which is where Minnesota Cardboard really **starts saving
time**!

Found something wrong, or have an idea? Email me at
[evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com)!

## Try it

- **Windows:** [MinnesotaCardboard-0.1.0-test-windows.zip](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.0-test-windows.zip) (6.5 MB). Unzip it, run `bin/mncb.exe`. Windows may say it doesn't know the app (it isn't signed yet): *More info* > *Run anyway*.
  SHA-256: `dcbff4cd37161bec82de6a8a5ff705e7354d8336ec0e8bcf6dde76e44b0cbe1f`
- **macOS:** [MinnesotaCardboard-0.1.0-test-macos.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.0-test-macos.tar.gz) (3.6 MB). Apple silicon (M1 or newer). Double click it, then in Terminal (in the folder it made): `xattr -dr com.apple.quarantine . && ./bin/mncb` (macOS blocks apps that aren't notarized yet).
  SHA-256: `0e5d45a745c061af79292a6d18bf0e697791587c879c641cce43e7dbefcb7c99`
- **Linux:** [MinnesotaCardboard-0.1.0-test-linux.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.0-test-linux.tar.gz) (16.6 MB). x86_64, GTK 3 (any desktop has it), glibc 2.39 or newer (e.g., Ubuntu 24.04, Fedora 40, Debian 13). `tar xf` it, run `bin/mncb`.
  SHA-256: `18aca0fe547a2b880713af5d0ca2a8c21eaf71b04c95ec6c70fefb18812072fe`

Nothing gets installed. A test build keeps its own collection and settings
(a real one is never touched), and works for 30 days after it was built
(2026-11-07).

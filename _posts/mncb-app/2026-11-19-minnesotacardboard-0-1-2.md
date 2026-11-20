---
title: "Minnesota Cardboard 0.1.2: One Window, Scan, Sell and Dark Mode"
date: 2026-11-19 16:50 -0600
topic: app
authors:
  - Evan R. Reumann
---

**0.1.2** is up (Windows, macOS and Linux)! Still a **test build**.. but a
*big* one. mncb is one window now, it can **scan** and **sell**, and it has
**dark mode**.

## One Window

Everything is in one window, and nothing pops up:

- The left side has the pages (**Collection**, **Add cards**, **Scan**,
  **Sell**), your binders, decks and boxes, and under them **Import &
  export**, **Cards & prices**, **Settings** and **About**.
- Messages show across the top of the page (with **Undo** when there's
  something to undo).
- **Add cards** is a page: it stays as it is for the next card, and the
  condition starts on Near Mint.
- Binders, decks and boxes are made, renamed and deleted right where they
  are.
- The card panel has two tabs: **Prices** and **This copy**.
- Drag the left side or the card panel wider or narrower. Drag one small
  enough and it closes (like VS Code): **View > Side Bar** (Ctrl+B) and
  **View > Card Panel** (Ctrl+Alt+B) bring them back.
- Right click any table's column titles to hide a column (or show it again).
- **View > Reset Layout** puts all of it back.

## Scan

**Scan** finds which card is in a picture: from a phone, a camera, a scanner
or a card sorter.

- **Open Pictures...** for pictures you already have, or **Watch a
  Folder...** for a scanner's or a sorter's software (every picture is
  scanned the moment it's saved).
- It learns your sets' pictures once, in the background, a few times faster
  than before, starting by itself the first time you open Scan (it says how
  long it has left, then looks at the ones it didn't know again).
- A sure match is ready to add. One that isn't says **Check it** and shows
  the closest cards to pick from.
- **Add sure ones by themselves**: with a watched folder, cards go in (and
  where your rules say) as your scanner or sorter saves them.

## Sell

- One rule prices everything for sale ("90% of market, + $0.10, ends in .99,
  at least $0.25"), or give a card a price by hand.
- **Export List...** saves a CSV for a store's import, eBay or a spreadsheet,
  **Copy as Text** copies one card per line.
- Every card's for sale, or only the ones you check **For sale** (a card's
  own box, and **Settings**).
- Recording a sale takes the cards out of your collection. **Sales** has
  every sale, this month's total and the total ever (a sale can be taken
  back).

## Where New Cards Go

**Settings > Where new cards go**: rules like "Worth $5.00 or more goes in
Valuable", or a binder for each set. A rule can pick one finish (Etched,
Reverse Holo, ...), make a new binder, deck or box, and put cards up for
sale too. Pick **Where my rules say** when adding, scanning or importing, or
**Sort Unsorted Now**.

## Import and Export

- Imports take **any game** at once, and can go in **Wanted**. A card with
  no price paid in the file gets today's price as what you paid.
- **Export...** for Moxfield, ManaBox, Deckbox, TCGplayer or Dragon Shield,
  and **Keep it up to date** (written again whenever your cards change).

## Dark Mode

**Settings > Look**: like your computer, light or dark. It shows right away
(on Windows mncb saves everything and opens again by itself, right where it
was).

## Pictures

- Click a card's picture to see it **full screen**. Scroll, pinch or press
  **+** to zoom in, drag to move around and **0** to see all of it again.
  **Esc** goes back.
- **Make a New Card** takes a picture of the card too (optional).

## Undo

**Undo** (Ctrl+Z, or the message's button) for removing, moving or adding
cards, deleting a place, recording a sale and sorting. Undo again to go
further back, **Redo** (Ctrl+Y) does it again (moving, removing, adding,
marking and sorting cards). Both are still there after mncb closes and opens
again.

## Also

- **Back Up...** saves your sales, asking prices and rules too.
- Imports run in the background (with a **Stop** button) and say what came
  in right on the page.
- **Help > About and Credits** shows how AI helped make mncb.
  **Help > Report a Problem** and **Help > Roadmap** open GitHub.
- Every table sorts by any column and keeps its widths, order and sort. New
  columns: **Added**, **Rarity**, **Paid**, **Game** and **Notes**.
- The same card in more than one place is one row in **Your collection**.
- **Cards & prices** says how new your cards and prices are and when new ones
  go up, and only downloads when there's something new.
- Deleting a binder, deck or box asks where its cards go.
- A card can be in more than one place (**Also In**: a deck it's played in,
  say) and still count once.
- The side bar and the card panel close when they're dragged small enough
  (like VS Code), and can't be dragged so narrow that they cut things off.
- A binder, deck or box with nothing in it says how to put cards there.

Found something wrong, or have an idea? Email me at
[evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com)!

## Try it

- **Windows:** [MinnesotaCardboard-0.1.2-test-windows.zip](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.2-test-windows.zip) (7.1 MB). Unzip it, run `bin/mncb.exe`. Windows may say it doesn't know the app (it isn't signed yet): *More info* > *Run anyway*.
  SHA-256: `4787e90f5171c610532320b316f9e3fdc9c9779467c603b930ec247c9c75def8`
- **macOS:** [MinnesotaCardboard-0.1.2-test-macos.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.2-test-macos.tar.gz) (4.0 MB). Apple silicon (M1 or newer). Double-click it, then in Terminal (in the folder it made): `xattr -dr com.apple.quarantine . && ./bin/mncb` (macOS blocks apps that aren't notarized yet).
  SHA-256: `2c572b7b7bf78aa8f26b5e45cb583cebcb2e9a1b2e4a508b56f1a5455449a03d`
- **Linux:** [MinnesotaCardboard-0.1.2-test-linux.tar.gz](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/download/app/MinnesotaCardboard-0.1.2-test-linux.tar.gz) (17.2 MB). x86_64, GTK 3 (any desktop has it), glibc 2.39 or newer (e.g., Ubuntu 24.04, Fedora 40, Debian 13). `tar xf` it, run `bin/mncb`.
  SHA-256: `cc8780c9a3ad4c040b1ec983f85943e495947a20e568844330a8c985c1cc46ac`

Nothing gets installed. A test build keeps its own collection and settings
(a real one is never touched), and works for 30 days after it was built
(2026-11-20).

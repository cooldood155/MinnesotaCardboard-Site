---
layout: default
title: "Questions"
description: "Is Minnesota Cardboard free, where your collection is, where prices come from, and test builds."
permalink: /help/faq/
---

# Questions

## The app

**What is it?**
An app for keeping track of trading cards: what you have, where it is
(binders, decks, boxes), what you want, and what it's all worth today. Scan
them, sort them by your own rules, and sell them.

**Which games?**
Magic: The Gathering, Pokémon, One Piece Card Game and Yu-Gi-Oh!. More
later.

**Which computers and phones?**
Windows, macOS and Linux. Android and iPhone/iPad are coming: I'm working
on them, but they don't work yet.

**Is it free?**
Right now, yes: everything. Later, some seller tools might be paid. Adding,
keeping track, prices, backups and exports will always be free, with no
limits.

**Is it finished?**
No. It's a test build: things will change and some things won't work right
yet. What's new is on [the news page](https://mncardboard.com/news/), and
what I'm working on is on [the project board]({{ site.board_url }}).

**Do I have to type my cards in?**
Never. Scan them, pick them from the list of every card, or import them.

## Your cards and your data

**Where's my collection?**
On your computer, in one file (`collection.db`, with `extras.db` next to
it). *Import & export > Show the Folder* opens it. Where it is on each
system: [Using mncb](/help/using/#keeping-your-collection-safe).

**Does it send my collection anywhere?**
No. There's no account and no server for collections. mncb only *downloads*:
the card lists, prices and card pictures. If you turn on usage stats
(*Settings*), it sends how much each part gets used and what goes wrong,
never your cards: [what's sent](/help/usage-stats/).

**Can I take my collection to another app?**
Yes. *Import & export > Export...*, and pick the app (Moxfield, ManaBox,
Deckbox, TCGplayer, Dragon Shield), or a plain CSV for a spreadsheet.

**Can I bring it in from another app?**
Yes. Export a CSV from that app, then *Import & export > Another app's CSV*.

**How do I move it to a new computer?**
*Back Up...* on one, then copy the backup over. (Phones too, once the phone
apps work.)

**I deleted something by mistake.**
*Edit > Undo* (Ctrl+Z), or the **Undo** button on the message. It goes back
50 changes, even after closing the app.

## Prices

**Where do prices come from?**
TCGplayer's market price (what a card has actually been selling for), for
every game, and Cardmarket's (euros) for Magic. New ones once a day.

**Why does a price have a `~`?**
It was worked out from the Near Mint price, for your copy's condition (a
Lightly Played card is about 80% of Near Mint).

**The price looks wrong.**
Check the finish and condition under *This copy*: a foil or a played copy
goes for something else. Still wrong? **Look It Up** shows the card on
TCGplayer and the rest. Tell me if they don't match.

**Is a price what I'll get for it?**
No. It's what it's been selling for. What a buyer pays depends on them, the
store and its fees.

## Test builds

**Why does Windows (or my Mac) warn me?**
The app isn't signed yet (that costs money every year). It's built by
GitHub from the code, and the download page has each file's SHA-256 to
check it.

**It stopped working.**
Test builds stop 30 days after they're built. Get the newest one from
[mncardboard.com/try](https://mncardboard.com/try/).

**Will a test build touch my real collection?**
No. It keeps its own in a `test-build` folder.

**What's the working build?**
The newest code, after every change, that builds and passes its tests on
every system. Newer than the test build, and more likely to have bugs.

## Everything else

**Is it made by Wizards, The Pokémon Company, Bandai, Konami or TCGplayer?**
No. mncb isn't made by, endorsed by or affiliated with any of them
([Credits](/credits/)).

**Found a bug or have an idea?**
*Help > Report a Problem*, or email
[qa@mncardboard.com](mailto:qa@mncardboard.com) ([Getting help](/help/)).

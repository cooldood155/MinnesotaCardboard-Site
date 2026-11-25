---
layout: default
title: "Using mncb"
description: "Every page of the Minnesota Cardboard app: adding, scanning, binders, where cards go, selling, prices and backups."
permalink: /help/using/
---

# Using MinnesotaCardboard

For anyone using the app, not just developers.

## The window

Everything is in one window. The **left side** picks what's shown:

- **Collection**, **Add cards**, **Scan** and **Sell**
- **Places**: *Unsorted*, then every binder, deck and box, with how many
  cards are in it. *Unsorted* is where cards go when you don't pick anything
  else (it can't be deleted). **New binder, deck or box** makes one.
- **More**: *Import & export*, *Cards & prices*, *Settings* and *About*

Ctrl+1 to Ctrl+6 go straight to the first six (*View* menu).

Messages show up across the top of the page, never in a box you have to
close. Most of them have an **Undo** button (or *Edit > Undo*, Ctrl+Z) for
what you just did: removing, moving or adding cards, deleting a place,
recording a sale, sorting. Undo again to go further back (the last 50
changes, even from before mncb was closed). Moving, removing, adding, marking
and sorting cards can be done again with *Edit > Redo* (Ctrl+Y).

Everything saves as soon as you change it. There's no Save button.

## Getting cards to pick from

Before you can add cards, the app needs the game's cards (every card ever
printed, with prices). On **Cards & prices**, click **Get Them** next to the
game (or *Cards > Get Magic Cards*, etc.).

It downloads in the background, so you can keep using the app while it does.
New cards and prices go up once a day (early morning, the page says when).
The app gets them when it starts (*Get new cards and prices when mncb
starts*), only when there are new ones, or click **Update Now** (F5). The
page says when it last got them, and how new each game's are.

Have Scryfall's *Default Cards* file already? It's imported on **Import &
export**.

## Your collection

**Collection** shows your cards: all of them, or what's in the place picked
on the left.

- **Middle:** the cards. Type in the search box to find a card by name or
  set, click a column header to sort by it (*Added* puts the newest first),
  right click the column headers to hide a column or show one (*Rarity*,
  *Paid*, *Game*, *Notes*). Widths, order and sort stay that way. In *Your
  collection*, the same card in more than one place is one row.
- **Right:** the card you picked. Its picture (click it to see it full
  screen, then scroll or pinch to zoom in and drag to move around), then two
  tabs: **Prices**
  (what it's worth today, and every price there is for it) and **This copy**
  (quantity, finish, condition, language, where it is, what you paid, notes).
  Drag the line between the middle and the right to make it wider or
  narrower. Drag it far enough right and the card panel closes (*View > Card
  Panel*, Ctrl+Alt+B, opens it again). The left side closes the same way
  (*View > Side Bar*, Ctrl+B).

Right click cards (Ctrl or Shift + click for more than one) to move, sell,
mark or remove them. Moving a card next to the same one adds to its quantity.

## Adding cards

**Add cards** (Ctrl+N):

1. Type part of the name. The list fills in as you type.
2. Pick the right printing (set and number).
3. Set the quantity, finish, condition, language and where it goes (*Put
   in*). Finish and language only list what that card comes in. Condition
   starts on Near Mint.
4. Click **Add to Collection** (or press Enter).

Keep going: the page stays as it is for the next card. Adding the same card
again just adds to its quantity.

**I want it (I don't have it)** puts the card on your want list instead.

A card that isn't in any catalog (a promo, a misprint, ..) can be typed in by
hand with **Make a New Card** (a picture of it is optional).

## Scanning cards

**Scan** (Ctrl+Shift+N) finds which card is in a picture: from a phone, a
camera, a flatbed scanner or a sorting machine (a sifter). The card can be
anywhere in the picture, a little crooked, sideways or upside down.

**First, it learns your cards' pictures** (once per game):

1. Pick the game.
2. *The sets of cards I have* (quick), or *Every set* (a lot of pictures, for
   cards you don't have yet).
3. **Learn Them**. It downloads each card's picture once, in the background.

**Then, scan:**

- **Open Pictures...** for pictures you already have (pick as many as you
  want), or
- **Watch a Folder...** for a scanner or a sifter: set its software to save
  into a folder and pick that folder. Every picture saved there is scanned
  the moment it's done saving. A CSV list saved there (sorting machines make
  these) gets an **Import** button.

Every picture gets a row, with what it found:

| Match | Means |
| :-- | :-- |
| **Sure** | it's that card, no other one looks like it |
| **Check it** | it's probably that card: click the row and look |
| **Not one it knows** | it hasn't learned that card (learn its set) |
| **Can't read it** | the picture couldn't be opened |

Click a row to see your picture next to the card it found. Not that one? Pick
the right one under *Not that one?*, with how alike each one is.

At the bottom, pick the finish (*Plain* or *Shiny*), condition, language and
where they go, then **Add Checked Cards**. Untick a row to leave it out.

**Add sure ones by themselves** adds a picture it's sure of right away, where
*Put in* says (*Where my rules say* sorts it by your rules). With a watched
folder, cards go in as your scanner or sorter saves them.

Learning says how long it has left (it gets 4 pictures at a time). When it's
done, pictures it didn't know are looked at again. The first time you open
Scan, it starts learning the sets you have by itself (**Stop** stops it).

## Wanted cards

*View > Show Cards I Want* (or *Settings*) shows *Wanted* on the left, and
wanted cards in grey. Wanted cards don't count toward how many cards you have
or what they're worth.

When you get one: right click it > *Mark as Owned* (or tick "I have it" under
*This copy*).

## Binders, decks and boxes

**New binder, deck or box** on the left (or right click there, or the *Places*
menu). It's made right away, named "New binder": type its name and pick what
it is.

**Rename** and **Delete Place** are at the top of a place's page. Deleting a
binder, deck or box with cards in it asks where they go: Unsorted, another
place, or deleted with it. Undo brings the place back with its cards.

A card can be in more than one place: right click it > **Also In** (a deck
it's played in, while it's kept in a binder). It's still one card: your
collection counts it once, and the deck's count has it too. Its *Place* says
"Binder (also Deck)". On the deck's page, right click > **Take Out of Deck**
takes it out again (it stays in the binder).

## Where new cards go

*Settings > Where new cards go*: rules for where cards go when they come in.
Pick *Where my rules say* under *Put in* (adding, scanning or importing) and
each card goes where the first rule it fits says:

- "Worth $5.00 or more" goes in the *Valuable* binder
- "Shiny (foil, holo), Rare" goes in *Trade binder*
- "Pokémon cards" goes in *A binder for its set* (made when it's needed)

**Start from a setup** to have rules ready in one click, then change them
any way you like:

| Setup | What it does |
| :-- | :-- |
| Keep it simple | Every card in one box, *Collection* |
| A binder for each set | Each card in its set's binder (made when it's needed) |
| Good ones apart | $5 or more in *Valuable*, foils and holos in *Shiny*, the rest in *Bulk* |
| Playing: 4 of each | The first 4 of a card in *Playsets*, more than that in *Extras* (for sale) |
| Selling | $20 or more in *High End*, $1 to $20 in *For Sale* (both for sale), the rest in *Bulk* |
| Played ones apart | Heavily Played and Damaged in *Played*, not English in *Other Languages*, the rest by set |

Its places are made when it's used (ones you have already with the same
name are used). Your old rules are replaced, your cards stay where they are.

**Add a Rule** to make one. A card fits it when it fits everything that's
filled in:

- *Game*, *Name* (or part of one: "pika")
- *Sets*, *Rarity*, *Finish*, *Language*, *Condition*: type them (commas
  between) or **Pick...** them from the game's real ones, as many as you like
- *Shiny*: foil and holo ones, or not
- *Worth at least*, *Worth under*
- *You have already*: how many of the card you have besides it (4 sends
  what's past a playset somewhere else)

It goes in any binder, deck or box, *A binder for its set*, *Where it is*
(Unsorted, or where it was put) or *A new binder, deck or box* (named right
there). *Put it up for sale too* checks its For sale box (it's on the Sell
page's list, at your price rule's price). *Note* goes in its notes ("Trade").
*Price it* gives it its own price when it's sorted: 85% (of market) or 4.99.
**Move Up** and **Move Down** change which one is looked at first. *A card no
rule fits goes in* is for the rest.

**Sort Unsorted Now** moves everything in Unsorted where the rules say.

## Selling

**Sell** has what you're selling, what it's asking, and what sold.

**What it asks.** A rule prices everything: a share of the market price, of
TCGplayer's lowest or middle listing, or of the higher or lower of market and
the lowest listing, plus some (or minus some: -0.05 asks 5 cents under),
rounded (to end in .99, to the quarter, to whole dollars, ...), never under a
minimum and never over a most. For example "90% of market, + $0.10, ends in
.99, at least $0.25". Change the rule and every price changes with it.

Under it:

- *Foils and holos at* a % of their own.
- *Played ones, then:* LP, MP, HP and DMG copies at a % of what they'd be
  asked (100%: the same).
- *Never under what I paid* (a copy's purchase price).
- *Under $1.00 ask $0.25 each*: cheap cards at one price.
- *$20.00 or more: 85% instead*: pricey cards at a % of their own.

Type a price in the *Asking* column to set one by hand (it gets a **\***).
Clear it to go back to the rules. **Price All** gives every card following
the rules what they ask now, as its own price (it won't follow the market
after). **Reset to Rules** puts every card with its own price back on the
rules. Undo puts either back.

**What's for sale.** *For sale:* every card you own, or what's in one place
(a "For sale" box, say). A card's own **For sale** box (*This copy*) wins
either way. *Settings > Every card is for sale* off: only the cards checked
are for sale.

**Listing them.** **Export List...** saves a CSV for a store's import, eBay or
a spreadsheet (SKU, name, set, number, condition, quantity, price, ...).
**Copy as Text** copies one card per line ("1x Charizard (OBF 125) Near
Mint - $55.00") to paste in a post or a message.

**It sold.** Pick the card, set how many and for how much (left empty, it's
the asking price), add a note if you want (who bought it), and **Record the
Sale**. The cards come out of your collection. *Sales* has every sale, with
this month's total and the total ever. **Take Back the Sale** puts the cards
back.

## Prices

- *View > Prices in US Dollars / Euros* (or *Settings*): TCGplayer in US
  dollars, Cardmarket in euros
- **Look It Up** (right side) opens your copy of the card on TCGplayer, eBay
  (for sale or sold), PriceCharting, Cardmarket or Scryfall in your browser,
  already filtered to its finish (foil, holo, 1st edition, ...), condition and
  language wherever the site can do that.

Prices are TCGplayer's market price (what the card has actually been selling
for), Near Mint. Magic also has Cardmarket prices in euros. Nothing sold
lately? Then it's the last price it sold for, with the day it sold ("last
sold Mar 14, 2025"). Never sold? The middle listing on TCGplayer (or the
lowest, or the highest). So a card always has a price as long as it ever
sold or somebody's selling one.

The **Prices** tab shows every price there is for your card, like TCGplayer's
seller page: your copy's price, where it came from, its lowest, middle and
highest listing on TCGplayer right now, what each condition goes for, how
much it moved in the last 3 months and when it last sold. Your copy's
condition is in **red**.

A copy from before mncb knew a card's finishes can be in one it doesn't come
in (its Finish says "not one it has"). It has no price, the tab says so and
shows what the finishes it does come in go for. Pick the right one under
**Finish**.

A copy in worse shape is worth less than that:

| Condition | Worth (of Near Mint) | Foils and holos |
| :-- | --: | --: |
| Mint, Near Mint | 100% | 100% |
| Lightly Played | 80% | 75% |
| Moderately Played | 65% | 55% |
| Heavily Played | 45% | 35% |
| Damaged | 25% | 20% |

The right side says where a price came from, the table puts a **~** in front
of one that was worked out like this (`~$0.26`). A copy that isn't English
gets an English copy's price (Japanese, Korean, etc. can sell for more OR
less, card by card).

## Bringing cards in from somewhere else

**Import & export** (Ctrl+I):

- **Another app's CSV**: Moxfield, ManaBox, Deckbox, TCGplayer, Archidekt,
  DragonShield, a sorting machine, etc. *Any game* finds each card in
  whichever game's cards have it (or pick one). *Put in* is where they go,
  *Wanted* for cards you want. A card with no price paid in the file gets
  today's price as what you paid. Get the games' cards first (the import
  matches against them).
- **mncb CSV**: a file exported from this app.
- **Scryfall's Default Cards file** (or a saved search): every Magic card in
  it, no download.

It runs in the background (**Stop** stops it, what's in stays in), then says
what came in and anything it couldn't read.

## Keeping your collection safe

On **Import & export**:

- **Back Up...** saves a copy of the whole collection (`mncb backup.db`), and
  your sales, asking prices and rules next to it (`mncb backup extras.db`).
- **Export...** saves it as a CSV file (open it in Excel, Google Sheets,
  etc.). *For* another app (Moxfield, ManaBox, Deckbox, TCGplayer, Dragon
  Shield) saves the cards it has, the way it reads them. *Keep it up to date*
  writes that file again whenever your cards change.
- **Show the Folder** opens the folder your collection is in.

Your collection is in `collection.db` (and `extras.db` next to it):

- **Windows:** `C:\Users\<you>\AppData\Local\mncb\`
- **Linux:** `~/.local/share/mncb/`
- **macOS:** `~/Library/Application Support/mncb/`

To use a backup, close the app and copy it over `collection.db` (and its
`extras` file over `extras.db`).

## Settings

*Settings* (Ctrl+,): how it looks (like the system, light or dark), which
prices it shows, whether it shows the cards you want, and where new cards go.
A new look shows right away. Windows can't change a window's look once it's
open, so there mncb saves everything, closes and opens again by itself where
it was. In the middle of something (an update, an import, pictures on the
Scan page that aren't added), it says what it's waiting for and starts again
by itself when that's done (*Start Again Now* doesn't wait).

Every table's columns can be hidden: right click the column headers. *View >
Reset Layout* shows them all again and puts the side bar and the card panel
back where they started.

## Phones

mncb for Android and iPhone is coming, with the same collection, adding,
scanning (with the camera) and selling. It doesn't work yet.

## Test builds

Test builds (mncardboard.com, *News > App*) are for trying the app: Windows,
macOS (Apple silicon) and Linux. They keep their own collection in a
`test-build` folder (a real one is never touched) and stop working after 30
days.

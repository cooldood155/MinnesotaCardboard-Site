# MinnesotaCardboard-Site

The source for [mncardboard.com](https://mncardboard.com), the website for
Minnesota Cardboard (**MNCB**): an inventory app for playing card collections
(Magic: The Gathering, Pokémon and more), in development for Windows, macOS and
Linux.

- The site will provide near identical functionality to the app for most casual
  users, while power users *may need* the app to unlock MNCB's full
  potential.

## What the Site Is Currently Capable Of

The site posts updates on the app's development. Follow the updates with any
feed reader at [mncardboard.com/feed.xml](https://mncardboard.com/feed.xml),
or read them at [mncardboard.com/news/](https://mncardboard.com/news/).

- **News:** every post on the news page, with the newest three shown at the
  bottom of the home page. Dates/times are shown in the reader's own time zone
  (or UTC if they have scripts turned off).
- **Authors:** each post links to its authors, and every author has a page listing
  their posts and info about them
  ([mncardboard.com/authors/](https://mncardboard.com/authors/)).
- **Archive:** older posts can be archived. They leave the feed and news pages
  but keep their own pages, listed at
  [mncardboard.com/news/archive/](https://mncardboard.com/news/archive/).
- **Light/Dark mode:** follows the reader's system settings by default, able to
  be manually changed via a button in the title bar.
- **Editor:** developers can write, edit, archive, and delete posts and manage
  authors at `/admin/`, signing in with GitHub.

GitHub Pages will build the site with Jekyll on every push to `main`, including
every save from the editor.

## What the Site Is Planned to Do

**Note:** Your entire inventory (all cards MNCB is aware you personally own) is
also referred to as a **collection**. However, you can still create custom
collections, which may consist of cards within *your collection* (inventory) or
from any of the supported card games' entire card collections.

Most of what the app does, just hosted and running in a browser:

- **Add cards** from a photo or by typing them in.
- **Sort cards** automatically, the way you set it up, with optional SKUs for
  sellers.
- **Track your inventory:** what you have and what has already sold.
- **See prices** from several markets, for cards, decks or whole collections.
- **Search** cards however you need, by almost anything about them (*want to
  find cards with skeletons in the art? Or Magic: The Gathering creatures with
  flying that are black and red, with mana value 2 to 5, costing between $4 and
  $10 on average (*any print*: [Rakdos, Lord of Riots])?*).
- **Build decks** from your collection, or from any card from any of our
  supported card games.
- **Build custom collections:** share them, collect all the cards for the
  collection, compare different collection prices to get the best deal, and
  more.
- **Share** cards, decks, or whole collections with a link.

## Working on the Site

Writing update posts and working on the site: [DEVELOPMENT.md](DEVELOPMENT.md).

[Rakdos, Lord of Riots]: https://scryfall.com/card/cmr/532/rakdos-lord-of-riots

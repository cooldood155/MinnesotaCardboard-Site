---
layout: default
title: Credits
permalink: /credits/
---

# Credits

Minnesota Cardboard (the app, **mncb**, and this site) is made by Evan R.
Reumann. It's free. It isn't made by, endorsed by or affiliated with any
company or game below. The app has all of this too, under **Help > Credits**,
with the full license of every library the specific build of the app used to
view the Credits uses.

## Card Data, Pictures and Prices

- **[Scryfall](https://scryfall.com)**: Magic: The Gathering cards, their
  pictures and their prices (TCGplayer's and Cardmarket's). mncb shows
  Scryfall's pictures whole: never cropped, stretched, recolored or
  watermarked, the artist and copyright line always showing. Minnesota
  Cardboard isn't produced by or endorsed by Scryfall.
- **[TCGplayer](https://www.tcgplayer.com)**, through
  **[TCGCSV](https://tcgcsv.com)** (a free daily copy of TCGplayer's catalog
  and prices): prices for every game, and Pokémon, One Piece Card Game and
  Yu-Gi-Oh! cards and pictures. mncb never downloads TCGplayer's own pages.
- **[Cardmarket](https://www.cardmarket.com)**: euro prices of Magic cards,
  through Scryfall.
- **[Pokémon TCG API](https://pokemontcg.io)**'s data
  ([pokemon-tcg-data](https://github.com/PokemonTCG/pokemon-tcg-data), MIT
  License): the big pictures of Pokémon cards.
- **The card catalogs** mncb downloads (this site's
  [catalog release](https://github.com/cooldood155/MinnesotaCardboard-Site/releases/tag/catalog))
  are made from that data every day. They're free.
- **Look It Up** (in the app) only opens links to TCGplayer, eBay,
  Cardmarket, PriceCharting and Scryfall. Nothing is copied from those sites.

## The Games and Their Artists

Card names, text, symbols and pictures belong to the games' makers, and the
art on each card to its artist (named on the card). The game logos and card
backs on the home page belong to their games' makers.

- **Magic: The Gathering**: Minnesota Cardboard is unofficial Fan Content
  permitted under the Fan Content Policy. Not approved/endorsed by Wizards.
  Portions of the materials used are property of Wizards of the Coast.
  ©Wizards of the Coast LLC.
- **Pokémon**: Pokémon and Pokémon character names are trademarks of
  Nintendo, Creatures Inc. and GAME FREAK inc. © The Pokémon Company. Not
  made by, endorsed by or affiliated with them.
- **One Piece Card Game**: © Eiichiro Oda/Shueisha, Toei Animation. The
  ONE PIECE CARD GAME is made by Bandai. Not made by, endorsed by or
  affiliated with them.
- **Yu-Gi-Oh!**: © Studio Dice/SHUEISHA, TV TOKYO, KONAMI. The Yu-Gi-Oh!
  Trading Card Game is made by Konami Digital Entertainment. Not made by,
  endorsed by or affiliated with them.
- TCGplayer, eBay, Cardmarket, PriceCharting, Scryfall, Pokémon TCG API and
  TCGCSV are trademarks or names of their owners. Using their names and
  links doesn't mean any of them backs Minnesota Cardboard.

## Code in the App

Every library below is built into mncb. The exact license files of the ones
in your build are in **Help > Credits**.

| Library | What mncb uses it for | License |
| :-- | :-- | :-- |
| [wxWidgets](https://www.wxwidgets.org) | the windows | wxWindows Library Licence 3.1 |
| [SQLite](https://sqlite.org) | your collection file | public domain |
| [JSON for Modern C++](https://github.com/nlohmann/json) by Niels Lohmann | reading card data | MIT |
| [GSL](https://github.com/microsoft/GSL) by Microsoft | safer C++ | MIT |
| [libpng](http://www.libpng.org/pub/png/libpng.html) | PNG pictures | PNG Reference Library License v2 |
| [zlib](https://zlib.net) by Jean-loup Gailly and Mark Adler | compression | zlib License |
| [libjpeg](https://ijg.org) | JPEG pictures | IJG License |
| [LibTIFF](https://libtiff.gitlab.io/libtiff/) | TIFF pictures | libtiff License |
| [libwebp](https://chromium.googlesource.com/webm/libwebp) by Google | WebP pictures | BSD-3-Clause |
| [NanoSVG](https://github.com/memononen/nanosvg) by Mikko Mononen | SVG icons | zlib License |
| [Expat](https://libexpat.github.io) | XML (in wxWidgets) | MIT |
| [PCRE2](https://github.com/PCRE2Project/pcre2) by Philip Hazel, University of Cambridge | regular expressions (in wxWidgets) | BSD-3-Clause with PCRE2 exception |
| [bzip2](https://sourceware.org/bzip2/) by Julian Seward | compression | bzip2 License |
| [XZ Utils](https://tukaani.org/xz/) | compression | 0BSD |
| [Zstandard](https://facebook.github.io/zstd/) by Meta | compression | BSD-3-Clause |

- **This software is based in part on the work of the Independent JPEG
  Group.**
- **Windows:** the MinGW-w64 runtime and winpthreads (MIT and others, both
  in Help > Credits), and the GCC runtime (GPL-3.0 with the GCC Runtime
  Library Exception).
- **Linux:** GTK and what it uses (GLib, Pango, Cairo, HarfBuzz, FreeType,
  Fontconfig, FriBidi, gdk-pixbuf and others, mostly LGPL-2.1-or-later and
  MIT), libcurl (curl License) and OpenSSL (Apache-2.0). Portions of this
  software are copyright © 2025 The FreeType Project
  ([www.freetype.org](https://www.freetype.org)). All rights reserved.
- **macOS:** Apple's own frameworks.

## This Site

| What | What the site uses it for | License |
| :-- | :-- | :-- |
| [Jekyll](https://jekyllrb.com), © 2008-present Tom Preston-Werner and Jekyll contributors | building the site | MIT |
| [minima](https://github.com/jekyll/minima), © 2016-present Parker Moore and the minima contributors | the theme (the header, footer and post layouts started as minima's) | MIT |
| [jekyll-feed](https://github.com/jekyll/jekyll-feed), © 2015-present Ben Balter and jekyll-feed contributors | the feeds | MIT |
| [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag), © 2015-present Ben Balter and the jekyll-seo-tag contributors | link previews and search engine tags | MIT |
| [TZInfo](https://tzinfo.github.io), © 2005-2025 Philip Ross | dates and times | MIT |
| [Decap CMS](https://decapcms.org), © 2016 Netlify | the post editor | MIT |
| [GitHub Pages](https://pages.github.com) | hosting | |
| [Cloudflare Workers](https://workers.cloudflare.com) | "Sign in with GitHub" for the post editor | |

The MIT License's notice, for everything above under it:

```text
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

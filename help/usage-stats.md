---
layout: default
title: "Usage stats"
description: "What Minnesota Cardboard's app and site count, what they never do, and how to turn it off."
permalink: /help/usage-stats/
---

# Usage stats

The app and this site count how they're used, so I know what to fix and
speed up first. They never say who you are, and the app never sends your
cards. Everything below is all there is. The code that keeps it is public
([`stats/`](https://github.com/cooldood155/MinnesotaCardboard-Site/tree/main/stats)
in the site's repo). The app's code isn't, but *Show What's Sent* shows
exactly what it sends.

## The app

**It's off until you say yes.** mncb asks once (a message across the top),
and *Settings > Usage stats* changes it any time. Turning it off forgets
everything it counted.

| What's sent | Like |
| :-- | :-- |
| How often each part of mncb runs: opening your collection, an import, a search, scanning, selling, Undo... | `import.scryfall`: 2 times |
| How long each one took, counted in ranges | 1 under 50 ms, 1 under 2 s, 1.9 s at most |
| What went wrong: only the *kind* of problem, never its message | `not_found`: 1, `io`: 1 |
| Which pages you open, and how long you're on each | `page.scan`: 3, 140 seconds |
| How many times mncb was opened, and for how long | 2 times, 51 minutes |
| The app, its version, test build or not, and the system | desktop, 0.1.2, test, Windows 11 |
| A random number that's new every month | `3f9a1c0b7e24d5a8` |

The random number lets two reports from the same computer in the same month
count as one. It's made up by the app, has nothing to do with you or your
computer, and is a new one on the 1st.

**Never sent:** your cards, binders, decks and boxes, prices, notes, sales,
file names or folders, pictures, anything you type, your name or your
account anywhere.

**When:** when mncb starts (what waited from last time), and once a day
while it stays open. Without internet, it waits for the next time.

**See it first:** *Settings > Show What's Sent* opens exactly what goes
next (`usage.json`, next to your collection).

## This site

| What's counted | Why |
| :-- | :-- |
| The page (not what's after `?` or `#` in its address) | which pages help and which don't |
| The site you came from (only its name, like `google.com`) | how people find it |
| Phone, tablet, computer or TV, and how wide the window is | the site has to work on all of them |
| The browser and system (Chrome, Safari, Windows, Android...) and language (`en`) | what to test on |
| Light or dark | if both looks matter |
| How long the page was shown, how far down you scrolled, how long it took to load | what's too long, too slow or skipped |
| Downloads (which file), links to other sites (only the site's name) | what's downloaded |
| A script on the page that broke (its first line) | fixing it |
| The country and state, as Cloudflare guesses them (never a city) | where people are |

To tell two visitors apart for a day, your IP address and browser are mixed
with a random number that changes every day, and the result is kept. The
day's random number is thrown away the next day, so nobody (not even me)
can follow a visit to the next day or work out who it was. Your IP address
itself is never kept.

No cookies, no ads, nothing from anyone else's site, and nothing kept in
your browser (except the choice below). It all goes to the site's own
little server (a Cloudflare Worker).

**Not counted:** when your browser sends *Global Privacy Control* or *Do
Not Track*, or blocks it (ad blockers often do, and that's fine).

<div class="stats-choice">
  <p data-stats-now>Without JavaScript, your visits aren't counted.</p>
  <p data-stats-choice hidden><button class="button" type="button">Don't Count My Visits</button></p>
</div>

## Downloads

How many times each download has been downloaded, from GitHub's own counts
(once a day). That includes downloads that didn't come from this site.

## Who sees it

Only me. It's never sold or shared. Cloudflare runs the little server and
GitHub has the site and the downloads, so they see what any server does
(their own privacy policies are about that).

Questions, or want what's kept from your app deleted? Email
[evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com) with the
random number from *Show What's Sent*.

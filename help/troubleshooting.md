---
layout: default
title: "When something's wrong"
description: "What to do when Minnesota Cardboard won't start, has no cards, scans wrong or shows the wrong price."
permalink: /help/troubleshooting/
---

# When Something's Wrong

Find what you're seeing. Not here? [Report it](#report-a-problem).

## Starting the app

| You see | Do this |
| :-- | :-- |
| Windows: "Windows protected your PC" | *More info > Run anyway*. The app isn't signed yet |
| Mac: it won't open, or "can't be checked for malicious software" | follow the steps on [the Try it page](https://mncardboard.com/try/) for macOS |
| "This test build stopped working on ..." | it's past its 30 days: get the newest from [mncardboard.com/try](https://mncardboard.com/try/) |
| "Can't open your collection" | the message says why. Close every other mncb, then try again. Still no? Put a backup back (below) |
| "Can't set up mncb's folders" | mncb can't write to its folders: check the disk isn't full, and that you can write to your user folder |
| a collection from a newer mncb won't open ("too new") | get that newer mncb |

## Cards and prices

| You see | Do this |
| :-- | :-- |
| no cards to pick from | *Cards & prices > Get Them* for the game, and wait for it to finish |
| "Check the internet connection" | mncb couldn't download. Check you're online, then **Update Now** (F5) |
| prices are days old | *Cards & prices* says how new each game's are. **Update Now** (F5). Still old? The daily catalog had a problem: it's fixed when it runs again |
| a card has no price | nobody has sold or listed it. Or its finish isn't one it comes in: pick the right one under *This copy* |
| the price is wrong | check the finish and condition. Then **Look It Up**, and report it if TCGplayer says something else |

## Scanning

| You see | Do this |
| :-- | :-- |
| **Not one it knows** | learn the card's set: *Scan*, *Every set* (or the sets you have), **Learn Them** |
| **Check it** a lot | brighter, flatter pictures help, with the whole card in the picture. Pick the right one under *Not that one?* |
| **Can't read it** | the file isn't a picture mncb can open (JPEG, PNG, TIFF, WebP work) |
| a watched folder does nothing | the scanner has to save *into* that folder. Save one picture there by hand to check |

## Imports

| You see | Do this |
| :-- | :-- |
| rows "couldn't be read" | the report says which line and why. Most often: the game's cards aren't in yet (*Get Them* first) |
| foils came in as non-foil | report it, with the CSV (it's that app's column names) |
| the wrong condition | report it, with the CSV |

## The window

| You see | Do this |
| :-- | :-- |
| the left side or the card panel is gone | *View > Side Bar* (Ctrl+B), *View > Card Panel* (Ctrl+Alt+B) |
| a column is missing | right click the column headers and turn it on, or *View > Reset Layout* |
| it's blurry, or cut off, on another screen | report it with your screens' scaling (100%, 150%, ...) |
| dark mode didn't change | on Windows, mncb closes and opens again for a new look. If it says it's waiting, it says for what |

## Your collection

**Putting a backup back:** close mncb, then copy the backup over
`collection.db` (and its `extras` file over `extras.db`). *Import & export >
Show the Folder* opens the folder.

**After an upgrade something's missing:** the old file is still there, next
to it: `collection.db.v<old version>.bak`. Report it before doing anything
else.

## The log

`mncb.log` has everything the app did. It starts over every time mncb opens,
so get it **right after** something goes wrong, before opening the app
again.

| System | Where |
| :-- | :-- |
| Windows | `C:\Users\<you>\AppData\Local\mncb\logs\mncb.log` |
| macOS, Linux | `mncb.log` in mncb's `logs` folder |

Test builds write to the same log.

On Windows, paste `%LOCALAPPDATA%\mncb\logs` into File Explorer's address
bar to go straight there.

{% include report-a-problem.md %}

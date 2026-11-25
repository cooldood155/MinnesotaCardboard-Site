---
layout: default
title: "Testing mncb"
description: "Testing Minnesota Cardboard: getting test builds, what to try, and how to report what you find."
permalink: /help/testing/
---

# Testing mncb

Thanks for testing! You're using mncb on your own cards before it's done,
and telling me what's wrong and what's missing. That's what makes it good.

## Getting it

| Build | Is | Where |
| :-- | :-- | :-- |
| **test build** | a version, with what's new written up | [mncardboard.com/try](https://mncardboard.com/try/) |
| **working build** | the newest code (fixes land here first), more bugs | [mncardboard.com/working-build](https://mncardboard.com/working-build/) |

Both keep their own collection (a `test-build` folder) and stop working 30
days after they're built. Neither touches anything else on your computer.

> **Careful:** Back up (*Import & export > Back Up...*) before you get a new build, and
> keep your backups. A test build can have bugs that lose cards.

Follow [the App news](https://mncardboard.com/news/#app) (or its feed,
`/feed/app.xml`) to hear when there's a new one.

## What to try

Use it the way you would for real: your own cards, your own way. Then,
every new version, go through these:

- [ ] **Add:** pick 10 cards by name, from at least two games
- [ ] **Scan:** learn your sets, then scan a stack (a scanner, a camera or
      a folder of pictures). How many were *Sure*? Were any wrong?
- [ ] **Import:** a CSV from the app you use now
- [ ] **Places:** make a binder, a deck and a box, move cards between them,
      put a card in a deck *and* a binder
- [ ] **Sort:** pick a setup, add cards with *Where my rules say*
- [ ] **Prices:** check 5 cards against TCGplayer (**Look It Up**)
- [ ] **Sell:** set a price rule, export the list, record a sale, take it
      back
- [ ] **Undo:** do something, undo it, close the app, open it, undo again
- [ ] **Back up and bring it back:** back up, delete a few cards, put the
      backup back
- [ ] **Your screen:** dark mode, a big window, a small one, another
      monitor
- [ ] **New version:** does the last version's collection still open?

Anything that was slow, confusing or made you go somewhere else is worth
reporting, not only what's broken.

## Reporting

[The forms](https://github.com/cooldood155/MinnesotaCardboard-Site/issues/new/choose)
(*Help > Report a Problem* in the app). No GitHub account? Email
[qa@mncardboard.com](mailto:qa@mncardboard.com) and it'll go in the forms
for you.

**Something's wrong:**

1. What you were doing, step by step.
2. What happened (copy any message word for word).
3. What should have happened.
4. The version (*Help > About*) and your system.
5. **`mncb.log`**, right after it happens: it starts over every time the app
   opens ([where it is](/help/troubleshooting/#the-log)).
6. A screenshot, or the file you imported, if it helps.

**An idea:** what you want it to do, why (what you do now without it), and
how you'd know it's done.

> **Important:** Issues are public. Don't put your email, address, or anything private in
> one. Private things go to
> [evanreumann@mncardboard.com](mailto:evanreumann@mncardboard.com).

## What happens next

1. I look at your issue within a week (every Sunday) and label it. If
   something's missing, I'll ask.
2. When I'm working on it, it says so.
3. When it's fixed, it closes and says so. The fix is in the working build
   that day, and in the next test build.

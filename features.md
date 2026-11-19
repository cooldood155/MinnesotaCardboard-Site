---
layout: default
title: What it does
description: "Everything Minnesota Cardboard does with your cards: how it handles them (setups), selling, and every card and mncb word, explained simply."
permalink: /features/
---
{%- comment -%}
  Everything mncb does, past the home page's short version: setups, selling,
  the words. Styles: _sass/_home.scss (the features part)
{%- endcomment -%}

<div class="features">
<h1 class="page-heading">What it does</h1>

<p class="features-lead">Minnesota Cardboard (<strong>mncb</strong>) figures
out every card, keeps track of it, tells you what it's worth, and can even
sell it for you, the way <em>you</em> want it done.</p>

<nav class="features-jump" aria-label="On this page">
  <a href="#setups">Setups</a>
  <a href="#selling">Selling</a>
  <a href="#words">The words</a>
</nav>

<section class="home-section" id="setups">
<h2>Pick how mncb handles your cards</h2>

<p>A <strong>setup</strong> is what happens to your cards after you add them. Not
sure what you want? Pick one of these built-in setups and you're done.
You can change it anytime.</p>

<ul class="home-setups">
{%- for setup in site.data.setups %}
  <li class="home-setup">
    <span class="home-setup-badge">Built-in</span>
    <strong class="home-setup-name">{{ setup.name }}</strong>
    <span class="home-setup-about">{{ setup.about }}</span>
  </li>
{%- endfor %}
</ul>

<details class="home-more">
  <summary>Want more control? <span>(for sellers and power users)</span></summary>
  <ul>
    <li><strong>Copy any built-in setup and change anything about it:</strong>
    how cards get sorted (set, color, rarity, price, name, etc.), where each
    one goes, the folders and file names for your scans, your SKU format,
    which markets prices come from, price rounding and minimums, and what gets
    listed automatically.</li>
    <li><strong>Simple and Advanced:</strong> Simple hides what you don't need,
    Advanced shows every option. Switching back and forth never loses
    anything.</li>
    <li><strong>Share setups:</strong> export one and give it to a friend (or
    your other computer).</li>
    <li><strong>Your collection is yours:</strong> bring it in from another
    app's CSV, and take it out again anytime.</li>
  </ul>
</details>
</section>

<section class="home-section" id="selling">
<h2>Selling <span class="home-planned">planned</span></h2>

<p>Sell from mncb instead of ten different websites. List a card once, and
when it sells, mncb takes it down everywhere else it's listed. No more selling
the same card twice!</p>

<p>The catch: not every site lets apps like mncb in (yet). Here's what each
one allows right now:</p>

<ul class="home-platforms">
{%- for platform in site.data.selling_platforms %}
  <li class="home-platform">
    <span class="home-platform-name">{{ platform.name }}</span>
    <span class="home-platform-status is-{{ platform.status }}">{% case platform.status %}{% when "auto" %}Automatic{% when "half" %}Partly{% else %}Not yet{% endcase %}</span>
    <span class="home-platform-can">{{ platform.can }}</span>
  </li>
{%- endfor %}
</ul>

<p class="home-note">Checked {{ site.data.selling_checked }}. Sites change
what they allow, and this list will change with them.</p>

<details class="home-more">
  <summary>How selling will work <span>(for sellers)</span></summary>
  <ul>
    <li><strong>Sign in through each site's own sign-in.</strong> mncb never
    sees your passwords.</li>
    <li><strong>List once, across multiple markets</strong> with your
    prices, conditions and pictures (scans, photos or generic card images).</li>
    <li><strong>Sold on one site? It comes off the others.</strong> On the
    sites marked <em>Automatic</em>, mncb does it for you. On the others, mncb
    tells you right away exactly what to take down (and where).</li>
    <li><strong>Every sale in one place:</strong> what sold, where, for how
    much, how fast, and what the fees were.</li>
    <li><strong>SKUs and labels</strong> for your boxes, binders and sleeves (if
    you want them).</li>
    <li><strong>Only the official way in.</strong> mncb never logs in as you
    or copies a site's pages. If a site doesn't allow apps yet, mncb waits
    instead of breaking its rules (and getting your account in trouble).</li>
  </ul>
</details>
</section>

<section class="home-section" id="words">
<h2>What do these words mean?</h2>

<p>Every card and mncb word on this site, explained simply.</p>

<dl class="home-glossary">
  {%- for entry in site.data.glossary %}
    <div>
      <dt>{{ entry.word }}</dt>
      <dd>{{ entry.means }}</dd>
    </div>
  {%- endfor %}
  </dl>
</section>
</div>

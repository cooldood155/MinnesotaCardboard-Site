---
layout: home
---

<section class="home-hero">
  <div class="home-hero-text">
    <p class="home-hero-kicker">For anyone who loves trading cards</p>
    <h1 class="home-hero-title">Scan them, snap them, pick them from the list, or import them. <span>MNCB handles the rest.</span></h1>
    <p class="home-hero-about">Minnesota Cardboard (<strong>mncb</strong>)
    figures out every card, keeps track of it, tells you what it's worth, and
    can even sell it for you, the way <em>you</em> want it done.</p>
    <p class="home-hero-note">Already have pictures of your cards, or your
    collection in another app? Import them!</p>
    <p class="home-hero-buttons">
      <a class="home-button" href="#how-it-works">See how it works</a>
      <a class="home-button home-button-quiet" href="{{ '/try/' | relative_url }}">Try the test build</a>
    </p>
  </div>
  <div class="home-hero-stack" aria-hidden="true">
    {%- for back in site.data.cards.backs %}
    <img src="{{ back.src | relative_url }}" alt="" width="150" height="210">
    {%- endfor %}
  </div>
</section>

<details class="home-more home-words">
  <summary>What do these words mean? <span>(every card and mncb word on this site, explained simply)</span></summary>
  <dl class="home-glossary">
  {%- for entry in site.data.glossary %}
    <div>
      <dt>{{ entry.word }}</dt>
      <dd>{{ entry.means }}</dd>
    </div>
  {%- endfor %}
  </dl>
</details>

<h2 id="how-it-works">How it works</h2>

<ol class="home-steps">
  <li><strong>Add</strong> Put a stack in your scanner, take a picture,
  search the list of every card and click yours, or import the pictures or
  collection you already have. They all work.</li>
  <li><strong>Check</strong> mncb shows you every card it found. If it's not
  sure about one (or something looks off, like it might be fake), it just asks
  you.</li>
  <li><strong>Done!</strong> Your cards are saved, sorted and priced. mncb even
  tells you which binder or box each one goes in.</li>
</ol>

<h2>Who it's for</h2>

<ul class="home-cards">
  <li><strong>Collectors</strong> See every card you own (and what it's all
  worth) without digging through boxes.</li>
  <li><strong>Players</strong> Build decks, test them, and
  see what you're missing.</li>
  <li><strong>Sellers</strong> List a card once. When it sells, mncb takes it
  down everywhere else it's listed (on the sites that allow it).</li>
</ul>

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

<h2>Card games</h2>

{% include images.html images="site.data.supported_games" layout="games" class="home-games" %}

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

<h2>Where it's at</h2>

<p>mncb is still being built. You can try an early test version on Windows,
Mac or Linux on the <a href="{{ '/try/' | relative_url }}">Try it page</a>
(it's not finished, lots will change!). What's new is always on the
<a href="{{ '/news/' | relative_url }}">News page</a>.</p>

<p>Something wrong, or got an idea? <a href="{{ site.report_url }}">Tell me
here</a>, or email <a href="mailto:qa@mncardboard.com">qa@mncardboard.com</a>.</p>

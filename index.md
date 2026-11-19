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
      <a class="button" href="#how-it-works">See how it works</a>
      <a class="button button-quiet" href="{{ '/try/' | relative_url }}">Try the test build</a>
    </p>
  </div>
  <div class="home-hero-stack" aria-hidden="true">
    {%- for back in site.data.cards.backs %}
    <img src="{{ back.src | relative_url }}" alt="" width="150" height="210">
    {%- endfor %}
  </div>
</section>

<section class="home-section" id="how-it-works">
<h2>How it works</h2>

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
</section>

<section class="home-section">
<h2>Who it's for</h2>

<ul class="home-cards">
  <li><strong>Collectors</strong> See every card you own (and what it's all
  worth) without digging through boxes.</li>
  <li><strong>Players</strong> Build decks, test them, and
  see what you're missing.</li>
  <li><strong>Sellers</strong> List a card once. When it sells, mncb takes it
  down everywhere else it's listed (on the sites that allow it).</li>
</ul>

<p class="home-more-link"><a href="{{ '/features/' | relative_url }}">Everything it does</a>
(setups, selling, and every card and mncb word explained)</p>
</section>

<section class="home-section">
<h2>Card games</h2>

{% include images.html images="site.data.supported_games" layout="games" class="home-games" %}
</section>

<section class="home-section home-status">
<h2>Where it's at</h2>


<p>mncb is still being built. You can try an early test version on Windows,
Mac or Linux on the <a href="{{ '/try/' | relative_url }}">Try it page</a>
(it's not finished, lots will change!). What's new is always on the
<a href="{{ '/news/' | relative_url }}">News page</a>.</p>

<p>Something wrong, or got an idea? <a href="{{ site.report_url }}">Tell me
here</a>, or email <a href="mailto:qa@mncardboard.com">qa@mncardboard.com</a>.</p>
</section>

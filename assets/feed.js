// @ts-check
// Turns /feed.xml into a readable page when opened inside a browser.
//
// The feed is plain Atom (feed readers don't run this); feed.xml loads this
// using a <script> element inside the XHTML namespace; browsers can run it
// inside any XML document. This replaces XSLT (Chrome removes coming late
// 2026).
//
// Every date is displayed based on the reader's own time zone. Posts with no
// time of day are published at midnight in the site's time zone; those posts
// will only show the date.
//
// Types are just JSDoc comments that are checked by TypeScript in strict mode
// (tsconfig.json, `npm run typecheck`); browsers run as written.

(function () {
  "use strict";

  const ATOM = "http://www.w3.org/2005/Atom";
  const XHTML = "http://www.w3.org/1999/xhtml";
  const XML_NS = "http://www.w3.org/XML/1998/namespace";
  const ABOUT_FEEDS = "https://aboutfeeds.com/";
  const MIDDLE_DOT = " \u00b7 ";

  /**
   * A parsed Atom date (RFC 3339).
   * @typedef {object} TimeStamp
   * @property {string} raw date as written in the feed
   * @property {Date} instant Unix epoch; exact convertable time
   * @property {boolean} dateOnly written time of day is exactly midnight
   * @property {number} year as written (feeds offset, not readers)
   * @property {number} month 1 to 12, as written
   * @property {number} day 1 to 31, as written
   */

  /** @typedef {Readonly<Record<string, string | null | undefined>> | null} Attrs */
  /** @typedef {Node | string | null | undefined} Kid */

//   Reading Atom Document ----------------------------------------------------

  /**
   * First Atom child of `parent` named `name`.
   * @param {Element} parent
   * @param {string} name
   * @returns {Element | null}
   */
  function getFirstAtomChild(parent, name) {
    for (let n = parent.firstElementChild; n; n = n.nextElementSibling) {
      if (n.namespaceURI === ATOM && n.localName === name) return n;
    }
    return null;
  }

  /**
   * Every Atom child of `parent` named `name`, in document order.
   * @param {Element} parent
   * @param {string} name
   * @returns {Element[]}
   */
  function getAtomChildren(parent, name) {
    /** @type {Element[]} */
    const out = [];
    for (let n = parent.firstElementChild; n; n = n.nextElementSibling) {
      if (n.namespaceURI === ATOM && n.localName === name) out.push(n);
    }
    return out;
  }

  /**
   * @param {string} html
   * @returns {Document}
   */
  function parseHtml(html) {
    return new DOMParser().parseFromString(html, "text/html");
  }

  /**
   * Strip an Atom nodes extracted text of HTML formatting and normalize.
   * @param {Element | null} node
   * @returns {string}
   */
  function htmlToPlainText(node) {
    if (!node) return "";

    let text = node.textContent ?? "";
    if (node.getAttribute("type") === "html")
      text = parseHtml(text).body.textContent ?? "";
    return text.replace(/\s+/g, " ").trim();
  }

  /**
   * href of the first \<link> child from `parent` with `rel` (rel is
   * "alternate" when unset).
   * @param {Element} parent
   * @param {string} rel
   * @returns {string | null}
   */
  function getLinkHref(parent, rel) {
    for (const link of getAtomChildren(parent, "link")) {
      if ((link.getAttribute("rel") ?? "alternate") === rel)
        return link.getAttribute("href");
    }
    return null;
  }

//   Dates --------------------------------------------------------------------

  const TIMESTAMP = new RegExp(
    "^" +
    "(\\d{4})-(\\d{2})-(\\d{2})" + // Year-Month-Day
    "T" +                          // Time separator
    "(\\d{2}):(\\d{2})" +          // Hour:Minute
    "(?::(\\d{2})(?:\\.\\d+)?)?" + // (Optional) :Seconds.milliseconds
    "(Z|[+-]\\d{2}:?\\d{2})" +     // Timezone offset (Z or +/-00:00)
    "$"
  );

  /**
   * Parses an ISO-8601 timestamp string into a structered data object.
   * Returns `null` if the string is empty/invalid.
   * @param {string | null | undefined} raw
   * @returns {TimeStamp | null}
   */
  function parseTimestamp(raw) {
    if (!raw) return null;

    const text = raw.trim();
    const m = TIMESTAMP.exec(text);
    const instant = new Date(text);
    if (!m || Number.isNaN(instant.getTime())) return null;

    const [,
      year = "", month = "", day = "", hour = "", minute = "", second = "00"
    ] = m;
    return {
      raw: text,
      instant: instant,
      dateOnly: hour === "00" && minute === "00" && second === "00",
      year: Number(year),
      month: Number(month),
      day: Number(day)
    };
  }

  /** @type {Readonly<Intl.DateTimeFormatOptions>} */
  const DATE_PARTS = {
    weekday: "long", year: "numeric", month: "long", day: "numeric" };

  /** @type {Readonly<Intl.DateTimeFormatOptions>} */
  const TIME_PARTS = {
    ...DATE_PARTS,
    hour: "numeric", minute: "2-digit", timeZoneName: "short"
  };

  /** Readers own "version" of English (`en-US` is default). */
  const LOCALE = (function () {
    for (const lang of navigator.languages) {
      if (/^en(-|$)/i.test(lang)) return lang;
    }
    return "en-US";
  })();

  const dateOnlyFormat = new Intl.DateTimeFormat(
    LOCALE, { ...DATE_PARTS, timeZone: "UTC" });
  const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, TIME_PARTS);
  const relativeFormat = new Intl.RelativeTimeFormat(
    LOCALE, { numeric: "auto" });

  /**
   * The calendar date as written, formatted in UTC (at midnight time).
   * @param {TimeStamp} timeStamp
   * @returns {Date}
   */
  function getWrittenDate(timeStamp) {
    return new Date(
      Date.UTC(timeStamp.year, timeStamp.month - 1, timeStamp.day));
  }

  /**
   * Full date for displaying. Date-only posts show the written date while the
   * rest show the date and time in the readers time zone.
   * @param {TimeStamp} timeStamp
   * @returns {string}
   */
  function getFormattedDate(timeStamp) {
    return timeStamp.dateOnly
      ? dateOnlyFormat.format(getWrittenDate(timeStamp))
      : dateTimeFormat.format(timeStamp.instant);
  }

  /** @type {ReadonlyArray<readonly [Intl.RelativeTimeFormatUnit, number]>} */
  const TIME_UNIT_SECONDS = [
    ["year", 31536000], ["month", 2592000], ["week", 604800],
    ["day", 86400], ["hour", 3600], ["minute", 60]
  ];

  /**
   * "2 hours ago", "yesterday", etc.; calculated from now.
   * @param {TimeStamp} timeStamp
   * @returns {string}
   */
  function getRelativeDate(timeStamp) {
    /** @type {number} */
    let seconds;
    /** @type {Intl.RelativeTimeFormatUnit} */
    let smallest;

    if (timeStamp.dateOnly) {
      const now = new Date();
      const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
      seconds = (getWrittenDate(timeStamp).getTime() - today) / 1000;  // days apart
      smallest = "day";
    } else {
      seconds = (timeStamp.instant.getTime() - Date.now()) / 1000;
      smallest = "minute";
      if (Math.abs(seconds) < 60) return "just now";
    }

    for (const [unit, secs] of TIME_UNIT_SECONDS) {
      if (Math.abs(seconds) >= secs || unit === smallest) {
        return relativeFormat.format(Math.round(seconds / secs), unit);
      }
    }
    return "";
  }

  /**
   * Reader's time zone (like "America/Chicago") or "" if unknown.
   * @returns {string}
   */
  function getUserTimezone() {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return zone ? zone.replace(/_/g, " ") : "";
    } catch {
      return "";
    }
  }

//   Page Building ------------------------------------------------------------

  /**
   * Create an XHTML element with the specified attributes and children.
   * Attributes that are null/undefined are skipped. Children that are
   * null/undefined or empty strings are skipped.
   *
   * Short name due to its constant use.
   * @template {keyof HTMLElementTagNameMap} K
   * @param {K} tag element tag name
   * @param {Attrs} attrs element attributes
   * @param {...Kid} kids element children
   * @returns {HTMLElementTagNameMap[K]} constructed element
   */
  function el(tag, attrs, ...kids) {
    const node = /** @type {HTMLElementTagNameMap[K]} */ (document.createElementNS(XHTML, tag));
    for (const [name, value] of Object.entries(attrs ?? {})) {
      if (value != null) node.setAttribute(name, value);
    }
    for (const kid of kids) {
      if (kid != null && kid !== "") node.append(kid);
    }
    return node;
  }

  /** refreshed every minute
   * @type {{ node: HTMLElement, timeStamp: TimeStamp }[]} */
  const liveTimeElements = [];

  /**
   * @param {TimeStamp} timeStamp parsed Atom timestamp object
   * @returns {HTMLTimeElement} constructed time element
   */
  function timeElement(timeStamp) {
    return el("time",
      { datetime: timeStamp.raw, title: timeStamp.raw },
      getFormattedDate(timeStamp));
  }

  /**
   * Create a tracking span element to display a live relative time string
   * (e.g., "3 minutes ago") and registers it for automatic minute-by-mite
   * updates.
   * @param {TimeStamp} timeStamp Parsed Atom timestamp object to evaluate
   *                              relatively
   * @returns {HTMLSpanElement} Constructed "relative time" span element
   */
  function relativeDateElement(timeStamp) {
    const node = el("span", { "class": "relative" }, getRelativeDate(timeStamp));
    liveTimeElements.push({ node: node, timeStamp: timeStamp });
    return node;
  }

  /**
   * Post HTML from the feed (safe to show) with links pointing to the posts
   * own address instead of feed.xml.
   * @param {string} html raw HTML or XHTML string from feed content
   * @param {string | null} base fallback base URL to resolve relative URLs
   * @returns {HTMLDivElement} container div element safely storing imported,
   *                           processed content nodes
   */
  function postBody(html, base) {
    const doc = parseHtml(html);
    for (const dead of doc.querySelectorAll("script, style, link, meta, base"))
      dead.remove();

    for (const node of doc.body.querySelectorAll("*")) {
      for (const attr of Array.from(node.attributes)) {
        if (/^on/i.test(attr.name)) {
          node.removeAttribute(attr.name);
        } else if ((attr.name === "href" || attr.name === "src") && base) {
          try {
            node.setAttribute(attr.name, new URL(attr.value, base).href);
          } catch { /* leave malformed URLs as they are */ }
        }
      }
    }

    const container = el("div", { "class": "post-body" });
    for (const kid of Array.from(doc.body.childNodes))
      container.append(document.importNode(kid, true));
    return container;
  }

  /**
   * Compiles an Atom `<entry>` XML element into an XHTML `<article>`.
   * @param {Element} entry XML Element object representing an Atom feed entry
   * @returns {HTMLElement} fully constructed `<article>` element
   */
  function postArticle(entry) {
    const title = htmlToPlainText(
      getFirstAtomChild(entry, "title")) || "Untitled post";
    const url = getLinkHref(entry, "alternate");
    const updated = parseTimestamp(
      getFirstAtomChild(entry, "updated")?.textContent);
    const published = parseTimestamp(
      getFirstAtomChild(entry, "published")?.textContent) ?? updated;

    const meta = el("p", { "class": "meta" });
    if (published) {
      meta.append("Posted ", timeElement(published));
      const rel = relativeDateElement(published);
      if (rel.textContent) meta.append(MIDDLE_DOT, rel);
    }
    if (published && updated &&
        updated.instant.getTime() - published.instant.getTime() > 3600 * 1000) {
      meta.append(MIDDLE_DOT + "Updated ", timeElement(updated));
    }

    const content = getFirstAtomChild(entry, "content");
    const summary = getFirstAtomChild(entry, "summary");
    /** @type {HTMLDivElement | null} */
    let body = null;
    if (content) {
      const type = content.getAttribute("type");
      const base = content.getAttributeNS(XML_NS, "base") || url;
      if (type === "html") {
        body = postBody(content.textContent ?? "", base);
      } else if (type === "xhtml") {
        body = postBody(content.innerHTML, base);
      } else {
        body = el("div", { "class": "post-body" }, el("p", null, (content.textContent ?? "").trim()));
      }
    } else if (summary) {
      body = el("div", { "class": "post-body" }, el("p", null, htmlToPlainText(summary)));
    }

    return el("article", { "class": "post" },
      el("h2", null, url ? el("a", { href: url }, title) : title),
      meta,
      body,
      url ? el("p", { "class": "read-more" }, el("a", { href: url }, "Open this post on the site")) : null
    );
  }

  /**
   * Generate the introductory informational section explaining web feeds.
   * Includes a fallback *copy* mechanism that lets readers duplicate the
   * current feed URL straight to their systems clipboard.
   * @param {string} feedUrl source URL address of the active web feed
   * @returns {HTMLElement} fully featured `<section>` onboarding element
   *                        containing instructions and action tools
   */
  function aboutPanel(feedUrl) {
    const code = el("code", { id: "feed-address" }, feedUrl);
    const status = el("span", { "class": "visually-hidden", role: "status" });
    const button = el("button", { type: "button" }, "Copy address");

    /**
     * Update interactive labels and ARIA live zones with execution success
     * states.
     * @param {string} label */
    function done(label) {
      button.textContent = label;
      status.textContent = label;
      setTimeout(function () { button.textContent = "Copy address"; }, 2500);
    }

    /**
     * Fallback text selector routine if there is no async clipboard access.
     */
    function selectAddress() {
      const range = document.createRange();
      range.selectNodeContents(code);

      const sel = window.getSelection();
      if (!sel) return;

      sel.removeAllRanges();
      sel.addRange(range);
      done("Selected: press Ctrl+C");
    }

    button.addEventListener("click", function () {
      // Older browsers or non-https pages don't have navigator.clipboard.
      if (typeof navigator.clipboard?.writeText === "function") {
        navigator.clipboard.writeText(feedUrl).then(function () { done("Copied"); }, selectAddress);
      } else {
        selectAddress();
      }
    });

    return el("section", { "class": "about", "aria-labelledby": "about-title" },
      el("h2", { id: "about-title" }, "This is a news feed"),
      el("p", null,
        "Follow Minnesota Cardboard in a feed reader app and new posts show up there " +
        "instantly! Copy this address into your reader to follow:"),
      el("div", { "class": "subscribe" }, code, button, status),
      el("p", { "class": "help" },
        "New to feeds? ",
        el("a", { href: ABOUT_FEEDS }, "About Feeds"),
        " explains how they work and lists free readers available.")
    );
  }

  /**
   * Orchestrates the transformation workflow of the script. Parses the root
   * XML Atom document metadata and entries, dynamically constructs a stylized
   * XHTML interface layout, replaces the original document tree, and
   * initializes active intervals to maintain live timeline components.
   */
  function build() {
    const feed = document.documentElement;
    if (feed.namespaceURI !== ATOM || feed.localName !== "feed") return;

    const siteTitle = htmlToPlainText(getFirstAtomChild(feed, "title")) || "News feed";
    const subtitle = htmlToPlainText(getFirstAtomChild(feed, "subtitle"));
    const home = getLinkHref(feed, "alternate") ?? "/";
    const feedUrl = getLinkHref(feed, "self") ?? location.href;
    const lang = feed.getAttributeNS(XML_NS, "lang") || "en";
    const entries = getAtomChildren(feed, "entry");

    const main = el("div", { "class": "wrap" },
      aboutPanel(feedUrl),
      el("div", { "class": "feed-head" },
        el("h1", null, siteTitle),
        subtitle ? el("p", { "class": "subtitle" }, subtitle) : null)
    );
    if (entries.length > 0) {
      for (const entry of entries) main.append(postArticle(entry));
    } else {
      main.append(el("p", { "class": "empty" }, "No posts yet.."));
    }

    const zone = getUserTimezone();
    const page = el("html", { lang: lang, "class": "feed-page" },
      el("head", null,
        el("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        el("meta", { name: "color-scheme", content: "light dark" }),
        el("title", null, "News feed | " + siteTitle)),
      el("body", null,
        el("header", { "class": "site-header" },
          el("div", { "class": "wrap" },
            el("a", { "class": "site-title", href: home }, siteTitle),
            el("nav", { "aria-label": "Site" }, el("a", { href: home }, "Home")))),
        el("main", null, main),
        el("footer", { "class": "site-footer" },
          el("div", { "class": "wrap" },
            el("p", null, zone
              ? "Dates and times shown in your time zone, " + zone + "."
              : "Dates and times are shown in your time zone."),
            el("p", null, el("a", { href: home }, "Back to " + siteTitle)))))
    );

    document.replaceChild(page, feed);

    /**
     * Active background tick to evaluate and increment all monitored relative
     * elements on a 60-second loop.
     */
    setInterval(function () {
      for (const live of liveTimeElements) live.node.textContent = getRelativeDate(live.timeStamp);
    }, 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();

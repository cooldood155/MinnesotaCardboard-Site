// @ts-check
// The site's own usage stats (mncardboard.com/help/usage-stats/): which pages
// are looked at and for how long, what's downloaded, which links to other
// sites get used and what breaks. No cookies, nothing kept in the browser,
// nothing that says who you are, and it all goes to the site's own Worker
// (stats/ in the repo), nobody else.
//
// Sends nothing when the browser asks sites not to track (Global Privacy
// Control or Do Not Track), or after "Don't count my visits" on that page
// (assets/js/stats-choice.js).
//
// _includes/head.html adds it (only on the real site), with the Worker's
// address in data-stats.

(() => {
  const script = document.currentScript;
  const statsUrl = script instanceof HTMLScriptElement ? (script.dataset["stats"] ?? "") : "";

  /** @returns {boolean} */
  function notCounted() {
    const asks = /** @type {Navigator & { globalPrivacyControl?: boolean }} */ (navigator);
    if (asks.globalPrivacyControl === true || navigator.doNotTrack === "1" || navigator.webdriver) return true;
    try {
      return localStorage.getItem("stats") === "off";
    } catch {
      return false;
    }
  }

  /** @param {string} host */
  const onThisComputer = (host) => host === "localhost" || host === "127.0.0.1";

  if (!statsUrl || notCounted()) return;
  // A copy of the site running here only counts into a Worker running here
  if (onThisComputer(location.hostname) && !onThisComputer(new URL(statsUrl).hostname)) return;

  /** @param {Record<string, unknown>} data */
  function send(data) {
    const body = JSON.stringify(data);
    const to = `${statsUrl}/hit`;
    try {
      if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon(to, new Blob([body], { type: "text/plain" }))) {
        return;
      }
    } catch { /* Blocked: the plain way below */ }
    fetch(to, { method: "POST", body, keepalive: true, mode: "no-cors", headers: { "Content-Type": "text/plain" } }).catch(() => {});
  }

  // This view's own number: never kept, never the same twice
  /** @returns {string} */
  function newId() {
    return Array.from(crypto.getRandomValues(new Uint8Array(10)), (b) => b.toString(16).padStart(2, "0")).join("");
  }

  /** @returns {string} Another site's name, "" for this one or none */
  function cameFrom() {
    try {
      const host = new URL(document.referrer).hostname;
      return host === location.hostname ? "" : host;
    } catch {
      return "";
    }
  }

  /** @returns {"light" | "dark"} */
  function look() {
    const theme = document.documentElement.dataset["theme"];
    if (theme === "light" || theme === "dark") return theme;
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /** @returns {number | null} Until the page was ready (ms) */
  function loadTime() {
    const [timing] = /** @type {PerformanceNavigationTiming[]} */ (performance.getEntriesByType("navigation"));
    const ready = timing ? timing.loadEventEnd || timing.domContentLoadedEventEnd : 0;
    return ready > 0 ? Math.round(ready) : null;
  }

  let id = newId();
  let shownFor = 0; // ms the page was shown, before shownSince
  let shownSince = document.visibilityState === "visible" ? performance.now() : -1;
  let scrolled = 0; // % of the page, the most
  let errors = 0;

  const seconds = () => Math.round((shownFor + (shownSince >= 0 ? performance.now() - shownSince : 0)) / 1000);

  function view() {
    send({
      kind: "view",
      id,
      path: location.pathname,
      from: cameFrom(),
      width: Math.round(window.innerWidth),
      touch: navigator.maxTouchPoints > 1,
      language: navigator.language,
      look: look(),
    });
  }

  function leave() {
    send({ kind: "leave", id, seconds: seconds(), scrolled, load_ms: loadTime() });
  }

  function measure() {
    const height = document.documentElement.scrollHeight;
    const seen = height > 0 ? ((window.scrollY + window.innerHeight) / height) * 100 : 100;
    scrolled = Math.max(scrolled, Math.min(100, Math.round(seen)));
  }

  let measuring = false;
  addEventListener("scroll", () => {
    if (measuring) return;
    measuring = true;
    requestAnimationFrame(() => {
      measuring = false;
      measure();
    });
  }, { passive: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      if (shownSince >= 0) shownFor += performance.now() - shownSince;
      shownSince = -1;
      leave();
    } else {
      shownSince = performance.now();
    }
  });

  // Back to it with the browser's back button: a view of its own
  addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    id = newId();
    shownFor = 0;
    shownSince = performance.now();
    scrolled = 0;
    measure();
    view();
  });

  /** @param {MouseEvent} event */
  function clicked(event) {
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement)) return;

    const to = new URL(link.href, location.href);
    const download = to.pathname.match(/\/releases\/download\/([^/]+)\/([^/]+)$/);
    if (download) {
      send({ kind: "download", id, path: location.pathname, what: `${download[1]}/${download[2]}` });
    } else if (to.hostname !== location.hostname && /^https?:$/.test(to.protocol)) {
      send({ kind: "out", id, path: location.pathname, what: to.hostname.replace(/^www\./, "") });
    }
  }

  document.addEventListener("click", clicked);
  document.addEventListener("auxclick", (event) => {
    if (event.button === 1) clicked(event); // the middle button: a new tab
  });

  // A script on the page broke (a few times at most, its first line only)
  addEventListener("error", (event) => {
    if (errors >= 5 || !(event instanceof ErrorEvent)) return;
    errors += 1;
    const file = (event.filename.split("/").pop() ?? "").split("?")[0] || "the page";
    send({ kind: "error", id, path: location.pathname, what: `${event.message} (${file}:${event.lineno})` });
  });

  measure();
  view();
})();

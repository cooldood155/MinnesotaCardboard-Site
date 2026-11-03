// @ts-check
// The All / App / Website tabs on the news page. Without this script every
// post shows.

const newsTabList = document.querySelector("[data-news-tabs]");
const newsPanel = document.getElementById("news-posts");
const newsEmpty = document.querySelector("[data-news-empty]");

/** @type {NodeListOf<HTMLButtonElement>} */
const newsTabButtons = document.querySelectorAll("button[data-news-tab]");
const newsTabs = Array.from(newsTabButtons);

/** @type {NodeListOf<HTMLElement>} */
const newsCards = document.querySelectorAll(".post-card[data-topic]");

/** @param {HTMLButtonElement} active */
function selectNewsTab(active) {
  const topic = active.dataset["newsTab"] ?? "all";

  for (const tab of newsTabs) {
    const selected = tab === active;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  }
  newsPanel?.setAttribute("aria-labelledby", active.id);

  let shown = 0;
  for (const card of newsCards) {
    card.hidden = topic !== "all" && card.dataset["topic"] !== topic;
    if (!card.hidden) shown += 1;
  }

  if (newsEmpty instanceof HTMLElement) {
    newsEmpty.hidden = shown > 0 || newsCards.length === 0;
    newsEmpty.textContent =
      "No " + (active.textContent ?? "").trim().toLowerCase() + " posts yet.";
  }
}

/** @param {string} name */
function newsTabNamed(name) {
  return newsTabs.find((tab) => tab.dataset["newsTab"] === name);
}

function selectNewsTabFromHash() {
  const tab = newsTabNamed(location.hash.slice(1)) ?? newsTabNamed("all") ?? newsTabs[0];
  if (tab) selectNewsTab(tab);
}

if (newsTabList instanceof HTMLElement && newsTabs.length > 0) {
  for (const tab of newsTabs) {
    tab.addEventListener("click", () => {
      selectNewsTab(tab);
      history.replaceState(null, "", "#" + (tab.dataset["newsTab"] ?? ""));
    });
  }

  newsTabList.addEventListener("keydown", (event) => {
    const current = newsTabs.findIndex((tab) => tab === document.activeElement);
    if (current < 0) return;

    const last = newsTabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (current === last ? 0 : current + 1)
      : event.key === "ArrowLeft" ? (current === 0 ? last : current - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : -1;

    const tab = newsTabs[next];
    if (!tab) return;
    event.preventDefault();
    tab.click();
    tab.focus();
  });

  window.addEventListener("hashchange", selectNewsTabFromHash);
  selectNewsTabFromHash();
  newsTabList.hidden = false;
}

// @ts-check
// The App / Website tabs on the news page. Without this script both lists show.

const newsTabList = document.querySelector("[data-news-tabs]");

/** @type {HTMLButtonElement[]} */
const newsTabs = newsTabList
  ? Array.from(newsTabList.querySelectorAll("button[data-news-tab]"))
  : [];

/** @param {HTMLButtonElement} active */
function selectNewsTab(active) {
  for (const tab of newsTabs) {
    const selected = tab === active;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;

    const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
    if (panel) panel.hidden = !selected;
  }
}

/** @param {string | undefined} name */
function newsTabNamed(name) {
  return newsTabs.find((tab) => tab.dataset["newsTab"] === name);
}

if (newsTabList instanceof HTMLElement && newsTabs.length > 0) {
  const tabList = newsTabList;

  for (const tab of newsTabs) {
    tab.addEventListener("click", () => {
      selectNewsTab(tab);
      history.replaceState(null, "", "#" + (tab.dataset["newsTab"] ?? ""));
    });
  }

  tabList.addEventListener("keydown", (event) => {
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

  const first =
    newsTabNamed(location.hash.slice(1)) ??
    newsTabNamed(tabList.dataset["newsTabs"]) ??
    newsTabs[0];
  if (first) selectNewsTab(first);
  tabList.hidden = false;
}

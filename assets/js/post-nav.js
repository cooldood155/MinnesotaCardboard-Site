// @ts-check
// The Older / Newer links under a post (_includes/post-nav.html). Lists with
// the same links share one name; the rest become buttons, and the chosen list
// is kept while clicking through posts. Without this script only "All posts"
// shows.

/** @typedef {{ links: HTMLElement, lists: string[], labels: string[] }} PostNavChoice */

const postNav = document.querySelector("[data-post-nav]");
const postNavHeading = postNav?.querySelector(".post-page-nav-heading");

/** @type {NodeListOf<HTMLElement>} */
const postNavLinks = document.querySelectorAll("[data-post-nav-list]");

function savedPostNavList() {
  try {
    return sessionStorage.getItem("post-nav") ?? "all";
  } catch {
    return "all";
  }
}

/** @param {string} list */
function savePostNavList(list) {
  try {
    sessionStorage.setItem("post-nav", list);
  } catch { /* Storage is blocked; the choice lasts until the page closes. */ }
}

if (postNavHeading && postNavLinks.length > 0) {
  const heading = postNavHeading;

  /** @type {PostNavChoice[]} */
  const choices = [];
  for (const links of postNavLinks) {
    const same = choices.find((choice) =>
      choice.links.dataset["postNavKey"] === links.dataset["postNavKey"]);

    if (same) {
      same.lists.push(links.dataset["postNavList"] ?? "");
      same.labels.push(links.dataset["postNavLabel"] ?? "");
      links.remove();
    } else {
      choices.push({
        links,
        lists: [links.dataset["postNavList"] ?? ""],
        labels: [links.dataset["postNavLabel"] ?? ""],
      });
    }
  }

  /** @type {HTMLButtonElement[]} */
  const buttons = [];

  /** @param {PostNavChoice} chosen */
  const show = (chosen) => {
    choices.forEach((choice, i) => {
      choice.links.hidden = choice !== chosen;
      buttons[i]?.setAttribute("aria-pressed", String(choice === chosen));
    });
  };

  if (choices.length === 1) {
    heading.textContent = choices[0]?.labels.join(" / ") ?? "";
  } else {
    heading.textContent = "";
    for (const choice of choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice.labels.join(" / ");
      button.addEventListener("click", () => {
        show(choice);
        savePostNavList(choice.lists[0] ?? "all");
      });
      buttons.push(button);
      heading.append(button);
    }
  }

  const saved = savedPostNavList();
  const first = choices.find((choice) => choice.lists.includes(saved)) ?? choices[0];
  if (first) show(first);
}

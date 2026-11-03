// @ts-check
// The light/dark button in the header (_includes/header.html). Each click goes
// System -> Light -> Dark, saving the choice in the browser. _includes/head.html
// applies the saved choice when a page loads.
//
// The button starts hidden; without JavaScript the site follows the system.

/** @typedef {"system" | "light" | "dark"} Theme */

/** @type {Theme[]} */
const themeOrder = ["system", "light", "dark"];

const themeLabels = {
  system: "Theme: System",
  light: "Theme: Light",
  dark: "Theme: Dark",
};

/** @returns {Theme} */
function currentTheme() {
  const theme = document.documentElement.dataset["theme"];
  return theme === "light" || theme === "dark" ? theme : "system";
}

/** @param {Theme} theme */
function applyTheme(theme) {
  if (theme === "system") delete document.documentElement.dataset["theme"];
  else document.documentElement.dataset["theme"] = theme;

  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch { /* Storage is blocked; the choice lasts until the page closes. */ }
}

/** @type {HTMLButtonElement | null} */
const themeButton = document.querySelector("button[data-theme-button]");

if (themeButton) {
  const button = themeButton;
  const showLabel = () => { button.textContent = themeLabels[currentTheme()]; };

  button.addEventListener("click", () => {
    const next = themeOrder[(themeOrder.indexOf(currentTheme()) + 1) % themeOrder.length];
    applyTheme(next ?? "system");
    showLabel();
  });

  showLabel();
  button.hidden = false;
}

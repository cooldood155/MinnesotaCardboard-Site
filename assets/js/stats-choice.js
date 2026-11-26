// @ts-check
// The Don't Count My Visits box in the footer (_includes/footer.html) and on
// /help/usage-stats/. The choice is saved in the browser (localStorage
// "stats"), and assets/js/stats.js checks it before counting a visit.
//
// The buttons start hidden; without JavaScript nothing is counted anyway.

/** @type {NodeListOf<HTMLElement>} */
const statsBoxes = document.querySelectorAll(".stats-choice");

/** @returns {boolean} */
function statsAskedNotTo() {
  const asks = /** @type {Navigator & { globalPrivacyControl?: boolean }} */ (navigator);
  return asks.globalPrivacyControl === true || navigator.doNotTrack === "1";
}

/** @returns {boolean} */
function statsTurnedOff() {
  try {
    return localStorage.getItem("stats") === "off";
  } catch {
    return false;
  }
}

/** @param {string} [problem] */
function showStatsChoice(problem) {
  const asked = statsAskedNotTo();
  const off = statsTurnedOff();

  for (const box of statsBoxes) {
    const now = box.querySelector("[data-stats-now]");
    const row = box.querySelector("[data-stats-choice]");
    const button = box.querySelector("button");
    if (!now || !(row instanceof HTMLElement) || !button) continue;

    if (problem) {
      now.textContent = problem;
    } else if (asked) {
      now.textContent = "Currently, your browser asks sites not to track it; your visits aren't counted.";
      row.hidden = true;
    } else {
      now.textContent = off ? "Your visits aren't counted in this browser." : "Your visits are counted.";
      button.textContent = off ? "Count My Visits Again" : "Don't Count My Visits";
      row.hidden = false;
    }
  }
}

for (const button of document.querySelectorAll(".stats-choice button")) {
  button.addEventListener("click", () => {
    try {
      if (statsTurnedOff()) localStorage.removeItem("stats");
      else localStorage.setItem("stats", "off");
    } catch {
      showStatsChoice("This browser doesn't let the site remember that (storage is blocked).");
      return;
    }
    showStatsChoice();
  });
}

showStatsChoice();

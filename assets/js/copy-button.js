// @ts-check
// Makes <button data-copy="some-id"> copy the text of the element with that
// id. Buttons start hidden and are shown when this script runs; readers
// without JavaScript don't see a copy button that won't do anything for them.
//
// Put an empty role="status" element right after the button. Screen readers
// read out the "Copied" message placed into it.

/** @type {NodeListOf<HTMLButtonElement>} */
const copyButtons = document.querySelectorAll("button[data-copy]");

for (const button of copyButtons) {
  const target = document.getElementById(button.dataset["copy"] ?? "");
  if (!target) continue;

  const status = button.nextElementSibling;
  const label = button.textContent ?? "";

  /** @param {string} message */
  const flash = (message) => {
    button.textContent = message;
    if (status) status.textContent = message;
    setTimeout(() => { button.textContent = label; }, 2500);
  };

  // Select text if the browser doesn't have the capability to copy
  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
    flash("Selected: press Ctrl+C");
  };

  button.addEventListener("click", () => {
    if (typeof navigator.clipboard?.writeText === "function") {
      navigator.clipboard.writeText(target.textContent ?? "")
        .then(() => flash("Copied"), selectText);
    } else {
      selectText();
    }
  });

  button.hidden = false;
}

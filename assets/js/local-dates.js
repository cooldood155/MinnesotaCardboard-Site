// @ts-check
// Shows dates in the reader's own time zone, adding "· 3 days ago" after them.
// Without this script dates stay in UTC time, as Jekyll writes them.
//
// What it looks for:
//   <time datetime="...">
//     rewritten as a full date and time in the reader's time zone
//     - data-date-only: just the date, the same calendar day everywhere
//     - data-short: "Oct 13, 2026" (lists on the home, archive, and author pages)
//
//   <span class="time-ago">
//     right after a <time> element; adds "· 3 days ago"
//
//   [data-time-zone-note]
//     sentence saying which time zone the dates are in

const locale =
  navigator.languages.find((lang) => /^en(-|$)/i.test(lang)) ?? "en-US";

/** @type {Intl.DateTimeFormatOptions} */
const longDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
/** @type {Intl.DateTimeFormatOptions} */
const shortDate = { year: "numeric", month: "short", day: "numeric" };

const formats = {
  long: new Intl.DateTimeFormat(locale, {
    ...longDate, hour: "numeric", minute: "2-digit", timeZoneName: "short",
  }),
  longDateOnly: new Intl.DateTimeFormat(locale, { ...longDate, timeZone: "UTC" }),
  short: new Intl.DateTimeFormat(locale, shortDate),
  shortDateOnly: new Intl.DateTimeFormat(locale, { ...shortDate, timeZone: "UTC" }),
};

const relativeFormat = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

/** @type {[Intl.RelativeTimeFormatUnit, number][]} unit and its length in seconds */
const units = [
  ["year", 31536000], ["month", 2592000], ["week", 604800],
  ["day", 86400], ["hour", 3600], ["minute", 60],
];

/** A date-only <time>'s day, as midnight UTC: "2026-10-13" -> Oct 13.
 * @param {HTMLTimeElement} time */
function calendarDate(time) {
  return new Date(time.dateTime.slice(0, 10) + "T00:00:00Z");
}

/** "3 days ago", "yesterday" or "just now"; `""` if the date can't be read.
 * @param {HTMLTimeElement} time */
function timeAgo(time) {
  let seconds;
  /** @type {Intl.RelativeTimeFormatUnit} */
  let smallestUnit;

  if (time.hasAttribute("data-date-only")) {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    seconds = (calendarDate(time).getTime() - today) / 1000;
    smallestUnit = "day";
  } else {
    seconds = (new Date(time.dateTime).getTime() - Date.now()) / 1000;
    smallestUnit = "minute";
    if (Math.abs(seconds) < 60) return "just now";
  }
  if (Number.isNaN(seconds)) return "";

  for (const [unit, unitSeconds] of units) {
    if (Math.abs(seconds) >= unitSeconds || unit === smallestUnit) {
      return relativeFormat.format(Math.round(seconds / unitSeconds), unit);
    }
  }
  return "";
}

function showLocalDates() {
  for (const time of document.querySelectorAll("time")) {
    const dateOnly = time.hasAttribute("data-date-only");
    const short = time.hasAttribute("data-short");
    const date = dateOnly ? calendarDate(time) : new Date(time.dateTime);
    if (Number.isNaN(date.getTime())) continue; // keep UTC text

    const format = short
      ? (dateOnly ? formats.shortDateOnly : formats.short)
      : (dateOnly ? formats.longDateOnly : formats.long);
    time.textContent = format.format(date);
  }
}

function updateTimeAgo() {
  /** @type {NodeListOf<HTMLElement>} */
  const spans = document.querySelectorAll(".time-ago");
  for (const span of spans) {
    const time = span.previousElementSibling;
    if (!(time instanceof HTMLTimeElement)) continue;

    const text = timeAgo(time);
    span.textContent = text ? " · " + text : "";
    span.hidden = !text;
  }
}

function showTimeZoneNote() {
  const note = document.querySelector("[data-time-zone-note]");
  if (!note) return;

  let zone = "";
  try {
    zone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");
  } catch { /* Not all browsers report a time zone. */ }

  note.textContent = zone
    ? "Dates and times are shown in your time zone (" + zone + ")."
    : "Dates and times are shown in your time zone.";
}

showLocalDates();
updateTimeAgo();
showTimeZoneNote();
setInterval(updateTimeAgo, 60 * 1000);

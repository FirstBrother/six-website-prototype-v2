/* SIX v2 — sample schedule data.
   CONCEPT DATA ONLY: generated from the standing show pattern for review.
   The live build replaces this file with a feed from the approved ticket seller. */

(function () {
  "use strict";

  // Standing pattern (to be verified against the live season):
  // Mon / Wed / Fri -> 8:00 PM evening · Tue / Thu / Sat -> 3:00 PM matinee · Sun dark.
  var PATTERN = { 1: "evening", 2: "matinee", 3: "evening", 4: "matinee", 5: "evening", 6: "matinee" };
  var TIMES = { evening: "8:00 PM", matinee: "3:00 PM" };

  // Sample season window: next 56 days from the build date below.
  // Bump SAMPLE_SEASON_START when refreshing the concept.
  var SAMPLE_SEASON_START = "2026-10-05";

  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  function buildSchedule() {
    var shows = [];
    var start = new Date(SAMPLE_SEASON_START + "T12:00:00");
    for (var i = 0; i < 56; i++) {
      var d = new Date(start.getTime() + i * 86400000);
      var kind = PATTERN[d.getDay()];
      if (!kind) continue; // dark Sunday
      shows.push({
        date: d,
        kind: kind,
        time: TIMES[kind],
        label: DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate(),
        shortLabel: MONTHS[d.getMonth()].slice(0, 3) + " " + d.getDate()
      });
      if (shows.length >= 12) break; // keep the concept list scannable
    }
    return shows;
  }

  window.SIX_SCHEDULE = buildSchedule();
  window.SIX_SCHEDULE_META = { sample: true, patternNote: "Sample data for concept review — not live dates." };
})();

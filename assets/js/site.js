/* SIX v2 concept interactions — vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Modals ---------- */
  var lastFocus = null;
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }
  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll("[data-modal-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.subject) {
        var line = document.getElementById("contact-subject-line");
        if (line) line.textContent = "You're asking about: " + btn.dataset.subject + ". The live build routes each inquiry to the right desk.";
      }
      openModal(btn.dataset.modalTarget);
    });
  });
  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", function () { closeModal(modal); });
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.open").forEach(closeModal);
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Anatomy of the sound ---------- */
  var PART_COPY = {
    rhythm: "<strong>Rhythm.</strong> The groove — every beat, live. Six parts, one family sound.",
    bass: "<strong>Bass.</strong> The momentum underneath it all — a rhythm section with no instruments.",
    lead: "<strong>Lead.</strong> The melody you take home, carried by a brother's voice alone.",
    harmony: "<strong>Harmony.</strong> The stack that gives it size — parts locking in real time.",
    texture: "<strong>Texture.</strong> Instrumental color from nowhere but six voices.",
    heart: "<strong>Heart.</strong> The feeling that fills the room — the part no instrument can play."
  };
  var partBtns = document.querySelectorAll(".voice-part");
  var caption = document.getElementById("anatomy-caption");
  var bars = document.querySelectorAll("#anatomy-visual i");
  function setPart(btn) {
    partBtns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    btn.setAttribute("aria-pressed", "true");
    var key = btn.dataset.part;
    if (caption && PART_COPY[key]) caption.innerHTML = PART_COPY[key];
    var idx = Array.prototype.indexOf.call(partBtns, btn);
    bars.forEach(function (bar, i) {
      var on = i <= idx;
      bar.classList.toggle("on", on);
      bar.style.height = on ? (34 + i * 11) + "%" : "22%";
    });
  }
  partBtns.forEach(function (btn) {
    btn.addEventListener("click", function () { setPart(btn); });
  });
  if (partBtns.length) setPart(partBtns[0]);

  /* ---------- Schedule rendering ---------- */
  var list = document.getElementById("schedule-list");
  var shows = window.SIX_SCHEDULE || [];
  var activeFilter = "all";

  function showRow(show) {
    var li = document.createElement("li");
    li.className = "show-row";
    li.dataset.kind = show.kind;
    li.innerHTML =
      '<div class="show-date"><strong>' + show.date.getDate() + '</strong>' +
      '<span>' + show.date.toLocaleString("en-US", { month: "short" }) + ' · ' +
      show.date.toLocaleString("en-US", { weekday: "short" }) + '</span></div>' +
      '<div class="show-info"><h3>' + show.label + '</h3>' +
      '<p>' + show.time + ' · Pepsi Legends Theater · Branson, MO</p></div>' +
      '<button class="button button--primary" type="button" data-modal-target="tickets-modal">Get Tickets</button>';
    var btn = li.querySelector("[data-modal-target]");
    btn.addEventListener("click", function () { openModal("tickets-modal"); });
    return li;
  }

  function renderSchedule() {
    if (!list) return;
    list.innerHTML = "";
    var visible = shows.filter(function (s) {
      return activeFilter === "all" || s.kind === activeFilter;
    });
    if (!visible.length) {
      var empty = document.createElement("li");
      empty.className = "schedule-empty";
      empty.textContent = "No sample performances in this view.";
      list.appendChild(empty);
      return;
    }
    visible.forEach(function (s) { list.appendChild(showRow(s)); });
  }

  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      activeFilter = btn.dataset.filter;
      renderSchedule();
    });
  });

  /* First few shows inside the tickets modal */
  var modalShows = document.getElementById("modal-shows");
  if (modalShows) {
    shows.slice(0, 4).forEach(function (s) {
      var div = document.createElement("div");
      div.className = "modal__show";
      div.innerHTML = "<div><strong>" + s.label + "</strong><small>" + s.time + " · Pepsi Legends Theater</small></div>" +
        '<span class="sample-badge">Sample</span>';
      modalShows.appendChild(div);
    });
  }

  renderSchedule();
})();

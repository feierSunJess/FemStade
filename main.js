/* =========================================================
   FEM Stade — main.js
   Lenis · GSAP ScrollTrigger · Preloader · Micro-Interactions
   Alles mit prefers-reduced-motion-Fallback.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  // Markiere, dass JS aktiv ist (steuert Reveal-Startzustand im CSS)
  if (!reduceMotion) document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    initPreloader();
    initHeaderState();
    initMobileNav();
    initForm();

    if (reduceMotion) return; // ab hier nur Polish
    initLenis();
    initReveal();
    if (!isTouch) initMagnet();
  }

  /* ---------- Jahr im Footer ---------- */
  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    var pre = document.getElementById("preloader");
    if (!pre) return;
    function hide() {
      pre.classList.add("is-done");
      setTimeout(function () { pre.remove(); }, 700);
    }
    window.addEventListener("load", function () { setTimeout(hide, 350); });
    // Sicherheitsnetz, falls load nie feuert
    setTimeout(hide, 2500);
  }

  /* ---------- Header: Schatten ab Scroll ---------- */
  function initHeaderState() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile-Navigation ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------- Lenis Smooth-Scroll ---------- */
  function initLenis() {
    if (typeof Lenis === "undefined") { initAnchorFallback(); return; }
    var lenis = new Lenis({ duration: 1.05, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Anker-Links sanft scrollen
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80 });
      });
    });

    if (window.ScrollTrigger && window.gsap) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
    }
  }

  function initAnchorFallback() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var t = document.querySelector(a.getAttribute("href"));
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- Scroll-Reveal (GSAP) ---------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!window.gsap || !window.ScrollTrigger) {
      // Ohne GSAP: einfach sichtbar machen
      els.forEach(function (el) { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    els.forEach(function (el) {
      var dir = el.getAttribute("data-reveal");
      var from = { opacity: 0, y: 28 };
      if (dir === "left") { from = { opacity: 0, x: -32 }; }
      if (dir === "right") { from = { opacity: 0, x: 32 }; }
      gsap.fromTo(el, from, {
        opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });
  }

  /* ---------- Magnet-Effekt (Desktop) ---------- */
  function initMagnet() {
    document.querySelectorAll("[data-magnet]").forEach(function (el) {
      var strength = 0.3;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Kontaktformular ---------- */
  function initForm() {
    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var hp = form.querySelector('[name="website"]');
      if (hp && hp.value) return;

      if (status) {
        status.textContent = "Wird gesendet …";
        status.className = "form__status";
      }

      var data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (status) {
              status.textContent = "Danke — wir haben deine Nachricht erhalten und melden uns bald!";
              status.className = "form__status is-ok";
            }
          } else {
            throw new Error("server");
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = "Etwas hat nicht geklappt. Schreib uns direkt an info@femstade.de.";
            status.className = "form__status is-err";
          }
        });
    });
  }
})();

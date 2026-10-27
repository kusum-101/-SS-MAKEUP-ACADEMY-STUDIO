(function () {
  "use strict";
  var cfg = window.SITE_CONFIG;

  function waLink(key) {
    var msg = cfg.messages[key] || cfg.messages.default;
    return "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(msg);
  }
  window.buildWaLink = waLink;

  // WhatsApp links: every element with data-wa gets its pre-filled message.
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Phone, maps and Instagram links from config.
  document.querySelectorAll("[data-tel]").forEach(function (el) {
    el.href = "tel:" + cfg.phoneTel;
    if (el.hasAttribute("data-tel-text")) el.textContent = cfg.phoneDisplay;
  });
  document.querySelectorAll("[data-maps]").forEach(function (el) {
    el.href = el.getAttribute("data-maps") === "directions" ? cfg.directionsUrl : cfg.mapsUrl;
  });
  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    if (cfg.instagramUrl) {
      el.href = cfg.instagramUrl;
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });

  // Mobile navigation.
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });

  // Header shadow once the page scrolls.
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Gentle reveal on scroll.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const reveals = document.querySelectorAll(".reveal");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menuLabels = document.documentElement.lang === "en"
    ? { open: "Open menu", close: "Close menu" }
    : { open: "Відкрити меню", close: "Закрити меню" };

  document.documentElement.classList.add("js");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("visible"));
  }

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const setMenuState = (isOpen) => {
    nav?.classList.toggle("open", isOpen);
    toggle?.setAttribute("aria-expanded", String(isOpen));
    toggle?.setAttribute("aria-label", isOpen ? menuLabels.close : menuLabels.open);
  };

  toggle?.addEventListener("click", () => {
    setMenuState(!nav?.classList.contains("open"));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
});

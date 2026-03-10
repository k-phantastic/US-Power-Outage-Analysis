// scrollspy.js - Highlights active section in sidebar as user scrolls


document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!navLinks.length || !sections.length) return; // No nav links or sections found, skip setup

  const setActive = (id) => { // Highlight the active link based on the section ID
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
    });
  };

  const observer = new IntersectionObserver( // Observe sections to determine which is currently in view
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActive(visible[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75]
    }
  );

  sections.forEach((section) => observer.observe(section)); // Start observing each section

  if (sections[0]) { // Set initial active link to the first section
    setActive(sections[0].id);
  }
});
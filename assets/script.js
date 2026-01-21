(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Menu open/close
  const menu = $(".menu");
  const openBtn = $(".menuBtn");
  const closeBtn = $(".menuClose");

  const setMenu = (open) => {
    if (!menu || !openBtn) return;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (openBtn && menu) {
    openBtn.addEventListener("click", () => setMenu(true));
  }
  if (closeBtn && menu) {
    closeBtn.addEventListener("click", () => setMenu(false));
  }

  // Close menu when clicking a link
  $$(".menuLink").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Click outside menuInner closes menu
  if (menu) {
    menu.addEventListener("click", (e) => {
      const inner = $(".menuInner");
      if (!inner) return;
      if (e.target === menu) setMenu(false);
    });
  }
})();

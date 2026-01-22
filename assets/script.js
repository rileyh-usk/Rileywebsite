(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================
     FOOTER YEAR
     ========================= */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* =========================
     FULLSCREEN MENU
     ========================= */
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

  $$(".menuLink").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  if (menu) {
    menu.addEventListener("click", (e) => {
      const inner = $(".menuInner");
      if (!inner) return;
      if (e.target === menu) setMenu(false);
    });
  }

  /* =========================
     MOUSE LIGHT FOLLOW
     ========================= */
  const light = document.getElementById("mouseLight");

  if (light) {
    const moveLight = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("mousemove", moveLight, { passive: true });

    // Hide effect on touch devices (prevents weird behavior on phones)
    window.addEventListener(
      "touchstart",
      () => {
        light.style.display = "none";
      },
      { once: true, passive: true }
    );
  }
})();

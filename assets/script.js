const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function setActiveNav(){
  const page = document.body.dataset.page; // home | work | contact
  const map = { home: "index", work: "work", contact: "contact" };
  const key = map[page] || "index";

  $$("[data-page]").forEach(a => a.classList.toggle("active", a.dataset.page === key));
}

function wireCopy(){
  $$(".copyHint").forEach(h => {
    h.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try{
        await navigator.clipboard.writeText(h.dataset.copy || "");
        const old = h.textContent;
        h.textContent = "Copied!";
        setTimeout(() => h.textContent = old, 1100);
      } catch(_){}
    });
  });
}

function wireWorkModal(){
  const modal = $("#modal");
  if (!modal) return;

  const mTitle = $("#mTitle");
  const mImg = $("#mImg");
  const mDesc = $("#mDesc");
  const closeBtn = $("#mClose");

  $$(".workCard").forEach(card => {
    card.tabIndex = 0;
    const open = () => {
      mTitle.textContent = card.dataset.title || "Project";
      mImg.src = card.dataset.img || "";
      mImg.alt = (card.dataset.title || "Project") + " image";
      mDesc.textContent = card.dataset.desc || "";
      modal.showModal ? modal.showModal() : modal.setAttribute("open","");
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  closeBtn?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
    if (!inDialog) modal.close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  wireCopy();
  wireWorkModal();
});

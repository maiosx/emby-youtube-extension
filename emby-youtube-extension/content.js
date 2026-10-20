(() => {
  const ICON = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M4 3.5v17a.5.5 0 0 0 .75.43l6.9-4.1-3.4-2.33V9.5l3.4-2.33-6.9-3.74A.5.5 0 0 0 4 3.5zm8.9 5.2 8.35 5.3a.5.5 0 0 1 0 .85l-8.35 5.3-1.9-1.3 5.2-3.55-5.2-3.55z"/>
  </svg>`;

  const getUrl = () =>
    new Promise((res) => {
      try {
        chrome.storage.sync.get({ embyUrl: "" }, (v) => res(v.embyUrl));
      } catch (e) { res(""); }
    });

  async function openEmby(e) {
    e.preventDefault();
    const url = await getUrl();
    if (!url) {
      try { chrome.runtime.sendMessage({ type: "open-options" }); } catch (_) {}
      return;
    }
    window.open(url, "_blank", "noopener");
  }

  function make(kind) {
    const a = document.createElement("a");
    a.className = "emby-link emby-" + kind;
    a.href = "#";
    a.title = "Open Emby";
    a.innerHTML = ICON + "<span>Emby</span>";
    a.addEventListener("click", openEmby);
    return a;
  }

  function inject() {
    const mini = document.querySelector("ytd-mini-guide-renderer #items");
    if (mini && !mini.querySelector(".emby-mini")) mini.appendChild(make("mini"));

    const full = document.querySelector(
      "ytd-guide-renderer #sections ytd-guide-section-renderer #items"
    );
    if (full && !full.querySelector(".emby-full")) full.appendChild(make("full"));
  }

  let t;
  new MutationObserver(() => {
    clearTimeout(t);
    t = setTimeout(inject, 200);
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener("yt-navigate-finish", inject);
  inject();
})();

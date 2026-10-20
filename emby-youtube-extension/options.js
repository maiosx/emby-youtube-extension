const u = document.getElementById("u");
chrome.storage.sync.get({ embyUrl: "" }, (v) => (u.value = v.embyUrl));
document.getElementById("save").onclick = () => {
  let val = u.value.trim();
  if (val && !/^https?:\/\//i.test(val)) val = "http://" + val;
  chrome.storage.sync.set({ embyUrl: val }, () => {
    u.value = val;
    const s = document.getElementById("s");
    s.textContent = "Saved";
    setTimeout(() => (s.textContent = ""), 1500);
  });
};

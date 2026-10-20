chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === "open-options") chrome.runtime.openOptionsPage();
});
chrome.runtime.onInstalled.addListener((d) => {
  if (d.reason === "install") chrome.runtime.openOptionsPage();
});

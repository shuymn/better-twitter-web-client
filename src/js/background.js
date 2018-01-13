const browser = (typeof browser === 'undefined') ? chrome : browser;

browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
  browser.tabs.sendMessage(details.tabId, {
    url: details.url,
  });
});

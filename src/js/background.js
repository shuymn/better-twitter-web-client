const browser = typeof browser === "undefined" ? chrome : browser; // eslint-disable-line no-use-before-define

browser.webNavigation.onHistoryStateUpdated.addListener(details => {
  browser.tabs.sendMessage(details.tabId, {
    url: details.url
  });
});

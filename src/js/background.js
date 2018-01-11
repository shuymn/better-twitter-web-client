chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.sendMessage(details.tabId, {
    url: details.url,
  });
});

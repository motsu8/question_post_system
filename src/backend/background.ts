const extensionUrl = chrome.runtime.getURL("../index.html");
console.log(extensionUrl);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(sender);
  if (message === "get-extension-url") {
    sendResponse(extensionUrl);
  }
});

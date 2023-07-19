const createWindow = async (tab: chrome.tabs.Tab) => {
  const size = await chrome.tabs.sendMessage(tab.id as number, { message: "getScreen" });
  const { width, screenHeight } = size;
  chrome.windows.create({
    url: "../index.html",
    width: width / 2,
    height: screenHeight - 100,
    top: 100,
    left: width / 2,
    type: "normal",
  });
};

chrome.action.onClicked.addListener((tab) => {
  // 現在のタブが recursion/dashboard の場合、拡張機能をオン
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    // windowサイズを取得し、新しいウィンドウで開く
    (async () => {
      createWindow(tab);

      const pageText = await chrome.tabs.sendMessage(tab.id as number, { message: "getText" });

      chrome.runtime.onMessage.addListener((obj, sender, response) => {
        console.log(sender);
        if (obj.message === "requestText") {
          response(pageText);
        } else if (obj.message === "requestQuestionTab") {
          response(tab);
        }
      });
    })();
  }
});

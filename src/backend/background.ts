chrome.action.onClicked.addListener((tab) => {
  // 現在のタブが recursion/dashboard の場合、拡張機能をオン
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    // windowサイズを取得し、新しいウィンドウで開く
    (async () => {
      const response = await chrome.tabs.sendMessage(tab.id, { message: "getScreen" });
      const { width, screenHeight } = response;
      chrome.windows.create({
        url: "../index.html",
        width: width / 2,
        height: screenHeight - 100,
        top: 100,
        left: width / 2,
        type: "normal",
      });
    })();
    // chrome.action.setPopup({ popup: "index.html", tabId: tab.id });
    // chrome.action.openPopup();
  }
});

// TODO サーバー側からデータをもらい、拡張機能のローカルストレージへ保存する

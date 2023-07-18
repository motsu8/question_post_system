chrome.action.onClicked.addListener((tab) => {
  // 現在のタブが recursion/dashboard の場合、拡張機能をオン
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    chrome.action.setPopup({ popup: "../index.html", tabId: tab.id });
    chrome.action.openPopup();
  }
});

// TODO サーバー側からデータをもらい、拡張機能のローカルストレージへ保存する

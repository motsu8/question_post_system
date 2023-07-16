// popupが開かれたときに、content.jsへメッセージを通知
// chrome.runtime.sendMessage({message: "送ったよ"});
(async () => {
  // url取得
  // const url = document.getElementById("url")
  const code = document.getElementById("code");

  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  // (url as HTMLElement).innerHTML = tab.url as string

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    console.log("visit");
    const response = await chrome.tabs.sendMessage(tab.id as number, { message: "text request" });
    (code as HTMLDivElement).innerHTML += response.text;
  }
})();

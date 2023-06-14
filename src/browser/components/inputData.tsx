export async function getUrl() {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab.url
}

export async function getInputText() {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    console.log("visit");
    const response = await chrome.tabs.sendMessage(tab.id as number, {
      message: "text request",
    });

    return response.text
  }
}

export async function getTitle() {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    console.log("visit");
    const response = await chrome.tabs.sendMessage(tab.id as number, {
      message: "text request",
    });
    return response.title
  }
}

export type Data = {
  url: string;
  inputText: string
}

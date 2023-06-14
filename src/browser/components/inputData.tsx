export async function getUrl() {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab.url
}

export async function getConsoleText() {
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

    return response.console
  }
}

export async function getCodeText() {
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

    return response.code
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

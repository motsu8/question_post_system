export async function getUrl() {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  return tab.url;
}

export async function getConsoleText(): Promise<string | undefined> {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    const response = await chrome.tabs.sendMessage(tab.id as number, {
      message: "text request",
    });

    return response.console;
  }
  return undefined;
}

export async function getCodeText(): Promise<string | undefined> {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    const response = await chrome.tabs.sendMessage(tab.id as number, {
      message: "text request",
    });

    return response.code;
  }

  return undefined;
}

export async function getTitle(): Promise<string | undefined> {
  // url取得
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  // 現在のタブが recursion/dashboard の場合、リクエスト
  if (tab.url && tab.url.includes("recursionist.io/dashboard")) {
    const response = await chrome.tabs.sendMessage(tab.id as number, {
      message: "text request",
    });
    return response.title;
  }
  return undefined;
}

export type Data = {
  url: string;
  inputText: string;
};

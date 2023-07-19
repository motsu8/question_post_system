async function getTab() {
  const tab = await chrome.runtime.sendMessage({ message: "requestQuestionTab" });
  return tab;
}

// popup -> background
export async function getUrl(): Promise<string | undefined> {
  const tab = await getTab();
  return tab.url;
}

export async function getConsoleText(): Promise<string | undefined> {
  const response = await chrome.runtime.sendMessage({
    message: "requestText",
  });
  return response.console;
}

export async function getCodeText(): Promise<string | undefined> {
  const response = await chrome.runtime.sendMessage({
    message: "requestText",
  });
  return response.code;
}

export async function getTitle(): Promise<string | undefined> {
  const response = await chrome.runtime.sendMessage({
    message: "requestText",
  });
  return response.title;
}

export type Data = {
  url: string;
  inputText: string;
};

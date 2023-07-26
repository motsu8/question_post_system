import { TextObj } from "../types/data";

async function getTab() {
  const tab = await chrome.runtime.sendMessage({ message: "requestQuestionTab" });
  return tab;
}

// popup -> background
export async function getUrl(): Promise<string | undefined> {
  const tab = await getTab();
  return tab.url;
}

export async function getText(): Promise<TextObj | undefined> {
  const response = await chrome.runtime.sendMessage({
    message: "requestText",
  });
  return response;
}

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

export const insertImgElement = (imgUrlStr: string) => {
  const target = document.getElementById("avatar");
  const imgEle = document.createElement("img");
  imgEle.src = imgUrlStr;
  imgEle.classList.add("rounded-full");
  target!.append(imgEle);
};

export const createTextChannelList = (channels: Channels[]) => {
  const select = document.getElementById("channels");
  channels.forEach((channel) => {
    const option = document.createElement("option");
    option.value = channel.id;
    option.innerText = channel.name;
    select!.append(option);
  });
};

type Channels = {
  id: string;
  name: string;
};

export type TextObj = {
  title: string;
  code: string;
  console: string;
};

export type Data = {
  url: string;
  inputText: string;
};

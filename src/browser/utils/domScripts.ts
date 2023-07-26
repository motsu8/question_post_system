import { Channels } from "../types/data";

export const insertImgElement = (targetKey: string, imgUrlStr: string) => {
  const target = document.getElementById(targetKey) as HTMLElement;
  target.innerHTML = "";
  const imgEle = document.createElement("img");
  imgEle.src = imgUrlStr;
  imgEle.classList.add("rounded-full");
  target.append(imgEle);
};

export const createTextChannelList = (channels: Channels[]) => {
  const select = document.getElementById("channels") as HTMLElement;
  channels.forEach((channel) => {
    const option = document.createElement("option");
    option.value = channel.id;
    option.innerText = channel.name;
    select.append(option);
  });
};

export const createImageUrl = (id: string, avatar: string) =>
  `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=48`;

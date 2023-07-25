import React, { useEffect } from "react";

const backendUrl = "http://localhost:53134";
type Channels = {
  id: string;
  name: string;
};

function DiscordOauth() {
  let imgUrl;

  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1130079596839182376&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=guilds.members.read";

  const insertImgElement = (imgUrlStr: string) => {
    const target = document.getElementById("avatar");
    const imgEle = document.createElement("img");
    imgEle.src = imgUrlStr;
    imgEle.classList.add("rounded-full");
    target!.append(imgEle);
  };

  const createTextChannelList = (channels: Channels[]) => {
    const select = document.getElementById("channels");
    channels.forEach((channel) => {
      const option = document.createElement("option");
      option.value = channel.id;
      option.innerText = channel.name;
      select!.append(option);
    });
  };

  const toggleDisplay = (ele: HTMLElement) => {
    ele.classList.toggle("hidden");
    ele.classList.toggle("block");
  };

  const loginAction = () => {
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    window.open(url, "_blank");

    // discord-user
    fetch(`${backendUrl}/discord/user`, fetchOption)
      .then((res) => res.json())
      .then((response) => {
        const { username, avatar, id, channels } = response;
        const login = document.getElementById("login") as HTMLElement;
        imgUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=48`;
        insertImgElement(imgUrl);
        toggleDisplay(login);
        createTextChannelList(channels);
        document.getElementById("userName")!.innerText = `${username}`;
        console.log(username);
      });

    // discord-guild-channel
    // fetch(`${backendUrl}/discord/guild/channel`, fetchOption)
  };

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [code] = [fragment.get("code")];
    if (!code) {
      const login = document.getElementById("login") as HTMLElement;
      toggleDisplay(login);
    }
  });

  return (
    <>
      <button
        id="login"
        type="button"
        onClick={loginAction}
        className="hidden text-indigo-500 hover:text-indigo-300 font-medium rounded-full text-sm px-4 py-2 my-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Discordと連携する
      </button>
      <div id="user" className="flex align-middle">
        <div id="avatar" />
        <div id="userName" className="px-3 text-lg font-normal align-text-top" />
      </div>
      <div>
        <select
          name="channels"
          aria-label="投稿するチャンネルを表示"
          id="channels"
          className="py-3 px-4 block w-full drop-shadow-xl bg-slate-50 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
      </div>
    </>
  );
}

export default DiscordOauth;

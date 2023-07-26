import React from "react";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";

type Channels = {
  id: string;
  name: string;
};

function DiscordOauth({
  active,
  storage,
}: {
  active: string;
  storage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    window.open(url, "_blank");
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // discord-user
    fetch(`${Backend.BASE_URL}/discord/user`, fetchOption)
      .then((res) => res.json())
      .then((response) => {
        const { username, avatar, id, channels, refreshToken } = response;
        const login = document.getElementById("login") as HTMLElement;
        imgUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=48`;
        insertImgElement(imgUrl);
        toggleDisplay(login);
        createTextChannelList(channels);
        document.getElementById("userName")!.innerText = `${username}`;

        console.log(refreshToken);

        localStorage.setItem(DiscordData.REFRESH_TOKEN, refreshToken);
        storage(localStorage.getItem(DiscordData.REFRESH_TOKEN) !== null);
      });
  };

  return (
    <div className={`${active} h-screen flex justify-center align-middle`}>
      <button
        id="login"
        type="button"
        onClick={loginAction}
        className="text-indigo-500 hover:text-indigo-300 font-bold rounded-full text-5xl px-4 py-2 my-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Discordと連携する
      </button>
    </div>
  );
}

export default DiscordOauth;

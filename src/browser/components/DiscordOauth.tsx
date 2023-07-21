import React, { useEffect } from "react";

function DiscordOauth() {
  let imgUrl;

  const url =
    "https://discord.com/api/oauth2/authorize?client_id=1130079596839182376&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=guilds.members.read";

  const insertImgElement = (imgUrlStr: string) => {
    const target = document.getElementById("avatar");
    const imgEle = document.createElement("img");
    imgEle.src = imgUrlStr;
    target!.append(imgEle);
  };

  const toggleDisplay = (ele: HTMLElement) => {
    ele.classList.toggle("hidden");
    ele.classList.toggle("block");
  };

  const loginAction = () => {
    window.open(url, "_blank");
    fetch("http://localhost:53134/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const { username, avatar, id } = response;
        const login = document.getElementById("login") as HTMLElement;
        imgUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=40`;
        insertImgElement(imgUrl);
        toggleDisplay(login);
        document.getElementById("userName")!.innerText = `${username}`;
        console.log(username);
      });
  };

  // eslint-disable-next-line consistent-return
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
      <div id="avatar" />
      <div id="userName" />
    </>
  );
}

export default DiscordOauth;

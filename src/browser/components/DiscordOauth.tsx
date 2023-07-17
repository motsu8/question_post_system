import React, { useEffect } from "react";

function DiscordOauth() {
  const insertImgElement = (imgUrl: string) => {
    const target = document.getElementById("avatar");
    const imgEle = document.createElement("img");
    imgEle.src = imgUrl;
    target!.append(imgEle);
  };

  const toggleDisplay = (ele: HTMLElement) => {
    ele.classList.toggle("hidden");
    ele.classList.toggle("block");
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type")];
    if (!accessToken) {
      const login = document.getElementById("login") as HTMLElement;
      toggleDisplay(login);
      return;
    }

    let imgUrl;
    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        const { username, discriminator, avatar, id } = response;
        imgUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg`;
        insertImgElement(imgUrl);
        document.getElementById("userName")!.innerText = `${username}#${discriminator}`;
      })
      .catch(console.error);
  });

  return (
    <>
      <a
        id="login"
        target="_blank"
        rel="noreferrer"
        href="https://discord.com/api/oauth2/authorize?client_id=1130079596839182376&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=token&scope=identify%20guilds%20guilds.members.read"
        className="hidden text-indigo-500 hover:text-indigo-300 font-medium rounded-full text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Discordと連携する
      </a>
      <div id="avatar" />
      <div id="userName" />
    </>
  );
}

export default DiscordOauth;

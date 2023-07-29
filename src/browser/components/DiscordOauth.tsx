import React from "react";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";

function DiscordOauth({
  active,
  storage,
}: {
  active: string;
  storage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const loginAction = () => {
    window.open(DiscordData.OAUTH_URL, "_blank");
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // discord-user
    fetch(`${Backend.BASE_URL}/discord/oauth/user`, fetchOption)
      .then((res) => res.json())
      .then((response) => {
        const { refreshToken, accessToken, refreshDate } = response;
        console.log(response);
        localStorage.setItem(DiscordData.REFRESH_TOKEN, refreshToken);
        localStorage.setItem(DiscordData.ACCESS_TOKEN, accessToken);
        localStorage.setItem(DiscordData.REFRESH_DATE, refreshDate);
        storage(localStorage.getItem(DiscordData.REFRESH_TOKEN) !== null);
      });
  };

  return (
    <div className={`${active} h-screen flex justify-center align-middle`}>
      <button
        id="login"
        type="button"
        onClick={loginAction}
        className="text-indigo-500 hover:text-indigo-300 font-bold rounded-full text-3xl px-4 py-2 my-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Discordと連携する
      </button>
    </div>
  );
}

export default DiscordOauth;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import DiscordOauth from "../components/DiscordOauth";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";
import { createTextChannelList, insertImgElement } from "../components/inputData";

function App() {
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const refresh = localStorage.getItem(DiscordData.REFRESH_TOKEN);
    const token = localStorage.getItem(DiscordData.ACCESS_TOKEN);
    let ignore = false;

    // localStorageにrefreshTokenがない場合、認証表示
    if (refresh === null) setDraw(false);
    else if (refresh !== null && token !== null) {
      setDraw(true);

      // accessTokenを使用してユーザーデータを取得する
      if (!ignore) {
        const queryParams = new URLSearchParams({
          refreshToken: refresh,
          accessToken: token,
        }).toString();

        fetch(`${Backend.BASE_URL}/discord/user?${queryParams}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            // discord-user
            const { username, avatar, id, channels, refreshToken } = response;
            const imgUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpeg?size=48`;
            insertImgElement(imgUrl);
            createTextChannelList(channels);
            document.getElementById("userName")!.innerText = `${username}`;

            localStorage.setItem(DiscordData.REFRESH_TOKEN, refreshToken);
          });
      }
    }
    return () => {
      ignore = true;
    };
  }, [draw]);

  return (
    <>
      <DiscordOauth active={draw ? "hidden" : "block"} storage={setDraw} />
      <div className={`${draw ? "block" : "hidden"} h-screen`}>
        <Header />
        <Tabs />
      </div>
    </>
  );
}

export default App;

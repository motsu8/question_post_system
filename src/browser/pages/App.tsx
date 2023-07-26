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
    let ignore = false;

    // localStorageにrefreshTokenがない場合、認証表示
    if (refresh === null) setDraw(false);
    else {
      setDraw(true);

      const queryParams = new URLSearchParams({ refresh_token: refresh }).toString();
      // refreshTokenを使用してユーザーデータを取得する
      if (!ignore) {
        fetch(`${Backend.BASE_URL}/discord/token?${queryParams}`, {
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

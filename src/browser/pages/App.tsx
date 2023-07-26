import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import DiscordOauth from "../components/DiscordOauth";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";

function App() {
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem(DiscordData.REFRESH_TOKEN);

    // localStorageにrefreshTokenがない場合、認証表示
    if (refreshToken === null) setDraw(false);
    else {
      setDraw(true);

      // refreshTokenを使用してユーザーデータを取得する
      fetch(`${Backend.BASE_URL}/discord/token`, {
        method: "GET",
        body: refreshToken,
      })
        .then((res) => res.json())
        .then((response) => console.log(response));
    }
  }, [draw]);

  return (
    <>
      <DiscordOauth active={draw ? "hidden" : "block"} storage={setDraw} />
      <div className="h-screen">
        <Header active={draw ? "block" : "hidden"} />
        <Tabs active={draw ? "block" : "hidden"} />
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import DiscordOauth from "../components/DiscordOauth";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";
import useDiscordData from "../hooks/DiscordData";

function App() {
  const [draw, setDraw] = useState(false);
  const { member, bot, channels, updateMember, updateBot, updateChannels } = useDiscordData();

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
            // 失敗
            if (response.message) {
              console.log(`あと${Math.floor(response.retry_after * 2)}秒後に試してください`);
            } else {
              // discordHooks
              updateMember(response.member);
              updateBot(response.bot);
              updateChannels(response.channels);
            }
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
        <Header member={member} channels={channels} />
        <Contents botData={bot} member={member} />
      </div>
    </>
  );
}

export default App;

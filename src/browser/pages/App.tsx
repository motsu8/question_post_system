import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import DiscordOauth from "../components/DiscordOauth";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";
import useDiscordData from "../hooks/DiscordData";

function App() {
  const [draw, setDraw] = useState(false);
  const [postChannel, setPostChannel] = useState("");
  const { member, bot, channels, updateMember, updateBot, updateChannels } = useDiscordData();

  const getDiscordUser = (refresh, token) => {
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
          setDraw(true);
          // discordHooks
          updateMember(response.member);
          updateBot(response.bot);
          updateChannels(response.channels);
        }
      });
  };

  let ignore = false;

  useEffect(() => {
    const refresh = localStorage.getItem(DiscordData.REFRESH_TOKEN);
    const token = localStorage.getItem(DiscordData.ACCESS_TOKEN);
    const RefreshDate = new Date(localStorage.getItem(DiscordData.REFRESH_DATE) as string);

    const today = new Date();

    // localStorageにrefreshTokenがない場合、認証表示
    if (refresh === null || refresh === "undefined") {
      setDraw(false);
    } // tokenの有効期限切れの場合、リフレッシュ
    else if (today > RefreshDate) {
      const refreshParams = new URLSearchParams({ refresh_token: refresh }).toString();
      fetch(`${Backend.BASE_URL}/discord/refresh?${refreshParams}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          setDraw(true);
          if (!ignore) {
            console.log(response);
            const { accessToken, refreshToken, refreshDate, user } = response;
            localStorage.setItem(DiscordData.REFRESH_TOKEN, refreshToken);
            localStorage.setItem(DiscordData.ACCESS_TOKEN, accessToken);
            localStorage.setItem(DiscordData.REFRESH_DATE, refreshDate);
            updateMember(user.member);
            updateBot(user.bot);
            updateChannels(user.channels);
          }
        });
    } // tokenを使用して、Discordデータを取得
    else if (refresh !== null && token !== null) {
      // accessTokenを使用してユーザーデータを取得する
      if (!ignore) {
        setDraw(true);
        getDiscordUser(refresh, token);
      }
    }
    return () => {
      ignore = true;
    };
  }, [draw]);

  const updatePostChannel = (event: Event) => {
    setPostChannel(event.target!.value);
  };

  const updateDraw = (bool: boolean) => {
    setDraw(bool);
  };

  return (
    <>
      <DiscordOauth active={draw ? "hidden" : "block"} storage={setDraw} />
      <div className={`${draw ? "block" : "hidden"} h-screen`}>
        <Header
          member={member}
          channels={channels}
          updatePostChannel={updatePostChannel}
          updateDraw={updateDraw}
        />
        <Contents botData={bot} member={member} postChannel={postChannel} />
      </div>
    </>
  );
}

export default App;

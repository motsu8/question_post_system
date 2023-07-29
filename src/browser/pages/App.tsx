import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import DiscordOauth from "../components/DiscordOauth";
import DiscordData from "../constants/DiscordData";
import Backend from "../constants/Backend";
import useDiscordData from "../hooks/DiscordData";
import FeedBack from "../components/FeedBack";

function App() {
  const [drawContents, setDrawContents] = useState(false);
  const [drawFeedBack, setDrawFeedBack] = useState(false);
  const [drawCompleted, setDrawCompleted] = useState(false);
  const [drawMask, setDrawMask] = useState(false);
  const [postChannel, setPostChannel] = useState("");
  const { member, bot, channels, updateMember, updateBot, updateChannels } = useDiscordData();

  const updateDrawMask = (bool: boolean) => {
    setDrawMask(bool);
  };

  const updateDrawCompleted = (bool: boolean) => {
    setDrawCompleted(bool);
  };

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
          setDrawContents(true);
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
      setDrawContents(false);
    } // tokenの有効期限切れの場合、リフレッシュ
    else if (today > RefreshDate) {
      setDrawContents(true);
      const refreshParams = new URLSearchParams({ refresh_token: refresh }).toString();
      fetch(`${Backend.BASE_URL}/discord/refresh?${refreshParams}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => {
          if (!ignore) {
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
        setDrawContents(true);
        getDiscordUser(refresh, token);
      }
    }
    return () => {
      ignore = true;
    };
  }, [drawContents]);

  const updatePostChannel = (event: Event) => {
    setPostChannel(event.target!.value);
  };

  const updateDraw = (bool: boolean) => {
    setDrawContents(bool);
  };

  const updateDrawFeedBack = (bool: boolean) => {
    setDrawFeedBack(bool);
  };

  return (
    <>
      <div
        className={`${
          drawMask ? "block" : "hidden"
        } bg-black opacity-25 absolute top-0 left-0 h-screen w-screen z-10`}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src="/checkBox.png"
          alt="送信完了"
          className={`${drawCompleted ? "block animate-jello-horizontal" : "hidden"}`}
        />
      </div>
      <DiscordOauth active={drawContents ? "hidden" : "block"} storage={setDrawContents} />
      <div className={`${drawContents ? "block" : "hidden"} h-screen`}>
        <Header
          member={member}
          channels={channels}
          updatePostChannel={updatePostChannel}
          updateDraw={updateDraw}
          updateDrawFeedBack={updateDrawFeedBack}
          drawFeedBack={drawFeedBack}
        />
        <Contents
          updateDrawMask={updateDrawMask}
          updateDrawCompleted={updateDrawCompleted}
          botData={bot}
          member={member}
          postChannel={postChannel}
          drawFeedBack={drawFeedBack}
        />
        <FeedBack
          drawFeedBack={drawFeedBack}
          updateDrawFeedBack={updateDrawFeedBack}
          updateDrawMask={updateDrawMask}
          updateDrawCompleted={updateDrawCompleted}
        />
      </div>
    </>
  );
}

export default App;

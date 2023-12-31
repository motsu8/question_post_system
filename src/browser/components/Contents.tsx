"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import useForms from "../hooks/Forms";
import Code from "./Code";
import Console from "./Console";
import Preview from "./Preview";
import Tabs from "./Tabs";
import { getUrl, getText, getSender } from "../utils/contentScripts";
import { Client, TextObj } from "../types/data";
import Backend from "../constants/Backend";

function Contents({
  botData,
  member,
  postChannel,
  drawFeedBack,
  updateDrawMask,
  updateDrawCompleted,
}: {
  botData: Client;
  member: Client;
  postChannel: string;
  drawFeedBack: boolean;
  updateDrawMask: (bool: boolean) => void;
  updateDrawCompleted: (bool: boolean) => void;
}) {
  const { title, expect, contents, tried, updateTitle, updateExpect, updateContents, updateTried } =
    useForms();
  const [toggle, setToggle] = useState(1);
  const [url, setUrl] = useState("");
  const [consoleText, setConsoleText] = useState("");
  const [codeText, setCodeText] = useState("");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    (async () => {
      setUrl((await getUrl()) as string);
      const textObj = (await getText()) as TextObj;
      const senderObj = (await getSender()) as chrome.runtime.MessageSender;
      console.log(senderObj.id);
      setConsoleText(textObj.console);
      setCodeText(textObj.code);
      setQuestion(textObj.title);
      setLanguage(textObj.language);

      const originParams = new URLSearchParams({ origin: senderObj.id as string }).toString();
      fetch(`${Backend.BASE_URL}/set-origin?${originParams}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((response) => console.log(response));
    })();
  }, []);

  const updateToggle = (id: number) => {
    console.log("changeToggle");
    setToggle(id);
  };

  const postToDiscord = () => {
    // チャンネルが選択されていない場合、何もしない
    if (!postChannel) {
      alert("投稿するチャンネルを選択してください");
      return;
    }

    updateDrawMask(true);

    const questionParams = new URLSearchParams({
      channelId: postChannel,
      userId: member.id,
      usedLanguage: language,
      final_title: title,
      final_expect: expect,
      final_contents: contents,
      final_tried: tried,
      final_url: url,
      final_consoleText: consoleText,
      final_codeText: codeText,
      final_question: question,
    }).toString();

    fetch(`${Backend.BASE_URL}/discord/question?${questionParams}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "Message sent successfully.") {
          updateDrawCompleted(true);
          setTimeout(() => {
            updateDrawCompleted(false);
            updateDrawMask(false);
          }, 1000);
        }
      });
  };

  return (
    <div className={`${drawFeedBack ? "hidden" : "block"} p-4 bg-gray-200 h-9/10 tall:h-5/6`}>
      <Tabs updateToggle={updateToggle} toggle={toggle} postToDiscord={postToDiscord} />
      <Questions
        active={toggle === 1 ? "block" : "hidden"}
        url={`${question} : ${url}`}
        title={updateTitle}
        expect={updateExpect}
        contents={updateContents}
        tried={updateTried}
      />
      <Code active={toggle === 2 ? "block" : "hidden"} input={codeText} />
      <Console active={toggle === 3 ? "block" : "hidden"} input={consoleText} />
      <Preview
        botData={botData}
        member={member}
        question={question}
        url={url}
        title={title}
        expect={expect}
        contents={contents}
        tried={tried}
        active={toggle === 4 ? "block" : "hidden"}
        code={codeText}
        console={consoleText}
      />
    </div>
  );
}

export default Contents;

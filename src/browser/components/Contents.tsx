"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import useForms from "../hooks/Forms";
import Code from "./Code";
import Console from "./Console";
import Preview from "./Preview";
import Tabs from "./Tabs";
import { getUrl, getText } from "../utils/contentScripts";
import { Client, TextObj } from "../types/data";

function Contents({ botData, member }: { botData: Client; member: Client }) {
  const { title, expect, contents, tried, updateTitle, updateExpect, updateContents, updateTried } =
    useForms();
  const [toggle, setToggle] = useState(1);
  const [url, setUrl] = useState("");
  const [consoleText, setConsoleText] = useState("");
  const [codeText, setCodeText] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    (async () => {
      setUrl((await getUrl()) as string);
      const textObj = (await getText()) as TextObj;
      console.log(textObj);
      setConsoleText(textObj.console);
      setCodeText(textObj.code);
      setQuestion(textObj.title);
    })();
  }, []);

  const updateToggle = (id: number) => {
    console.log("changeToggle");
    setToggle(id);
  };

  return (
    <div className="p-4 bg-gray-200 h-9/10">
      <Tabs updateToggle={updateToggle} toggle={toggle} />
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

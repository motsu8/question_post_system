"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import useForms from "../hooks/Forms";
import Code from "./Code";
import Console from "./Console";
import Preview from "./Preview";
import { getUrl, getText, TextObj } from "./inputData";

function Tabs() {
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

  const handleClick = (id: number) => {
    setToggle(id);
  };

  return (
    <div className="p-4 bg-gray-200 h-full">
      <ul className="flex space-x-4 pb-4">
        <button type="button">
          <li
            aria-hidden="true"
            onClick={() => handleClick(1)}
            className="font-medium hover:text-gray-300"
          >
            質問
          </li>
        </button>
        <button type="button">
          <li
            aria-hidden="true"
            onClick={() => handleClick(2)}
            className="font-medium hover:text-gray-300"
          >
            コード
          </li>
        </button>
        <button type="button">
          <li
            aria-hidden="true"
            onClick={() => handleClick(3)}
            className="font-medium hover:text-gray-300"
          >
            コンソール
          </li>
        </button>
        <button type="button">
          <li
            aria-hidden="true"
            onClick={() => handleClick(4)}
            className="font-medium hover:text-gray-300"
          >
            プレビュー
          </li>
        </button>
      </ul>
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

export default Tabs;

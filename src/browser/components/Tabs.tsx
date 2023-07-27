"use client";

import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import useForms from "../hooks/Forms";
import Code from "./Code";
import Console from "./Console";
import Preview from "./Preview";
import { getUrl, getText } from "../utils/contentScripts";
import { Client, TextObj } from "../types/data";

function Tabs({ botData, member }: { botData: Client; member: Client }) {
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
    <div className="p-4 bg-gray-200 h-9/10">
      <div className="flex justify-between">
        <div>
          <ul className="flex space-x-6 py-3">
            <button type="button">
              <li
                aria-hidden="true"
                onClick={() => handleClick(1)}
                className={`font-medium hover:text-gray-300 ${
                  toggle === 1 ? "text-base" : "text-sm"
                }`}
              >
                質問
              </li>
            </button>
            <button type="button">
              <li
                aria-hidden="true"
                onClick={() => handleClick(2)}
                className={`font-medium hover:text-gray-300 ${
                  toggle === 2 ? "text-base" : "text-sm"
                }`}
              >
                コード
              </li>
            </button>
            <button type="button">
              <li
                aria-hidden="true"
                onClick={() => handleClick(3)}
                className={`font-medium hover:text-gray-300 ${
                  toggle === 3 ? "text-base" : "text-sm"
                }`}
              >
                コンソール
              </li>
            </button>
            <button type="button">
              <li
                aria-hidden="true"
                onClick={() => handleClick(4)}
                className={`font-medium hover:text-gray-300 ${
                  toggle === 4 ? "text-base" : "text-sm"
                }`}
              >
                プレビュー
              </li>
            </button>
          </ul>
        </div>
        <button
          id="question"
          type="submit"
          form="question"
          className="text-white bg-recursion hover:bg-blue-500 my-1 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          質問する
        </button>
      </div>

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

export default Tabs;

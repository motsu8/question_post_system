"use client";
import { useState } from "react";
import Questions from "./Questions";
import useForms from "../hooks/Forms";
import Code from "./Code";
import Console from "./Console";
import Preview from "./Preview";
import { getUrl, getInputText, getTitle } from "./inputData";

const Tabs = () => {
  const {
    title,
    expect,
    contents,
    tried,
    updateTitle,
    updateExpect,
    updateContents,
    updateTried,
  } = useForms();
  const [toggle, setToggle] = useState(1);
  const [url, setUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [question, setQuestion] = useState("");

  const setUrlHooks = async () => {
    const url = await getUrl();
    setUrl(url as string);
  };

  const setInputTextHooks = async () => {
    const text = await getInputText();
    setInputText(text as string);
  };

  const setQuestionHooks = async () => {
    const title = await getTitle();
    setQuestion(title as string);
  };

  setUrlHooks();
  setInputTextHooks();
  setQuestionHooks();

  console.log(inputText)

  const handleClick = (id: number) => {
    setToggle(id);
  };

  return (
    <div className="px-7 bg-gray-200">
      <ul className="flex space-x-4 py-4">
        <button>
          <li
            onClick={() => handleClick(1)}
            className="font-medium hover:text-gray-300"
          >
            質問
          </li>
        </button>
        <button>
          <li
            onClick={() => handleClick(2)}
            className="font-medium hover:text-gray-300"
          >
            コード
          </li>
        </button>
        <button>
          <li
            onClick={() => handleClick(3)}
            className="font-medium hover:text-gray-300"
          >
            コンソール
          </li>
        </button>
        <button>
          <li
            onClick={() => handleClick(4)}
            className="font-medium hover:text-gray-300"
          >
            プレビュー
          </li>
        </button>
      </ul>
      <Questions
        active={toggle === 1 ? "block" : "hidden"}
        url={question + " : " + url}
        title={updateTitle}
        expect={updateExpect}
        contents={updateContents}
        tried={updateTried}
      />
      <Code active={toggle === 2 ? "block" : "hidden"} />
      <Console active={toggle === 3 ? "block" : "hidden"} input={inputText} />
      <Preview
        question={question}
        url={url}
        title={title}
        expect={expect}
        contents={contents}
        tried={tried}
        active={toggle === 4 ? "block" : "hidden"}
      />
    </div>
  );
};

export default Tabs;

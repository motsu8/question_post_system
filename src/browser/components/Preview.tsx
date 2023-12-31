import React from "react";
import { PreviewType } from "../types/Components";
import { createImageUrl } from "../utils/domScripts";

function Preview({
  question,
  url,
  title,
  expect,
  contents,
  tried,
  active,
  code,
  console,
  botData,
  member,
}: PreviewType) {
  function createText(text: string): React.JSX.Element[] {
    return text.split("\n").map((ele) => <p>{ele}</p>);
  }

  return (
    <div className={`${active} bg-discord rounded-lg p-7 my-3 text-sm overflow-y-auto h-9/10`}>
      <div className="flex align-top space-x-3 text-slate-50">
        <div id="botAvatar" className="w-12 h-12">
          <img
            className="object-cover rounded-full"
            src={`${createImageUrl(botData.id, botData.avatar)}}`}
            alt="botAvatar"
          />
        </div>
        <div id="text">
          <div id="botName" className="font-bold text-lg">
            {botData.name}
          </div>
          <div className="flex space-x-1">
            <div className="bg-mention rounded">{`@${member.name}`}</div>
            <div>からの質問です!</div>
          </div>
          <div>
            {question} : {url}
          </div>
          <p>----------------------</p>
          <div className="flex flex-col space-y-3">
            <div className={title === "" ? "hidden" : "block"}>
              <p>タイトル</p>
              <div>{title}</div>
            </div>
            <div className={expect === "" ? "hidden" : "block"}>
              <p>期待する動作</p>
              {createText(expect)}
            </div>
            <div className={contents === "" ? "hidden" : "block"}>
              <p>内容</p>
              {createText(contents)}
            </div>
            <div className={tried === "" ? "hidden" : "block"}>
              <p>試したこと</p>
              {createText(tried)}
            </div>
          </div>
          <p>----------------------</p>
          <p>code</p>
          <textarea
            className="bg-discord-code border border-neutral-900 p-3 rounded-md drop-shadow-lg"
            rows={10}
            cols={80}
            placeholder={code}
            disabled
          />
          <br />
          <p>console</p>
          <textarea
            className="bg-discord-code border border-neutral-900 p-3 rounded-md drop-shadow-lg"
            rows={8}
            cols={80}
            placeholder={console}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default Preview;

import React from "react";
import { Form } from "../types/Form";

function Preview({ question, url, title, expect, contents, tried, active, code, console }: Form) {
  return (
    <div className={`${active} bg-discord rounded-lg p-7 text-sm overflow-y-auto h-96`}>
      <div className="flex space-x-3 text-slate-50">
        <div className="icon rounded-full bg-slate-50 w-10 h-10 flex justify-center items-center">
          <div>img</div>
        </div>
        <div id="text">
          <div className="userName font-bold">motsu</div>
          <div>{question}</div>
          <div>{url}</div>
          <p>----------------------</p>
          <div className="flex flex-col space-y-3">
            <div className={title === "" ? "hidden" : "block"}>
              <p>タイトル</p>
              <div>{title}</div>
            </div>
            <div className={expect === "" ? "hidden" : "block"}>
              <p>期待する動作</p>
              <div>{expect}</div>
            </div>
            <div className={contents === "" ? "hidden" : "block"}>
              <p>内容</p>
              <div>{contents}</div>
            </div>
            <div className={tried === "" ? "hidden" : "block"}>
              <p>試したこと</p>
              <div>{tried}</div>
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

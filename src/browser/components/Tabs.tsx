import React from "react";
import { TabsType } from "../types/Components";

function Tabs({ updateToggle, toggle, postToDiscord }: TabsType) {
  return (
    <div className="flex justify-between">
      <div>
        <ul className="flex space-x-6 py-3">
          <button type="button">
            <li
              aria-hidden="true"
              onClick={() => updateToggle(1)}
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
              onClick={() => updateToggle(2)}
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
              onClick={() => updateToggle(3)}
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
              onClick={() => updateToggle(4)}
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
        onClick={postToDiscord}
        className="text-white bg-recursion hover:bg-blue-500 my-1 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        質問する
      </button>
    </div>
  );
}

export default Tabs;

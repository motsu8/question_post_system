import React from "react";
import { Input } from "../types/Form";

function Questions({ active, url, title, expect, contents, tried }: Input) {
  return (
    <div className={`${active} overflow-y-auto`}>
      <form>
        <div className="pb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="url"
          >
            該当箇所
            <input
              id="url"
              className="drop-shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={url}
              readOnly
            />
          </label>
        </div>
        <div className="pb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="title"
          >
            タイトル
            <input
              id="title"
              className="drop-shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="何に困っているか簡潔に"
              required
              onChange={(e) => title(e.target.value)}
            />
          </label>
        </div>
        <div className="pb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="expect"
          >
            期待する動作
            <textarea
              id="expect"
              rows={3}
              className="drop-shadow-lg block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => expect(e.target.value)}
              placeholder="自分が何をしたいか簡潔に"
            />
          </label>
        </div>
        <div className="pb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="question"
          >
            エラー内容 / 疑問
            <textarea
              id="question"
              rows={5}
              className="drop-shadow-lg block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => contents(e.target.value)}
              placeholder="どんなエラーが発生しているか / どんな疑問があるか"
            />
          </label>
        </div>
        <div className="pb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="tried"
          >
            試したこと
            <textarea
              id="tried"
              rows={2}
              className="drop-shadow-lg block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => tried(e.target.value)}
              placeholder="自分が試したこと"
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default Questions;

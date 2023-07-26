import React from "react";

function DiscordUser() {
  return (
    <>
      <div id="user" className="flex align-middle">
        <div id="avatar" />
        <div id="userName" className="px-3 text-lg font-normal align-text-top" />
      </div>
      <div>
        <select
          name="channels"
          aria-label="投稿するチャンネルを表示"
          id="channels"
          className="py-3 px-4 block w-full drop-shadow-xl bg-slate-50 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        />
      </div>
    </>
  );
}

export default DiscordUser;

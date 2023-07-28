import React from "react";
import { createImageUrl } from "../utils/domScripts";
import { DiscordUserType } from "../types/Components";

function DiscordUser({ member, channels, updatePostChannel }: DiscordUserType) {
  return (
    <>
      <div id="user" className="flex align-middle">
        <img
          className="rounded-full"
          src={createImageUrl(member.id, member.avatar)}
          alt="userAvatar"
        />
      </div>
      <select
        name="channels"
        aria-label="投稿するチャンネルを表示"
        onChange={updatePostChannel}
        id="channels"
        className="py-2 px-4 w-1/3 drop-shadow-xl bg-slate-50 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      >
        <option selected>-- チャンネルを選択 --</option>
        {channels.map((channel) => (
          <option value={channel.id}>{channel.name}</option>
        ))}
      </select>
    </>
  );
}

export default DiscordUser;

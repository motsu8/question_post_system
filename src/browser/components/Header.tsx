import React from "react";
import DiscordUser from "./DiscordUser";
import { Channels, Client } from "../types/data";

function Header({ member, channels }: { member: Client; channels: Channels[] }) {
  return (
    <div className="flex justify-between align-middle p-4 h-1/10">
      <DiscordUser member={member} channels={channels} />
      <button
        id="question"
        type="submit"
        form="question"
        className="text-white bg-recursion hover:bg-blue-500 my-1 font-medium rounded-md text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        質問する
      </button>
    </div>
  );
}

export default Header;

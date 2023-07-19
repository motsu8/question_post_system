import React from "react";
import DiscordOauth from "./DiscordOauth";

function Header() {
  return (
    <div className="flex justify-between align-middle p-1 m-3">
      <DiscordOauth />
      <button
        id="question"
        type="submit"
        form="question"
        className="text-white bg-recursion hover:bg-blue-500 my-3 font-medium rounded-md text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        質問する
      </button>
    </div>
  );
}

export default Header;

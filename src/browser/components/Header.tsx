import React from "react";
import DiscordUser from "./DiscordUser";
import Menu from "./Menu";
import { Channels, Client } from "../types/data";

function Header({
  member,
  channels,
  updatePostChannel,
  updateDraw,
}: {
  member: Client;
  channels: Channels[];
  updatePostChannel: (event) => void;
  updateDraw: (bool: boolean) => void;
}) {
  return (
    <div className="flex justify-between align-middle p-4 h-1/10 tall:h-1/6">
      <DiscordUser member={member} channels={channels} updatePostChannel={updatePostChannel} />
      <Menu updateDraw={updateDraw} />
    </div>
  );
}

export default Header;

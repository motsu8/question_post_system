import React from "react";
import DiscordUser from "./DiscordUser";
import Menu from "./Menu";
import { Channels, Client } from "../types/data";

function Header({ member, channels }: { member: Client; channels: Channels[] }) {
  return (
    <div className="flex justify-between align-middle p-4 h-1/10">
      <DiscordUser member={member} channels={channels} />
      <Menu />
    </div>
  );
}

export default Header;

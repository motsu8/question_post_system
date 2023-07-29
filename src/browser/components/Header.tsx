import React from "react";
import DiscordUser from "./DiscordUser";
import Menu from "./Menu";
import { Channels, Client } from "../types/data";

function Header({
  member,
  channels,
  updatePostChannel,
  updateDraw,
  updateDrawFeedBack,
  drawFeedBack,
}: {
  member: Client;
  channels: Channels[];
  drawFeedBack: boolean;
  updateDrawFeedBack: (bool: boolean) => void;
  updatePostChannel: (event) => void;
  updateDraw: (bool: boolean) => void;
}) {
  return (
    <div
      className={`${
        drawFeedBack ? "hidden" : "flex"
      } justify-between align-middle p-4 h-1/10 tall:h-1/6`}
    >
      <DiscordUser member={member} channels={channels} updatePostChannel={updatePostChannel} />
      <Menu updateDraw={updateDraw} updateDrawFeedBack={updateDrawFeedBack} />
    </div>
  );
}

export default Header;

import { useState } from "react";
import { Channels, Client, Tokens } from "../types/data";

const useDiscordData = () => {
  const [member, setMember] = useState<Client>({ name: "", id: "", avatar: "" });
  const [bot, setBot] = useState<Client>({ name: "", id: "", avatar: "" });
  const [channels, setChannels] = useState<Channels[]>([]);
  const [tokens, setTokens] = useState<Tokens>({ accessToken: "", refreshToken: "" });

  function updateMember(memberData: Client) {
    setMember(memberData);
  }

  function updateBot(botData: Client) {
    setBot(botData);
  }

  function updateChannels(textChannels: Channels[]) {
    setChannels(textChannels);
  }

  function updateTokens(token: Tokens) {
    setTokens(token);
  }

  return {
    member,
    bot,
    channels,
    tokens,
    updateMember,
    updateBot,
    updateChannels,
    updateTokens,
  };
};

export default useDiscordData;

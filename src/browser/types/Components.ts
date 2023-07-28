import { Channels, Client } from "./data";

export type Input = {
  title: (value: string) => void;
  expect: (value: string) => void;
  contents: (value: string) => void;
  tried: (value: string) => void;
  active: string;
  url: string;
};

export type Form = {
  question: string;
  url: string;
  title: string;
  expect: string;
  contents: string;
  tried: string;
  active: string;
  code: string;
  console: string;
};

export type PreviewType = {
  question: string;
  url: string;
  title: string;
  expect: string;
  contents: string;
  tried: string;
  active: string;
  code: string;
  console: string;
  botData: Client;
  member: Client;
};

export type DiscordUserType = {
  member: Client;
  channels: Channels[];
  updatePostChannel: (event) => void;
};

export type TabsType = {
  updateToggle: (number) => void;
  postToDiscord: () => void;
  toggle: number;
};

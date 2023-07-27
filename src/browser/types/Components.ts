import { Channels, Client } from "./data";

export type Input = {
  url: string;
  title: Function;
  expect: Function;
  contents: Function;
  tried: Function;
  active: string;
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

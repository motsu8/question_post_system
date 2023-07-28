export type Data = {
  url: string;
  inputText: string;
};

export type Client = {
  id: string;
  name: string;
  avatar: string;
};

export type Channels = {
  id: string;
  name: string;
};

export type TextObj = {
  title: string;
  code: string;
  console: string;
  language: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

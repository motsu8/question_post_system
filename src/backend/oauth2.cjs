/* eslint-disable */
const path = require('path');
const { request } = require("undici");
const express = require("express");
const { EventEmitter } = require("events");
const cors = require("cors");
const { Client, GatewayIntentBits } = require("discord.js");

/// .envから環境変数取り込み
require('dotenv').config({ 
  path: path.resolve(__dirname, '../../.env') 
});

// discord.bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once("ready", async (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

// サーバーにBOTを追加するURL
console.log(
  `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=2064&scope=bot%20applications.commands`
);

// Discord OAuth
const app = express();
const emitter = new EventEmitter();
const baseUrl = "https://discord.com/api";
let originUrl

app.use(cors());
// フロントエンドからオリジンを受け取るエンドポイント
app.get('/set-origin', ({query}, res) => {
  // フロントエンドから送信されたオリジンを取得
  const originFromFrontend = query.origin;
  originUrl = `chrome-extension://${originFromFrontend}`

  res.send({message:`[${originUrl}] としてCORSミドルウェアを設定します。`});
});

app.use(
  cors({
    origin: originUrl,
  })
)

const createCodeBlock = (code, language) => "```" + language + '\n' + code + "```";

const createQuestionString = (elements) => {
  const {
    userId,
    usedLanguage,
    final_question,
    final_title,
    final_url,
    final_expect,
    final_contents,
    final_tried,
    final_codeText,
    final_consoleText,
  } = elements;

  const postQuestion = [
    `<@${userId}> からの質問です！`,
    `${final_question} : ${final_url}`,
    `---------------------`,
    `${final_title ? "**タイトル**" : ""}`,
    `${final_title ? final_title + '\n' : ""}`,
    `${final_expect ? "**期待する動作**" : ""}`,
    `${final_expect ? final_expect + '\n' : ""}`,
    `${final_contents ? "**内容**" : ""}`,
    `${final_contents ? final_contents + '\n' : ""}`,
    `${final_tried ? "**試したこと**" : ""}`,
    `${final_tried ? final_tried : ""}`,
    `---------------------`,
    `${final_codeText ? "**code**" : ""}`,
    `${createCodeBlock(final_codeText, usedLanguage)}`,
    `${final_codeText ? "**console**" : ""}`,
    `${createCodeBlock(final_consoleText, usedLanguage)}`,
  ];

  return postQuestion.filter((text) => text !== "").join("\n");
};

const getResponseObject = async (authorization, refreshToken, accessToken) => {
  const requestOption = {
    method: "GET",
    headers: {
      authorization,
    },
  };

  // recursionメンバーオブジェクト
  const memberResult = await request(
    `${baseUrl}/users/@me/guilds/${process.env.RECURSION_GUILD_ID}/member`,
    requestOption
  );
  const memberObject = await memberResult.body.json();

  // エラーメッセージがある場合、そのオブジェクトを返す
  if (memberObject.message) {
    console.log(memberObject.message);
    return memberObject;
  }

  //サーバーのユーザー取得
  const guild = await client.guilds.fetch(process.env.RECURSION_GUILD_ID);
  const members = await guild.members.list({ limit: 1000, cache: true });

  // userの参加しているテキストチャンネル
  const channelObjectList = [];
  const channels = await guild.channels.fetch();
  channels
    .filter(
      (channel) =>
        channel.members.some((member) => member.user.id === memberObject.user.id) &&
        channel.type === 0
    )
    .each((channel) => {
      const channelObject = {
        id: channel.id,
        name: channel.name,
      };
      channelObjectList.push(channelObject);
    });

  const responseObject = {
    member: {
      name: memberObject.user.username,
      avatar: memberObject.user.avatar,
      id: memberObject.user.id,
    },
    bot: {
      name: client.user.username,
      avatar: client.user.avatar,
      id: client.user.id,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
    channels: channelObjectList,
  };
  console.log(responseObject)
  return responseObject;
};

app.post("/discord/question", async ({ query }, res) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const guild = await client.guilds.fetch(process.env.RECURSION_GUILD_ID);
  const channel = await guild.channels.fetch(query.channelId);
  channel.send(createQuestionString(query));

  if (!channel) return res.status(400).json({ error: "Invalid channel ID." });
  res.status(200).json({ message: "Message sent successfully." });
});

app.get("/discord/user", async ({ query }, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const { accessToken, refreshToken } = query;
  const authorization = `Bearer ${accessToken}`;
  const responseObject = await getResponseObject(authorization, refreshToken, accessToken);
  response.send(responseObject);
});

app.get("/discord/oauth/user", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getUser", (tokenObject) => {
    return response.send(tokenObject);
  });
});

app.get("/discord/refresh", async ({ query }, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const { refresh_token } = query;
  if (refresh_token) {
    try {
      const refreshTokenResponseData = await request(`${baseUrl}/oauth2/token`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: `http://localhost:${process.env.PORT}`,
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const refreshData = await refreshTokenResponseData.body.json();

      const refreshDate = new Date();
      refreshDate.setDate(refreshDate.getDate() + 6);

      const userObject = await getResponseObject(
        `${refreshData.token_type} ${refreshData.access_token}`,
        refreshData.refresh_token,
        refreshData.access_token
      );

      const responseObject = {
        user: userObject,
        refreshToken: refreshData.refresh_token,
        accessToken: refreshData.access_token,
        refreshDate
      }

      response.status(200).send(responseObject);
    } catch (error) {
      console.error(error);
    }
  }
});

app.get("/", async ({ query }, response) => {
  const { code } = query;
  if (code) {
    try {
      const tokenResponseData = await request(`${baseUrl}/oauth2/token`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
          redirect_uri: `http://localhost:${process.env.PORT}`,
          scope: "identify",
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const oauthData = await tokenResponseData.body.json();
      const refreshDate = new Date();
      refreshDate.setDate(refreshDate.getDate() + 6);
      const responseObject = {
        accessToken: oauthData.access_token,
        refreshToken: oauthData.refresh_token,
        refreshDate
      };

      emitter.emit("getUser", responseObject);

      return response.send("<script>window.close();</script>");
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.TOKEN);
app.listen(process.env.PORT, () => console.log(`App listening at http://43.207.29.137:${process.env.PORT}`));

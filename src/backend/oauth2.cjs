/* eslint-disable */

const { request } = require("undici");
const express = require("express");
const { EventEmitter } = require("events");
const {
  port,
  token,
  extensionUrl,
  clientId,
  clientSecret,
  recursionGuildId,
} = require("../../public/config.json");
const cors = require("cors");
const { Client, Events, GatewayIntentBits, channelLink } = require("discord.js");

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
  console.log(client.user.username)
});

const pcEnv = {
  desktop: "kmhodbdddpfondeliogfpbfadficglhk",
  note: "hmodhebjgkhnijinieaamigglbabneea",
};

// サーバーにBOTを追加するURL
console.log(
  `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=2064&scope=bot%20applications.commands`
);

// Discord OAuth
const app = express();
const emitter = new EventEmitter();

const baseUrl = "https://discord.com/api";

app.use(
  cors({
    origin: `chrome-extension://${pcEnv.desktop}`,
  })
);

const getResponseObject = async (authorization, refreshToken, accessToken) => {
  const requestOption = {
    method: "GET",
    headers: {
      authorization,
    },
  };

  // recursionメンバーオブジェクト
  const memberResult = await request(
    `${baseUrl}/users/@me/guilds/${recursionGuildId}/member`,
    requestOption
  );
  const memberObject = await memberResult.body.json();

  //サーバーのユーザー取得
  const guild = await client.guilds.fetch(recursionGuildId);
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
    bot: {
      name: client.user.username,
      avatar: client.user.avatar
    },
    accessToken,
    refreshToken,
    username: memberObject.user.username,
    avatar: memberObject.user.avatar,
    id: memberObject.user.id,
    channels: channelObjectList,
  };
  console.log(responseObject)
  return responseObject;
};

app.get("/discord/user", async ({ query }, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const { accessToken, refreshToken } = query;
  const authorization = `Bearer ${accessToken}`
  const responseObject = await getResponseObject(authorization, refreshToken, accessToken);
  console.log(responseObject)
  response.send(responseObject)
});

app.get("/discord/oauth/user", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getUser", (tokenObject) => {
    return response.send(tokenObject);
  });
});

app.get("/discord/refresh", async ({ query }, response) => {
  const { refresh_token } = query;
  if (refresh_token) {
    try {
      const refreshTokenResponseData = await request(`${baseUrl}/oauth2/token`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "refresh_token",
          refresh_token: refresh_token,
          redirect_uri: `http://localhost:${port}`,
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const refreshData = await refreshTokenResponseData.body.json();
      const responseObject = await getResponseObject(
        `${refreshData.token_type} ${refreshData.access_token}`,
        refreshData.refresh_token,
        refreshData.access_token
      );

      response.send(responseObject);
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
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
          redirect_uri: `http://localhost:${port}`,
          scope: "identify",
        }).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const oauthData = await tokenResponseData.body.json();
      const responseObject = {
        accessToken: oauthData.access_token,
        refreshToken: oauthData.refresh_token
      }

      emitter.emit("getUser", responseObject);

      return response.send("<script>window.close();</script>");
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(token);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

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
const { Client, Events, GatewayIntentBits, channelLink } = require('discord.js');
const { channel } = require("diagnostics_channel");

// discord.bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const botRequestOption = {
  method: "GET",
  headers: {
    authorization: `Bot ${token}`,
  },
};

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once('ready', async (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

const pcEnv = {
  desktop: 'kbehbejpopkenmgnhpelbgljnepolfah',
  note: 'hmodhebjgkhnijinieaamigglbabneea'
}

// サーバーにBOTを追加するURL
console.log(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=2064&scope=bot%20applications.commands`)

// Discord OAuth
const app = express();
const emitter = new EventEmitter();

const baseUrl = "https://discord.com/api"
let memberObject
let textChannelObject

app.use(
  cors({
    origin: `chrome-extension://${pcEnv.desktop}`,
  })
);

app.get("/discord/user", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getUser", (userObject) => {
    return response.send(userObject);
  });
});

app.get("/discord/guild/channel`", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getChannel", (channelObject) => {
    return response.send(channelObject);
  });
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
      const userRequestOption = {
        method: "GET",
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      };

      // recursionメンバーオブジェクト
      const memberResult = await request(`${baseUrl}/users/@me/guilds/${recursionGuildId}/member`, userRequestOption);
      memberObject = await memberResult.body.json();
      console.log(memberObject)

      //サーバーのユーザー取得
      console.log("---サーバーメンバー---");
      const guild = await client.guilds.fetch(recursionGuildId);
      const members = await guild.members.list({ limit: 1000, cache: true })

      // userの参加しているテキストチャンネル
      const channelObjectList = []
      const channels = await guild.channels.fetch();
      channels
        .filter(channel => channel.members.some(member => member.user.id === memberObject.user.id) && channel.type === 0)
        .each(channel => {
          const channelObject = {
            id: channel.id,
            name: channel.name
          }
          channelObjectList.push(channelObject)
        })
      console.log(channelObjectList)

      const responseObject = {
        username: memberObject.user.username,
        avatar: memberObject.user.avatar,
        id: memberObject.user.id,
        channels: channelObjectList
      }
      emitter.emit('getUser', responseObject)

      // recursionテキストチャンネル

      return response.send("<script>window.close();</script>");
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(token);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

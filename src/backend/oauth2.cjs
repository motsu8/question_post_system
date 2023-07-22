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
const { Client, Events, GatewayIntentBits } = require('discord.js');

// discord.bot
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

const botRequestOption = {
  method: "GET",
  headers: {
    authorization: `Bot ${token}`,
  },
};

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
  // クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
  console.log(`準備OKです! ${c.user.tag}がログインします。`);

  // // サーバーのテキストチャンネルリストを取得
  // console.log("---サーバーのテキストチャンネルリスト---");
  const guild = client.guilds.cache.get(recursionGuildId);
  const textChannels = guild.channels.cache.first()
  const members = textChannels.members
  // console.log(members);
  // console.log("------");

  // // サーバーの特定のテキストチャンネルに参加しているメンバー取得
  // const members = textChannels.first().members;
  // console.log(members)
  // members.each((member) => console.log(member.displayName));

  // roles
  // const roles = guild.roles.cache.filter(role => role.name === "admin")
  // roles.each(role => console.log(role))
  // member.roles.cache.has('役職ID')
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
      const responseObject = {
        username: memberObject.user.display_name,
        avatar: memberObject.user.avatar,
        id: memberObject.user.id
      }
      emitter.emit('getUser', responseObject)

      // recursionテキストチャンネル

      return response.send("<script>window.close();</script>");
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }
});

client.login(token);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

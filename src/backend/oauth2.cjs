/* eslint-disable */

// TODO supabaseを使ってみる（DBを使いたいため）

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
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const app = express();
const emitter = new EventEmitter();

let userObject;
let guildsList;

console.log(`https://discord.com/api/guilds/${recursionGuildId}/channels`);

app.use(
  cors({
    origin: "chrome-extension://kbehbejpopkenmgnhpelbgljnepolfah",
  })
);

app.get("/user", (request, response) => {
  console.log(userObject);
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getUser", (userObject) => {
    console.log(userObject);
    return response.send(userObject);
  });
});

app.get("/", async ({ query }, response) => {
  const { code } = query;
  if (code) {
    try {
      const tokenResponseData = await request("https://discord.com/api/oauth2/token", {
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
      const requestOption = {
        method: "GET",
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      };
      console.log(oauthData);

      // user
      const userResult = await request("https://discord.com/api/users/@me", requestOption);
      userObject = await userResult.body.json();
      emitter.emit("getUser", userObject);

      // guildのアクセス可能なチャンネルリスト
      const guildChannels = await request(
        `https://discord.com/api/guilds/${recursionGuildId}`,
        requestOption
      );
      channelList = await guildChannels.body.json();
      console.log(channelList);

      return response.send("<script>window.close();</script>");
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);

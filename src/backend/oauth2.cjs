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

const pcEnv = {
  desktop: 'kbehbejpopkenmgnhpelbgljnepolfah',
  note: 'hmodhebjgkhnijinieaamigglbabneea'
}

// サーバーにBOTを追加するURL
console.log(`https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=2064&scope=bot%20applications.commands`)

const app = express();
const emitter = new EventEmitter();

const baseUrl = "https://discord.com/api"
let userObject;
let guildList;
let memberObject

app.use(
  cors({
    origin: `chrome-extension://${pcEnv.note}`,
  })
);

app.get("/user", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  emitter.once("getUser", (userObject) => {
    return response.send(userObject);
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
      const botRequestOption = {
        method: "GET",
        headers: {
          authorization: `Bot ${token}`,
        },
      };

      // recursionメンバーオブジェクト
      const memberResult = await request(`${baseUrl}/users/@me/guilds/${recursionGuildId}/member`, userRequestOption);
      memberObject = await memberResult.body.json();
      console.log(memberObject)
      const responseObject = {
        username: memberObject.user.display_name,
        avatar: memberObject.user.avatar,
        id: memberObject.user.id
      }
      emitter.emit('getUser', responseObject)

      return response.send("<script>window.close();</script>");
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

/* eslint-disable */

const { request } = require("undici");
const express = require("express");
const { EventEmitter } = require("events");
const { port, extensionUrl, clientId, clientSecret } = require("../../public/config.json");
const cors = require('cors');

const app = express();
const emitter = new EventEmitter();

let userObject;

app.use(cors({
  origin: 'chrome-extension://kbehbejpopkenmgnhpelbgljnepolfah'
}));

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
      const userResult = await request("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      userObject = await userResult.body.json();
      emitter.emit("getUser", userObject);

      return response.send("ok");
    } catch (error) {
      // NOTE: An unauthorized token will not throw an error
      // tokenResponseData.statusCode will be 401
      console.error(error);
    }
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

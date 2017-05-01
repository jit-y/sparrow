import createTwitterOAuth from "../../src/main/createTwitterOAuth";
import createTwitterClient from "../../src/main/createTwitterClient";
import fs from "fs";
import path from "path";

const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../.token.json"), "utf-8"))

const client = createTwitterClient(
  createTwitterOAuth(),
  tokens.accessToken, // Access Token
  tokens.accessSecret // Access Secret
);

client.homeTimeline().then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error);
});

import createTwitterOAuth from "../../src/main/createTwitterOAuth";
import createTwitterClient from "../../src/main/createTwitterClient";

const client = createTwitterClient(
  createTwitterOAuth(),
  "", // Access Token
  "" // Access Secret
);

client.homeTimeline().then(data => {
  console.log(JSON.stringify(data));
}).catch(error => {
  console.log(error);
});

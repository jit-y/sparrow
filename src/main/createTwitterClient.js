class TwitterClient {
  constructor(oauth, accessToken, accessSecret) {
    this.oauth = oauth;
    this.accessToken = accessToken;
    this.accessSecret = accessSecret;
  }

  verifyCredentials() {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        this.accessToken,
        this.accessSecret,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  userTimeline() {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        "https://api.twitter.com/1.1/statuses/user_timeline.json",
        this.accessToken,
        this.accessSecret,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data))
          }
        }
      )
    })
  }

  homeTimeline() {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        "https://api.twitter.com/1.1/statuses/home_timeline.json",
        this.accessToken,
        this.accessSecret,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      )
    })
  }
}

function createTwitterClient(oauth, accessToken, accessSecret) {
  return new TwitterClient(oauth, accessToken, accessSecret);
}

export default createTwitterClient;

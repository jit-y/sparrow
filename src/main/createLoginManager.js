import { app, shell, ipcMain, BrowserWindow } from "electron";
import createTwitterOAuth from "./createTwitterOAuth";
import createTwitterClient from "./createTwitterClient";
import path from "path";
import fs from "fs";

class LoginManager {
  constructor() {
    this.oauth = createTwitterOAuth();
    this.credentialPath = path.join(app.getPath("userData"), ".user_credentials");
    this.credentials = this.loadCredentials();
  }

  authenticate() {
    const credentials = this.loadCredentials()
    if (credentials) {
      return this.createClient().verifyCredentials()
        .catch(() => {
          this.getAccessToken()
            .then(credentials => {
              this.saveCredentials(credentials);
              return this.createClient().verifyCredentials()
            })
        })
    } else {
      return this.getAccessToken()
        .then(credentials => {
          this.saveCredentials(credentials);
          return this.createClient().verifyCredentials()
      })
    }
  }

  createClient() {
    return createTwitterClient(this.oauth, this.credentials.accessToken, this.credentials.accessSecret);
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthRequestToken((error, requestToken, requestSecret) => {
        if (error) {
          return reject(error);
        }
        shell.openExternal(`https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`);
        const windowOption = {
          width: 400,
          height: 120,
          maximizable: false,
          minimizable: false,
          resizable: false
        }
        const pincodeWindow = new BrowserWindow(windowOption);
        ipcMain.once("SEND_PIN", (e, {pincode}) => {
          this.oauth.getOAuthAccessToken(requestToken, requestSecret, pincode, (error, accessToken, accessSecret) => {
            if (error) {
              return reject(error);
            } else {
              resolve({accessToken, accessSecret});
              pincodeWindow.removeAllListeners("close");
              pincodeWindow.close();
            }
          });
        });
        ipcMain.once("CANCEL_PIN", () => pincodeWindow.close());
        pincodeWindow.on("close", () => reject("user_cancel"));
        pincodeWindow.loadURL(`file://${__dirname}/../auth.html`)
      })
    })
  }

  saveCredentials(credentials) {
    this.credentials = credentials;
    fs.writeFileSync(this.credentialPath, JSON.stringify(this.credentials), "utf-8");
  }

  loadCredentials() {
    try {
      const credentials = JSON.parse(fs.readFileSync(this.credentialPath, "utf-8"));
      return credentials
    } catch(e) {
      return null;
    }
  }
}

function createLoginManager() {
  return new LoginManager();
}

export default createLoginManager;

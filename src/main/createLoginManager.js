import { app, shell, ipcMain, BrowserWindow } from "electron";
import createTwitterOAuth from "./createTwitterOAuth";

class LoginManager {
  constructor() {
    this.oauth = createTwitterOAuth();
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
}

function createLoginManager() {
  return new LoginManager();
}

export default createLoginManager;

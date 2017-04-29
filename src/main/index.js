import { app, ipcMain } from "electron";
import createMainWindow from "./createMainWindow";
import createLoginManager from "./createLoginManager";

let mainWindow;

app.on("ready", () => {
  ipcMain.on("START_OAUTH", (e, data) => {
    e.preventDefault();
    const loginManager = createLoginManager();
    loginManager.getAccessToken()
      .then(({accessToken, accessSecret}) => {
        console.log(accessToken);
      })
      .catch((error) => {
        console.log(error);
      })
  })
  mainWindow = createMainWindow();
})

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

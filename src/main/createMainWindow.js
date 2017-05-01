import { BrowserWindow, shell, ipcMain } from "electron";
import createLoginManager from "./createLoginManager";
import path from "path";
import fs from "fs";

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 900,
      height: 700
    });
    this.window.loadURL(`file://${__dirname}/../index.html`);
    this.window.on("closed", () => {
      this.window = null;
    });
    this.window.webContents.on("will-navigate", (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });
    this.window.webContents.on("new-window", (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });
    const loginManager = createLoginManager();
    // loginManager.authenticate()
    //   .then(() => {
    //     this.window.webContents.send("AUTHENTICATED")
    //   });
    ipcMain.on("START_OAUTH", (e, data) => {
      e.preventDefault();
      loginManager.authenticate()
        .then(() => {
          this.window.webContents.send("AUTHENTICATED");
        });
    });
    ipcMain.on("FETCH_HOME_TIMELINE", (e, data) => {
      const dataPath = path.resolve(__dirname, "../../test/main/timeline.json");
      const timeline = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      this.window.webContents.send("HOME_TIMELINE", timeline);
    })
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;

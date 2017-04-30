import { BrowserWindow, shell, ipcMain } from "electron";
import createLoginManager from "./createLoginManager";

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 300,
      height: 600
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
    loginManager.authenticate()
      .then(() => {
        this.window.webContents.send("AUTHENTICATED")
      })
    ipcMain.on("START_OAUTH", (e, data) => {
      e.preventDefault();
      loginManager.authenticate()
        .then(() => {
          this.window.webContents.send("AUTHENTICATED")
        })
    })
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;

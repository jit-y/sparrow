import { BrowserWindow, shell } from "electron";

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({
      width: 800,
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
    })
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;

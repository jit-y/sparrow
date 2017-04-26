import { app, ipcMain } from "electron";
import createMainWindow from "./createMainWindow";

let mainWindow;

app.on("ready", () => {
  ipcMain.on("SEND_PINCODE", (e, {pincode}) => {
    e.preventDefault();
    console.log(pincode);
  })
  mainWindow = createMainWindow();
})

app.on("window-all-closed", () => {
  if (process.platform === "darwin") {
    app.quit();
  }
});

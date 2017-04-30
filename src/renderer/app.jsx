import React from "react";
import { render } from "react-dom";
import { ipcRenderer } from "electron";
import Layout from "./components/Layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
    this.handleOnClick = this.handleOnClick.bind(this);
    ipcRenderer.on("AUTHENTICATED", (e, args) => {
      this.setState({ isLogin: true });
    })
  }

  handleOnClick() {
    ipcRenderer.send("START_OAUTH")
  }

  render() {
    return <Layout {...this.state} />
  }
}

render(<App />, document.querySelector("#app"))

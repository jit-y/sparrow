import React from "react";
import { render } from "react-dom";
import { ipcRenderer } from "electron";
import Layout from "./components/Layout";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      contents: []
    }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillMount() {
    ipcRenderer.on("AUTHENTICATED", (e, args) => {
      this.setState({ isLogin: true });
    });
    ipcRenderer.once("HOME_TIMELINE", (e, data) => {
      this.setState({ contents: data });
    });
    this.fetchHomeTimeline();
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners("AUTHENTICATED");
  }

  handleOnClick() {
    ipcRenderer.send("START_OAUTH")
  }

  fetchHomeTimeline() {
    ipcRenderer.send("FETCH_HOME_TIMELINE")
  }

  render() {
    return <Layout {...this.state} handleOnClick={this.handleOnClick} />
  }
}

render(<App />, document.querySelector("#app"))

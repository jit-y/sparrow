import React from "react";
import { ipcRenderer } from "electron";

export default class Pincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: ""
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ pincode: e.target.value });
  }

  handleOnSubmit() {
    const { pincode } = this.state;
    if (!pincode) {
      return;
    }
    ipcRenderer.send("SEND_PINCODE", { pincode });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <input
          type="text"
          placeholder="Pincode"
          onChange={this.handleOnChange}
          value={this.state.pincode} />
        <button type="submit">OK</button>
      </form>
    )
  }
}

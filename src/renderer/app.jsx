import React from "react"
import { render } from "react-dom"

class App extend React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false
    }
  }

  authenticate() {
  }
}

render(<App />, document.querySelector("#app"))

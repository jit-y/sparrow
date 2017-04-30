import React from "react";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="wrapper">
          <form>
            <input type="textarea" />
            <button type="submit" className="btn btn--s">Tweet</button>
          </form>
        </div>
      </div>
    );
  }
}

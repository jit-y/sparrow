import React from "react";
import TweetForm from "./TweetForm";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="wrapper">
          <TweetForm />
        </div>
      </div>
    );
  }
}

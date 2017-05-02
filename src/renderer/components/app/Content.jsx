import React from "react";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.contents);
    return (
      <div className="content">
        <div className="wrapper">
          <TweetForm />
          <TweetList contents={this.props.contents} />
        </div>
      </div>
    );
  }
}

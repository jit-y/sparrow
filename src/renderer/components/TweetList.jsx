import React from "react";
import TweetListItem from "./TweetListItem";

const TweetList = (props) => {
  console.log(props.contents[0]);
  return (
    <div className="timeline">
      {props.contents.map((content, index) => <TweetListItem content={content} key={index} />)}
    </div>
  )
}

export default TweetList;

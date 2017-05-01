import React from "react";
import styles from "./TweetListItem.scss"

const TweetListItem = (props) => {
  console.log(styles);
  return (
    <div className="tweet">
      <img src={props.content.user.profile_image_url} className="user__icon" />
      <span className="user__name">{props.content.user.name}</span>
      <p className="tweet__text">{props.content.text}</p>
      <p className={styles.text}></p>
    </div>
  )
}

export default TweetListItem;

import React from "react";

export default class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnPost = this.handleOnPost.bind(this);
  }

  handleOnChange(e) {
    this.setState({ message: e.target.value });
  }

  handleOnPost(e) {
    if (!this.state.message.length) {
      return;
    }
    this.setState({message: ""});
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <textarea onChange={this.handleOnChange} value={this.state.message} />
        <div>{this.state.message}</div>
        <button type="button" className="btn btn--s" onClick={this.handleOnPost}>Tweet</button>
      </form>
    )
  }
}

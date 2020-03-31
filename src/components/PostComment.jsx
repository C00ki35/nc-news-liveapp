import React, { Component } from "react";
import Details from "./Context";

class PostComment extends Component {
  state = {
    comment: "",
    loggedin: false
  };

  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    console.log(this.props.username);
    event.preventDefault();
    this.props.addComment(
      this.props.username,
      this.state.comment,
      this.props.article_id
    );
    this.setState({ comment: "" });
  };

  render() {
    if (this.props.logged === false) {
      return (
        <Details.Consumer>
          {context => (
            <div className={"post-comment"}>Login to post a comment</div>
          )}
        </Details.Consumer>
      );
    }
    return (
      <div className={"post-comment"}>
        <form onSubmit={this.handleSubmit}>
          <label>
            <textarea
              className={"comment-textbox"}
              name="comment"
              required
              value={this.state.comment}
              onChange={this.handleChange}
            ></textarea>
            <p />
          </label>
          {console.log(this.state.comment)}

          <button className={"add-comment-button"} type="submit">
            Add comment
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;

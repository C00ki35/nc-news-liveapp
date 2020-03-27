import React, { Component } from "react";

class PostComment extends Component {
  state = {
    comment: "",
    username: sessionStorage.getItem("user")
  };

  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComment(
      this.state.username,
      this.state.comment,
      this.props.article_id
    );
    this.setState({ comment: "" });
  };

  render() {
    if (!sessionStorage.getItem("loggedin")) {
      return <div className={"post-comment"}>Login to post a comment</div>;
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

          <button className={"add-comment-button"} type="submit">
            Add comment
          </button>
        </form>
      </div>
    );
  }
}

export default PostComment;

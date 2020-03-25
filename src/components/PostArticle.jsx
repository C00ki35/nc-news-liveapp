import React, { Component } from "react";

class PostComment extends Component {
  state = {
    comment: ""
  };

  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComment(this.state.comment, this.props.article_id);
    this.setState({ comment: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <input
              name="comment"
              required
              value={this.state.comment}
              onChange={this.handleChange}
            ></input>
          </label>

          <button type="submit">Add comment</button>
        </form>
      </div>
    );
  }
}

export default PostComment;

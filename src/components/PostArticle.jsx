import React, { Component } from "react";
import * as api from "../utils/api";

class PostComment extends Component {
  state = {
    title: "",
    body: "",
    author: sessionStorage.getItem("user")
  };

  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    api.postArticle(
      this.state.title,
      this.state.body,
      this.props.topic,
      this.state.author
    );
    this.setState({ body: "", title: "" });
    this.props.articleUpdated("passed");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            What do you want to add?:
            <input
              name="body"
              required
              value={this.state.body}
              onChange={this.handleChange}
            ></input>
          </label>

          <button type="submit">Add article for this topic</button>
        </form>
      </div>
    );
  }
}

export default PostComment;

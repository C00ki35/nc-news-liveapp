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
      <div className={"post-article"}>
        <form onSubmit={this.handleSubmit}>
          <label className={"formLabels"}>
            Title:
            <input
              className={"article-title-textbox"}
              name="title"
              required
              value={this.state.title}
              onChange={this.handleChange}
            ></input>
          </label>
          <p />
          <label>
            What do you want to add?:
            <p />
            <textarea
              className={"article-textbox"}
              name="body"
              required
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </label>
          <p />
          <div>
            <button className={"add-comment-button"} type="submit">
              Add article
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostComment;

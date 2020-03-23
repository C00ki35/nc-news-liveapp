import React, { Component } from "react";
import * as api from "../utils/api";
class FullArticle extends Component {
  state = {
    article: "",
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    api.articleWithComments(this.props.article_id).then(result => {
      this.setState({
        article: result.article,
        comments: result.comments,
        isLoading: false
      });
    });
  }
  render() {
    if (this.state.isLoading) return <p>Loading....</p>;
    return (
      <article>
        {console.log(this.state.article)}
        <h4>{this.state.article.title}</h4>
        <hr />
        <p>{this.state.article.body}</p>
        <hr />
        {this.state.article.topic}
        {this.state.article.author}
        {this.state.article.votes}
      </article>
    );
  }
}

export default FullArticle;

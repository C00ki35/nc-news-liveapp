import React, { Component } from "react";
import * as api from "../utils/api";
import ViewToggler from "./ViewToggler";
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
        <h4>{this.state.article.title}</h4>
        <hr />
        <p>{this.state.article.body}</p>
        <hr />
        {this.state.article.topic}
        <hr />
        Votes: {this.state.article.votes}
        <hr />
        Comments:{this.state.article.comment_count}
        <ViewToggler>
          <div></div>
          {this.state.comments.map(
            ({ body, votes, comment_id, author, created_at }) => {
              return (
                <div key={comment_id}>
                  <hr />
                  {body} <br />
                  Votes: {votes} | Author: {author}
                </div>
              );
            }
          )}
        </ViewToggler>
      </article>
    );
  }
}

export default FullArticle;

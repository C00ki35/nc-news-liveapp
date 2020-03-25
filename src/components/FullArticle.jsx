import React, { Component } from "react";
import * as api from "../utils/api";
import ViewToggler from "./ViewToggler";
import PostComment from "./PostComment";
import Vote from "./Vote";
import ArticleVote from "./ArticleVote";
import Loading from "./Loading";
import ErrorHandler from "./ErrorHandler";
class FullArticle extends Component {
  state = {
    article: "",
    comments: [],
    isLoading: true,
    commentAdded: false,
    error: false,
    error_message: ""
  };

  componentDidMount() {
    api
      .articleWithComments(this.props.article_id)
      .then(result => {
        this.setState({
          article: result.article,
          comments: result.comments,
          isLoading: false
        });
      })
      .catch(error => {
        const message = error.msg;
        this.setState({
          error: true,
          isLoading: false,
          error_message: message
        });
      });
  }

  addComment = (username, comment) => {
    api
      .postComment(username, comment, this.props.article_id)
      .then(({ data: { comment } }) => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      });
  };

  render() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.error) {
      return <ErrorHandler message={this.state.error_message} />;
    }
    const allComments = this.state.comments.map(
      ({ body, votes, comment_id, author }) => {
        return (
          <div key={comment_id}>
            <hr />
            {sessionStorage.getItem("user") === author ? (
              <button>Delete</button>
            ) : (
              "NOPE"
            )}
            {body} <br />| Author: {author}
            <Vote comment_id={comment_id} votes={votes} />
          </div>
        );
      }
    );
    return (
      <article>
        <ViewToggler buttonName={"comment"}>
          <PostComment
            article_id={this.state.article.article_id}
            addComment={this.addComment}
          />
        </ViewToggler>
        <h4>{this.state.article.title}</h4>
        <hr />
        <p>{this.state.article.body}</p>
        <hr />
        {this.state.article.topic}
        <hr />
        <ArticleVote
          article_id={this.state.article.article_id}
          votes={this.state.article.votes}
        />
        <hr />
        {allComments}
      </article>
    );
  }
}

export default FullArticle;

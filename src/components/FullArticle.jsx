import React, { Component } from "react";
import * as api from "../utils/api";
import ViewToggler from "./ViewToggler";
import PostComment from "./PostComment";
import Vote from "./Vote";
import Loading from "./Loading";
import ErrorHandler from "./ErrorHandler";
class FullArticle extends Component {
  state = {
    article: "",
    comments: [],
    isLoading: true,
    commentAdded: false,
    error: false,
    message: "",
    commentdeleted: false
  };

  componentDidMount() {
    this.getArticle();
  }

  getArticle = () => {
    console.log("doning this bit");
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
        const errorMessage = {
          status: `Status: ${error.response.status} ${error.response.statusText}`,
          msg: `Article ${this.props.article_id} not here`
        };
        this.setState({
          error: true,
          isLoading: false,
          message: errorMessage
        });
      });
  };

  addComment = (username, comment) => {
    api
      .postComment(username, comment, this.props.article_id)
      .then(({ data: { comment } }) => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      });
  };

  deleteComment = event => {
    api.deleteComment(event.target.id).then(result => {
      this.getArticle();
    });
  };

  render() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.error) {
      return <ErrorHandler error={this.state.message} />;
    }
    const allComments = this.state.comments.map(
      ({ body, votes, comment_id, author }) => {
        return (
          <div key={comment_id}>
            <hr />
            {sessionStorage.getItem("user") === author ? (
              <button id={comment_id} onClick={this.deleteComment}>
                Delete
              </button>
            ) : null}
            {body} <br />| Author: {author}
            <Vote item_id={comment_id} votes={votes} type={"comments"} />
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
        <Vote
          item_id={this.state.article.article_id}
          votes={this.state.article.votes}
          type={"articles"}
        />
        <hr />
        {allComments}
      </article>
    );
  }
}

export default FullArticle;

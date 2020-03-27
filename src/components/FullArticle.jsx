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
        this.setState(
          currentState => {
            return { comments: [comment, ...currentState.comments] };
          },
          () => {
            this.getArticle();
          }
        );
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
          <article key={comment_id} className={"comment-section"}>
            <div className={"comment-block"} key={comment_id}>
              <div>
                Author: {author}
                <Vote item_id={comment_id} votes={votes} type={"comments"} />
                {sessionStorage.getItem("user") === author ? (
                  <button
                    className={"delete-button"}
                    delete-button
                    id={comment_id}
                    onClick={this.deleteComment}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              <div className={"comment-body"}>{body}</div>
            </div>
          </article>
        );
      }
    );
    return (
      <>
        <article className={"display-article"}>
          <div className={"article-section"}>
            <ViewToggler buttonName={"comment"}>
              <PostComment
                article_id={this.state.article.article_id}
                addComment={this.addComment}
              />
            </ViewToggler>
            <h4>{this.state.article.title}</h4>
            {this.state.article.body}
            {this.state.article.topic}
            <hr />
            <Vote
              item_id={this.state.article.article_id}
              votes={this.state.article.votes}
              type={"articles"}
            />
            Comments: {this.state.article.comment_count}
          </div>
        </article>
        <div className={"display-article"}>{allComments}</div>
      </>
    );
  }
}

export default FullArticle;

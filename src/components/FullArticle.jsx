import React, { Component } from "react";
import * as api from "../utils/api";
import ViewToggler from "./ViewToggler";
import PostComment from "./PostComment";
import Vote from "./Vote";
class FullArticle extends Component {
  state = {
    article: "",
    comments: [],
    isLoading: true,
    commentAdded: false
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

  addComment = comment => {
    api
      .postComment(comment, this.props.article_id)
      .then(({ data: { comment } }) => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      });
  };

  // vote = (item_id, vote) => {
  //   api.vote(item_id, vote);
  //   this.setState((currentState) => {
  //     return (current)
  //   })
  // };

  render() {
    if (this.state.isLoading) return <p>Loading....</p>;
    return (
      <article>
        <ViewToggler>
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
        Votes: {this.state.article.votes}
        <hr />
        Comments:{this.state.article.comment_count}
        <div></div>
        {this.state.comments.map(
          ({ body, votes, comment_id, author, created_at }) => {
            return (
              <div key={comment_id}>
                <hr />
                {body} <br />| Author: {author}
                <Vote comment_id={comment_id} vote={this.vote} votes={votes} />
              </div>
            );
          }
        )}
      </article>
    );
  }
}

export default FullArticle;

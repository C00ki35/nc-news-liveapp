import React from "react";
import { Link } from "@reach/router";
import "../App.css";
import Details from "./Context";

const ArticleItems = props => {
  return (
    <Details.Consumer>
      {context => (
        <section className={"article-section"}>
          <header className="article-header">
            <Link to={`/articles/${props.topic}/${props.article_id}`}>
              {props.title} ...
            </Link>
          </header>
          <div className={"article-body"}>
            Author: {props.author}
            Date: {new Date(props.created_at).toLocaleDateString()}
            <br />
            Votes: {props.votes} - comments: {props.comment_count}
            <br />
            {context.state.username === props.author ? (
              <button
                className={"delete-button"}
                onClick={() => props.deleteArticle(props.article_id)}
              >
                Delete
              </button>
            ) : null}
          </div>
        </section>
      )}
    </Details.Consumer>
  );
};

export default ArticleItems;

import React, { Component } from "react";
import * as api from "../utils/api";
import "../App.css";
import ArticleItem from "./ArticleItem";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: []
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic_id !== prevProps.topic_id) {
      api.allArticles(this.props.topic_id).then(data => {
        this.setState({ articles: data.articles, isLoading: false });
      });
    }
  }

  getArticles() {
    api.allArticles(this.props.topic_id).then(data => {
      this.setState({ articles: data.articles, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) return <p>Loading....</p>;
    return (
      <main className={"articles"}>
        {this.state.articles.map(article => {
          return <ArticleItem key={article.article_id} {...article} />;
        })}
      </main>
    );
  }
}

export default Articles;

import React, { Component } from "react";
import * as api from "../utils/api";
import "../App.css";
import ArticleItems from "./ArticleItems";
import OrganiseArticles from "./OrganiseArticles";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
    order: "",
    sort_by: ""
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic_id !== prevProps.topic_id) {
      this.getArticles(this.props.topic_id);
    }
  }

  sortby = (topic, sort_by) => {
    api.allArticles(topic, sort_by).then(data => {
      this.setState({
        articles: data.articles,
        isLoading: false
      });
    });
  };

  getArticles = () => {
    api.allArticles(this.props.topic_id).then(data => {
      this.setState({ articles: data.articles, isLoading: false });
    });
  };

  render() {
    if (this.state.isLoading) return <p>Loading....</p>;
    return (
      <main className={"articles"}>
        Currently in: {this.props.topic_id}
        <OrganiseArticles topic={this.props.topic_id} sortby={this.sortby} />
        {this.state.articles.map(article => {
          return <ArticleItems key={article.article_id} {...article} />;
        })}
      </main>
    );
  }
}

export default Articles;

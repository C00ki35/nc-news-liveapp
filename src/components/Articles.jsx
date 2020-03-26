import React, { Component } from "react";
import * as api from "../utils/api";
import "../App.css";
import ArticleItems from "./ArticleItems";
import OrganiseArticles from "./OrganiseArticles";
import Loading from "./Loading";
import ErrorHandling from "../components/ErrorHandler";
import PostArticle from "./PostArticle";
import ViewToggler from "./ViewToggler";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
    order: "",
    sort_by: "",
    error: false,
    message: "",
    articleAdded: false
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic_id !== prevProps.topic_id) {
      this.getArticles(this.props.topic_id);
    }
    if (this.state.articleAdded) {
      this.getArticles(this.props.topic_id);
    }
  }

  sortby = (topic, sort_by) => {
    api.allArticles(topic, sort_by).then(data => {
      this.setState({
        articles: data.articles,
        isLoading: false,
        sort_by: sort_by
      });
    });
  };

  getArticles = () => {
    api
      .allArticles(this.props.topic_id)
      .then(data => {
        this.setState({
          articles: data.articles,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
          message: error
        });
      });
  };

  articleAdded = () => {
    this.setState({ articleAdded: true });
  };

  render() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.error) return <ErrorHandling error={this.state.message} />;

    return (
      <main className={"articles"}>
        {sessionStorage.getItem("loggedin") &&
        this.props.topic_id !== undefined ? (
          <ViewToggler buttonName={"article"}>
            <PostArticle
              topic={this.props.topic_id}
              articleUpdated={this.articleAdded}
            />
          </ViewToggler>
        ) : null}
        Currently in:{" "}
        {this.props.topic_id === undefined ? "All topics" : this.props.topic_id}
        <OrganiseArticles
          topic={this.props.topic_id}
          sortby={this.sortby}
          sortby_topic={this.state.sort_by}
        />
        {this.state.articles.map(article => {
          return <ArticleItems key={article.article_id} {...article} />;
        })}
      </main>
    );
  }
}

export default Articles;

import React, { Component } from "react";
import * as api from "../utils/api";
import "../App.css";
import ArticleItems from "./ArticleItems";
import OrganiseArticles from "./OrganiseArticles";
import Loading from "./Loading";
import ErrorHandling from "../components/ErrorHandler";
import PostArticle from "./PostArticle";
import ViewToggler from "./ViewToggler";
import Details from "./Context";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: [],
    order: "",
    sort_by: "",
    error: false,
    message: "",
    articleAdded: false,
    articleDeleted: false,
    logged: false
  };

  componentDidMount() {
    // Articles.contextType = Details;
    this.getArticles();
    // let value = this.context;

    // if (value.state !== undefined) {
    //   this.setState({ logged: value.state.login });
    // }
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

  deleteArticle = article_id => {
    api.deleteArticle(article_id).then(response => {
      this.getArticles();
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
        const errorMessage = {
          status: `Status: ${error.response.status} ${error.response.statusText}`,
          msg: `${this.props.topic_id} not here`
        };
        this.setState({
          error: true,
          isLoading: false,
          message: errorMessage
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
      <Details.Consumer>
        {context => (
          <main className={"articles"}>
            <div className={"currently-in"}>
              Currently in:{" "}
              {this.props.topic_id === undefined
                ? "All topics"
                : this.props.topic_id}
            </div>
            <OrganiseArticles
              topic={this.props.topic_id}
              sortby={this.sortby}
              sortby_topic={this.state.sort_by}
            />
            {context.state.login && this.props.topic_id !== undefined ? (
              <ViewToggler buttonName={"article"}>
                <PostArticle
                  author={context.state.username}
                  topic={this.props.topic_id}
                  articleUpdated={this.articleAdded}
                />
              </ViewToggler>
            ) : null}

            {this.state.articles.map(article => {
              return (
                <ArticleItems
                  deleteArticle={this.deleteArticle}
                  key={article.article_id}
                  {...article}
                />
              );
            })}
          </main>
        )}
      </Details.Consumer>
    );
  }
}

export default Articles;

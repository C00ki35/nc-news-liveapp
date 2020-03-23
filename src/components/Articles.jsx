import React, { Component } from "react";
import * as api from "../utils/api";
import "../App.css";

class Articles extends Component {
  state = {
    isLoading: true,
    articles: []
  };

  componentDidMount() {
    api.allArticles().then(({ articles }) => {
      this.setState(articles => {
        return { articles, isLoading: false };
      });
    });
  }

  render() {
    if (this.state.isLoading) return <p>Loading....</p>;
    return <main className={"articles"}>Article or articles go here</main>;
  }
}

export default Articles;

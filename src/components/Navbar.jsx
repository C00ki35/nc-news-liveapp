import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import "../App.css";

class Navbar extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    api.fetchTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  }

  render() {
    return (
      <nav className={"nav-bar"}>
        {this.state.topics.map(topic => {
          return (
            <div key={topic.slug}>
              <Link to={`articles/${topic.slug}`}>{topic.slug}</Link>
            </div>
          );
        })}
      </nav>
    );
  }
}

export default Navbar;

import React, { Component } from "react";
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
          return <div key={topic.slug}>{topic.slug}</div>;
        })}
      </nav>
    );
  }
}

export default Navbar;

import React, { Component } from "react";
import * as api from "../utils/api";

class Vote extends Component {
  state = {
    vote: 0
  };

  handleChange = star => {
    api.articleVote(this.props.article_id, star);
    this.setState(currentState => {
      return { vote: currentState.vote + star };
    });
  };

  render() {
    {
    }
    return (
      <>
        <div
          onClick={event => {
            this.handleChange(1);
          }}
        >
          <i className="fas fa-arrow-circle-up"></i>
        </div>
        <div
          onClick={event => {
            this.handleChange(-1);
          }}
        >
          <i className="fas fa-arrow-alt-circle-down"></i>
        </div>
        <div>{this.state.vote + this.props.votes}</div>
      </>
    );
  }
}

export default Vote;

import React, { Component } from "react";
import * as api from "../utils/api";
class Vote extends Component {
  state = {
    votes: 0
  };
  voteUpdater = vote => {
    api.vote(this.props.item_id, vote, this.props.type);
    this.setState(currentState => {
      return { votes: currentState.votes + vote };
    });
  };
  render() {
    const { votes } = this.state;
    return (
      <div>
        {console.log(this.state.votes)}
        <button
          disabled={votes > 0}
          onClick={event => {
            this.voteUpdater(1);
          }}
        >
          <span role="img" aria-label="thumbs up">
            👍
          </span>
        </button>{" "}
        Votes: {this.props.votes + votes}
        <button
          disabled={votes < 0}
          onClick={event => {
            this.voteUpdater(-1);
          }}
        >
          <span role="img" aria-label="thumbs down">
            👎
          </span>
        </button>
      </div>
    );
  }
}
export default Vote;

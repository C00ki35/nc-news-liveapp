import React, { Component } from "react";
import * as api from "../utils/api";
import Details from "./Context";
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
      <Details.Consumer>
        {context => (
          <div className={"voter"}>
            {console.log(context.state.login)}
            <button
              disabled={votes > 0 || context.state.login === false}
              onClick={event => {
                if (this.state.votes !== 1) {
                  this.voteUpdater(1);
                }
              }}
            >
              <span role="img" aria-label="vote-up">
                <i className="fas fa-arrow-circle-up"></i>
              </span>
            </button>
            Votes: {this.props.votes + votes}
            <button
              disabled={votes < 0 || context.state.login === false}
              onClick={event => {
                if (this.state.votes !== 0) {
                  this.voteUpdater(-1);
                }
              }}
            >
              <span role="img" aria-label="vote-down">
                <i className="fas fa-arrow-circle-down"></i>
              </span>
            </button>
          </div>
        )}
      </Details.Consumer>
    );
  }
}
export default Vote;

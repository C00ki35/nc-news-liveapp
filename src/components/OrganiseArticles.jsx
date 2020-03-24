import React, { Component } from "react";

class OrganiseArticles extends Component {
  render() {
    return (
      <div>
        <button
          onClick={event => this.props.sortby(this.props.topic, "created_at")}
        >
          New topics
        </button>
        <button onClick={event => this.props.sortby(this.props.topic, "votes")}>
          Votes
        </button>
        <button
          onClick={event =>
            this.props.sortby(this.props.topic, "comment_count")
          }
        >
          Comments
        </button>
      </div>
    );
  }
}

export default OrganiseArticles;

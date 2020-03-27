import React, { Component } from "react";

class ViewToggler extends Component {
  state = {
    isVisible: false
  };

  handleClick = () => {
    this.setState(currentState => {
      return { isVisible: !currentState.isVisible };
    });
  };

  render() {
    return (
      <div className={"add-article-comment"}>
        <button className={"add-button"} onClick={this.handleClick}>
          {this.state.isVisible
            ? "Maybe later"
            : `Add a new ${this.props.buttonName}`}
        </button>
        {this.state.isVisible && this.props.children}
      </div>
    );
  }
}

export default ViewToggler;

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
      <>
        <button className={"info-button"} onClick={this.handleClick}>
          {this.state.isVisible ? "Less info" : "More info"}
        </button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewToggler;

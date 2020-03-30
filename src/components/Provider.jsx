import React, { Component } from "react";
import Details from "./Context";

class Provider extends Component {
  state = {
    username: "",
    login: false
  };

  render() {
    return (
      <Details.Provider
        value={{
          state: this.state,
          setUsername: user =>
            this.setState({
              username: user,
              login: true
            })
        }}
      >
        {this.props.children}
      </Details.Provider>
    );
  }
}

export default Provider;

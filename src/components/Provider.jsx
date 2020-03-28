import React, { Component } from "react";
const Details = React.createContext();

class Provider extends Component {
  state = {
    username: "Hello"
  };

  render() {
    return (
      <Details.Provider value={{ state: this.state }}>
        {this.props.children}
      </Details.Provider>
    );
  }
}

export default Provider;

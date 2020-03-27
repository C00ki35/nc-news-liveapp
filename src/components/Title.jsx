import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";

class Title extends Component {
  render() {
    return (
      <header className={"title"}>
        <div className={"title-login"}>
          <h1>Northcoders News</h1>
          {this.props.loggedin}
          {this.props.loggedin ? null : (
            <Link to={`login/`}>
              <i style={{ color: "white" }} className="fas fa-user fa-2x"></i>
            </Link>
          )}
        </div>
      </header>
    );
  }
}

export default Title;

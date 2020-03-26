import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";

class Title extends Component {
  render() {
    return (
      <header className={"header"}>
        NC news <br />
        Logged in as: {this.props.loggedin}
        {this.props.loggedin ? (
          <div>{sessionStorage.getItem("user")}</div>
        ) : (
          <Link to={`login/`}>
            <i className="far fa-user-circle"></i>
          </Link>
        )}
      </header>
    );
  }
}

export default Title;

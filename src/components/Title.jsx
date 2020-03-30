import React, { Component } from "react";
import { Link } from "@reach/router";
import "../App.css";
import Details from "./Context";

class Title extends Component {
  render() {
    return (
      <Details.Consumer>
        {context => (
          <header className={"title"}>
            <div className={"title-login"}>
              <h1>Northcoders News</h1>
              {context.state.login ? (
                context.state.username
              ) : (
                <Link to={`login/`}>
                  <i
                    style={{ color: "white" }}
                    className="fas fa-user fa-2x"
                  ></i>
                </Link>
              )}
            </div>
          </header>
        )}
      </Details.Consumer>
    );
  }
}

export default Title;

import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import Details from "./Context";

class Login extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    attemptedLogin: false,
    userLoggedin: false
  };

  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .loginUser(this.state.username, this.state.password)
      .then(({ data }) => {
        this.setState(currentState => {
          return {
            attemptedLogin: true,
            username: this.state.username,
            userLoggedin: true
          };
        });
      })
      .catch(error => {
        this.setState({
          errormessage: `Sorry - user not found.`
        });
      });
  };

  componentDidUpdate() {
    if (this.state.attemptedLogin === true) {
      let value = this.context;
      value.setUsername(this.state.username);
      this.setState({ attemptedLogin: false });
    }
    Login.contextType = Details;
  }

  render() {
    if (this.state.userLoggedin === true) {
      return (
        <Details.Consumer>
          {context => (
            <main className={"login"}>
              <div className={"login-box"}>
                <p>Logged in as:</p>
                {context.state.username}
                <Link to={`/`}>View Articles</Link>
              </div>
            </main>
          )}
        </Details.Consumer>
      );
    }

    return (
      <Details.Consumer>
        {context => (
          <main className={"login"}>
            <div>{this.state.errormessage}</div>
            <div className={"login-box"}>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Username:
                  <input
                    name="username"
                    required
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></input>
                </label>
                <label>
                  Password:
                  <input
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></input>
                </label>
                <button type="submit">Login</button>
              </form>
            </div>
          </main>
        )}
      </Details.Consumer>
    );
  }
}

export default Login;

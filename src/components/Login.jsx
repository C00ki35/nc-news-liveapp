import React, { Component } from "react";
import * as api from "../utils/api";

class Login extends Component {
  state = {
    name: "",
    username: "",
    loggedin: false
  };
  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .loginUser(this.state.username)
      .then(({ data }) => {
        sessionStorage.setItem("user", data.user.username);
        sessionStorage.setItem("loggedin", true);
        this.setState({ errormessage: "" });
        this.props.loggedin();
      })
      .catch(error => {
        this.setState({
          errormessage: `Sorry - user not found.`
        });
      });
    this.setState({ username: "" });
  };

  render() {
    if (sessionStorage.getItem("user")) {
      return (
        <div>
          <p>You are now logged in as: {sessionStorage.getItem("user")}</p>
        </div>
      );
    }
    return (
      <div>
        {this.state.errormessage}
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;

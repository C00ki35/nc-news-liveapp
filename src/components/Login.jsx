import React, { Component } from "react";
import * as api from "../utils/api";

class Login extends Component {
  state = {
    name: "",
    username: ""
  };
  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    api.login(this.state.username).then(({ data }) => {
      sessionStorage.setItem("user", data.user.username);
      sessionStorage.setItem("loggedin", true);
    });
    this.setState({ username: "" });
  };

  render() {
    return (
      <div>
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

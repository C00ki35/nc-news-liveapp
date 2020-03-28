import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Login extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    loggedin: false
  };
  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  handleSubmit = event => {
    event.preventDefault();
    api.loginUser(this.state.username, this.state.password);
    //   .then(({ data }) => {
    //     sessionStorage.setItem("user", data.user.username);
    //     sessionStorage.setItem("loggedin", true);
    //     this.setState({ errormessage: "" });
    //     this.props.loggedin();
    //   })
    //   .catch(error => {
    //     this.setState({
    //       errormessage: `Sorry - user not found.`
    //     });
    //   });
    // this.setState({ username: "" });
  };

  render() {
    if (sessionStorage.getItem("user")) {
      return (
        <main className={"login"}>
          <div className={"login-box"}>
            <p>Logged in</p>
            <Link to={`/`}>View Articles</Link>
          </div>
        </main>
      );
    }
    return (
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
    );
  }
}

export default Login;

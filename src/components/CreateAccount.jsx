import React from "react";
import * as api from "../utils/api";

class CreateAccount extends React.Component {
  state = {
    name: "",
    username: ""
  };
  handleChange = event => {
    const key = event.target.name;
    const info = event.target.value;
    this.setState({ [key]: info });
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   api.addNewUser(this.state.name, this.state.username);
  //   this.setState({ name: "", username: "" });
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </label>
          <label>
            Username:
            <input
              name="username"
              required
              value={this.state.username}
              onChange={this.handleChange}
            ></input>
          </label>
          <button type="submit">Create User</button>
        </form>

        {localStorage.getItem("user")}
      </div>
    );
  }
}

export default CreateAccount;

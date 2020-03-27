// import React from "react";

// export default props => {
//   return (
//     <Menu>
//       <a className="menu-item" href="/">
//         Home
//       </a>

//       <a className="menu-item" href="/burgers">
//         Burgers
//       </a>

//       <a className="menu-item" href="/pizzas">
//         Pizzas
//       </a>

//       <a className="menu-item" href="/desserts">
//         Desserts
//       </a>
//     </Menu>
//   );
// };

import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../utils/api";
import { slide as Menu } from "react-burger-menu";
import "../App.css";

class Navbar extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    api.fetchTopics().then(({ topics }) => {
      this.setState({ topics });
    });
  }

  render() {
    return (
      <Menu right disableAutoFocus>
        {this.state.topics.map(topic => {
          return (
            <div key={topic.slug}>
              <Link to={`articles/${topic.slug}`}>{topic.slug}</Link>
            </div>
          );
        })}
        {!this.props.loggedin ? (
          <Link to={`/account`}>Create Account</Link>
        ) : null}
      </Menu>
    );
  }
}

export default Navbar;

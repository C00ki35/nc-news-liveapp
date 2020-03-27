import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Title from "./components/Title";
import Articles from "./components/Articles";
import FullArticle from "./components/FullArticle";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import SideBar from "./components/SideBar";

class App extends React.Component {
  state = {
    loggedin: false
  };

  isloggedin = () => {
    this.setState({ loggedin: true });
  };

  render() {
    return (
      <div id="App">
        <SideBar loggedin={this.state.loggedin} />
        <Title loggedin={this.state.loggedin} />
        <Router>
          <Articles path="/" />
          <Articles path="articles/:topic_id" />
          <FullArticle path="articles/:topic/:article_id" />
          <CreateAccount path="account/" />
          <Login path="login/" loggedin={this.isloggedin} />
        </Router>
      </div>
    );
  }
}

export default App;

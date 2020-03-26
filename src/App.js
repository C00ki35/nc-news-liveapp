import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import FullArticle from "./components/FullArticle";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";

class App extends React.Component {
  state = {
    loggedin: false
  };

  isloggedin = () => {
    this.setState({ loggedin: true });
  };

  render() {
    return (
      <div className="App">
        {console.log("Logged in: " + this.state.loggedin)}
        <Title loggedin={this.state.loggedin} />
        <Navbar loggedin={this.state.loggedin} />
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

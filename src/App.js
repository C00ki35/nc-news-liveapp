import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";

function App() {
  return (
    <div className="App">
      <Title />
      <Navbar />
      <Router>
        <Articles path="/" />
        <Articles path="article/:article_id" />
      </Router>
    </div>
  );
}

export default App;

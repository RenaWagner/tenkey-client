import React from "react";
import "./App.css";
import { Switch } from "react-router";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Switch></Switch>
    </div>
  );
}

export default App;

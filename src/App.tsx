import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;

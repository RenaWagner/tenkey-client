import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ForecastPage from "./pages/ForecastPage/ForecastPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import StylePage from "./pages/StylePage/StylePage";
import UpdateStylePage from "./pages/UpdateStylePage/UpdateStylePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/forecast" component={ForecastPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/style" component={StylePage} />
        <Route path="/update/:type/:id" component={UpdateStylePage} />
      </Switch>
    </div>
  );
}

export default App;

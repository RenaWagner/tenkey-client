import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ForecastPage from "./pages/ForecastPage/ForecastPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import StylePage from "./pages/StylePage/StylePage";
import UpdateStylePage from "./pages/UpdateStylePage/UpdateStylePage";
import UploadPage from "./pages/UploadPage/UploadPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ShowProfilePage from "./pages/ShowProfilePage/ShowProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { bootstrapLoginState } from "./store/user/actions";
import Messages from "./components/Messages/Messages";
import { selectMessage } from "./store/message/selectors";

function App() {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);

  useEffect(() => {
    dispatch(bootstrapLoginState());
  }, [dispatch]);

  return (
    <div className="App">
      <NavBar />
      {message ? <Messages /> : <></>}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/forecast" component={ForecastPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/style" component={StylePage} />
        <Route path="/update/:type/:id" component={UpdateStylePage} />
        <Route path="/upload" component={UploadPage} />
        <Route exact path="/profile" component={ShowProfilePage} />
        <Route path="/profile/update" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;

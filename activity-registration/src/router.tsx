import { RouterAPI } from "dva";
import { Route, Router } from "dva/router";
import Login from "./pages/login/login";
import Register from './pages/register/register'
import Checking from "./pages/checking/checking";
import Home from './pages/home/home'
import ActivityDetail from "./pages/activityDetail/activityDetail";
import SignupActivity from "./pages/signupActivity/signupActivity";

export default (api?: RouterAPI) => {
  if (api) {
    return (
      <Router history={api.history}>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/register">
          <Register></Register>
        </Route>
        <Route path="/checking">
          <Checking></Checking>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/activityDetail/:id">
          <ActivityDetail></ActivityDetail>
        </Route>
        <Route path="/signupActivity">
          <SignupActivity></SignupActivity>
        </Route>
      </Router>
    );
  }
  return {}
};

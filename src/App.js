import "./App.css";
import React from "react";
// import Notifications from 'react-notify-toast';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Home from "./components/Home";

import AuthLayout from "./layouts/Auth";
import UserLayout from "./layouts/User";
import { PrivateRoute,  }  from "./views/PrivateRoute";
import { PublicRoute }  from "./views/PublicRoute";


class App extends React.Component {

  render() {
    const isLoggedIn = localStorage.getItem('token') ? true : false;

    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
                  <PrivateRoute
                      path="/user"
                      component={(props) => <UserLayout {...props} />}
                  />
                  <PublicRoute
                      path="/"
                      component={(props) => <AuthLayout {...props} isLoggedIn={isLoggedIn} />}
                  />
                {
                    isLoggedIn ? <Redirect to="/user" from="/" /> :
                      <Redirect from="/user" to="/" />
                }
            </Switch>
          </BrowserRouter>
          {/* <Notifications /> */}
      </div>
    );
  }
}

export default App;

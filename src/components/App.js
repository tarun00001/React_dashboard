import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import ModalPage from "./ModalPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
        {/*  <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>*/}
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/modal">
            <ModalPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

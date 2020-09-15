// Libraries
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Components and styles
import "./App.css";
import Reg from "./components/reg";
import Log from "./components/log";
import Nav from "./components/NavBar";
import PrivateRouter from "./components/privateRouter";
import User from "./components/user";
import Home from "./components/home";

function App() {
  return (
    <>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/log">
            <Log></Log>
          </Route>
          <Route path="/reg">
            <Reg></Reg>
          </Route>
          <PrivateRouter path="/user">
            <User></User>
          </PrivateRouter>
        </Switch>
      </Router>
    </>
  );
}

export default App;

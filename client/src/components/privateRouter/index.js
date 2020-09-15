import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRouter({ children, ...rest }) {
  const Auth = useSelector((state) => state.user);
  return <Route {...rest}>{Auth ? children : <Redirect to="/log" />}</Route>;
}

export default PrivateRouter;

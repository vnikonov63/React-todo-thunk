import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { startUser } from "../redux/actions";

function Log() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.dev.loading);
  const errorStatus = useSelector((state) => state.dev.error);
  const [controlledFrom, setControlledForm] = useState({
    email: "",
    password: "",
  });
  function controlInput({ target: { name, value } }) {
    setControlledForm({
      ...controlledFrom,
      [name]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(startUser(email, password, history));
  }
  const { email, password } = controlledFrom;
  return (
    <div className="flex margin-my">
      <form onSubmit={handleSubmit}>
        <label>
          Enter your E-mail
          <input
            onChange={controlInput}
            name="email"
            type="text"
            value={email}
          ></input>
        </label>
        <label>
          Enter your password
          <input
            onChange={controlInput}
            name="password"
            type="password"
            value={password}
          ></input>
        </label>
        <input type="submit" className="btn"></input>
      </form>
      {loadingStatus ? <CircularProgress /> : ""}
      {errorStatus ? <h3>{errorStatus}</h3> : ""}
    </div>
  );
}

export default Log;

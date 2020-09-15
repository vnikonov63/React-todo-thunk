import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addTodo, loading, error } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";

function AddTodo() {
  const user = useSelector((state) => state.user);
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  function handleChange(event) {
    setState(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(loading());
    const innerId = uuidv4();
    const response = await fetch(`/todo/${user.id}/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: state,
        status: false,
        id: innerId,
      }),
    });
    if (response.status === 200) {
      dispatch(loading());
      dispatch(
        addTodo({
          text: state,
          status: false,
          id: innerId,
        })
      );
    } else if (response.status === 400) {
      dispatch(loading());
      const finalResponse = await response.json();
      dispatch(error(finalResponse.message));
    } else if (response.status === 500) {
      dispatch(loading());
      const finalResponse = await response.json();
      dispatch(error(finalResponse.message));
    }
  }

  return (
    <>
      <div className="flex row margin-micro">
        <form className="flex row margin-right-super" onSubmit={handleSubmit}>
          <label>
            Enter the todo text
            <input
              name="todo"
              onChange={handleChange}
              value={state}
              type="text"
            ></input>
          </label>
          <input type="submit" className="btn align"></input>
        </form>
      </div>
    </>
  );
}

export default AddTodo;

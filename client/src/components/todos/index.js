import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddTodo from "../addtodo/index";
import Todo from "../todo";

function Todos() {
  const user = useSelector((state) => state.user);
  const loadingStatus = useSelector((state) => state.dev.loading);
  const errorStatus = useSelector((state) => state.dev.error);
  return (
    <>
      {loadingStatus ? <CircularProgress /> : ""}
      {errorStatus ? <h3>{errorStatus}</h3> : ""}
      <AddTodo />
      {user.todos.length ? (
        user.todos.map((element) => {
          return <Todo dataFromParent={element} />;
        })
      ) : (
        <div className="flex margin-micro">
          <h3>Sorry, but your todo list is empty</h3>
        </div>
      )}
    </>
  );
}

export default Todos;

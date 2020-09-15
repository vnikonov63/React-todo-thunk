import React from "react";
import { useSelector } from "react-redux";
import Todos from "../todos";

function User() {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex">
      <h2>Hello, {user.name} !</h2>
      <Todos></Todos>
    </div>
  );
}

export default User;

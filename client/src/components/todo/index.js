import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleStatusThunk,
  deleteOneThunk,
  manageTextThunk,
} from "../redux/actions";

function Todo(todo) {
  const user = useSelector((state) => state.user);
  const [creator, setCreator] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  async function manageText(event) {
    event.preventDefault();
    setCreator(!creator);
    dispatch(manageTextThunk(todo.dataFromParent.id, user, text));
  }

  function creatorStatus() {
    setCreator(!creator);
  }

  function textControl(event) {
    setText(event.target.value);
  }

  async function toggleStatus(event) {
    event.preventDefault();
    dispatch(toggleStatusThunk(todo.dataFromParent.id, user));
  }

  async function deleteOne(event) {
    event.preventDefault();
    dispatch(deleteOneThunk(todo.dataFromParent.id, user));
  }
  return (
    <>
      <div className="flex row margin-micro">
        {todo.dataFromParent.status ? (
          <button
            onClick={toggleStatus}
            className="btn black-text yellow margin-right"
          >
            Undo
          </button>
        ) : (
          <button onClick={toggleStatus} className="btn green margin-right">
            Do
          </button>
        )}
        {creator ? (
          <div className="flex">
            <label>
              Enter the fixed value
              <form onSubmit={manageText}>
                <input type="text" onChange={textControl} value={text}></input>
                <input type="submit" className="btn"></input>
              </form>
            </label>
          </div>
        ) : todo.dataFromParent.status ? (
          <h5 onDoubleClick={creatorStatus} className="margin-right line ">
            {todo.dataFromParent.text}
          </h5>
        ) : (
          <h5 onDoubleClick={creatorStatus} className="margin-right">
            {todo.dataFromParent.text}
          </h5>
        )}
        <button onClick={deleteOne} className="btn red">
          Delete
        </button>
      </div>
    </>
  );
}

export default Todo;

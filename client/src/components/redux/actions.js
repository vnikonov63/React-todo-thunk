import {
  SET_USER,
  DELETE_USER,
  ADD_TODO,
  DELETE_TODO,
  CHANGE_ACTION_TODO,
  CHANGE_STATUS_TODO,
  LOADING,
  ERROR,
  END,
} from "./action-types";

// the thunk actions
export function startUser(email, password, history) {
  return async function (dispatch) {
    dispatch(loading());
    const response = await fetch("/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 200) {
      const finalResult = await response.json();
      dispatch(loading());
      dispatch(setUser(finalResult.userSend));
      return history.push(`/user`);
    } else {
      dispatch(loading());
      const finalResult = await response.json();
      dispatch(error(finalResult.message));
    }
  };
}

export function regUser(name, email, password, history) {
  return async function (dispatch) {
    dispatch(loading());
    const response = await fetch("/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    if (response.status === 200) {
      const finalResult = await response.json();
      dispatch(loading());
      dispatch(setUser(finalResult.userSend));
      return history.push(`/user`);
    } else {
      dispatch(loading());
      const finalResult = await response.json();
      dispatch(error(finalResult.message));
    }
  };
}

export function toggleStatusThunk(id, user) {
  return async function (dispatch) {
    dispatch(loading());
    const response = await fetch(`/todo/${user.id}/patch`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (response.status === 200) {
      dispatch(loading());
      dispatch(statusTodo(id));
    } else {
      dispatch(loading());
      const finalResult = await response.json();
      dispatch(error(finalResult.message));
    }
  };
}

export function deleteOneThunk(id, user) {
  return async function (dispatch) {
    dispatch(loading());
    async function myFetch() {
      const response = await fetch(`/todo/${user.id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      return response;
    }
    const response = await myFetch();
    console.log(response);
    let responseMain = response.status;
    let responseInteral;
    if (response.status === 200) {
      dispatch(loading());
      dispatch(deleteTodo(id));
    } else {
      if (response.status === 500) {
        do {
          responseInteral = await myFetch();
          responseMain = responseInteral.status;
        } while (responseMain === 500);

        if (responseMain === 200) {
          dispatch(loading());
          dispatch(deleteTodo(id));
        } else if (responseMain === 400) {
          dispatch(loading());
          const finalResult = await responseInteral.json();
          dispatch(error(finalResult.message));
        }
      } else {
        dispatch(loading());
        console.log(response);
        const finalResult = await response.json();
        dispatch(error(finalResult.message));
      }
    }
  };
}

export function manageTextThunk(id, user, text) {
  return async function (dispatch) {
    dispatch(loading());
    const response = await fetch(`/todo/${user.id}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        text: text,
      }),
    });
    if (response.status === 200) {
      dispatch(loading());
      dispatch(actionTodo(id, text));
    } else {
      dispatch(loading());
      const finalResult = await response.json();
      dispatch(error(finalResult.message));
    }
  };
}

export function outThunk(history) {
  return async function (dispatch) {
    dispatch(deleteUser());
    dispatch(loading());
    const response = await fetch("/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(loading());
    dispatch(end());
    return history.push(`/`);
  };
}

// redux actions
export function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}

export function deleteUser(user) {
  return {
    type: DELETE_USER,
  };
}

export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: {
      todo,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
}

export function actionTodo(id, text) {
  return {
    type: CHANGE_ACTION_TODO,
    payload: {
      id,
      text,
    },
  };
}

export function statusTodo(id) {
  return {
    type: CHANGE_STATUS_TODO,
    payload: {
      id,
    },
  };
}

export function loading() {
  return {
    type: LOADING,
  };
}

export function error(err) {
  return {
    type: ERROR,
    payload: err,
    error: true,
  };
}

export function end() {
  return {
    type: END,
  };
}

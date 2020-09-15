import {
  SET_USER,
  DELETE_USER,
  ADD_TODO,
  DELETE_TODO,
  CHANGE_STATUS_TODO,
  CHANGE_ACTION_TODO,
  LOADING,
  ERROR,
  END,
} from "./action-types";

export function userReducer(state = false, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload.user;
    case DELETE_USER:
      return false;
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload.todo] };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((element) => {
          return element.id != action.payload.id;
        }),
      };
    case CHANGE_ACTION_TODO:
      return {
        ...state,
        todos: state.todos.map((element) => {
          return element.id === action.payload.id
            ? { ...element, text: action.payload.text }
            : element;
        }),
      };

    case CHANGE_STATUS_TODO:
      return {
        ...state,
        todos: state.todos.map((element) => {
          return element.id === action.payload.id
            ? { ...element, status: !element.status }
            : element;
        }),
      };

    default:
      return state;
  }
}

export function loadingErrorReducer(
  state = {
    loading: false,
    error: "",
  },
  action
) {
  switch (action.type) {
    case LOADING:
      return {
        loading: !state.loading,
        error: "",
      };
    case ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case END:
      return {
        loading: false,
        error: "",
      };

    default:
      return state;
  }
}

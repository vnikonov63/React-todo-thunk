import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, loadingErrorReducer } from "./reducers";
import thunkMiddleware from "redux-thunk";

const preloadedState = window.localStorage.getItem("redux") ?? "{}";

const store = createStore(
  combineReducers({
    user: userReducer,
    dev: loadingErrorReducer,
  }),
  JSON.parse(preloadedState),
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// store.subscribe(() => {
//   //postMessage(action)
//   window.localStorage.setItem("redux", JSON.stringify(store.getState()));
// });

export default store;

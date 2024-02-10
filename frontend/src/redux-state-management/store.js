import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { createTaskReducer, getTaskReducer, taskReducer } from "./taskReducer";

const reducer = combineReducers({
  tasks: createTaskReducer,
  allTask: getTaskReducer,
  task: taskReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

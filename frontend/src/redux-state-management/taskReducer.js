import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  GET_TASK_START,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
  UPDATE_TASK_START,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "./taskTypes.js";

export const createTaskReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case CREATE_TASK_START:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        tasks: [...state.tasks, action.payload],
        isFetching: false,
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getTaskReducer = (state = { allTask: [] }, action) => {
  switch (action.type) {
    case GET_TASK_START:
      return {
        isFetching: true,
        error: false,
        allTask: [],
      };
    case GET_TASK_SUCCESS:
      return {
        allTask: action.payload,
        isFetching: false,
        error: false,
      };
    case GET_TASK_FAILURE:
      return {
        allTask: [],
        isFetching: false,
        error: true,
      };

    default:
      return state;
  }
};

export const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_START:
    case UPDATE_TASK_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case DELETE_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

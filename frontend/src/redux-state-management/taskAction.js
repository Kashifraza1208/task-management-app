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

import axios from "axios";

// //create task

export const createTask = (task) => async (dispatch) => {
  dispatch({
    type: CREATE_TASK_START,
  });
  try {
    const data = await axios.post(
      "/api/v1/new-task",
      { task },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data,
    });
    dispatch(getTask());
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAILURE,
      payload: error?.message,
    });
  }
};

// //getting all tasks
export const getTask = () => async (dispatch) => {
  dispatch({
    type: GET_TASK_START,
  });
  try {
    const { data } = await axios.get("/api/v1/all-task");

    dispatch({
      type: GET_TASK_SUCCESS,
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: GET_TASK_FAILURE,
      payload: error?.message,
    });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({
    type: DELETE_TASK_START,
  });
  try {
    const data = await axios.delete(`/api/v1/task/${taskId}`);

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error?.message,
    });
  }
};

export const updateTask = (id, completed) => async (dispatch) => {
  dispatch({
    type: UPDATE_TASK_START,
  });
  try {
    const { data } = await axios.put(
      `/api/v1/task/${id}`,
      { completed },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAILURE,
      payload: error?.message,
    });
  }
};

import { Fragment, useState } from "react";

import Card from "../UI/Card.js";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import "./AddTask.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import {
  createTask,
  getTask,
} from "../../redux-state-management/taskAction.js";

const AddTask = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTask({ ...task, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      await dispatch(createTask(task));
    }
    dispatch(getTask());
    alert.success("Task Added successfully");
    navigate("/");
  };

  return (
    <Fragment>
      <div className="teskContainer">
        <Card>
          <h2 className="heading">Add New Task</h2>
        </Card>
        <Card>
          <form className="form" onSubmit={handleSubmit}>
            {props.isLoading && (
              <div className="loading">
                <LoadingSpinner />
              </div>
            )}

            <div className="control">
              <label htmlFor="title">Title</label>
              <input
                id="input"
                required
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>
            <div className="control">
              <label htmlFor="text">Description</label>
              <textarea
                id="text"
                rows="5"
                required
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="action">
              <button type="submit" className="btn">
                Add Quote
              </button>
              <button
                className="btn1"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>
            </div>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default AddTask;

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "./redux-state-management/store";
import TaskList from "./components/task/TaskList";
import NotFound from "./components/not-found/NotFound";
// import UpdateUser from "./components/task/UpdateUser";
import AddTask from "./components/task/AddTask";
import { getTask } from "./redux-state-management/taskAction";

function App() {
  const dispatch = useDispatch();
  const allTask = useSelector((state) => state.allTask);

  useEffect(() => {
    store.dispatch(getTask());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<TaskList loading={allTask.isFetching} />}
        />
        <Route exact path="/add-task" element={<AddTask />} />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

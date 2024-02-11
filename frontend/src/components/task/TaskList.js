import React, { Fragment, useEffect, useState } from "react";
import "./TaskList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../UI/LoadingSpinner.js";
import {
  deleteTask,
  getTask,
  updateTask,
} from "../../redux-state-management/taskAction.js";
import { useAlert } from "react-alert";

const TaskList = ({ loading }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { allTask } = useSelector((state) => state.allTask);

  const handleDelete = async (taskId) => {
    await dispatch(deleteTask(taskId));
    dispatch(getTask());
    if (taskId !== 234543252) {
      alert.success("Task Deleted Successfully!");
    }
  };

  const handleStatus = (taskId, completed) => {
    dispatch(updateTask(taskId, !completed));
    dispatch(getTask());
    if (taskId !== 234543252) {
      alert.success("Task Updated Successfully!");
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Titles",
      width: 300,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.title}</div>;
      },
    },
    {
      field: "description",
      headerName: "Descriptions",
      width: 300,
      renderCell: (params) => {
        const isExpanded = params.row.id === expandedRowId;
        const isHovered = params.row.id === hoveredRowId;
        return (
          <div
            onMouseEnter={() => setHoveredRowId(params.row.id)}
            onMouseLeave={() => setHoveredRowId(null)}
          >
            {isHovered || isExpanded ? (
              <textarea
                className="expandedTextarea"
                readOnly
                value={params.row.description}
                onFocus={() => setExpandedRowId(params.row.id)}
                onBlur={() => {
                  setExpandedRowId(null);
                  setHoveredRowId(null);
                }}
                rows={9}
                cols={26}
              />
            ) : (
              <div
                onClick={() => {
                  setExpandedRowId(params.row.id);
                  setHoveredRowId(params.row.id);
                }}
              >
                {params.row.description}
              </div>
            )}
          </div>
        );
      },
    },

    {
      field: "status",
      headerName: "Task Status",
      renderCell: (params) => {
        return (
          <button
            className={
              params.row.completed === 0 || params.row.id === 234543252
                ? "redColor"
                : "greenColor"
            }
            onClick={() => handleStatus(params.row.id, params.row.completed)}
          >
            {params.row.completed === 1 ? "Completed" : "Incomplete"}
          </button>
        );
      },
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const dummyData = [
    {
      id: 234543252,
      title: "Dummy Task",
      description: "This is a dummy task",
      status: "InCompleted",
    },
  ];

  var revMyArr = [].concat(allTask).reverse();

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : allTask.length > 0 ? (
        <Fragment>
          <div className="listUser">
            <div className="adduser">
              <Link to="/add-task">
                <button className="userButton">Add Task</button>
              </Link>
            </div>

            <div className="userList">
              <div className="task-list-heading">
                <h3>Lists of task</h3>
              </div>
              <DataGrid
                rows={revMyArr}
                columns={columns}
                disableSelectionOnClick
                getRowId={(row) => row.id}
                pageSize={5}
                rowHeight={200}
                autoheight
                className="customDataGrid"
                hideFooterPagination
                hideFooterSelectedRowCount
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="listUser">
          <div className="adduser">
            <Link to="/add-task">
              <button className="userButton">Add Task</button>
            </Link>
          </div>
          <div className="userList">
            <DataGrid
              rows={dummyData}
              columns={columns}
              disableSelectionOnClick
              getRowId={(row) => row.id}
              pageSize={1}
              rowHeight={200}
              className="customDataGrid1"
              hideFooterPagination
              hideFooterSelectedRowCount
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;

const Connection = require("../config/database");

exports.createTask = (req, res) => {
  const task = req.body.task;

  const ADD_QUERY = `INSERT INTO tasks (title, description , completed) VALUES (?, ?, ?)`;

  Connection.query(
    ADD_QUERY,
    [task.title, task.description, task.completed],
    (error, result) => {
      if (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
      } else {
        res.status(201).json({ message: "Task created successfully" });
      }
    }
  );
};

exports.getTask = (req, res) => {
  const GET_QUERY = "SELECT * FROM tasks;";

  Connection.query(GET_QUERY, (error, result) => {
    if (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Error getting task" });
    } else {
      res.status(200).json({ message: "Data Fetched successfully", result });
    }
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const sqlDelete = "DELETE FROM tasks WHERE id = ?"; // Assuming 'id' is the primary key column
  Connection.query(sqlDelete, taskId, (error, result) => {
    if (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Error deleting task" });
    } else {
      res.status(200).json({ message: "Deleted successfully" });
    }
  });
};

exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  const { completed } = req.body;

  const sqlUpdate = "UPDATE tasks SET completed = ? WHERE id = ?";

  Connection.query(sqlUpdate, [completed, taskId], (error, result) => {
    if (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Error updating task" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Task not found" });
      } else {
        // If the update was successful, send a success response
        res.status(200).json({ message: "Task updated successfully" });
      }
    }
  });
};

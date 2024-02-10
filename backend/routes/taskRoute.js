const express = require("express");
const {
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/task");

const router = express.Router();
router.route("/new-task").post(createTask);
router.route("/all-task").get(getTask);
router.route("/task/:id").delete(deleteTask);
router.route("/task/:id").put(updateTask);

module.exports = router;

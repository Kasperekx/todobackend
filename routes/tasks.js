const express = require("express");
const Task = require("../models/TaskModel");
const {
  getUniqueTaskController,
  getAllTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controllers/taskControllers");
const router = express.Router();

router.get("/", getAllTasksController);

router.get("/:id", getUniqueTaskController);

router.post("/", createTaskController);

router.delete("/:id", deleteTaskController);

router.patch("/:id", updateTaskController);

module.exports = router;

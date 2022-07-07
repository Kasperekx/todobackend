const express = require("express");
const Task = require("../models/TaskModel");
const { requireAuth } = require("../middlewares/authMiddlewares")
const {
  getUniqueTaskController,
  getAllTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controllers/taskControllers");
const router = express.Router();

router.get("/", requireAuth, getAllTasksController);

router.get("/:id", requireAuth,getUniqueTaskController);

router.post("/", requireAuth,createTaskController);

router.delete("/:id", requireAuth,deleteTaskController);

router.patch("/:id", requireAuth,updateTaskController);

module.exports = router;

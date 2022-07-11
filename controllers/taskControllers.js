const { Task } = require("../models/TaskModel");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const getAllTasksController = async (req, res) => {
  const { userId } = req.body;
  const cookie = req.cookies.jwt;
  jwt.verify(cookie, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    const id = decodedToken.id;
    const user = await User.findOne({ _id: id });
    const tasks = await Task.find({ userId: user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  });
};

const getUniqueTaskController = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(400).json({ message: "Task not exist" });
  }
  return res.status(200).json(task);
};

const createTaskController = async (req, res) => {
  const { title, description, userId } = req.body;
  const cookie = req.cookies.jwt;

  jwt.verify(cookie, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    const id = decodedToken.id;
    try {
      const user = await User.findOne({ _id: id });

      const task = await Task.create({
        title,
        description,
        userId: user._id,
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  });
};

const deleteTaskController = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });
  return res.status(200).json(task);
};

const updateTaskController = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(400).json({ message: "Task not exist" });
  }
  return res.status(200).json(task);
};

module.exports = {
  getUniqueTaskController,
  getAllTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
};

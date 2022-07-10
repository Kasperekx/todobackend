const User = require("../models/UserModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

const errorHandler = (err) => {
  console.log(err.message);
  let errors = { email: "", password: "", username: "" };

  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message === "Incorrect password") {
    errors.password = "This password is incorrect";
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const signUpController = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json(errors);
  }
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json(errors);
  }
};

module.exports = { signUpController, signInController };

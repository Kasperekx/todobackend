const express = require("express");
const {
  signUpController,
  signInController,
  getUserWithPosts,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);

module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const dotenv = require("dotenv");

dotenv.config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({ message: "There is no token! You need to login!" });
  }
};

// check user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };

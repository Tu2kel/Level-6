const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const jwt = require("express-jwt");

//Get All

//𝗦𝗶𝗴𝗻𝘂𝗽
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error("that username is already taken"));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      //payload, secret
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser });
    });
  });
});

//𝗟𝗼𝗴𝗶𝗻

authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      res.status(403);
      return next(new Error("Username or Password are incorrect"));
    }
    if (req.body.password !== user.password) {
      res.status(403);
      return next(new Error("Username or Password are incorrect 2"));
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.status(200).send({ token, user });
  });
});

module.exports = authRouter;

const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const jwt = require("express-jwt");

//Get All
userRouter.get("/", (req, res, next) => {
  User.find((err, PLACEHOLDER) => {
    if (err) {
      res.status(500);
      return next(err);
    }
  });
});

//Post
userRouter.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (user) {
      res.status(403);
      return next(new Error("that username is already take"));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      //Payload, Secret
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
      return res.status(201).send({ token, user: savedUser });
    });
  });
});

//Login
userRouter.post("/login", (req, res, next) => {
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
      return next(new Error("Username or Password are incorrect."));
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET);
    return res.status(200).send({ token, user });
  });
});

module.exports = userRouter;

const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Signup, Login, Logout 

//Get All
userRouter.get("/", (req, res, next) => {
  User.find((err, username) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(username);
  });
});

//Get One
userRouter.get("/:usernameId", (req, res, next) => {
  const usernameId = req.params.usernameId;
  const foundUser = User.find((username) => username._id === usernameId);
  if (!foundUser) {
    const error = new Error(`User ${usernameId} Not Found in DB`);
    res.status(500);
    return next(error);
  }
  res.status(200).send(foundUser);
});

//

//Post
userRouter.post("/user", (req, res, next) => {
  User.find({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500);
      return next(err);
    }
    if(user){
      res.status(403);
      return next(new Error("that username is already take"));
    }
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
      if(err) {
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
// userRouter.post("/issue", (req, res, next) => {
//   User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
//     if (err) {
//       res.status(500);
//       return next(err);
//     }
//     if (!user) {
//       res.status(403);
//       return next(new Error("Username or Password are incorrect"));
//     }
//     if (req.body.password !== user.password) {
//       res.status(403);
//       return next(new Error("Username or Password are incorrect."));
//     }
//     const token = jwt.sign(user.toObject(), process.env.SECRET);
//     return res.status(200).send({ token, user });
//   });
// });

//Delete
userRouter.delete("/usernameId", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.usernameId }, (err, deleteUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(`Deleted ${deleteUser.username} from the DB`);
  });
});

//Update one
userRouter.put("/:usernameId", (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params.usernameId },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedUser);
    }
  );
});

module.exports = userRouter;

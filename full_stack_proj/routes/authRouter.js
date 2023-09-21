const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Signup
authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('Username Taken'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(er){
                res.status(500)
                retrun next(err)
            }

            const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser })
        })
    })
})

//Login 

authRouter

module.exports = authRouter
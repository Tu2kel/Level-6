const express = require("express");
const todoRouter = express.Router();
const Todo = require("../models/todo.js");

// Get All Todos
todoRouter.get("/", (req, res, next) => {
  Todo.find((err, todos) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(todos);
  });
});

// Get todos by user id
todoRouter.get("/user", (req, res, next) => {
  Todo.find({ user: req.auth._id }, (err, todos) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(todos);
  });
});

// Add new Todo
todoRouter.post("/", async (req, res, next) => {
  try {
    // Add the user's ID from authentication to the request body
    req.body.user = req.auth._id;

    // Create a new Todo instance using the request body
    const newTodo = new Todo(req.body);

    // Save the new todo to the database using await
    const savedTodo = await newTodo.save();

    // Send a 201 status code with the saved todo as the response
    res.status(201).send(savedTodo);
  } catch (error) {
    // Handle errors by sending an appropriate status code and error message
    console.error("Error adding todo:", error);

    if (error.name === "ValidationError") {
      // Handle validation errors (e.g., required fields) with a 400 status code
      res
        .status(400)
        .send({ error: "Validation error", details: error.message });
    } else {
      // Handle other errors with a 500 status code
      res.status(500).send({ error: "Server error", details: error.message });
    }
  }
});


// Delete Todo
todoRouter.delete("/:todoId", (req, res, next) => {
  Todo.findOneAndDelete(
    { _id: req.params.todoId, user: req.auth._id },
    (err, deletedTodo) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully delete todo: ${deletedTodo.title}`);
    }
  );
});

// Update Todo
todoRouter.put("/:todoId", (req, res, next) => {
  Todo.findOneAndUpdate(
    { _id: req.params.todoId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedTodo) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedTodo);
    }
  );
});

module.exports = todoRouter;

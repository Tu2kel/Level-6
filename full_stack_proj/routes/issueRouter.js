const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue.js");

// Get All issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Get issues by user id
issueRouter.get("/user", (req, res, next) => {
  // need to use req.auth
  Issue.find({ user: req.auth._id }, (err, issues) => {
    console.log(req);
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

// Add new Issue
issueRouter.post("/", async (req, res, next) => {
  try {
    // Add the user's ID from authentication to the request body

    req.body.user = req.auth._id;
    console.log("req inside issuerouterPost", req);
    // Create a new Issue instance using the request body
    const newIssue = new Issue(req.body);

    // Save the new Issue to the database using await
    const savedIssue = await newIssue.save();

    // Send a 201 status code with the saved Issue as the response
    res.status(201).send(savedIssue);
  } catch (error) {
    // Handle errors by sending an appropriate status code and error message
    console.error("Error adding Issue:", error);

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

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully deleted issue: ${deletedIssue.title}`);
    }
  );
});

// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedIssue);
    }
  );
});

module.exports = issueRouter;

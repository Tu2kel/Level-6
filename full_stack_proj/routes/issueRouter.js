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
  // need to use req.auth / createdBy
  Issue.find({ createdBy: req.auth._id }, (err, issues) => {
    // console.log(req.auth._id);
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

issueRouter.get("/:issueId", (req, res, next) => {
  const issueId = req.params.issueId;

  Issue.findById(issueId)
    .populate("comments") // Populate the 'comments' field with Comment documents
    .exec((err, issue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(issue);
    });
});

// Add new Issue
issueRouter.post("/", async (req, res, next) => {
  try {
    req.body.createdBy = req.auth._id;
    console.log(" line 47 req inside issuerouterPost");
    const newIssue = new Issue(req.body)
    // console.log('issueRouter line 49', req.body);
    // console.log('issueRouter line 50', res);

    const savedIssue = await newIssue.save();

    res.status(201).send(savedIssue);
  } catch (error) {
    console.error("Error adding Issue:", error);

    if (error.name === "ValidationError") {
      res
        .status(400)
        .send({ error: "Validation error", details: error.message });
    } else {
      res.status(500).send({ error: "Server error", details: error.message });
    }
  }
});

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, createdBy: req.auth._id },
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
    { _id: req.params.issueId, createdBy: req.auth._id },
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

const express = require("express");
const voteRouter = express.Router();
const Issue = require("../models/issue");
const User = require("../models/user");


// Upvote a political issue (requires authentication)
voteRouter.put("/:issueId/upvote", (req, res, next) => {
  const issueId = req.params.issueId;
  // const userId = req.user._id; // User ID from the authenticated user

  // Find the issue by ID
  Issue.findById(issueId, (err, issue) => {
    if (err) {
      return next(err);
    }

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user has already upvoted this issue
    if (issue.upvotes.includes(userId)) {
      return res.status(400).json({ message: "User has already upvoted this issue." });
    }

    // Check if the user has previously downvoted this issue
    if (issue.downvotes.includes(userId)) {
      // Remove the user's downvote since they are now upvoting
      issue.downvotes.pull(userId);
    }

    // Update the issue document to record the upvote
    issue.upvotes.push(userId);

    // Save the updated issue document
    issue.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json(issue); // Return the updated issue
    });
  });
});

// Downvote a political issue (requires authentication)
voteRouter.put("/:issueId/downvote", (req, res, next) => {
  const issueId = req.params.issueId;
  const userId = req.user._id; // User ID from the authenticated user

  // Find the issue by ID
  Issue.findById(issueId, (err, issue) => {
    if (err) {
      return next(err);
    }

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Check if the user has already downvoted this issue
    if (issue.downvotes.includes(userId)) {
      return res.status(400).json({ message: "User has already downvoted this issue." });
    }

    // Check if the user has previously upvoted this issue
    if (issue.upvotes.includes(userId)) {
      // Remove the user's upvote since they are now downvoting
      issue.upvotes.pull(userId);
    }

    // Update the issue document to record the downvote
    issue.downvotes.push(userId);

    // Save the updated issue document
    issue.save((err) => {
      if (err) {
        return next(err);
      }

      res.status(200).json(issue); // Return the updated issue
    });
  });
});

module.exports = voteRouter;

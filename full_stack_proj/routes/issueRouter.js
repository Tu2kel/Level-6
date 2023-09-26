const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue");
// const authMiddleware = require("../middleware/auth"); // Import authentication middleware

// Get all political issues ✅
issueRouter.get("/", (req, res, next) => {
  Issue.find()
    .then(issues => {
      res.status(200).json(issues);
    })
    .catch(err => {
      next(err);
    });
});

// ✅Create a new political issue (requires authentication)
issueRouter.post("/", (req, res, next) => {
  const { title, description, createdBy } = req.body;
  const newIssue = new Issue({
    title,
    description,
    createdBy: req.user, // need to store the user ID in the token
  });

  newIssue.save()
    .then(savedIssue => {
      res.status(201).json(savedIssue);
    })
    .catch(err => {
      next(err);
    });
});

//❌Upvote a political issue (requires authentication)
issueRouter.put("/:issueId/upvote", (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const issueId = req.params.issueId;
  const userId = req.user._id; // User ID from the authenticated user

  // Check if the user has already upvoted this issue
  User.findById(userId)
    .then((user) => {
      if (user.upvotedIssues.includes(issueId)) {
        return res
          .status(400)
          .json({ message: "User has already upvoted this issue." });
      }

      // Update the Issue document to record the upvote
      Issue.findByIdAndUpdate(
        issueId,
        { $addToSet: { upvotes: userId } }, // Use $addToSet to ensure unique upvotes
        { new: true }
      )
        .then((issue) => {
          // Update the User document to record the upvoted issue
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { upvotedIssues: issueId } },
            { new: true }
          ).then(() => {
            res.status(200).json(issue);
          });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});



module.exports = issueRouter;

const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");
const Issue = require("../models/issue");

// ✅Get all comments
commentRouter.get("/", (req, res, next) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(comments);
  });
});

//✅Create a new comment on a political issue (requires authentication)
commentRouter.post("/:issueId", (req, res, next) => {
  Issue.findOne({ _id: req.params.issueId }, (err, foundIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!foundIssue) {
      res.status(404);
      return next(err);
    }

    const newComment = new Comment({
      text: req.body.text, // Store the comment text
      issue: foundIssue._id,
      createdBy: req.auth._id,
    });

    newComment.save((err, savedComment) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      // Add the new comment to the list of comments for that issue
      foundIssue.comments.push(savedComment._id); // Update 'comments' instead of 'comment'
      foundIssue.save((err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(201).send(updatedIssue);
      });
    });
  });
});

//🤷🏽‍♂️🤷🏽🤷🏽‍♂️ Get comments for a specific political issue
commentRouter.get("/:issueId", (req, res, next) => {
  const issueId = req.params.issueId;
  Comment.find({ issue: issueId }, (err, comments) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(comments);
  });
});

//❌Delete a comment (requires authentication)
commentRouter.delete("/:commentId", (req, res, next) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      return next(err);
    }

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.createdBy.toString() !== req.auth._id) {
      return res
        .status(403)
        .json({
          message: "Permission denied. You are not the owner of this comment.",
        });
    }

    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send(); // No content on successful deletion
    });
  });
});

module.exports = commentRouter;

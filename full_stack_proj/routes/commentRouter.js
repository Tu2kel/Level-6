const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");

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
commentRouter.post("/", (req, res, next) => {
  const { issueId, text } = req.body;
  const newComment = new Comment({
    issue: issueId, // Assuming you store the issue ID in the request body
    text,
    createdBy: req.auth._id, // Assuming you store the user ID in the token
  });
  
  newComment.save((err, savedComment) => {
    if (err) {
      return next(err);
    }
    
    res.status(201).json(savedComment);
  });
});

//🤦🏽‍♂️🤷🏽🤷🏽‍♂️ Get comments for a specific political issue
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
  // const userId = req.user._id; // User ID from the authenticated user

  // Find the comment by ID
  Comment.findById(commentId, (err, comment) => {
    if (err) {
      return next(err);
    }

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user is the owner of the comment
    if (comment.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Permission denied. You are not the owner of this comment." });
    }

    // If the user is the owner, delete the comment
    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send(); // No content on successful deletion
    });
  });
});

module.exports = commentRouter;

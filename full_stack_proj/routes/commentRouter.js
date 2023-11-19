const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");
const Issue = require("../models/issue");

// ✅Get all comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(comments);
  });
});

//✅Create a new comment on a political issue (requires authentication)
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.issue = req.params.issueId;
  req.body.createdBy = req.auth._id;
  const newComment = new Comment(req.body);

  newComment.save((err, savedComment) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedComment);
  });
});

// Get issue by comment by issueId
commentRouter.get("/:issueId", (req, res, next) => {
  // const issueId = req.params.issueId;
  const issueId = req.auth._id
  // req.body.issue = req.params.issueId;
  // req.body.createdBy = req.auth._id;
  console.log('REQQQ', issueId)
    Promise.all([
    Issue.findOne({ _id: issueId }).exec(),
    Comment.find({ issue: issueId }).exec(),
  ])
    .then(([foundIssue, comments]) => {
      if (!foundIssue) {
        res.status(404).json({ message: "Issue not found" });
      } else {
        res.status(200).json({ issue: foundIssue, comments: comments });
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Put

// commentRouter.put("/:commentId", (req, res, next) => {
//   Comment.findOneAndUpdate(
//     { _id: req.params.commentId, createdBy: req.auth._id },
//     req.body,
//     { new: true },
//     (err, updatedComment) => {
//       if (err) {
//         res.status(500);
//         return next(err);
//       }
//       return res.status(201).send(updatedComment);
//     }
//   );
// });

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
      return res.status(403).json({
        message: "Permission denied. You are not the owner of this comment.",
      });
    }

    Comment.findByIdAndRemove(commentId, (err) => {
      if (err) {
        return next(err);
      }
      res.status(204).send(); 
    });
  });
});

module.exports = commentRouter;

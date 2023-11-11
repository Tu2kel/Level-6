const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");
const Review = require("../models/review");

// ✅Get all comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(comments);
  });
});

//✅Create a new comment on a political review (requires authentication)
commentRouter.post("/:reviewId", (req, res, next) => {
  req.body.review = req.params.reviewId;
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

// Get review by comment by reviewId
commentRouter.get("/:reviewId", (req, res, next) => {
  // const reviewId = req.params.reviewId;
  const reviewId = req.auth._id
  // req.body.review = req.params.reviewId;
  // req.body.createdBy = req.auth._id;
  console.log('REQ', reviewId)
    Promise.all([
      Review.findOne({ _id: reviewId }).exec(),
      Comment.find({ review: reviewId }).exec(),
    ])
      .then(([foundReview, comments]) => {
        if (!foundReview) {
          res.status(404).json({ message: "review not found" });
        } else {
          res.status(200).json({ review: foundReview, comments: comments });
        }
      })
      .catch((err) => {
        next(err);
      });
});

//Deletes
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

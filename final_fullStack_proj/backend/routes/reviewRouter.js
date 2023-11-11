const express = require("express");
const reviewRouter = express.Router();
const Review = require("../models/review.js");

// Get All reviews
reviewRouter.get("/", (req, res, next) => {
  Review.find((err, reviews) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(reviews);
  });
});

// Get reviews by user id
reviewRouter.get("/user", (req, res, next) => {
  // need to use req.auth / createdBy
  Review.find({ createdBy: req.auth._id }, (err, reviews) => {
    // console.log(req.auth._id);
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(reviews);
  });
});

reviewRouter.get("/:reviewId", (req, res, next) => {
  const reviewId = req.params.reviewId;
  console.log('reviewId', reviewId)
  Promise.all([
    Review.findById(reviewId).exec(),
    Comment.find({ review: reviewId }).exec(),
  ])
    .then(([review, comments]) => {
      if (!review) {
        res.status(404).json({ message: "review not found" });
      } else {
        // Attach the comments to the review object
        review.comments = comments;
        res.status(200).send(review);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Add new review
reviewRouter.post("/", async (req, res, next) => {
  try {
    req.body.createdBy = req.auth._id;
    console.log(" line 54 req inside reviewRouterPost");

    
    

    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).send(savedReview);
  } catch (error) {
    // console.error("Error adding review:", error);

    if (error.name === "ValidationError") {
      res
        .status(400)
        .send({ error: "Validation error", details: error.message });
    } else {
      res.status(500).send({ error: "Server error", details: error.message });
    }
  }
});

// Delete review
reviewRouter.delete("/:reviewId", (req, res, next) => {
  Review.findOneAndDelete(
    { _id: req.params.reviewId, createdBy: req.auth._id },
    (err, deletedReview) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(`Successfully deleted review: ${deletedReview.title}`);
    }
  );
});

// Update review
reviewRouter.put("/:reviewId", (req, res, next) => {
  Review.findOneAndUpdate(
    { _id: req.params.reviewId, createdBy: req.auth._id },
    req.body,
    { new: true },
    (err, updatedReview) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedReview);
    }
  );
});

reviewRouter.put('/upvote/:reviewId', async (req, res, next) => {
  try{
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.reviewId },
      {
        $addToSet: { upvotes: req.auth._id },
        $pull: { downvotes: req.auth._id },
      },
      { new: true } //returns newest version
    );
    return res.status(200).send(updatedReview);
  } catch(err) {
    res.status(500)
    return next(err)
  }
    
  
})
reviewRouter.put("/downvote/:reviewId", async (req, res, next) => {
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.reviewId },
      {
        $addToSet: { downvotes: req.auth._id },
        $pull: { upvotes: req.auth._id },
      },
      { new: true }
    );
    return res.status(200).send(updatedReview)
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = reviewRouter;

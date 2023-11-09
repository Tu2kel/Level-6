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
  console.log('issueId', issueId)
  Promise.all([
    Issue.findById(issueId).exec(),
    Comment.find({ issue: issueId }).exec(),
  ])
    .then(([issue, comments]) => {
      if (!issue) {
        res.status(404).json({ message: "Issue not found" });
      } else {
        // Attach the comments to the issue object
        issue.comments = comments;
        res.status(200).send(issue);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Add new Issue
issueRouter.post("/", async (req, res, next) => {
  try {
    req.body.createdBy = req.auth._id;
    console.log(" line 54 req inside issuerouterPost");

    
    

    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).send(savedIssue);
  } catch (error) {
    // console.error("Error adding Issue:", error);

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

issueRouter.put('/upvote/:issueId', async (req, res, next) => {
  try{
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { upvotes: req.auth._id }, 
        $pull: { downvotes: req.auth._id }
      },
      {new: true} //returns newest version
    );
    return res.status(200).send(updatedIssue);
  } catch(err) {
    res.status(500)
    return next(err)
  }
    
  
})
issueRouter.put("/downvote/:issueId", async (req, res, next) => {
  try {
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      {
        $addToSet: { downvotes: req.auth._id },
        $pull: { upvotes: req.auth._id },
      },
      {new: true}
    );
    return res.status(200).send(updatedIssue)
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = issueRouter;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    // required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // need User model for storing user information
    required: true,
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to users who upvoted this issue
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to users who downvoted this issue
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issue", issueSchema);

const mongoose = require("mongoose"); // Importing mongoose
const Schema = mongoose.Schema; // Destructuring Schema from mongoose
const bcrypt = require("bcrypt");

// Defining a new Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true, // This will convert the username to lowercase before saving
    unique: true, // This ensures the username is unique in the database
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

// pre-save hook to encrypt user passwords on signup

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// method to check encrypted password n login
userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) callback(err);
    return callback(null, isMatch);
  });
};

//method to remove users password for token/sending the response to the front end
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Exporting the User model
module.exports = mongoose.model("User", userSchema);

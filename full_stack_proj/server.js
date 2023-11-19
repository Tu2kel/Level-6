const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");

// Middleware
app.use(express.json()); // Parses data
app.use(morgan("dev")); // Logs to console

mongoose.set("strictQuery", true);

// Connect to DB
mongoose.connect(
  "mongodb+srv://kelleyanthonyk:YZEJ5lvMl0gPfMIe@cluster0.tnwv1cv.mongodb.net/RTV",
  { useNewUrlParser: true, useUnifiedTopology: true }, // Add options for MongoDB connection
  (err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to the database");
    }
  }
);

// Routes

// Routes for login, logout
app.use("/auth", require("./routes/authRouter"));

app.use("/user", require("./routes/userRouter")); //✅ User authentication routes

// ✅Routes for issues
// app.use("/issue", require("./routes/issueRouter"));

// ✅Routes for comments
// app.use("/comment", require("./routes/commentRouter"));
// app.use("/vote", require("./routes/voteRouter")); // Routes for votes

// Middleware for JWT authentication
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

// Add routes for political issues, comments, and votes here
app.use("/api/issue", require("./routes/issueRouter.js"));
app.use("/api/comment", require("./routes/commentRouter"));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    errMsg: err.message,
  });
});

// Server Listen
app.listen(7250, () => {
  console.log(`RTV on port 7250`);
});

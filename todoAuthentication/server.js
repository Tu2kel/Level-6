const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt } = require("express-jwt");

// process.env.SECRET |

app.use(express.json());
app.use(morgan("dev"));

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://kelleyanthonyk:YZEJ5lvMl0gPfMIe@cluster0.tnwv1cv.mongodb.net/user_authentication",
  (err) => {
    console.log("connected to DB", err);
  }
);

app.use("/auth", require("./routes/authRouter.js"));
app.use(
  "/api",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
); //api is buffer checks Secret | req.user
app.use("/api/todo", require("./routes/todoRouter.js")); //if pass buffer

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(8000, () => {
  console.log(`Server is running on local port 8000`);
});

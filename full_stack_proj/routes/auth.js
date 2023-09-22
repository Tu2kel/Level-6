const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, process.env.SECRET);

    // Attach the user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(401).json({ message: "Authorization token is invalid" });
  }
};

const jwt = require("jsonwebtoken")
const config = require("config")

/**
 * Authentication middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
exports.auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token")

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"))

    // Add user from payload
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" })
  }
}

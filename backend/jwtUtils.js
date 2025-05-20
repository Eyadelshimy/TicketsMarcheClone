const jwt = require("jsonwebtoken");

// Temporary hardcoded secret - MOVE THIS TO .env FILE IN PRODUCTION!
const JWT_SECRET = "your_super_secure_jwt_secret_key_here"; 

const generateToken = (payload) => {
  const options = {
    expiresIn: "10h", // Token expiration time
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

function authenticateToken(req, res, next) {
  const authCookie = req.cookies["token"];

  // If there is no cookie, return an error
  if (authCookie == null) return res.sendStatus(401);

  // If there is a cookie, verify it
  jwt.verify(authCookie, JWT_SECRET, (err, user) => {
    // If there is an error, return an error
    if (err) return res.sendStatus(403);

    // If there is no error, continue the execution
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  generateToken,
};

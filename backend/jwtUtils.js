const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const options = {
    expiresIn: "10h", // Token expiration time
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

function authenticateToken(req, res) {
  const authCookie = req.cookies["token"];

  // If there is no cookie, return an error
  if (authCookie == null) return res.sendStatus(401);

  // If there is a cookie, verify it
  jwt.verify(authCookie, process.env.JWT_SECRET, (err, user) => {
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

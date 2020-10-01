const { verify } = require('jsonwebtoken');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

/* Auth */
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ message: " Authorization Denied!!! "});
    }

    const verifiedToken = verify(token, process.env.SECRET);
    if (!verify) {
      return res.status(401).json({ message: " Token Verification Failed! "});
    }

    req.user = verifiedToken.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  notFound,
  errorHandler,
  auth
};

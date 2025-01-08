// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Middleware to authenticate user
// const authenticate = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get token from header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password'); // Set user without password
//     if (!req.user) {
//       return res.status(401).json({ message: 'Invalid token, user not found' });
//     }
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = { authenticate };

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Set user without password
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token, user not found' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authenticate };

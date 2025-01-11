// const express = require('express');
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   logoutUser, 
//   getUserById, 
//   updateUserProfilePicture 
// } = require('../controllers/userController.js');
// const { authenticate } = require('../middlewares/authMiddleware.js');
// const multer = require('multer');

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/profilePictures');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Register a new user
// router.post('/register', registerUser);

// // Login a user and get JWT token
// router.post('/login', loginUser);

// // Logout a user
// router.post('/logout', logoutUser);

// // Get user by ID
// router.get('/:id', authenticate, getUserById);

// // Update user profile picture
// router.put('/:id/profilePicture', authenticate, upload.single('profilePicture'), updateUserProfilePicture);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  updateUserProfilePicture,
} = require('../controllers/userController.js');
const { authenticate } = require('../middlewares/authMiddleware.js');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/temp');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Register a new user
router.post('/register', registerUser);

// Login a user and get JWT token
router.post('/login', loginUser);

// Logout a user
router.post('/logout', logoutUser);

// Get user by ID
router.get('/:id', authenticate, getUserById);

// Update user profile picture
router.put(
  '/:id/profilePicture',
  authenticate,
  upload.single('profilePicture'),
  updateUserProfilePicture
);

module.exports = router;

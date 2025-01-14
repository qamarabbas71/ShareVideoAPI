// const User = require('../models/User.js');
// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcryptjs');
// const path = require('path');
// const fs = require('fs');

// // Register a new user
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password, profilePicture } = req.body;

//   // Check if user already exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   // Create a new user
//   const user = await User.create({
//     username,
//     email,
//     password,
//     profilePicture,
//   });

//   if (user) {
//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '30d',
//     });

//     res.status(201).json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       profilePicture: user.profilePicture,
//       token,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // Login user and return JWT token
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Check if user exists
//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(400);
//     throw new Error('Invalid email or password');
//   }

//   // Check if password matches
//   const isMatch = await user.matchPassword(password);
//   if (!isMatch) {
//     res.status(400);
//     throw new Error('Invalid email or password');
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   res.status(200).json({
//     _id: user._id,
//     username: user.username,
//     email: user.email,
//     profilePicture: user.profilePicture,
//     token,
//   });
// });

// // Logout user (simple approach, just a client-side token delete)
// const logoutUser = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: 'User logged out successfully' });
// });

// // Get user by ID
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password');
//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // Update user's profile picture
// const updateUserProfilePicture = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   if (!req.file) {
//     res.status(400);
//     throw new Error('No file uploaded');
//   }

//   // Save the uploaded file
//   const profilePicturePath = `/uploads/profilePictures/${req.file.filename}`;
  
//   // Remove old profile picture if it exists
//   if (user.profilePicture && fs.existsSync(path.join(__dirname, `../${user.profilePicture}`))) {
//     fs.unlinkSync(path.join(__dirname, `../${user.profilePicture}`));
//   }

//   // Update user's profile picture
//   user.profilePicture = profilePicturePath;
//   const updatedUser = await user.save();

//   res.status(200).json({
//     message: 'Profile picture updated successfully',
//     profilePicture: updatedUser.profilePicture,
//   });
// });

// module.exports = { 
//   registerUser, 
//   loginUser, 
//   logoutUser, 
//   getUserById, 
//   updateUserProfilePicture 
// };



const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, profilePicture } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
    profilePicture,
  });

  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    token,
  });
});

// Logout user
const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user's profile picture
const updateUserProfilePicture = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pictures',
    });

    // Remove old profile picture from Cloudinary (if applicable)
    if (user.profilePicture) {
      const publicId = user.profilePicture.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`profile_pictures/${publicId}`);
    }

    // Update user's profile picture
    user.profilePicture = result.secure_url;
    const updatedUser = await user.save();

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserById,
  updateUserProfilePicture,
};

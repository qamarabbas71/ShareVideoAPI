// // controllers/commentController.js
// const mongoose = require('mongoose');
// const Comment = require('../models/Comment');

// // Add a comment
// const addComment = async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const { text } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(videoId)) {
//       return res.status(400).json({ message: 'Invalid video ID' });
//     }

//     if (!text) {
//       return res.status(400).json({ message: 'Comment text is required' });
//     }

//     const comment = new Comment({
//       text,
//       videoId,
//       userId: req.user._id, // Assuming `req.user._id` is set by your authentication middleware
//     });

//     await comment.save();
//     res.status(201).json({ message: 'Comment added successfully', comment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Get comments for a video
// const getComments = async (req, res) => {
//   try {
//     const { videoId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(videoId)) {
//       return res.status(400).json({ message: 'Invalid video ID' });
//     }

//     const comments = await Comment.find({ videoId }).populate('userId', 'username profilePicture');
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = {
//   addComment,
//   getComments,
// };




// controllers/commentController.js
const mongoose = require('mongoose');
const Comment = require('../models/Comment');

// Add a comment
const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const comment = new Comment({
      text,
      videoId,
      userId: req.user._id, // Assuming `req.user._id` is set by your authentication middleware
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get comments for a video
const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: 'Invalid video ID' });
    }

    const comments = await Comment.find({ videoId }).populate('userId', 'username profilePicture');
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'Invalid comment ID' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the logged-in user is the owner of the comment
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment, // Export the deleteComment function
};

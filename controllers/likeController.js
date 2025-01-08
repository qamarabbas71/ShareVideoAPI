const Like = require("../models/Likes.js");
const mongoose = require("mongoose");

// Add a like
const addLike = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const existingLike = await Like.findOne({ videoId, userId: req.user._id });

    if (existingLike) {
      return res.status(400).json({ message: "User already liked this video" });
    }

    const like = new Like({
      videoId,
      userId: req.user._id,
    });

    await like.save();
    res.status(201).json({ message: "Like added successfully", like });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a like
const removeLike = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const like = await Like.findOneAndDelete({ videoId, userId: req.user._id });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get like count for a video
const getLikeCount = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const likeCount = await Like.countDocuments({ videoId });
    res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get users who liked a video
const getLikers = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const likes = await Like.find({ videoId }).populate("userId", "username profilePicture");
    res.status(200).json({ likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addLike,
  removeLike,
  getLikeCount,
  getLikers,
};

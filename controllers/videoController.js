// // New Code

// // controllers/videoController.js
// const Video = require('../models/Video');

// // Upload a video
// const uploadVideo = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: 'No video file provided' });
//     }

//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const video = new Video({
//       title,
//       description,
//       videoUrl: `/uploads/videos/${req.file.filename}`,
//       uploadedBy: req.user._id,
//     });

//     await video.save();
//     res.status(201).json({ message: 'Video uploaded successfully', video });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get all videos
// const getAllVideos = async (req, res) => {
//   try {
//     const videos = await Video.find()
//       .populate('uploadedBy', 'username profilePicture')
//       .sort({ createdAt: -1 });

//     res.status(200).json(videos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   uploadVideo,
//   getAllVideos,
// };







const Video = require('../models/Video');

// Upload a video
const uploadVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No video file provided' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const video = new Video({
      title,
      description,
      videoUrl: `/uploads/videos/${req.file.filename}`,
      uploadedBy: req.user._id,
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate('uploadedBy', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get videos by user ID
const getUserVideos = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userVideos = await Video.find({ uploadedBy: userId })
      .populate('uploadedBy', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(userVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search videos
const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).populate('uploadedBy', 'username profilePicture');

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the logged-in user is the uploader
    if (video.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this video" });
    }

    // Delete the video
    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getUserVideos,
  searchVideos,
  deleteVideo,
};

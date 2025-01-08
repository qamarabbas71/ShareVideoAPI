// const express = require('express');
// const multer = require('multer');
// const { uploadVideo, getAllVideos } = require('../controllers/videoController');
// const { authenticate } = require('../middlewares/authMiddleware');

// const router = express.Router();

// // Multer configuration for video uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/videos'); // Directory to store videos
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // Routes
// router.post('/upload', authenticate, upload.single('video'), uploadVideo); // Upload video
// router.get('/', getAllVideos); // Get all videos
// // router.post('/:videoId/like', authenticate, toggleLike); 
// // router.post('/:videoId/comment', authenticate, addComment); 

// module.exports = router; 






const express = require('express');
const multer = require('multer');
const {
  uploadVideo,
  getAllVideos,
  getUserVideos,
  searchVideos,
  deleteVideo,
} = require('../controllers/videoController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Multer configuration for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos'); // Directory to store videos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.post('/upload', authenticate, upload.single('video'), uploadVideo);
router.get('/', getAllVideos);
router.get('/user/:userId', getUserVideos);
router.get('/search', searchVideos);
router.delete('/:videoId', authenticate, deleteVideo); 

module.exports = router;

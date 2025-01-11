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

// Multer configuration for video uploads (still used to handle multipart form-data)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos'); // Directory to temporarily store videos before uploading to Cloudinary
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


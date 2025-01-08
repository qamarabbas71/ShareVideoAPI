const express = require("express");
const router = express.Router();
const {
  addLike,
  removeLike,
  getLikeCount,
  getLikers,
} = require("../controllers/likeController");
const authenticate = require("../middlewares/authMiddleware").authenticate;

// Add a like
router.post("/:videoId", authenticate, addLike);

// Remove a like
router.delete("/:videoId", authenticate, removeLike);

// Get like count for a video
router.get("/:videoId/count", getLikeCount);

// Get users who liked a video
router.get("/:videoId/likers", getLikers); 

module.exports = router;

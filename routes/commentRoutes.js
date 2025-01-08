// // routes/commentRoutes.js
// const express = require('express');
// const router = express.Router();
// const { addComment, getComments } = require('../controllers/commentController'); // Destructure the functions
// const authenticate = require('../middlewares/authMiddleware').authenticate; // Authentication middleware

// // Route to add a comment
// router.post('/:videoId', authenticate, addComment); // Use the destructured addComment function

// // Route to get comments for a video
// router.get('/:videoId', getComments); // Use the destructured getComments function

// module.exports = router;


// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment, getComments, deleteComment } = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware').authenticate;

// Route to add a comment
router.post('/:videoId', authenticate, addComment);

// Route to get comments for a video
router.get('/:videoId', getComments);

// Route to delete a comment
router.delete('/:commentId', authenticate, deleteComment);

module.exports = router;

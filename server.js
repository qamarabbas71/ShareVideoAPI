// const express = require('express');
// const connectDB = require('./config/db');
// const dotenv = require('dotenv');
// const cors = require('cors');

// const userRoutes = require('./routes/userRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const commentRoutes = require('./routes/commentRoutes');

// dotenv.config();
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads'));

// // API Routes
// app.use('/api/users', userRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/comments', commentRoutes); // Updated path

// // Home route
// app.get('/', (req, res) => {
//   res.send('Welcome to the TikTok clone API');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes); 
app.use('/api/likes', likeRoutes)

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the TikTok clone API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

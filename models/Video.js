// const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//   title: { type: String },
//   description: { type: String },
//   videoUrl: { type: String, required: true },
//   uploadedBy: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs
//   comments: [{ 
//     username: { type: String }, 
//     text: { type: String }, 
//     createdAt: { type: Date, default: Date.now }
//   }],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Video', videoSchema);

// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
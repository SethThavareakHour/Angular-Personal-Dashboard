const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// MongoDB Connection URI
const MONGO_URI = 'mongodb://localhost:27017/bookmarks';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Bookmark Model
const bookmarkSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  url: { type: String, required: true }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// Get all bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single bookmark by ID
app.get('/api/bookmarks/:id', async (req, res) => {
    try {
      // Use findById with the MongoDB _id
      const bookmark = await Bookmark.findById(req.params.id);
      if (!bookmark) {
        return res.status(404).json({ message: 'Bookmark not found' });
      }
      res.json(bookmark);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Add a new bookmark
app.post('/api/bookmarks', async (req, res) => {
  const { name, url } = req.body;

  const bookmark = new Bookmark({
    id: new mongoose.Types.ObjectId().toString(),
    name,
    url
  });

  try {
    const newBookmark = await bookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a bookmark
app.put('/api/bookmarks/:id', async (req, res) => {
  const { name, url } = req.body;

  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    bookmark.name = name || bookmark.name;
    bookmark.url = url || bookmark.url;

    const updatedBookmark = await bookmark.save();
    res.json(updatedBookmark);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bookmark
app.delete('/api/bookmarks/:id', async (req, res) => {
    try {
      const result = await Bookmark.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Bookmark not found' });
      }
      res.json({ message: 'Bookmark deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

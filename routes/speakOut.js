const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// GET all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new story
router.post('/', async (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ message: 'Name and message are required' });
  }
  const story = new Story({ name, message });
  try {
    const newStory = await story.save();
    res.status(201).json(newStory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

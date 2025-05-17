const express = require('express');
const router = express.Router();

// /api/posts/
router.get('/', (req, res) => {
  res.send('List of posts');
});

// /api/posts/id
router.get('/:id', (req, res) => {
  res.send(`Posts ID: ${req.params.id}`);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// /api/users/
router.get('/', (req, res) => {
  res.send('List of users');
});

// /api/users/id
router.get('/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const usersRouter = require('./users.routes');
const postsRouter = require('./posts.routes');

// Mount usersRouter at /users
router.use('/users', usersRouter);

// router for posts
router.use('/posts', postsRouter);

// You can keep adding more nested routers here if needed


module.exports = router;

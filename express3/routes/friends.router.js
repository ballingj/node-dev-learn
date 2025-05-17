const express = require('express');

const friendsControllers = require('../controllers/friends.controller');

const friendsRouter = express.Router();

friendsRouter.use((req, res, next) => {
  console.log('ip address:', req.ip);
  next();
});

friendsRouter.post('/', friendsControllers.postFriend);
friendsRouter.get('/', friendsControllers.getFriends);
friendsRouter.get('/:friendId', friendsControllers.getFriend);

module.exports = friendsRouter;

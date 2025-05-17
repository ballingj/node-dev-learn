const friends = require('../models/friends.model')

function postFriend(req, res) {
  if (!req.body || !req.body.name) {
    return res.status(400).json({
      error: 'Missing name',
    });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length,
  };
  friends.push(newFriend);
  res.json(newFriend);
}

function getFriends(req, res) {
    res.json(friends);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: 'Friend does not exist.',
    });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriend,
}

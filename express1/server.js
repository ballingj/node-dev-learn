/**Before MVC edits */
const express = require('express');
const app = express();
const PORT = 3001;

// starter data
const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  },
];

//middleware for body-parser
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware to serve static files index.html, styles.css scripts.js
//app.use(express.static(__dirname + '/public'));

// custom middleware to log events
app.use((req, res, next) => {
  const start = Date.now();
  //console.log(`${req.method} ${req.url}`);
  next(); // without this next() function, it will not move on
  // below is action that executes in a return trip to client
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.post('/friends', (req, res) => {
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
});

app.get('/', (req, res) => {
  res.send("<p>You've reached the homepage</p>");
});

app.get('/messages', (req, res) => {
  res.send('<p>Hello from Express!</p>');
});

app.get('/friends', (req, res) => {
  res.json(friends);
});

app.get('/friends/:friendId', (req, res) => {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: 'Friend does not exist.',
    });
  }
});

// Define the listening port of the server
app.listen(PORT, () => {
  console.log(`This app listening on port ${PORT}`);
});

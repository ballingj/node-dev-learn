/* After MVC edits*/
const express = require('express');

// Controllers
// const homeControllers = require('./controllers/home.controller')
const { getHome } = require('./controllers/home.controller');
const friendsControllers = require('./controllers/friends.controller');
const messagesControllers = require('./controllers/messages.controller');

const app = express();
const PORT = 3001;

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

//Endpoints
// app.get('/', homeControllers.getHome);
app.get('/', getHome);

app.post('/friends', friendsControllers.postFriend);
app.get('/friends', friendsControllers.getFriends);
app.get('/friends/:friendId', friendsControllers.getFriend);

app.get('/messages', messagesControllers.getMessages);
app.post('/messages', messagesControllers.postMessage);

// Define the listening port of the server
app.listen(PORT, () => {
  console.log(`This app listening on port ${PORT}`);
});

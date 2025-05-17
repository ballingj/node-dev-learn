/* After MVC edits*/
const express = require('express');
const path = require('path');

const mainRouter = require('./routes/main.router');
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3001;

//middleware for body-parser
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware to serve static files index.html, styles.css scripts.js
app.use(express.static(__dirname + '/public'));

// custom middleware to log events
app.use((req, res, next) => {
  const start = Date.now();
  //console.log(`${req.method} ${req.url}`);
  next(); // without this next() function, it will not move on
  // below is action that executes in a return trip to client
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

//Express Routers

app.use('/', mainRouter);

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

// Define the listening port of the server
app.listen(PORT, () => {
  console.log(`This app listening on port ${PORT}`);
});

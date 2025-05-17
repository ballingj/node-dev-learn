/*This is expanded http server with very basic GET data and some basic parsing of url  */
const http = require('http');

const server = http.createServer()
const PORT = 5600;

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

/* This is a demo of how an API endpoint may be parsed ;
this is not recommended to use in production*/

server.on('request', (req, res) => {
  const items = req.url.split('/');
  // what we are doing above is splitting the url
  // for example, "/friends/2" => ['', 'friends', '2']
  if ( items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = Number(items[2])
      if (friends.length > friendIndex) {
        res.end(JSON.stringify(friends[friendIndex]));
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.url === '/messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<p>Hello Isaac</p>');
    res.write('<p>What are your thought on modern Astronomy?</p>');
    res.write('</html>');
    res.write('</body>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

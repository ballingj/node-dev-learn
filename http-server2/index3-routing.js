/**This is expanded further with url for POST */
const http = require('http');

const server = http.createServer();
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

  // process for POST request; expected JSON body of {"id": 3, "name": "Marie Curie"}
  // or from a client the following code:
  //  fetch('http://localhost:5600/friends', {
  //      method: 'POST',
  //      body: JSON.stringify({id: 3, name: "Marie Curie"})
  //  })
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();
      // this data object is a byte data, so preprocess for conversion to string
      console.log('Request:', friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);    // send the req body to res -- like an echo
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      if (friends.length > friendIndex) {
        res.end(JSON.stringify(friends[friendIndex]));
      } else {
        res.statusCode = 404;
        res.end();
      }
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === 'messages') {
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

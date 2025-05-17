/* This is a basic request/response http server */
const http = require('http');

const server = http.createServer();
const PORT = 5600;

server.on('request', (req, res) => {
  if (req.url === '/friends') {
    // alternative to below:
    // res.writeHead(200, {
    //   'Content-Type': 'application/json',
    // });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        name: 'Isaac Newton',
        message: 'Hello from the otherside',
      })
    );
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

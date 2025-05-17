const http = require('http');

const PORT = 5600;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({
      name: 'Isaac Newton',
      message: 'Hello from the otherside',
    })
  );
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});

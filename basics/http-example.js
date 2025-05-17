//const http = require('http');
const { request, get } = require('http');
// const https = require('https');

/*
const req = request('http://www.google.com', (res) => {
  res.on('data', (chunk) => {
    console.log(`Data chunk: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data');
  });
});
req.end();
*/

/*
get('http://www.google.com', (res) => {
  res.on('data', (chunk) => {
    console.log(`Data chunk: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data');
  });
});
*/
/*
get('http://localhost:5500/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.log('Error: ', err);
});
*/

// People in space API
get('http://api.open-notify.org/astros.json', res => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  })
  res.on('end', () => {
    console.log(JSON.parse(data));
  })
}).on('error', (err) => {
  console.log('Error: ', err);
});

// ISS now location
get("http://api.open-notify.org/iss-now.json", res => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  })
  res.on('end', () => {
    console.log(JSON.parse(data));
  })
}).on('error', (err) => {
  console.log('Error: ', err);
});

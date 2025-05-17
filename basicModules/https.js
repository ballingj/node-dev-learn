/* This is not the real http module*/
const request = require('./request');
const response = require('./response');

function encRequest(url, data) {
  const encData = request.send(url, data);
  return encData;
}

function decResponse(data) {
  return response.read(data)
}

const clearText = "Hello World...or just Jeff."
const encodedResponse = encRequest('http://www.google.com', clearText);
console.log('Encoded Message:', encodedResponse);

const decodedMessage = decResponse(encodedResponse);
console.log('Decoded Message:', decodedMessage);

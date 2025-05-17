const request = require('./request');
const response = require('./response');
const axios = require('axios');


function encodeRequest(data) {
  const encData = request.send(data);
  return encData; // Encrypted output
}

function decodeResponse(data) {
  return response.read(data)
}

const clearText = "Hello World...or just Jeff."
const encodedResponse = encodeRequest(clearText);
console.log('Encoded Message:', encodedResponse);

const decodedMessage = decodeResponse(encodedResponse);
console.log('Decoded Message:', decodedMessage);

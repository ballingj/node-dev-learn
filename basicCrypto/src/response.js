const CryptoJS = require('crypto-js');

const SECRET_KEY = 'my-secret-key'; // must match the one in request.js

function decodeText(data) {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function read(data) {
  return decodeText(data);
}

module.exports = { read };

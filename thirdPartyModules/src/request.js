const CryptoJS = require('crypto-js');

const SECRET_KEY = 'my-secret-key'; // should be 128/192/256 bits (can be stored securely)

function encodeText(data) {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

function send(data) {
  const encryptedData = encodeText(data);
  return encryptedData;
}

module.exports = { send };

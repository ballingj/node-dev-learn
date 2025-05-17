//const CryptoJS = require('crypto-js');

function decodeText(data) {
  return Buffer.from(data, 'base64').toString('utf-8');
}

function read(data) {
  return decodeText(data);
}

module.exports = {
  read,
};

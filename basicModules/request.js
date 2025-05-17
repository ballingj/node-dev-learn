//const CryptoJS = require('crypto-js');

function encodeText(data) {
  return Buffer.from(data, 'utf-8').toString('base64');
}

function send(url, data) {
  const encryptedData = encodeText(data);
  console.log(`sending ${encryptedData} to ${url}.`);
  return encryptedData;
}

module.exports = {
  send,
};

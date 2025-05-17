const path = require('path');

function getMessages(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'skimountain.jpg'));
  //res.send('<p>Hello from Express!</p>');
}

function postMessage(req, res) {
  console.log('Updating messages....');
}

module.exports = {
  getMessages,
  postMessage,
};

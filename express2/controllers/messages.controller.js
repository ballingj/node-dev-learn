function getMessages(req, res) {
  res.send('<p>Hello from Express!</p>');
}

function postMessage(req, res) {
  console.log('Updating messages....');
}

module.exports = {
  getMessages,
  postMessage,
};

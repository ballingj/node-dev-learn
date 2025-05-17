const express = require('express');

const messagesControllers = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.get('/', messagesControllers.getMessages);
messagesRouter.post('/', messagesControllers.postMessage);

module.exports = messagesRouter;

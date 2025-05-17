const express = require('express');

const mainController = require('../controllers/main.controller');

const mainRouter = express.Router();

// app.get('', homeControllers.getHome);
mainRouter.get('', (req, res) => {
  res.render('index', {
    title: 'Clever Friends',
    caption: 'Let\'s go skiing!',
  })
})

mainRouter.get('/main', mainController.getHome);

module.exports = mainRouter;
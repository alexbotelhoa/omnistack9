const express = require('express');

const TesteController = require('./controllers/TesteController');

const routes = express.Router();
routes.get('/', (req, res) => {
    return res.send('Hellow World')
})

routes.get('/teste', TesteController.index);

module.exports = routes;
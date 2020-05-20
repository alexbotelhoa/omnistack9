const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://admin:200679@cluster0-bbus6.mongodb.net/omnistack9?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes);

module.exports = app;
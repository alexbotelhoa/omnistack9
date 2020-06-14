const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes');
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {};

io.on('connection', socket => {
   const { user_id } = socket.handshake.query;
   connectedUsers[user_id] = socket.id;

   console.log(`user_id: ${user_id}`, 'Socket:', connectedUsers[user_id]);
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bbus6.mongodb.net/omnistack9?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
})

app.use((req, res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   console.log(connectedUsers);
   return next();
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);

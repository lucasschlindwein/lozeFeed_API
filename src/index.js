require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use((req, res, next) => {
  req.io = io;

  next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'resized')));

app.use(routes);

server.listen(3001);
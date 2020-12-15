'use strict';

require('dotenv').config();

const server = require('./source/server');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(PORT);
  })
  .catch(e => console.error('Could not start server', e.message));

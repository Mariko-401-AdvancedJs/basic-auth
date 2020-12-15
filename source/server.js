'use strict';

const express = require('express');

const router = require('./auth/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);



module.exports = {
  server: app,
  start: PORT => {
    // console.log(PORT);
    if (!PORT) { throw new Error('port is missing'); }
    app.listen(PORT, () => {
      console.log(`alive on ${PORT}`);
    })
  }
}
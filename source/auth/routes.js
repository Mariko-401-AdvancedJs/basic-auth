'use strict';

// const app = express();
const basicAuth = require('./signin-auth-midd');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const express = require('express');
const router = express.Router();


const Users = require('./schema');

// app.use(router);


//test
// router.get('/', (req, res, next) => {
//   res.send('hello');
// })

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body.password);
    const user = new Users(req.body);
    console.log('check:', user);
    const record = await user.save(req.body);
    res.status(200).json(record);
  } catch (e) { console.log(e); res.status(403).send("Error Creating User"); }
});

router.post('/signin', basicAuth, async (req, res) => {
  res.status(200).send(req.user);
});
module.exports = router;
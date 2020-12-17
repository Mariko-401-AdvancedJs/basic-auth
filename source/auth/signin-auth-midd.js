'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('./schema');


async function basicAuth(req, res, next) {

  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    req.user = await Users.authenticateBasic(username, password);//sending username on req body to get authenticated in DB to make sure it is valid, if valid return the user
    // const user = await Users.findOne({ username: username })
    // const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
      next();
    }
    else {
      next(err.message);
    }
  } catch (error) { res.status(403).send("Invalid Login"); }
}
module.exports = basicAuth;
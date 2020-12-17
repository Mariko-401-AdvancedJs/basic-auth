'use strict';

const model = require('./schema');

module.exports = (req, res, next) => {
  let = token = req.headers.authorization.split(' ').pop();

  model.authenticateWithToken(token)//.......
    .then(validUser => {
      req.user = validUser;
      next();
    })
    .catch(err => next(err.message));
}
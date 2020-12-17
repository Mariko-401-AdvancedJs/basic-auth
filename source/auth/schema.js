'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', async function () {
  //everytime someone hits save, it checks to makes sure the password has been modified
  // THIS IS A PRE-HOOK BEFORE SAVING A RECORD
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
})

//this method only runs on the model itself and NOT the actual object instance. 
// os do "User.authenticateBasic" vs User().authenticateBasic
// so we want to make sure a user has authorization before a their request comes through the
usersSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
}

usersSchema.statics.authenticateWithToken = async function (token) {
  //check if token is real
  try {
    const parsedToken = jwt.verify(token, SECRET);//secret must be correct
    const user = this.findOne({ username: parsedToken.username });//username has been stored in the token by this point
    if (user) { return user; }
    throw new Error('user not found');
  } catch (e) {
    throw new Error(e.message);
  }

  //if so, send back user object
  //else, send error
}

module.exports = mongoose.model('users', usersSchema);
// module.exports = Users;
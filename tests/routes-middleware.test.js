'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require("../source/server");
const agent = supergoose(server);

// const { expect } = require('@jest/globals');
const Users = require('../source/auth/schema');

describe('create new user', () => {
  it('should create a new user', () => {
    let newGuy = { "username": "riko", "password": "greens" };
    return agent.post('/signup').send(newGuy)
      .then(userInfo => {
        console.log('return for test:', userInfo);
        expect(userInfo.body.username).toEqual("riko");
      })
  })
})

describe('log in', () => {
  it('should sign in user', () => {
    let newGuy = { "username": "riko", "password": "greens" };
    agent.post('/signup').send(newGuy)
    agent.post('/signin').auth(newGuy)
      .then(userInfo => {
        console.log('return for test:', userInfo);
        expect(userInfo.body.username).toEqual("riko");
      })
  })
})
//need to turn this into an async function because signup takes too long
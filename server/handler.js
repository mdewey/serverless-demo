'use strict';
const jwt = require("jsonwebtoken");

const mongo = require("./database");

const buildJsonResponse = (json) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(json)
  };
  console.log("returning", response)
  return response;
}

module.exports.index = (event, context) => {
  mongo.getUser("mtdewey55@gmail.com", (err, user) => {
    return context.done(null, buildJsonResponse({ user, err }));
  })
};


module.exports.getOrCreateUser = (event, context) => {
  const _token = event.headers.Authorization.split(" ")[1];
  const _data = jwt.decode(_token, { complete: true })
  const user = {
    email: _data.payload.email
  }
  mongo.getUser(user.email, (err, foundUser) => {
    if (!foundUser) {
      mongo.addUser({ email: user.email }, (err, user) => {
        console.log("got here 1")
        return context.done(null, buildJsonResponse({ "message": "creating user", user }));
      })
    } else {
      console.log("got here 2")
      // get users docs
      mongo.getUserVirtuesCount(user, (err, results) => {
        return context.done(null, buildJsonResponse({
          "message": "returning user",
          user: foundUser,
          data: { count: results }
        }));
      })
      // return user and stuff
    }
  })
}
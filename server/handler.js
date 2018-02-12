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

const getUserFromToken = (event) => {
  const _token = event.headers.Authorization.split(" ")[1];
  const _data = jwt.decode(_token, { complete: true })
  const user = {
    email: _data.payload.email
  }
  return user;
}

module.exports.index = (event, context) => {
  mongo.getUser("mtdewey55@gmail.com", (err, user) => {
    return context.done(null, buildJsonResponse({ user, err }));
  })
};


module.exports.getOrCreateUser = (event, context) => {
  const user = getUserFromToken(event);
  mongo.getUser(user.email, (err, foundUser) => {
    if (!foundUser) {
      mongo.addUser({ email: user.email }, (err, user) => {
        return context.done(null, buildJsonResponse({ "message": "creating user", user }));
      })
    } else {
      // get users docs
      mongo.getUserVirtuesCount(user, (err, count) => {
        mongo.getUsersTodayValues(user, (err, today) => {
          return context.done(null, buildJsonResponse({
            "message": "returning user",
            user: foundUser,
            data: { count, today }
          }));
        })
      })

    }
  })
}

module.exports.addYesToVirtue = (event, context) => {
  console.log({ event, context })
  const user = getUserFromToken(event);
  const virtueId = event.pathParameters.id;
  mongo.getUser(user.email, (err, user) => {
    mongo.addYesToVirtue(user, virtueId, (err, results) => {
      return context.done(null, buildJsonResponse({ user, err, results }));
    })
  })
}


module.exports.addNoToVirtue = (event, context) => {
  console.log({ event, context })
  const user = getUserFromToken(event);
  const virtueId = event.pathParameters.id;
  mongo.getUser(user.email, (err, user) => {
    mongo.addNoToVirtue(user, virtueId, (err, results) => {
      return context.done(null, buildJsonResponse({ user, err, results }));
    })
  })
}

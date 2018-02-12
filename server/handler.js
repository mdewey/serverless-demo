'use strict';
const jwt = require("jsonwebtoken");
const SECRET_KEY = "fMIzDIjyrqnF33BPDB_5e-5k_RKgGccJ4r3Gdi_rtmesDGM_MPTVcv-B8XWZEQLw";


const buildJsonResponse = (json) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(json)
  };
  return response;
}

module.exports.index = function (event, context, callback) {
  return callback(null, buildJsonResponse({ "message": "Hello World!" }));
};


module.exports.getOrCreateUser = (event, context, callback) => {

  const _token = event.headers.Authorization.split(" ")[1];
  console.log({ event, _token });

  const _data = jwt.decode(_token, { complete: true })
  console.log({ _data })
  const user = {
    email : data.payload.email
  }
  return callback(null, buildJsonResponse({ "message": "Creating user", _data }));
}
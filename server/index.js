const serverless = require('serverless-http');
const express = require('express')
const app = express()

const cors = require("cors")

app.use(cors())

app.get('/', function (req, res) {
  const hello = "world"
  res.json({hello})
})

module.exports.handler = serverless(app);
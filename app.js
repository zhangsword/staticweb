const express = require("express");
const request = require("request")
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
  
// Create Express Server
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));
// Configuration
const PORT = 8080;
const HOST = "0.0.0.0";
const baseUrl = "https://org21.test.makertown.jp/"
  
// Logging the requests
app.use(morgan("dev"));

app.all('*', (req, res) => {
  console.log(req.originalUrl)
  request.post(
    {
      url: baseUrl + req.originalUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      body: req.body,
    },
    function (err, response) {
      console.log(response.body)
      res.send(response.body)
    }
  )
})
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting server at ${HOST}:${PORT}`);
});

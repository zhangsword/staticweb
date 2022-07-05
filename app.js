const express = require("express");
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
const API_BASE_URL = "https://org21.test.makertown.jp";
  
// Logging the requests
app.use(morgan("dev"));

app.post('/createToken', (req, res) => {
  const {appId, secret, userId} = req.body
  console.log(appId, secret, userId)
  request.post(
    {
      url:
        API_BASE_URL + '/dtapi/v1/createToken',
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      body: {
        appId:"dtapi21",
        secret:"sec21",
        userId:"0001"
      },
    },
    function (err, response) {
      if (!err && response.statusCode === 200) {
        res.redirect(response.body)
      } else {
        res.status(response.statusCode).send('get image error')
      }
    }
  )
  res.send('front app is running!')
})

// Proxy Logic :  Proxy endpoints
// app.use(
//     "/dtapi",
//     createProxyMiddleware({
//         target: API_BASE_URL,
//         changeOrigin: true,
//         onProxyReq(proxyReq, req, res) {
//           if (req.body) {
//             const bodyData = JSON.stringify(req.body)
//             proxyReq.setHeader('Content-Type', 'application/json')
//             proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
//             proxyReq.write(bodyData)
//           }
//           console.log('1==============>', req.body)
//           console.log('2==============>', req.headers)
//         },
//     })
// );
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

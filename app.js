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
const API_BASE_URL = "https://org21.test.makertown.jp/dtapi";
  
// Logging the requests
app.use(morgan("dev"));
  
// Proxy Logic :  Proxy endpoints
app.use(
    "/dtapi",
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
          if (req.body) {
            const bodyData = JSON.stringify(req.body)
            proxyReq.setHeader('Content-Type', 'application/json')
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
            proxyReq.write(bodyData)
          }
          console.log('1==============>', req.body)
          console.log('2==============>', req.headers)
        },
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

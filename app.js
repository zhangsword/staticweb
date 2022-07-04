const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
  
// Create Express Server
const app = express();
  
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
        onProxyReq(proxyReq, req, res, options) {
          if (req.body) {
            const bodyData = JSON.stringify(req.body)
            proxyReq.setHeader('Content-Type', 'application/json')
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
            proxyReq.write(bodyData)
          }
        },
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

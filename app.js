const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
  
// Create Express Server
const app = express();
  
// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_BASE_URL = "https://org21.test.makertown.jp/dtapi";
  
// Logging the requests
app.use(morgan("dev"));
  
// Proxy Logic :  Proxy endpoints
app.use(
    "/dtapi",
    createProxyMiddleware({
        target: API_BASE_URL,
        changeOrigin: true
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

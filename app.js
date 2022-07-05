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
const baseUrl = "https://org21.test.makertown.jp"
const creattToken = "/dtapi/v1/createToken"
const getProductDesign = "/dtapi/v1/getProduct"
const getUserDesign = "/dtapi/v1/getUserDesign"
  
// Logging the requests
app.use(morgan("dev"));

app.use('/dtapi/v1/createToken', (req, res) => {
  console.log(req.body)
  request.post(
    {
      url: baseUrl + creattToken,
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

app.post('/dtapi/v1/getUserDesign', (req, res) => {
  console.log(req.body)
  request.post(
    {
      url: baseUrl + getUserDesign,
      headers: {
        "content-type": "application/json",
      },
      json: true,
      body: req.body,
    },
    function (err, response) {
      const designs = [
        {
          productId: '10001',
          manageId: '0001',
          designName: 'test',
          thumbnailUrls: [
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg'
          ],
          createdAt: '2022/07/05 12:08:68'
        },
        {
          productId: '10001',
          manageId: '0001',
          designName: 'test',
          thumbnailUrls: [
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg'
          ],
          createdAt: '2022/07/05 12:08:68'
        },
        {
          productId: '10001',
          manageId: '0001',
          designName: 'test',
          thumbnailUrls: [
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg'
          ],
          createdAt: '2022/07/05 12:08:68'
        },
        {
          productId: '10001',
          manageId: '0001',
          designName: 'test',
          thumbnailUrls: [
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg'
          ],
          createdAt: '2022/07/05 12:08:68'
        },
        {
          productId: '10001',
          manageId: '0001',
          designName: 'test',
          thumbnailUrls: [
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg',
            'https://www.aaa.com/images/aa.jpg'
          ],
          createdAt: '2022/07/05 12:08:68'
        }
      ]
      res.send({designs})
    }
  )
})

app.post('/dtapi/v1/getProduct', (req, res) => {
  console.log(req.body)
  request.post(
    {
      url: baseUrl + getProductDesign,
      headers: {
        "content-type": "application/json",
      },
      json: true,
      body: req.body,
    },
    function (err, response) {
      
      const data = {
        productId: '10001',
        thumbnailUrls: [
          'https://www.aaa.com/images/aa.jpg',
          'https://www.aaa.com/images/aa.jpg',
          'https://www.aaa.com/images/aa.jpg'
        ],
        isPersist: true,
        expiredAt: '2022/07/05 12:08:68'
      }
      res.send(data)
    }
  )
})

app.get('/dtpage/v1/start', (req, res) => {
  console.log(req.query)
  request.get(
    {
      url: baseUrl + '/dtpage/v1/start',
      headers: {
        "content-type": "text/html",
      },
      query: req.query
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

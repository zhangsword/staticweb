var http = require('http');
var httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'org21.test.makertown.jp',
    port: 443,
	rejectUnauthorized:false,
  },
  changeOrigin: true,
}).listen(8000);

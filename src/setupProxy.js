const proxy = require('http-proxy-middleware');

const startApiServer = require('../server/start');

module.exports = function(app) {
  var port = 8092;

  app.use(proxy('/api', { target: `http://localhost:${port}/`, ws: true }));
  startApiServer(port);
}; 
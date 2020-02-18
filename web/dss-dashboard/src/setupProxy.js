const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/egov-mdms-service',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/dashboard-analytics',
    proxy({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};
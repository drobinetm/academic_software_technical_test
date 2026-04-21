const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/Api',
    createProxyMiddleware({
      target: 'https://pruebareactjs.test-class.com',
      changeOrigin: true,
      secure: true,
    })
  );
};

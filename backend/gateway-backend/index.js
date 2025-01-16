const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log('Gateway Request:', {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl
  });
  next();
});

// Service configuration map
const serviceMap = {
  products: {
    target: 'http://product-backend:8081',
    pathPrefix: '/api/products',
    options: {
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying to products service:', {
          method: proxyReq.method,
          path: proxyReq.path
        });
      }
    }
  },
  users: {
    target: 'http://user-backend:8080', 
    pathPrefix: '/api/users',
    options: {
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api/users': '/api/users'
      }
    }
  }
};

// Configure proxy middleware for each service
Object.entries(serviceMap).forEach(([service, config]) => {
  const proxyOptions = {
    target: config.target,
    ...config.options,
    onError: (err, req, res) => {
      console.error(`Proxy Error (${service}):`, err);
      res.status(500).json({
        message: `${service} service proxy error`,
        error: err.message
      });
    }
  };

  app.use(config.pathPrefix, createProxyMiddleware(proxyOptions));
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({
    message: 'Internal Gateway Error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
  console.log('Available routes:');
  Object.entries(serviceMap).forEach(([service, config]) => {
    console.log(`- ${config.pathPrefix} -> ${config.target}`);
  });
});

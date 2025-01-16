const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware de logging
app.use((req, res, next) => {
  console.log('Gateway Request:', {
    method: req.method,
    path: req.path,
    originalUrl: req.originalUrl
  });
  next();
});

const productProxy = createProxyMiddleware({
  target: 'http://product-backend:8081',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: null, // Supprime le pathRewrite pour garder le chemin original
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying to products service:', {
      method: proxyReq.method,
      path: proxyReq.path,
      originalUrl: req.originalUrl
    });
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ 
      message: 'Proxy Error', 
      error: err.message 
    });
  }
});

const userProxy = createProxyMiddleware({
  target: 'http://user-backend:8080',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/api/users': '/api/users'  // Explicite le rewrite
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to users service:', {
      method: proxyReq.method,
      path: proxyReq.path,
      target: 'http://user-backend:8080'
    });
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).json({ 
      message: 'Proxy Error', 
      error: err.message,
      details: err.stack 
    });
  }
});

app.use('/api/products', productProxy);
app.use('/api/users', userProxy);

// Autres routes...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({ 
    message: 'Gateway Error', 
    error: err.message 
  });
});

app.listen(8082, () => {
  console.log('Gateway running on port 8082');
  console.log('Available routes:');
  console.log('- /api/products -> http://product-backend:8081');
  console.log('- /api/users -> http://user-backend:8080');
});

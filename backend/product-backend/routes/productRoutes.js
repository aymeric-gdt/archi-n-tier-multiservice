const express = require('express');
const router = express.Router();
const { createProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/', authMiddleware, createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, updateProduct);

router.use((req, res, next) => {
  console.log(`Product Route accessed: ${req.method} ${req.path}`);
  next();
});

module.exports = router; 
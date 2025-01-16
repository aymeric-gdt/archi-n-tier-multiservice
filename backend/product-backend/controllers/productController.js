const Product = require('../models/productModel');
const cache = require('../service/cache');

const createProduct = async (req, res) => {
  console.log('createProduct controller called');
  try {
    const { name, price } = req.body;
    const userId = req.user.userId;

    const product = new Product({ 
      name, 
      price, 
      userId
    });
    
    await product.save();
    
    // Invalider le cache après création d'un nouveau produit
    await cache.del('products');
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  console.log('getProducts controller called');
  try {
    // Essayer de récupérer depuis le cache
    const cachedProducts = await cache.get('products');
    
    if (cachedProducts) {
      console.log('Returning cached products');
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    // Si pas en cache, récupérer depuis la DB
    const products = await Product.find();
    console.log('Products found:', products);
    
    // Mettre en cache pour 5 minutes
    await cache.set('products', JSON.stringify(products), { EX: 300 });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  console.log('deleteProduct controller called');
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Invalider le cache après suppression d'un produit
    await cache.del('products');

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await cache.del('products');
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct
};
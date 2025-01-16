// frontend/src/components/GetProduct.js

import { useState, useEffect } from 'react';
import ProductModal from './ProductModal';

const GetProduct = ({ products, setProducts, refreshProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct, deletedId) => {
    if (deletedId) {
      setProducts(products.filter(p => p._id !== deletedId));
    } else {
      setProducts(products.map(p => 
        p._id === updatedProduct._id ? updatedProduct : p
      ));
    }
  };

  return (
    <div>
      <h1>Liste des produits</h1>
      <ul className="products-list">
        {products.map((product) => (
          <li 
            key={product._id} 
            onClick={() => handleProductClick(product)}
            className="product-item"
          >
            {product.name} - {product.price}€
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onProductUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default GetProduct;
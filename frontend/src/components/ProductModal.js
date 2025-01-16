import { useState } from 'react';
import api from '../utils/axios';

const ProductModal = ({ product, onClose, onProductUpdate }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/products/${product._id}`, {
        name,
        price
      });
      onProductUpdate(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/products/${product._id}`);
      onProductUpdate(null, product._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting product');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="update-btn">Update</button>
            <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal; 
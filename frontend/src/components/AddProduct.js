import { useState } from 'react';
import api from '../utils/axios';

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/products', { 
        name, 
        price
      });
      
      // Reset form after successful submission
      setName('');
      setPrice('');
      setError('');
      
      console.log('Product added:', response.data);
      
      // Call the refresh function after successful addition
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Please login to add products');
      } else {
        setError(err.response?.data?.message || 'Error adding product');
      }
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom du produit" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Prix" 
          value={price}
          onChange={(e) => setPrice(e.target.value)} 
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProduct;
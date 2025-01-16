import { useState, useEffect } from 'react';
import './App.css';
import AddProduct from './components/AddProduct';
import GetProduct from './components/GetProduct';
import Login from './components/Login';
import Register from './components/Register';
import api from './utils/axios';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setShowLogin(false);
    setShowRegister(false);
  };

  const refreshProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="site-name">My Site Name</div>
        <div className="auth-buttons">
          {currentUser ? (
            <>
              <span className="user-name">Welcome, {currentUser.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleLoginClick}>Login</button>
              <button className="register-btn" onClick={handleRegisterClick}>Register</button>
            </>
          )}
        </div>
      </nav>
      
      {showLogin && <Login setCurrentUser={setCurrentUser} />}
      {showRegister && <Register setCurrentUser={setCurrentUser} />}
      
      <header className="App-header">
        <AddProduct onProductAdded={refreshProducts} />
        <GetProduct products={products} setProducts={setProducts} refreshProducts={refreshProducts} />
      </header>
    </div>
  );
}

export default App;

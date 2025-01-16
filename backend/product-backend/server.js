const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/', productRoutes);

// Database connection
connectDB();

// Start server
app.listen(8081, () => {
  console.log('Product Server is running on port 8081');
});

// backend/app.js qui utilise express et mongoose

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/', userRoutes);

// Connexion à la base de données
connectDB();

// Démarrage du serveur
app.listen(8080, () => {
  console.log('User Server is running on port 8080');
});

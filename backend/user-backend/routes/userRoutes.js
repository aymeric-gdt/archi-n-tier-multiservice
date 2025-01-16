const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');


router.post('/register', (req, res) => {
    console.log('Register route hit');
    console.log('Request body:', req.body);
    registerUser(req, res);
});

router.post('/login', (req, res) => {
  console.log('Login route hit');
  console.log('Request body:', req.body);
  loginUser(req, res);
});

module.exports = router;
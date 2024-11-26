const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.createUser); // Register route
router.post('/login', authController.loginUser); // Login route

module.exports = router;
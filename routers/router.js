const express = require('express');
const router = express.Router();
const productCatalogController = require('../controllers/productCatalogController');
const authController = require('../controllers/authController');

// ****** AuthRouter ****** //

router.post('/register', authController.createUser); // Register route
router.post('/login', authController.loginUser); // Login route

// ****** ProductRouter ****** //


router.post('/products', productCatalogController.createProduct); // Create a new product
router.get('/products', productCatalogController.getAllProducts); // Get all products
router.get('/products/:id', productCatalogController.getProductById); // Get a product by ID
router.put('/products/:id', productCatalogController.updateProduct); // Update a product by ID
router.delete('/products/:id', productCatalogController.deleteProduct); // Delete a product by ID



module.exports = router;
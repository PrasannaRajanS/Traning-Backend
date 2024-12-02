const express = require('express');
const router = express.Router();
const productCatalogController = require('../controllers/productCatalogController');
const authController = require('../controllers/authController');
const CategoryController = require('../controllers/categoryController')

// ****** AuthRouter ****** //
router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);

// ****** CategoryRouter ****** //
router.post('/createCategory',CategoryController.createCategory);
router.get('/getAllCategory', CategoryController.getAllCategory); 
router.get('/getCategoryById/:categoryId', CategoryController.getCategoryById); 
router.put('/updateCategory/:categoryId', CategoryController.updateCategory); 
router.patch('/deleteCategory/:categoryId', CategoryController.deleteCategory);

// ****** ProductRouter ****** //
router.post('/products', productCatalogController.createProduct);
router.get('/products', productCatalogController.getAllProducts); 
router.get('/products/:id', productCatalogController.getProductById); 
router.post('/products/:id', productCatalogController.updateProduct); 
router.post('/products/:id', productCatalogController.deleteProduct);

module.exports = router;

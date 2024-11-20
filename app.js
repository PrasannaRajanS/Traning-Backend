const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const auth = require('./routers/authRoutes')
const app = express();

const errorHandler = require('./middleware/errorHandling');

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api',auth)

mongoose.set('strictQuery', false);

// Use the error handler after all routes
app.use(errorHandler);

module.exports = app;

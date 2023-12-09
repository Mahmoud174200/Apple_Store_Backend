const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
dotenv.config({ path: 'config.env' });

// Connect to the database
const dbConnection = require('./config/database')
const ProductsRoute = require('./routes/productRoute')
const UserRoute = require('./routes/UserRoute');
const AdminRoute = require('./routes/AdminRoute');

dbConnection()
const app = express();

// In development mode
app.use(express.json());
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
    console.log('mode ' + process.env.NODE_ENV);
}

// mount routes
app.use('/api/v1/products' , ProductsRoute)
app.use('/api/v1/users',UserRoute);
app.use('/api/v1/admin',AdminRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('app run ' + PORT);
});

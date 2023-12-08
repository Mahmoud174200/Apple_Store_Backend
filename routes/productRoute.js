const express = require('express');
const router = express.Router();
const {getProducts,
    creatProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../services/productServices')


router.route('/').get(getProducts).post(creatProduct)
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports =router

//done
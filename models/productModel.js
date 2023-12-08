
const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
} , {timestamps : true}
);

const productsModel = mongoose.model('Products', productsSchema);

module.exports = productsModel

//done
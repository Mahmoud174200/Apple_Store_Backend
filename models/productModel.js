
const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false }
} , {timestamps : true}
);

const productsModel = mongoose.model('Products', productsSchema);

module.exports = productsModel

//done
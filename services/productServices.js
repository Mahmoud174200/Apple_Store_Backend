const productsModel =require("../models/productModel")


//get products
//all user
exports.getProducts = async (req, res) => {
    const page =req.query.page*1 ||1
    const limit =req.query.page*1 ||20
    const skip = (page -1) * limit
    try {
        const products = await productsModel.find({}).skip(skip).limit(limit).exec();
        res.status(200).json({ result: products.length, page, data: products });
    } catch (err) {
        res.status(400).send(err);
    }
};

//get one product 
//all user

exports.getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productsModel.findById(id);

        if (!product) {
            res.status(404).json({ msg: `No product found with id = ${id}` });
        } else {
            res.status(200).json({ data: product });
        }
    } catch (err) {
        // Handle database or other errors
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




//creat products
//admin only
exports.creatProduct = (req,res ) =>{
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;

    productsModel.create({name,price,description,image})
    .then((product) => res.status(201).json({data : product}))
    .catch((err) => res.status(400).send(err));

}

//update product
//admin only
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    try {
        const product = await productsModel.findOneAndUpdate(
            { _id: id },
            { name, price, description, image },
            { new: true }
        );

        if (!product) {
            res.status(404).json({ msg: `No product found with id = ${id}` });
        } else {
            res.status(200).json({ data: product });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};


//delete product
//admin only
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productsModel.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ msg: `No product found with id = ${id}` });
        } else {
            res.status(204).send("deleted");
        }
    } catch (err) {
        res.status(500).send(err);
    }
};
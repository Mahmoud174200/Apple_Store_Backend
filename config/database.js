const mongoose = require('mongoose');
const database = () => {
    mongoose.
    connect("mongodb+srv://applestore:12344321@cluster0.rli6fl6.mongodb.net/?retryWrites=true&w=majority");
    console.log('database connect')
}
module.exports =database
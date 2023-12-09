const mongoose = require('mongoose');

// Create a schema for Admin
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
  ,
  email: {
    type: String,
    required: false
    
  },
});

// Create a model from the schema
const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = { AdminModel };

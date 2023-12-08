const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    
  },
  password: {
    type: String,
    required: true,
    minlength: [6,"Too short password"]  ,
    maxlength:[64,"Too long password"]
  },
  phone: {
    type: String,
    required: false
// Add any validation rules for phone numbers
  }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

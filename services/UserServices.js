const UserModel = require('../models/UserModel');
const asyncHandler =require('express-async-handler')
const bcrypt = require('bcrypt');


exports.getUsers = 
   asyncHandler( async (req,res)=>{
    const page =req.query.page *1 || 1;
    const limit = req.query.limit *1 || 5;
    const skip =(page - 1) * limit;
   const users = await UserModel.find({}).skip(skip).limit(limit);
    res.status(200).json({result: users.length, page ,data : users});
});

exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ msg: `No user found for ID: ${id}` });
  }

  res.status(200).json({ data: user });
});


exports.createUser = (req, res) => {
  const { email, name, password, phone } = req.body;

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({ error: 'Error hashing the password' });
    }

    UserModel.create({ email, name, password: hashedPassword, phone })
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        if (err.code === 11000 && err.keyPattern && err.keyValue && err.keyValue.email) {
          res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        } else {
          res.status(400).json({ error: err.message });
        }
     });
  });
};

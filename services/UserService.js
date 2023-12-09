const UserModel = require('../models/UserModel');
const asyncHandler =require('express-async-handler')
const bcrypt = require('bcrypt');

// const users = [
//   {
//     id: 1,
//     email: 'user@example.com',
//     password: 'password123',
//   },
//   {
//     id: 2,
//     email: 'user2@example.com',
//     password: 'password456',
//   },
// ];


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
        res.status(201).json({ success: true, message: 'Login successful', user: user });
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
exports.UpdateUser =asyncHandler(async (req,res)=>{
  const { id } = req.params;
  const { name } = req.body; 

  const user = await UserModel.findOneAndUpdate({_id:id},{ name },{new:true})
  if(!user){
      res.status(404).json(`{msg : No User for this id ${id}}`);
  }
  res.status(200).json({data : user});

});

exports.updateUserPassword = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  try {
    // Find the user by email and update the hashed password
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    // If no user found with the provided email
    if (!user) {
      return res.status(404).json({ msg: `No user found for email: ${email}` });
    }

    res.status(200).json({ msg: 'Password reset successful', data: user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the MongoDB database
    const user = await UserModel.findOne({ email });

    // If the user is not found
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the passwords match, login is successful
    if (isPasswordValid) {
      res.json({ success: true, message: 'Login successful', user: user });
    } else {
      // Password is invalid
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle database errors or other exceptions
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
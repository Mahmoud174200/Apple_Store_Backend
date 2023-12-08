const express=require('express');

const {getUsers,getUserById,createUser,UpdateUser,updateUserPassword,login}= require('../services/UserService');

const router=express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById).put(UpdateUser);
router.route('/ForgotPassword/:email').put(updateUserPassword);
router.route('/login').post(login);
module.exports = router;
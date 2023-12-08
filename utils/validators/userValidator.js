const { validationResult, check } = require('express-validator');

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid user id'),
  validatorMiddleware
];

function validatorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

exports.createUserValidator=[
    check("name").notEmpty().withMessage('User Required'),
    check("email").notEmpty().withMessage('Email is Required'),
    check("password").notEmpty().withMessage('Password is Required').isLength({min:6}).withMessage("Too short password"),validatorMiddleware,
];

exports.updateUserValidator=[check('id').isMongoId().withMessage('Invalid user id'),
validatorMiddleware,]
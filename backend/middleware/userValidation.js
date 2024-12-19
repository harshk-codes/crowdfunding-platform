// middleware/userValidation.js
const { body } = require('express-validator');

const signupValidation = {
  updateProfile: [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('full_name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage('Full name can only contain letters, spaces, hyphens and apostrophes')
  ],

  changePassword: [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
      .withMessage('Password must contain at least one letter and one number')
  ]
};
const loginValidation = {
  login: [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ]
};

module.exports = {signupValidation,loginValidation};
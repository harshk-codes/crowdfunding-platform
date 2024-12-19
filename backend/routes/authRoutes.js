// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const {signupValidation ,loginValidation } = require('../middleware/userValidation');
const {login , signup} = require('../controllers/authController')

// router.post('/register', AuthController.register);
router.post('/login',login);

router.post('/signup',signup);


// router.get('/profile', authMiddleware, AuthController.getProfile);

module.exports = router;
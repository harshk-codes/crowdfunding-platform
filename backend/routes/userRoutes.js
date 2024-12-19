// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userValidation = require('../middleware/userValidation');

// All routes require authentication
router.use(authMiddleware);

// Profile routes
router.get('/profile', UserController.getProfile);
router.put('/profile', userValidation.updateProfile, UserController.updateProfile);
router.put('/password', userValidation.changePassword, UserController.changePassword);

// User activity routes
router.get('/campaigns', UserController.getUserCampaigns);
router.get('/contributions', UserController.getUserContributions);
router.get('/dashboard', UserController.getDashboard);

module.exports = router;
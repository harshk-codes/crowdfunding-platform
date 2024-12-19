// routes/contributionRoutes.js
const express = require('express');
const router = express.Router();
const ContributionController = require('../controllers/contributionController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Create a new contribution
router.post('/', ContributionController.createContribution);

// Get user's contributions
router.get('/my-contributions', ContributionController.getMyContributions);

// Get contributions for a specific campaign
router.get('/campaign/:campaign_id', ContributionController.getCampaignContributions);

module.exports = router;
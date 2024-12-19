// routes/campaignRoutes.js
const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const {createCampaign} = require('../controllers/campaignController')
const {getAllCampaigns} = require('../controllers/campaignController')


// GET all campaigns
router.get('/getcamp', getAllCampaigns);
// POST create campaign  
router.post('/create', authMiddleware,createCampaign);

// GET single campaign
// router.get('/:id', (req, res) => {
//     res.json({ message: `Get campaign ${req.params.id}` });
// });

module.exports = router;
// controllers/contributionController.js
const Contribution = require('../models/Contribution');

class ContributionController {
  static async createContribution(req, res) {
    try {
      const { campaign_id, amount } = req.body;
      const contributor_id = req.user.user_id;

      // Validate input
      if (!campaign_id || !amount) {
        return res.status(400).json({ message: 'Campaign ID and amount are required' });
      }

      if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
      }

      const contributionId = await Contribution.create({
        campaign_id,
        contributor_id,
        amount
      });

      res.status(201).json({
        message: 'Contribution successful',
        contribution_id: contributionId,
        amount: amount
      });
    } catch (error) {
      if (error.message === 'Campaign not found' || 
          error.message === 'Campaign is not active' ||
          error.message === 'Contribution would exceed campaign goal') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Contribution error:', error);
      res.status(500).json({ message: 'Error processing contribution' });
    }
  }

  static async getMyContributions(req, res) {
    try {
      const contributions = await Contribution.getByContributor(req.user.user_id);
      res.json({
        contributions,
        total: contributions.length
      });
    } catch (error) {
      console.error('Error fetching contributions:', error);
      res.status(500).json({ message: 'Error fetching contributions' });
    }
  }

  static async getCampaignContributions(req, res) {
    try {
      const { campaign_id } = req.params;
      
      // Get contributions
      const contributions = await Contribution.getByCampaign(campaign_id);
      
      // Get statistics
      const stats = await Contribution.getStats(campaign_id);

      res.json({
        contributions,
        stats,
        total: contributions.length
      });
    } catch (error) {
      console.error('Error fetching campaign contributions:', error);
      res.status(500).json({ message: 'Error fetching campaign contributions' });
    }
  }
}

module.exports = ContributionController;
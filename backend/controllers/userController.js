// controllers/userController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

class UserController {
  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile' });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { full_name, email } = req.body;
      const updatedUser = await User.update(req.user.user_id, { full_name, email });

      res.json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error updating profile' });
    }
  }

  // Change password
  static async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Both current and new password are required' });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
      }

      await User.updatePassword(req.user.user_id, currentPassword, newPassword);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      if (error.message === 'Invalid current password') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error updating password' });
    }
  }

  // Get user's campaigns
  static async getUserCampaigns(req, res) {
    try {
      const campaigns = await User.getUserCampaigns(req.user.user_id);
      res.json({ campaigns });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user campaigns' });
    }
  }

  // Get user's contributions
  static async getUserContributions(req, res) {
    try {
      const contributions = await User.getUserContributions(req.user.user_id);
      res.json({ contributions });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user contributions' });
    }
  }

  // Get dashboard data
  static async getDashboard(req, res) {
    try {
      const [campaigns, contributions] = await Promise.all([
        User.getUserCampaigns(req.user.user_id),
        User.getUserContributions(req.user.user_id)
      ]);

      const dashboardData = {
        campaigns: {
          total: campaigns.length,
          active: campaigns.filter(c => c.status === 'ACTIVE').length,
          completed: campaigns.filter(c => c.status === 'COMPLETED').length,
          totalRaised: campaigns.reduce((sum, c) => sum + Number(c.current_amount), 0)
        },
        contributions: {
          total: contributions.length,
          totalAmount: contributions.reduce((sum, c) => sum + Number(c.amount), 0),
          recentContributions: contributions.slice(0, 5)
        },
        recentCampaigns: campaigns.slice(0, 5)
      };

      res.json({ dashboard: dashboardData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard data' });
    }
  }
}

module.exports = UserController;
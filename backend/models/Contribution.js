// models/contributionModel.js
const db = require('../config/db');

class Contribution {
  static async create({ campaign_id, contributor_id, amount }) {
    try {
      // Start a transaction
      const connection = await db.pool.getConnection();
      await connection.beginTransaction();

      try {
        // Check if campaign exists and is active
        const [campaigns] = await connection.query(
          'SELECT status, goal_amount, current_amount FROM campaigns WHERE campaign_id = ?',
          [campaign_id]
        );

        if (!campaigns.length) {
          throw new Error('Campaign not found');
        }

        const campaign = campaigns[0];
        if (campaign.status !== 'ACTIVE') {
          throw new Error('Campaign is not active');
        }

        // Check if contribution would exceed goal
        if (campaign.current_amount + amount > campaign.goal_amount) {
          throw new Error('Contribution would exceed campaign goal');
        }

        // Insert contribution
        const [result] = await connection.query(
          'INSERT INTO contributions (campaign_id, contributor_id, amount) VALUES (?, ?, ?)',
          [campaign_id, contributor_id, amount]
        );

        // Trigger will automatically update campaign current_amount

        await connection.commit();
        connection.release();

        return result.insertId;
      } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getByContributor(contributor_id) {
    const [contributions] = await db.query(
      `SELECT 
        c.contribution_id,
        c.amount,
        c.created_at,
        camp.title as campaign_title,
        camp.goal_amount,
        camp.current_amount,
        camp.status as campaign_status
      FROM contributions c
      JOIN campaigns camp ON c.campaign_id = camp.campaign_id
      WHERE c.contributor_id = ?
      ORDER BY c.created_at DESC`,
      [contributor_id]
    );
    return contributions;
  }

  static async getByCampaign(campaign_id) {
    const [contributions] = await db.query(
      `SELECT 
        c.contribution_id,
        c.amount,
        c.created_at,
        u.full_name as contributor_name
      FROM contributions c
      JOIN users u ON c.contributor_id = u.user_id
      WHERE c.campaign_id = ?
      ORDER BY c.created_at DESC`,
      [campaign_id]
    );
    return contributions;
  }

  static async getStats(campaign_id) {
    const [results] = await db.query(
      `SELECT 
        COUNT(DISTINCT contributor_id) as total_contributors,
        COUNT(*) as total_contributions,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount,
        MAX(amount) as highest_contribution
      FROM contributions
      WHERE campaign_id = ?`,
      [campaign_id]
    );
    return results[0];
  }
}

module.exports = Contribution;
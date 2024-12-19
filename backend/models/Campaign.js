// models/campaignModel.js
const db = require('../config/db');

class Campaign {
  static async create({ creator_id, title, description, goal_amount, end_date, image_url }) {
    try {
      const [result] = await db.query(
        `INSERT INTO campaigns 
        (creator_id, title, description, goal_amount, end_date, image_url) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [creator_id, title, description, goal_amount, end_date, image_url]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findById(campaignId) {
    try {
      const [campaigns] = await db.query(
        `SELECT c.*, 
        u.full_name as creator_name,
        COUNT(DISTINCT cont.contributor_id) as total_contributors,
        COUNT(DISTINCT cont.contribution_id) as total_contributions
        FROM campaigns c
        LEFT JOIN users u ON c.creator_id = u.user_id
        LEFT JOIN contributions cont ON c.campaign_id = cont.campaign_id
        WHERE c.campaign_id = ?
        GROUP BY c.campaign_id`,
        [campaignId]
      );
      return campaigns[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll({ page = 1, limit = 10, status, search }) {
    try {
      let query = `
        SELECT c.*, 
        u.full_name as creator_name,
        COUNT(DISTINCT cont.contributor_id) as total_contributors,
        COUNT(DISTINCT cont.contribution_id) as total_contributions
        FROM campaigns c
        LEFT JOIN users u ON c.creator_id = u.user_id
        LEFT JOIN contributions cont ON c.campaign_id = cont.campaign_id
      `;

      const params = [];
      const conditions = [];

      if (status) {
        conditions.push('c.status = ?');
        params.push(status);
      }

      if (search) {
        conditions.push('(c.title LIKE ? OR c.description LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
      }

      if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' GROUP BY c.campaign_id';
      query += ' ORDER BY c.created_at DESC';
      query += ' LIMIT ? OFFSET ?';

      params.push(limit, (page - 1) * limit);

      const [campaigns] = await db.query(query, params);
      const [{ total }] = await db.query(
        'SELECT COUNT(*) as total FROM campaigns' + (conditions.length ? ' WHERE ' + conditions.join(' AND ') : ''),
        params.slice(0, -2)
      );

      return {
        campaigns,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(campaignId, updateData) {
    try {
      const allowedUpdates = [
        'title',
        'description',
        'goal_amount',
        'end_date',
        'status',
        'image_url'
      ];
      
      const updates = [];
      const values = [];
      
      Object.keys(updateData).forEach(key => {
        if (allowedUpdates.includes(key) && updateData[key] !== undefined) {
          updates.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });
      
      if (updates.length === 0) return false;
      
      values.push(campaignId);
      
      const [result] = await db.query(
        `UPDATE campaigns SET ${updates.join(', ')} WHERE campaign_id = ?`,
        values
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getUserCampaigns(userId) {
    try {
      const [campaigns] = await db.query(
        `SELECT c.*, 
        COUNT(DISTINCT cont.contributor_id) as total_contributors,
        COUNT(DISTINCT cont.contribution_id) as total_contributions
        FROM campaigns c
        LEFT JOIN contributions cont ON c.campaign_id = cont.campaign_id
        WHERE c.creator_id = ?
        GROUP BY c.campaign_id
        ORDER BY c.created_at DESC`,
        [userId]
      );
      return campaigns;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCampaign(campaignId, userId) {
    try {
      const [result] = await db.query(
        'DELETE FROM campaigns WHERE campaign_id = ? AND creator_id = ?',
        [campaignId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Campaign;
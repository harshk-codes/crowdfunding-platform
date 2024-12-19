// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password, full_name }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)',
        [email, hashedPassword, full_name]
      );
      return this.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return users[0];
  }

  static async findById(userId) {
    const [users] = await db.query(
      'SELECT user_id, email, full_name, created_at FROM users WHERE user_id = ?', 
      [userId]
    );
    return users[0];
  }

  static async update(userId, { full_name, email }) {
    try {
      const [result] = await db.query(
        'UPDATE users SET full_name = ?, email = ? WHERE user_id = ?',
        [full_name, email, userId]
      );
      if (result.affectedRows === 0) {
        throw new Error('User not found');
      }
      return this.findById(userId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async updatePassword(userId, oldPassword, newPassword) {
    const [user] = await db.query('SELECT password_hash FROM users WHERE user_id = ?', [userId]);
    if (!user[0]) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user[0].password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query(
      'UPDATE users SET password_hash = ? WHERE user_id = ?',
      [hashedPassword, userId]
    );
    return true;
  }

  static async getUserCampaigns(userId) {
    const [campaigns] = await db.query(
      `SELECT 
        campaign_id, title, description, goal_amount, 
        current_amount, end_date, status, image_url 
      FROM campaigns 
      WHERE creator_id = ?
      ORDER BY created_at DESC`,
      [userId]
    );
    return campaigns;
  }

  static async getUserContributions(userId) {
    const [contributions] = await db.query(
      `SELECT 
        c.contribution_id, c.amount, c.created_at,
        camp.campaign_id, camp.title, camp.status
      FROM contributions c
      JOIN campaigns camp ON c.campaign_id = camp.campaign_id
      WHERE c.contributor_id = ?
      ORDER BY c.created_at DESC`,
      [userId]
    );
    return contributions;
  }

  static async validatePassword(providedPassword, storedHash) {
    return bcrypt.compare(providedPassword, storedHash);
  }
}

module.exports = User;
// scripts/initDb.js
require('dotenv').config();
const { pool } = require('../config/db');
const fs = require('fs').promises;
const path = require('path');

const initialize = async () => {
  let connection;
  try {
    console.log('Starting database initialization...');
    
    // Create connection
    connection = await pool.getConnection();
    
    // Read initialization SQL
    const initSqlPath = path.join(__dirname, '..', 'sql', 'init.sql');
    const initSql = await fs.readFile(initSqlPath, 'utf8');
    
    // Execute initialization SQL
    await connection.query(initSql);
    console.log('Database schema created successfully');
    
    // Load test data if --with-test-data flag is provided
    if (process.argv.includes('--with-test-data')) {
      const testDataPath = path.join(__dirname, '..', 'sql', 'test-data.sql');
      const testDataSql = await fs.readFile(testDataPath, 'utf8');
      await connection.query(testDataSql);
      console.log('Test data loaded successfully');
    }
    
    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

initialize();
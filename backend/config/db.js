const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

//database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crowdfunding_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    debug: process.env.NODE_ENV === 'development'
};

//create a connection pool
const pool = mysql.createPool(dbConfig);

//utility function to execute queries
const query = async (sql, params) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

//function to initialize database
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            multipleStatements: true
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await connection.query(`USE ${dbConfig.database}`);

        const sqlPath = path.join(__dirname, '..', 'sql', 'init.sql');
        const sqlContent = await fs.readFile(sqlPath, 'utf8');


        const statements = sqlContent.split(';').filter(stmt => stmt.trim());

        for (let statement of statements) {
            if (statement.trim()) {
                await connection.query(statement);
            }
        }

        console.log('Database and tables initialized successfully');
        await connection.end();
        return true;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};


//test database connection 
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = {
    pool,
    query,
    initializeDatabase,
    testConnection
};
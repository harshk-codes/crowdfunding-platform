require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import routes
const campaignRoutes = require('./routes/campaignRoutes');
// const contributionRoutes = require('./routes/contributionRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection Test
async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully.");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit process if the database connection fails
    }
}

// Test database connection
testDatabaseConnection();

// Graceful shutdown
['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
        console.log(`Received ${signal}. Closing database connection.`);
        await prisma.$disconnect();
        process.exit();
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
// app.use('/api/contributions', contributionRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Crowdfunding API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

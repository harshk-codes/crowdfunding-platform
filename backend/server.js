require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");


const app = express();

const port = process.env.PORT || 3200;

//middlewares
app.use(cors());
app.use(bodyParser.json());

//test for database connection
db.getConnection((err, connection) => {
    if (err) {
        console.log("Database Connection failed: ", err);
    } else {
        console.log("Database Connected successfully.");
        connection.release();
    }
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const contributionRoutes = require('./routes/contributionRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/contributions', contributionRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));
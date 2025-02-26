const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const Routes = require("./routes/routes"); // ✅ Import userRoutes


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/apis',Routes);


app.get('/api', (req, res) => {
    res.send('API is running...');
});

module.exports = app;

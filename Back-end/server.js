

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/apod', require('./routes/apodRoutes'));
app.use('/mars-rover-photos', require('./routes/marsRoverRoutes'));
app.use('/epic', require('./routes/epicRoutes'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'NASA Explorer backend is running',
        timestamp: new Date() 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Space Explorer backend running on port ${PORT}`);
    console.log(`Endpoints:`);
    console.log(`   - http://localhost:${PORT}/apod`);
    console.log(`   - http://localhost:${PORT}/mars-rover-photos`);
    console.log(`   - http://localhost:${PORT}/epic`);
    console.log(`   - http://localhost:${PORT}/health`);
});
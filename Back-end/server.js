// Import the Express framework to create the server
const express = require('express');

// Import CORS middleware for cross-origin resource sharing
const cors = require('cors');

// Import path module for working with file and directory paths
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Create an Express application instance
const app = express();

// Set the server port from environment variables or default to 5002
const PORT = process.env.PORT || 5002;

// Enable Cross-Origin Resource Sharing (CORS)
// Allows frontend to make requests to this backend from different origins
app.use(cors());

// Parse incoming JSON requests
// Enables Express to automatically parse JSON request bodies
app.use(express.json());

// Mount APOD (Astronomy Picture of the Day) routes
// All requests to /apod will be handled by apodRoutes
app.use('/apod', require('./routes/apodRoutes'));

// Mount Mars Rover photos routes
// All requests to /mars-rover-photos will be handled by marsRoverRoutes
app.use('/mars-rover-photos', require('./routes/marsRoverRoutes'));

// Mount EPIC (Earth Polychromatic Imaging Camera) routes
// All requests to /epic will be handled by epicRoutes
app.use('/epic', require('./routes/epicRoutes'));

// Serve static files from the React frontend build directory
// This allows Express to serve the compiled React application
//app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle all other requests by serving the React index.html file
// This enables client-side routing with React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
    // Server start confirmation message
    console.log(`Space Explorer backend running on port ${PORT}`);
    
    // Log available API endpoints
    console.log(`Endpoints:`);
    console.log(`   - http://localhost:${PORT}/apod`);
    console.log(`   - http://localhost:${PORT}/mars-rover-photos`);
    console.log(`   - http://localhost:${PORT}/epic`);
});
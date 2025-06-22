// Import the Express framework to create a router instance
const express = require('express');

// Import Axios for making HTTP requests to NASA's API
const axios = require('axios');

// Create a router instance to define API routes
const router = express.Router();

// Base URL for NASA's API endpoints
const NASA_API_BASE_URL = 'https://api.nasa.gov';

/** 
 * This endpoint:
 * 1. Makes a GET request to NASA's APOD API
 * 2. Returns the astronomy data (image/video + explanation)
 * 3. Handles errors from NASA's API or network issues
 */
router.get('/', async (req, res) => {
    try {
        // Make GET request to NASA's APOD endpoint
        const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
            // Pass API key as query parameter (from environment variables)
            params: { 
                api_key: process.env.NASA_API_KEY  // Securely stored NASA API key
            }
        });
        
        // Send successful response with NASA's APOD data
        res.json(response.data);
        
    } catch (error) {
        // Log detailed error for server-side debugging
        console.error('APOD Error:', error.message);
        
        // Send user-friendly error response with 500 status
        res.status(500).json({ 
            error: 'Failed to fetch Astronomy Picture of the Day',
            details: 'Server encountered an issue with NASA API'
        });
    }
});

// Export the router to be mounted in the main Express app
module.exports = router;
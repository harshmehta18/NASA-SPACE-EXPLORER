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
 * 1. Requests natural color Earth imagery from NASA's EPIC API
 * 2. Returns metadata about Earth images taken by DSCOVR satellite
 * 3. Handles errors from NASA's API or network issues
 */
router.get('/', async (req, res) => {
    try {
        // Make GET request to NASA's EPIC natural imagery endpoint
        const response = await axios.get(
            `${NASA_API_BASE_URL}/EPIC/api/natural`, 
            {
                // Pass API key as query parameter (from environment variables)
                params: { 
                    api_key: process.env.NASA_API_KEY  // Securely stored NASA API key
                }
            }
        );
        
        // Send successful response with EPIC metadata
        res.json(response.data);
        
    } catch (error) {
        // Log detailed error for server-side debugging
        console.error('EPIC Error:', error.message);
        
        // Send user-friendly error response with 500 status
        res.status(500).json({ 
            error: 'Failed to fetch Earth Polychromatic Imaging Camera data',
            details: 'Server encountered an issue with NASA API'
        });
    }
});

// Export the router to be mounted in the main Express app
module.exports = router;
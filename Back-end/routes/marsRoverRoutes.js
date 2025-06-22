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
 * 1. Accepts rover name and earth date as query parameters
 * 2. Validates required parameters
 * 3. Fetches photos from the specified Mars rover
 * 4. Returns photo data or appropriate errors
 */
router.get('/', async (req, res) => {
    try {
        // Destructure query parameters from request
        const { rover, earth_date } = req.query;
        
        // Validate required parameters exist
        if (!rover || !earth_date) {
            // Return 400 Bad Request if parameters missing
            return res.status(400).json({ 
                error: 'Missing required parameters: rover or earth_date',
                message: 'Please provide both rover name and earth date in YYYY-MM-DD format'
            });
        }

        // Make GET request to NASA's Mars Rover Photos API
        const response = await axios.get(
            // Construct URL with rover name from query params
            `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
            { 
                // Pass query parameters: earth_date and API key
                params: { 
                    earth_date,  // Date in YYYY-MM-DD format
                    api_key: process.env.NASA_API_KEY  // Securely stored NASA API key
                } 
            }
        );
        
        // Send successful response with photo data
        res.json(response.data);
        
    } catch (error) {
        // Log detailed error for server-side debugging
        console.error('Mars Rover Error:', error.message);
        
        // Send user-friendly error response with 500 status
        res.status(500).json({ 
            error: 'Failed to fetch Mars Rover photos',
            details: error.response?.data?.error || 'Internal server error'
        });
    }
});

// Export the router to be mounted in the main Express app
module.exports = router;
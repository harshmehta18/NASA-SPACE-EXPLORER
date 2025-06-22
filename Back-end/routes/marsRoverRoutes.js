const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_BASE_URL = 'https://api.nasa.gov';

router.get('/', async (req, res) => {
    try {
        const { rover, earth_date } = req.query;
        
        if (!rover || !earth_date) {
            return res.status(400).json({ error: 'Missing required parameters: rover or earth_date' });
        }

        const response = await axios.get(
            `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
            { params: { earth_date, api_key: process.env.NASA_API_KEY } }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Mars Rover Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
    }
});

module.exports = router;
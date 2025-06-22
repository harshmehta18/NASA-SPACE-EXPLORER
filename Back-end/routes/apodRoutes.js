const express = require('express');
const axios = require('axios');
const router = express.Router();

const NASA_API_BASE_URL = 'https://api.nasa.gov';

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
            params: { api_key: process.env.NASA_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('APOD Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch Astronomy Picture of the Day' });
    }
});

module.exports = router;
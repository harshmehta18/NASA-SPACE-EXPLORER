

import axios from 'axios';

// Use relative paths for API calls in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://nasa-space-explorer.onrender.com'  // Relative to current domain
  : 'http://localhost:10000';

export const getAPOD = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/apod`, {
            timeout: 15000
        });
        return response.data;
    } catch (error) {
        console.error('APOD fetch error:', error);
        throw new Error('Failed to fetch APOD. Please try again later.');
    }
};

export const getMarsRoverPhotos = async (rover, earth_date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mars-rover-photos`, {
            params: { rover, earth_date },
            timeout: 15000
        });
        return response.data;
    } catch (error) {
        console.error('Mars Rover fetch error:', error);
        throw new Error('Failed to fetch rover photos. Please check your parameters.');
    }
};

// Add EPIC endpoint
export const getEPIC = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/epic`, {
            timeout: 15000
        });
        return response.data;
    } catch (error) {
        console.error('EPIC fetch error:', error);
        throw new Error('Failed to fetch Earth imagery.');
    }
};
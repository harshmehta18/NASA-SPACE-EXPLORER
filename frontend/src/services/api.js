
// import axios from 'axios';
// const API_BASE_URL = 'https://nasa-space-explorer-1.onrender.com/';

// /**

//  * This function:
//  * 1. Makes GET request to /apod endpoint
//  * 2. Returns parsed JSON response
//  * 3. Handles errors in the calling component
//  */
// export const getAPOD = async () => {
//     // Fetch APOD data from backend API
//     const response = await fetch(`${API_BASE_URL}/apod`);
    
//     // Parse and return JSON response
//     return response.json();
// };

// /**
//  * This function:
//  * 1. Constructs query string with parameters
//  * 2. Makes GET request to /mars-rover-photos endpoint
//  * 3. Returns parsed JSON response
//  */
// export const getMarsRoverPhotos = async (rover, earth_date) => {
//     // Construct query string with URLSearchParams for proper encoding
//     const params = new URLSearchParams({ rover, earth_date });
    
//     // Fetch Mars Rover photos from backend API
//     const response = await fetch(`${API_BASE_URL}/mars-rover-photos?${params}`);
    
//     // Parse and return JSON response
//     return response.json();
// };

import axios from 'axios';

// Use relative paths for API calls in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://nasa-space-explorer-1.onrender.com/'  // Relative to current domain
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
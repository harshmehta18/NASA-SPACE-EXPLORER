
import axios from 'axios';
const API_BASE_URL = 'http://localhost:5002';

/**

 * This function:
 * 1. Makes GET request to /apod endpoint
 * 2. Returns parsed JSON response
 * 3. Handles errors in the calling component
 */
export const getAPOD = async () => {
    // Fetch APOD data from backend API
    const response = await fetch(`${API_BASE_URL}/apod`);
    
    // Parse and return JSON response
    return response.json();
};

/**
 * This function:
 * 1. Constructs query string with parameters
 * 2. Makes GET request to /mars-rover-photos endpoint
 * 3. Returns parsed JSON response
 */
export const getMarsRoverPhotos = async (rover, earth_date) => {
    // Construct query string with URLSearchParams for proper encoding
    const params = new URLSearchParams({ rover, earth_date });
    
    // Fetch Mars Rover photos from backend API
    const response = await fetch(`${API_BASE_URL}/mars-rover-photos?${params}`);
    
    // Parse and return JSON response
    return response.json();
};


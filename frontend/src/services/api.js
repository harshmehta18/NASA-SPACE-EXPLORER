import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002';

export const getAPOD = async () => {
    const response = await fetch(`${API_BASE_URL}/apod`);
    return response.json();
};

export const getMarsRoverPhotos = async (rover, earth_date) => {
    const response = await fetch(`${API_BASE_URL}/mars-rover-photos?rover=${rover}&earth_date=${earth_date}`);
    return response.json();
};
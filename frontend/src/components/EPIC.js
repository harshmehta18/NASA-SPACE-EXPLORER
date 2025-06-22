// Import React and necessary hooks
import React, { useEffect, useState } from 'react';
// Import Axios for HTTP requests
import axios from 'axios';

// Define EPIC component
const EPIC = () => {
    // State to store EPIC image data array
    const [epicData, setEpicData] = useState([]);
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State to store error messages
    const [error, setError] = useState(null);

    // useEffect hook for data fetching on component mount
    useEffect(() => {
        // Define async data fetching function
        const fetchEPICData = async () => {
            try {
                // GET request to proxy server endpoint
                const response = await axios.get('https://nasa-explorer-jbo9.onrender.com/epic');
                // Update state with fetched data
                setEpicData(response.data);
            } catch (err) {
                // Set error message on failure
                setError('Failed to fetch EPIC data');
            } finally {
                // Always set loading to false when operation completes
                setLoading(false);
            }
        };
        // Execute data fetching function
        fetchEPICData();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Loading state UI: shows spinner animation
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner text-light" role="status"></div>
        </div>
    );

    // Error state UI: displays error message in alert box
    if (error) return (
        <div className="alert alert-danger text-center mt-5 mx-3" role="alert">
            {error}
        </div>
    );

    // Main component render when data is available
    return (
        <div className="container py-5">
            {/* Page header section */}
            <div className="text-center mb-5">
                <h1>Earth Polychromatic Imaging Camera (EPIC)</h1>
                <p className="lead">Explore stunning images of Earth captured by NASA's DSCOVR satellite</p>
            </div>
            
            {/* Image gallery grid */}
            <div className="row g-4">
                {/* Map through EPIC image data to create cards */}
                {epicData.map((image) => {
                    // Parse date string to Date object
                    const dateObj = new Date(image.date);
                    // Extract year component
                    const year = dateObj.getFullYear();
                    // Format month as two-digit string (01-12)
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    // Format day as two-digit string (01-31)
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    
                    return (
                        // Responsive grid column
                        <div key={image.identifier} className="col-md-6 col-lg-4">
                            {/* Image card with shadow */}
                            <div className="card h-100 shadow">
                                {/* EPIC image */}
                                <img
                                    // Construct image URL from NASA's archive
                                    src={`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`}
                                    alt={image.caption || 'Earth view from space'}
                                    className="card-img-top"
                                    // Fixed height with responsive image scaling
                                    style={{ objectFit: 'cover', height: '250px' }}
                                />
                                {/* Card body with metadata */}
                                <div className="card-body">
                                    {/* Image title */}
                                    <h5 className="card-title">{image.caption || 'Earth Image'}</h5>
                                    {/* Date information */}
                                    <p className="card-text">
                                        <i className="fas fa-calendar me-2"></i>
                                        {dateObj.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Export component for use in other files
export default EPIC;
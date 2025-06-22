import React, { useEffect, useState } from 'react';
import { getAPOD } from '../services/api'; // Import API function to fetch APOD data

const APOD = () => {
    // State variables to manage component data
    const [apodData, setApodData] = useState(null); // Stores APOD data from API
    const [loading, setLoading] = useState(true);   // Tracks loading state
    const [error, setError] = useState(null);       // Stores error messages

    // Effect hook to fetch data when component mounts
    useEffect(() => {
        // Define async function to fetch APOD data
        const fetchAPOD = async () => {
            try {
                // Fetch data from API
                const data = await getAPOD();
                // Update state with fetched data
                setApodData(data);
            } catch (err) {
                // Handle errors by setting error message
                setError('Failed to fetch APOD data');
            } finally {
                // Always set loading to false when operation completes
                setLoading(false);
            }
        };
        
        // Call the fetch function
        fetchAPOD();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Display loading spinner while data is being fetched
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner text-light" role="status"></div>
        </div>
    );

    // Display error message if fetch failed
    if (error) return (
        <div className="alert alert-danger text-center mt-5 mx-3" role="alert">
            {error}
        </div>
    );

    // Main component render when data is available
    return (
        <div className="container py-5">
            <div className="card shadow-lg mb-5">
                <div className="card-body">
                    {/* Display APOD title */}
                    <h1 className="card-title text-center mb-4">{apodData.title}</h1>
                    
                    {/* Media display section - handles both images and videos */}
                    <div className="d-flex justify-content-center mb-4">
                        {apodData.media_type === 'image' ? (
                            // Display image if media type is image
                            <img 
                                src={apodData.url} 
                                alt={apodData.title} 
                                className="img-fluid rounded-3 shadow"
                                style={{ maxHeight: '70vh', objectFit: 'contain' }}
                            />
                        ) : (
                            // Display video if media type is video
                            <div className="ratio ratio-16x9">
                                <iframe
                                    title={apodData.title}
                                    src={apodData.url}
                                    allowFullScreen
                                    className="rounded-3 shadow"
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Display explanation text */}
                    <p className="card-text lead">{apodData.explanation}</p>
                    
                    {/* Display date of the APOD */}
                    <div className="mt-4 text-end text-muted">
                        <small>Date: {apodData.date}</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APOD; // Export component for use in other files
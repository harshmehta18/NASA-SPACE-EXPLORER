// Import React and useState hook
import React, { useState } from 'react';
// Import API service function
import { getMarsRoverPhotos } from '../services/api';

// Object containing camera options for each rover
const roverCameras = {
    // Curiosity rover cameras
    curiosity: [
        { value: 'FHAZ', label: 'Front Hazard Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Camera' },
        { value: 'MAST', label: 'Mast Camera' },
        { value: 'CHEMCAM', label: 'Chemistry Camera' },
        { value: 'MAHLI', label: 'Hand Lens Imager' },
        { value: 'MARDI', label: 'Descent Imager' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
    ],
    // Opportunity rover cameras
    opportunity: [
        { value: 'FHAZ', label: 'Front Hazard Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Camera' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
        { value: 'PANCAM', label: 'Panoramic Camera' },
        { value: 'MINITES', label: 'Thermal Spectrometer' },
    ],
    // Spirit rover cameras
    spirit: [
        { value: 'FHAZ', label: 'Front Hazard Camera' },
        { value: 'RHAZ', label: 'Rear Hazard Camera' },
        { value: 'NAVCAM', label: 'Navigation Camera' },
        { value: 'PANCAM', label: 'Panoramic Camera' },
        { value: 'MINITES', label: 'Thermal Spectrometer' },
    ],
};

// Main component for Mars Rover Photos
const MarsRoverPhotos = () => {
    // State for selected rover (default: curiosity)
    const [rover, setRover] = useState('curiosity');
    // State for selected camera (default: FHAZ)
    const [camera, setCamera] = useState('FHAZ');
    // State for selected date (default: 2023-10-01)
    const [earthDate, setEarthDate] = useState('2023-10-01');
    // State for storing fetched photos
    const [photos, setPhotos] = useState([]);
    // State for loading status
    const [loading, setLoading] = useState(false);
    // State for error messages
    const [error, setError] = useState(null);
    // State for no photos found
    const [noPhotos, setNoPhotos] = useState(false);

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setLoading(true);   // Show loading state
        setError(null);     // Reset previous errors
        setNoPhotos(false); // Reset no photos state

        try {
            // Fetch photos from API
            const data = await getMarsRoverPhotos(rover, earthDate, camera);
            
            // Check if no photos returned
            if (data.photos.length === 0) {
                setNoPhotos(true); // Set no photos flag
            }
            
            // Update photos state with fetched data
            setPhotos(data.photos);
        } catch (err) {
            // Handle API errors
            setError('Failed to fetch photos');
        } finally {
            // Always reset loading state
            setLoading(false);
        }
    };

    // Component render
    return (
        <div className="container py-5">
            {/* Search form card */}
            <div className="card shadow-lg mb-4">
                <div className="card-body">
                    {/* Page title */}
                    <h1 className="card-title text-center mb-4">Mars Rover Photos</h1>
                    
                    {/* Search form */}
                    <form onSubmit={handleSubmit} className="row g-3">
                        {/* Rover selection dropdown */}
                        <div className="col-md-4">
                            <label className="form-label">Rover</label>
                            <select 
                                className="form-select bg-dark text-light"
                                value={rover} 
                                onChange={(e) => setRover(e.target.value)}
                            >
                                <option value="curiosity">Curiosity</option>
                                <option value="opportunity">Opportunity</option>
                                <option value="spirit">Spirit</option>
                            </select>
                        </div>
                        
                        {/* Camera selection dropdown */}
                        <div className="col-md-4">
                            <label className="form-label">Camera</label>
                            <select 
                                className="form-select bg-dark text-light"
                                value={camera} 
                                onChange={(e) => setCamera(e.target.value)}
                            >
                                {/* Dynamically populate cameras based on selected rover */}
                                {roverCameras[rover].map((cam) => (
                                    <option key={cam.value} value={cam.value}>
                                        {cam.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Date selection input */}
                        <div className="col-md-4">
                            <label className="form-label">Earth Date</label>
                            <input
                                type="date"
                                className="form-control bg-dark text-light"
                                value={earthDate}
                                onChange={(e) => setEarthDate(e.target.value)}
                            />
                        </div>
                        
                        {/* Submit button */}
                        <div className="col-12 text-center mt-3">
                            <button 
                                type="submit" 
                                className="btn btn-nasa px-5"
                                disabled={loading} // Disable during loading
                            >
                                {/* Loading spinner when fetching */}
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Loading...
                                    </span>
                                ) : 'Search Photos'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Error message display */}
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            {/* No photos found message */}
            {noPhotos && (
                <div className="alert alert-warning text-center" role="alert">
                    No photos available for the selected criteria. Please try different parameters.
                </div>
            )}

            {/* Photo gallery grid */}
            <div className="row g-4">
                {photos.map((photo) => (
                    <div key={photo.id} className="col-md-6 col-lg-4">
                        {/* Photo card */}
                        <div className="card h-100 shadow">
                            {/* Rover image */}
                            <img 
                                src={photo.img_src} 
                                alt={`Mars Rover ${rover}`} 
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }} // Fixed height with cover
                            />
                            {/* Photo metadata */}
                            <div className="card-body">
                                <h5 className="card-title">{photo.camera.full_name}</h5>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Rover: {photo.rover.name} | Sol: {photo.sol}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Export component for use in other files
export default MarsRoverPhotos;
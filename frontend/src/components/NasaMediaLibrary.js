// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
// Import Axios for HTTP requests
import axios from 'axios';

// Define NASA Media Library component
const NasaMediaLibrary = () => {
  // State for search query
  const [query, setQuery] = useState('');
  // State for search results
  const [results, setResults] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(false);
  // State for media type (image or video)
  const [mediaType, setMediaType] = useState('image');
  // State for currently selected media item
  const [selectedItem, setSelectedItem] = useState(null);

  // Effect for fetching media from NASA API
  useEffect(() => {
    // Async function to fetch media
    const fetchMedia = async () => {
      // If query is empty, clear results and return
      if (!query.trim()) {
        setResults([]);
        return;
      }
      
      // Set loading state
      setLoading(true);
      try {
        // GET request to NASA Images API
        const response = await axios.get('https://images-api.nasa.gov/search', {
          params: { 
            q: query,          // Search query
            media_type: mediaType  // Media type filter
          }
        });
        // Update results with API response
        setResults(response.data.collection.items);
      } catch {
        // Simple error handling (could be expanded)
      } finally {
        // Always reset loading state
        setLoading(false);
      }
    };

    // Simple debounce implementation to prevent excessive API calls
    const timeoutId = setTimeout(fetchMedia, 500);
    
    // Cleanup function to cancel pending requests
    return () => clearTimeout(timeoutId);
  }, [query, mediaType]); // Dependency array: re-run when query or mediaType changes

  // Handle search input changes
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Toggle between image and video media types
  const toggleMediaType = (type) => {
    setMediaType(type);
  };

  // Format date string for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Close modal dialog
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Component render
  return (
    <div className="container py-5">
      {/* Search card */}
      <div className="card shadow-lg mb-4">
        <div className="card-body">
          {/* Title */}
          <h1 className="card-title text-center mb-4">NASA Media Library</h1>
          
          {/* Search controls */}
          <div className="row g-3">
            {/* Search input */}
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-dark text-light"
                  placeholder="Search NASA media..."
                  value={query}
                  onChange={handleSearch}
                />
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            
            {/* Media type toggle buttons */}
            <div className="col-md-4">
              <div className="btn-group w-100">
                <button 
                  className={`btn ${mediaType === 'image' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => toggleMediaType('image')}
                >
                  <i className="fas fa-image me-2"></i> Images
                </button>
                <button 
                  className={`btn ${mediaType === 'video' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => toggleMediaType('video')}
                >
                  <i className="fas fa-video me-2"></i> Videos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Results grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Map through search results */}
        {results.map((item) => {
          // Extract metadata
          const data = item.data[0];
          // Find thumbnail image
          const thumbnail = item.links?.find(link => link.render === 'image')?.href;
          // Check if item is video
          const isVideo = data.media_type === 'video';
          
          return (
            // Result card column
            <div key={data.nasa_id} className="col">
              {/* Result card */}
              <div 
                className="card h-100 shadow cursor-pointer"
                onClick={() => setSelectedItem(item)} // Show modal on click
              >
                {/* Thumbnail section */}
                {thumbnail ? (
                  <div className="position-relative" style={{ height: '200px' }}>
                    {/* Thumbnail image */}
                    <img 
                      src={thumbnail} 
                      alt={data.title} 
                      className="card-img-top h-100"
                      style={{ objectFit: 'cover' }}
                    />
                    {/* Play icon overlay for videos */}
                    {isVideo && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="bg-dark rounded-circle p-3 opacity-75">
                          <i className="fas fa-play text-white fa-2x"></i>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback when no thumbnail available */
                  <div className="d-flex align-items-center justify-content-center bg-dark position-relative" style={{ height: '200px' }}>
                    <i className={`fas fa-${mediaType} fa-3x text-light opacity-25`}></i>
                    {/* Play icon for videos */}
                    {isVideo && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="bg-dark rounded-circle p-3 opacity-75">
                          <i className="fas fa-play text-white fa-2x"></i>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Card body with metadata */}
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text text-muted">
                    <small>{formatDate(data.date_created)}</small>
                  </p>
                  {/* Video badge */}
                  {isVideo && (
                    <div className="badge bg-danger">
                      <i className="fas fa-video me-1"></i> Video
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-dark text-light">
              {/* Modal header */}
              <div className="modal-header">
                <h5 className="modal-title">{selectedItem.data[0].title}</h5>
                {/* Close button */}
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>
              
              {/* Modal body */}
              <div className="modal-body">
                {/* Display image or video */}
                {mediaType === 'image' ? (
                  // Full-size image
                  <img 
                    src={selectedItem.links?.find(link => link.render === 'image')?.href} 
                    alt={selectedItem.data[0].title}
                    className="img-fluid mb-3"
                  />
                ) : (
                  // Video player
                  <div className="ratio ratio-16x9 mb-3">
                    <iframe
                      src={`https://images-assets.nasa.gov/video/${selectedItem.data[0].nasa_id}/${selectedItem.data[0].nasa_id}~orig.mp4`}
                      title={selectedItem.data[0].title}
                      allowFullScreen
                      className="w-100"
                    ></iframe>
                  </div>
                )}
                
                {/* Description */}
                <p>{selectedItem.data[0].description}</p>
                
                {/* Keywords */}
                <div className="mt-3">
                  {selectedItem.data[0].keywords?.map((keyword, idx) => (
                    <span key={idx} className="badge bg-secondary me-1">#{keyword}</span>
                  ))}
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Export component
export default NasaMediaLibrary;
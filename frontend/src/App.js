// Import React library to build React components
import React from 'react';

// Import routing components from React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import application components
import Navbar from './components/Navbar';
import Home from './components/Home';
import APOD from './components/APOD';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import DataVisualization from './components/DataVisualization';
import EPIC from './components/EPIC';
import NasaMediaLibrary from './components/NasaMediaLibrary';

// Main App component - root component of the application
function App() {
  return (
    // Wrap entire app with Router for client-side routing
    <Router>
      <div className="d-flex flex-column min-vh-100">
        
       
        <Navbar />
        
        {/* Main content area - grows to fill available space */}
        <main className="flex-grow-1 py-4">
          {/* Route configuration - maps paths to components */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            
            {/* Astronomy Picture of the Day route */}
            <Route path="/apod" element={<APOD />} />
            
            {/* Mars Rover Photos route */}
            <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
            
            {/* Data Visualization (NEO) route */}
            <Route path="/data-visualization" element={<DataVisualization />} />
            
            {/* Earth Polychromatic Imaging Camera route */}
            <Route path="/epic" element={<EPIC />} />
            
            {/* NASA Media Library route */}
            <Route path="/nasa-media-library" element={<NasaMediaLibrary />} />
          </Routes>
        </main>
        
        {/* Footer section - appears at bottom of all pages */}
        <footer className="bg-dark text-light py-4">
          <div className="container">
            <div className="row">
              {/* Left footer column - app description */}
              <div className="col-md-6 mb-3 mb-md-0">
                <h5>NASA Explorer</h5>
                <p>Explore the universe through NASA's open APIs and datasets.</p>
              </div>
              
              {/* Middle footer column - resource links */}
              <div className="col-md-3 mb-3 mb-md-0">
                <h5>Resources</h5>
                <ul className="list-unstyled">
                  <li><a href="https://api.nasa.gov" className="text-light">NASA APIs</a></li>
                  <li><a href="https://nasa.gov" className="text-light">NASA.gov</a></li>
                </ul>
              </div>
              
              {/* Right footer column - currently empty */}
              <div className="col-md-3"></div>
            </div>
            
            {/* Horizontal divider */}
            <hr className="my-4" />
            
            {/* Copyright/disclaimer section */}
            <div className="text-center">
              <small>This project uses the NASA Open APIs but is not endorsed or certified by NASA.</small>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Export App component as the default export
export default App;
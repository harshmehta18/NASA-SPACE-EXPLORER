// // frontend/src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import APOD from './components/APOD';
// import MarsRoverPhotos from './components/MarsRoverPhotos';
// import DataVisualization from './components/DataVisualization';
// import EPIC from './components/EPIC'; 
// import NasaMediaLibrary from './components/NasaMediaLibrary';
// import './App.css';



// function App() {
//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/apod" element={<APOD />} />
//                 <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
//                 <Route path="/data-visualization" element={<DataVisualization />} />
//                 <Route path="/epic" element={<EPIC />} />
//                 <Route path="/nasa-media-library" element={<NasaMediaLibrary />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import APOD from './components/APOD';
import MarsRoverPhotos from './components/MarsRoverPhotos';
import DataVisualization from './components/DataVisualization';
import EPIC from './components/EPIC';
import NasaMediaLibrary from './components/NasaMediaLibrary';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/mars-rover-photos" element={<MarsRoverPhotos />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
            <Route path="/epic" element={<EPIC />} />
            <Route path="/nasa-media-library" element={<NasaMediaLibrary />} />
          </Routes>
        </main>
        <footer className="bg-dark text-light py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0">
                <h5>NASA Explorer</h5>
                <p>Explore the universe through NASA's open APIs and datasets.</p>
              </div>
              <div className="col-md-3 mb-3 mb-md-0">
                <h5>Resources</h5>
                <ul className="list-unstyled">
                  <li><a href="https://api.nasa.gov" className="text-light">NASA APIs</a></li>
                  <li><a href="https://nasa.gov" className="text-light">NASA.gov</a></li>
                </ul>
              </div>
              <div className="col-md-3">

              </div>
            </div>
            <hr className="my-4" />
            <div className="text-center">
              <small>This project uses the NASA Open APIs but is not endorsed or certified by NASA.</small>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
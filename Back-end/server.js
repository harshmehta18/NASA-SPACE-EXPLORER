// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5002;

// app.use(cors());
// app.use(express.json());

// // const path = require('path');

// // // Serve static files from the React app
// // app.use(express.static(path.join(__dirname, 'frontend/build')));

// // // Handle React routing, return all requests to React app
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// // });

// const NASA_API_BASE_URL = 'https://api.nasa.gov';

// app.get('/apod', async (req, res) => {
//     try {
//         const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
//             params: {
//                 api_key: process.env.NASA_API_KEY,
//             },
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch APOD data' });
//     }
// });

// app.get('/mars-rover-photos', async (req, res) => {
//     try {
//         const { rover, earth_date } = req.query;
//         const response = await axios.get(`${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`, {
//             params: {
//                 earth_date,
//                 api_key: process.env.NASA_API_KEY,
//             },
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
//     }
// });


// app.get('/epic', async (req, res) => {
//     try {
//         const response = await axios.get(
//             `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`
//         );
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch EPIC data' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5002;

// app.use(cors());
// app.use(express.json());

// // Serve static files from React build
// app.use(express.static(path.join(__dirname, 'frontend/build')));

// // API endpoints
// const NASA_API_BASE_URL = 'https://api.nasa.gov';

// app.get('/apod', async (req, res) => {
//     try {
//         const response = await axios.get(`${NASA_API_BASE_URL}/planetary/apod`, {
//             params: { api_key: process.env.NASA_API_KEY }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch APOD data' });
//     }
// });

// app.get('/mars-rover-photos', async (req, res) => {
//     try {
//         const { rover, earth_date } = req.query;
//         const response = await axios.get(`${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos`, {
//             params: { earth_date, api_key: process.env.NASA_API_KEY }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch Mars Rover photos' });
//     }
// });

// app.get('/epic', async (req, res) => {
//     try {
//         const response = await axios.get(`${NASA_API_BASE_URL}/EPIC/api/natural`, {
//             params: { api_key: process.env.NASA_API_KEY }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch EPIC data' });
//     }
// });

// // Handle React routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/apod', require('./routes/apodRoutes'));
app.use('/mars-rover-photos', require('./routes/marsRoverRoutes'));
app.use('/epic', require('./routes/epicRoutes'));

// Serve React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Space Explorer backend running on port ${PORT}`);
    console.log(`Endpoints:`);
    console.log(`   - http://localhost:${PORT}/apod`);
    console.log(`   - http://localhost:${PORT}/mars-rover-photos`);
    console.log(`   - http://localhost:${PORT}/epic`);
});
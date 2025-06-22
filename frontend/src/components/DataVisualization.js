// Import necessary React hooks and components
import React, { useEffect, useState } from 'react';
// Import Bar chart component from react-chartjs-2
import { Bar } from 'react-chartjs-2';
// Import Axios for HTTP requests
import axios from 'axios';
// Import required Chart.js components
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataVisualization = () => {
    // State for storing Near-Earth Objects data
    const [neoData, setNeoData] = useState(null);
    // State to track data loading status
    const [loading, setLoading] = useState(true);
    // State for storing potential errors
    const [error, setError] = useState(null);

    // useEffect hook for data fetching on component mount
    useEffect(() => {
        const fetchNeoData = async () => {
            try {
                // Fetch data from NASA NEO API
                const response = await axios.get(
                    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-10-01&end_date=2023-10-07&api_key=${process.env.REACT_APP_NASA_API_KEY}`
                );
                // Store NEO data in state
                setNeoData(response.data.near_earth_objects);
            } catch (err) {
                // Handle errors during data fetching
                setError('Failed to fetch NEO data');
            } finally {
                // Update loading status regardless of success/error
                setLoading(false);
            }
        };

        // Execute data fetching function
        fetchNeoData();
    }, []); // Empty dependency array = runs only on mount

    // Loading state UI
    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border loading-spinner text-light" role="status"></div>
        </div>
    );

    // Error state UI
    if (error) return (
        <div className="alert alert-danger text-center mt-5 mx-3" role="alert">
            {error}
        </div>
    );

    // Prepare chart data structure for Chart.js
    const chartData = {
        // Chart labels (dates)
        labels: Object.keys(neoData),
        datasets: [{
            label: 'Number of Near Earth Objects',
            // Data values (count of NEOs per date)
            data: Object.values(neoData).map(objects => objects.length),
            backgroundColor: 'rgba(75, 192, 192, 0.7)', // Bar fill color
            borderColor: 'rgba(75, 192, 192, 1)',       // Bar border color
            borderWidth: 1                              // Border thickness
        }]
    };

    // Chart configuration options
    const options = {
        responsive: true,  // Enable responsive resizing
        plugins: {
            legend: { display: false },  // Hide dataset legend
            title: {
                display: true,
                text: 'Near Earth Objects',  // Chart title
                font: { size: 18 }           // Title font size
            }
        },
        scales: {
            y: {
                beginAtZero: true,  // Y-axis starts at 0
                grid: { color: 'rgba(255, 255, 255, 0.1)' },  // Grid line color
                ticks: { color: 'rgba(255, 255, 255, 0.7)' }  // Tick label color
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },  // Grid line color
                ticks: { color: 'rgba(255, 255, 255, 0.7)' }  // Tick label color
            }
        },
        maintainAspectRatio: false  // Allow custom aspect ratio
    };

    // Main component render
    return (
        <div className="container py-5">
            <div className="card shadow-lg">
                <div className="card-body">
                    {/* Chart title */}
                    <h1 className="card-title text-center mb-4">Near Earth Objects Visualization</h1>
                    
                    {/* Chart container with fixed height */}
                    <div style={{ height: '500px' }}>
                        {/* Render Bar chart component */}
                        <Bar data={chartData} options={options} />
                    </div>
                    
                    {/* Data source attribution */}
                    <div className="mt-4 text-muted text-center">
                        <small>Data from NASA NeoWs (Near Earth Object Web Service)</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataVisualization;
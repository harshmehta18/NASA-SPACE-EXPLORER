// Import React library
import React from 'react';
import { Link } from 'react-router-dom';
// Define Home component
const Home = () => {
    // NASA featured missions data array
    const featuredMissions = [
        {
            id: 1,
            title: "Artemis Program",
            description: "NASA's program to return humans to the Moon and establish sustainable exploration.",
            image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1208&q=80",
            link: "https://www.nasa.gov/artemisprogram"
        },
        {
            id: 2,
            title: "James Webb Space Telescope",
            description: "The premier observatory of the next decade, studying every phase in the history of our Universe.",
            image: "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            link: "https://www.nasa.gov/webb"
        },
        {
            id: 3,
            title: "Mars Exploration",
            description: "Ongoing exploration of the Red Planet with rovers and orbiters searching for signs of life.",
            image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
            link: "https://www.nasa.gov/topics/moon-to-mars"
        }
    ];

    // // NASA news data array
    const nasaNews = [
        {
            id: 1,
            title: "NASA's Psyche Mission Launch",
            date: "October 5, 2023",
            excerpt: "NASA is preparing to launch a mission to a unique metal-rich asteroid orbiting the Sun between Mars and Jupiter.",
            image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1150&q=80",
            link: "https://www.nasa.gov/psyche"
        },
        {
        
    id: 2,
    title: "NASA's Lunar Gateway Station Advances",
    date: "October 15, 2023",
    excerpt: "NASA makes progress on the Lunar Gateway, a space station that will orbit the Moon and support Artemis missions.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1227&q=80",
    link: "https://www.nasa.gov/gateway"

            
},
        
        {
            id: 3,
            title: "NASA's OSIRIS-REx Mission Delivers Asteroid Sample",
            date: "September 24, 2023",
            excerpt: "NASA's OSIRIS-REx spacecraft successfully delivered a sample of asteroid Bennu to Earth, providing insights into the early solar system.",
            image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
            link: "https://www.nasa.gov/osiris-rex"
        }
    ];

    // Component render method
    return (
        // Main container for home page
        <div className="home-page">
            {/* ===== HERO SECTION ===== */}
            <div className="hero-section position-relative overflow-hidden text-center">
                {/* Background image with overlay */}
                <div className="position-absolute w-100 h-100 top-0 start-0">
                    <img 
                        src="https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80" 
                        alt="Galaxy background" 
                        className="w-100 h-100 object-fit-cover"
                        style={{ filter: 'brightness(0.5)' }} // Darken background
                    />
                </div>
                
                {/* Hero content positioned above background */}
                <div className="position-relative py-5 px-3 px-md-5" style={{ zIndex: 1 }}>
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <h1 className="display-3 fw-bold text-white mb-4">
                                    Exploring the Cosmos
                                </h1>
                                <p className="lead text-white mb-5">
                                    Discover NASA's groundbreaking missions and the latest discoveries from our universe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== FEATURED MISSIONS SECTION ===== */}
            <section className="py-5 bg-dark">
                <div className="container py-5">
                    {/* Section header */}
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-white mb-3">Featured NASA Missions</h2>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <p className="lead text-light opacity-75">
                                    Pioneering missions that expand our understanding of the universe
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mission cards grid */}
                    <div className="row g-4">
                        {featuredMissions.map(mission => (
                            // Individual mission card
                            <div key={mission.id} className="col-md-4">
                                <div className="card h-100 border-0 shadow-lg overflow-hidden">
                                    {/* Mission image */}
                                    <img 
                                        src={mission.image} 
                                        className="card-img-top" 
                                        alt={mission.title}
                                        style={{ height: '250px', objectFit: 'cover' }} // Fixed height with cover
                                    />
                                    {/* Card content */}
                                    <div className="card-body">
                                        <h3 className="card-title h5">{mission.title}</h3>
                                        <p className="card-text">{mission.description}</p>
                                    </div>
                                    {/* Card footer with link */}
                                    <div className="card-footer bg-transparent border-0">
                                        <a 
                                            href={mission.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-primary"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LATEST NEWS SECTION ===== */}
            <section className="py-5 bg-light">
                <div className="container py-5">
                    {/* Section header */}
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-dark mb-3">Latest NASA News</h2>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <p className="lead text-dark">
                                    Stay updated with the latest discoveries and mission updates
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* News cards grid */}
                    <div className="row g-4">
                        {nasaNews.map(news => (
                            // Individual news card
                            <div key={news.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow">
                                    {/* News image */}
                                    <img 
                                        src={news.image} 
                                        className="card-img-top" 
                                        alt={news.title}
                                        style={{ height: '200px', objectFit: 'cover' }} // Fixed height with cover
                                    />
                                    {/* Card content */}
                                    <div className="card-body bg-white">
                                        <h3 className="card-title h5 text-dark">{news.title}</h3>
                                        <p className="card-text text-dark">{news.excerpt}</p>
                                    </div>
                                    {/* Card footer with link */}
                                    <div className="card-footer bg-white border-0">
                                        <a 
                                            href={news.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Read Full Story
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* View all news button */}
                    <div className="text-center mt-5">
                        <a 
                            href="https://www.nasa.gov/news" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-primary px-4 py-2"
                        >
                            View All News
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Export Home component for use in other files
export default Home;
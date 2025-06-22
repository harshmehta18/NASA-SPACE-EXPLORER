// Import React and necessary hooks
import React, { useState, useEffect } from 'react';
// Import routing components
import { Link, useLocation } from 'react-router-dom';

// Navbar component definition
const Navbar = () => {
    // Get current location using React Router's useLocation hook
    const location = useLocation();
    // State for mobile menu open/close status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State for tracking if page is scrolled
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Navigation items configuration
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/apod', label: 'APOD' },               // Astronomy Picture of the Day
        { path: '/mars-rover-photos', label: 'Mars Rover' },
        { path: '/data-visualization', label: 'NEO' },  // Near Earth Objects
        { path: '/epic', label: 'EPIC' },               // Earth Polychromatic Imaging Camera
        { path: '/nasa-media-library', label: 'Nasa Media' }
    ];

    // Effect for handling scroll behavior
    useEffect(() => {
        // Function to check scroll position
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup: remove event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty dependency array = runs only on mount/unmount

    // Effect to close mobile menu when route changes
    useEffect(() => {
        // Close menu whenever location changes
        setIsMenuOpen(false);
    }, [location]); // Dependency: re-run when location changes

    // Component render
    return (
        // Navigation element with dynamic classes
        <nav className={`navbar navbar-expand-lg navbar-dark fixed-top py-2 ${isScrolled ? 'scrolled-nav' : ''}`}>
            <div className="container">
                {/* Brand/logo link */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    {/* Rocket icon */}
                    <div className="rocket-icon">
                        <i className="fas fa-rocket"></i>
                    </div>
                    {/* Brand text with NASA in white and EXPLORER in yellow */}
                    <span className="brand-text">
                        NASA<span className="text-warning">EXPLORER</span>
                    </span>
                </Link>
                
                {/* Mobile menu toggle button */}
                <button 
                    className={`navbar-toggler ${isMenuOpen ? '' : 'collapsed'}`}
                    type="button" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu state
                >
                    {/* Hamburger icon */}
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* Collapsible menu section */}
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    {/* Navigation items list */}
                    <ul className="navbar-nav ms-auto">
                        {/* Map through navItems to create navigation links */}
                        {navItems.map((item) => (
                            <li className="nav-item mx-1 my-1" key={item.path}>
                                {/* Custom NavLink component */}
                                <NavLink 
                                    to={item.path} 
                                    isActive={location.pathname === item.path} // Check if current route
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

// Custom NavLink component for better styling and active state
const NavLink = ({ to, children, isActive }) => (
    <Link 
        to={to} 
        // Apply 'active-link' class when route matches
        className={`nav-link position-relative px-3 py-2 text-center ${isActive ? 'active-link' : ''}`}
    >
        {/* Link text */}
        {children}
        {/* Visual indicator for active link */}
        {isActive && <span className="active-indicator"></span>}
    </Link>
);

// Export component for use in other files
export default Navbar;
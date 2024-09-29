import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const image = 'https://images.unsplash.com/photo-1481988535861-271139e06469?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 1); // Single image
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleStartBlogging = () => {
        navigate('/user/dashboard'); // Navigate to /user/dashboard when button is clicked
    };

    return (
        <div className="home" style={{ backgroundImage: `url(${image})` }}>
            <header className="header">
                <h1 className="logo">Blogger</h1>
                <Link to="/login" className="login-text">Log In</Link> {/* Use Link for redirection */}
            </header>

            <main>
                <div className="button-container">
                    <button className="main-button" onClick={handleStartBlogging}>Start Blogging</button> {/* Add onClick to handle navigation */}
                </div>
            </main>

            <footer>
                <p>&copy; 2024 Your Blog. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

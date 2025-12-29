import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredStories = [
    {
      id: 1,
      title: "Trekking the Annapurna Circuit",
      description: "A 12-day journey through the majestic Himalayas, experiencing diverse landscapes and local culture in the Annapurna region.",
    },
    {
      id: 2,
      title: "Exploring the Ancient Temples of Kathmandu",
      description: "Discovering the rich cultural heritage and spiritual sites in Nepal's vibrant capital city and its surrounding valleys.",
    },
    {
      id: 3,
      title: "Wildlife Safari in Chitwan National Park",
      description: "An unforgettable adventure spotting rhinos, tigers, and exotic birds in Nepal's premier wildlife sanctuary.",
    },
  ];

  const popularDestinations = [
    "Pokhara", "Kathmandu", "Mustang", "Everest Base Camp", 
    "Chitwan", "Lumbini", "Nagarkot", "Bhaktapur", "Langtang", 
    "Rara Lake", "Annapurna Base Camp", "Patan"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In a real app, this would trigger an API call
    }
  };

  const handleStartWriting = () => {
    alert("Redirecting to diary creation page...");
    // In a real app, this would navigate to the diary creation page
  };

  const handleViewStory = (storyId) => {
    alert(`Viewing story with ID: ${storyId}`);
    // In a real app, this would navigate to the story page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-page">
      {/* Header / Navbar */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Travel Diaries Nepal</h1>
            </div>
            
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <a href="#home" className="nav-link">Home</a>
              <a href="#trips" className="nav-link">Trips</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <Link to="/login" className="login-btn">Login / Signup</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Share Your Travel Stories and Memories</h1>
            <p className="hero-subtitle">
              Travel Diaries Nepal is a platform where adventurers, trekkers, and explorers document 
              their journeys across the Himalayas. Share your experiences, inspire others, and preserve 
              your travel memories forever.
            </p>
            <button className="cta-button" onClick={handleStartWriting}>
              Start Writing Diary
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <h2 className="section-title">Search Destination</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search for places, stories, or experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured Travel Stories */}
      <section className="featured-stories" id="trips">
        <div className="container">
          <h2 className="section-title">Featured Travel Stories</h2>
          <div className="stories-grid">
            {featuredStories.map((story) => (
              <div className="story-card" key={story.id}>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-description">{story.description}</p>
                  <button 
                    className="story-button"
                    onClick={() => handleViewStory(story.id)}
                  >
                    View Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="destinations-grid">
            {popularDestinations.map((destination, index) => (
              <div className="destination-tag" key={index}>
                {destination}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">Travel Diaries Nepal — Preserve Your Journey Memories</p>
            <div className="footer-links">
              <a href="#privacy" className="footer-link">Privacy Policy</a>
              <a href="#terms" className="footer-link">Terms of Service</a>
              <a href="#support" className="footer-link">Support</a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} Travel Diaries Nepal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
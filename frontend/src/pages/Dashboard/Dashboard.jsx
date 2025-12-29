import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { logout } from "../../services/auth";
import { getMyTravelDiaries } from "../../services/travel-diary";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    getMyTravelDiaries().then((res) => {
      setRecentEntries(res.data.data);
    });
  });

  const handleNewEntry = () => {
    navigate("/create");
  };

  const handleViewAll = () => {
    // Navigate to all entries page
    console.log("View all entries");
  };

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="diary-dashboard">
      {/* Same Navbar as Home Page */}
      <nav className="dashboard-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon"></span>
            <span className="logo-text">TravelDiaries</span>
          </div>

          <div className="nav-links">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/dashboard" className="nav-link active">
              Dashboard
            </a>
            <a href="/explore" className="nav-link">
              Explore
            </a>
            <button className="nav-cta" onClick={handleNewEntry}>
              Write
            </button>
            <div className="profile-dropdown">
              <button className="profile-trigger">
                <span className="profile-avatar">🧑‍🦰</span>
              </button>
              <div className="dropdown-menu">
                <a href="/profile" className="dropdown-item">
                  Profile
                </a>
                <a href="/settings" className="dropdown-item">
                  Settings
                </a>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Minimal & Clean */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome back, Explorer 👋</h1>
          <p className="welcome-subtitle">
            Your next Himalayan memory is waiting to be written
          </p>
        </section>

        {/* Primary CTA - Most Important */}
        <section className="cta-section">
          <button className="write-button" onClick={handleNewEntry}>
            Start Writing Diary
          </button>
          <p className="cta-hint">Continue your story wherever you left off</p>
        </section>

        {/* Recent Diary Entries */}
        <section className="recent-entries">
          <div className="section-header">
            <h2 className="section-title">Your Travel Memories</h2>
            <button className="view-all-btn" onClick={handleViewAll}>
              View All Entries →
            </button>
          </div>

          <div className="entries-grid">
            {recentEntries.map((entry) => (
              <article
                key={entry.id}
                className="entry-card"
                onClick={() => console.log("Open entry", entry.id)}
              >
                <div
                  className="entry-cover"
                  style={{ backgroundImage: `url(${entry.coverImage})` }}
                >
                  <div className="cover-overlay"></div>
                  <div className="entry-number">#{entry.id}</div>
                </div>
                <div className="entry-content">
                  <h3 className="entry-title">{entry.title}</h3>
                  <div className="entry-meta">
                    <span className="location">📍 {entry.location}</span>
                    <span className="date">📅 {entry.date}</span>
                  </div>
                  <p className="entry-excerpt">{entry.excerpt}</p>
                  <div className="entry-actions">
                    <button className="read-btn">Read Full Story →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination for Many Entries */}
          <div className="entries-pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-btn">15</button>
            <button className="pagination-next">Next →</button>
          </div>
        </section>

        {/* Stats - Only Minimal, Like a Diary Would Have */}
        <section className="diary-stats">
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{recentEntries.length}</span>
              <span className="stat-label">Diary Entries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Nepal Regions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">47</span>
              <span className="stat-label">Days in Nepal</span>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="dashboard-footer">
        <p>NepalDiaries · Documenting Himalayan journeys since 2024</p>
        <p className="footer-note">
          Every mountain has a story. Every story belongs here.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;

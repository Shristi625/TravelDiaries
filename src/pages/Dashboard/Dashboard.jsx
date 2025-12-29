import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentEntries, setRecentEntries] = useState([
    {
      id: 1,
      title: 'First Glimpse of Everest',
      location: 'Everest Base Camp, Solukhumbu',
      date: 'April 15, 2024',
      coverImage: 'https://images.unsplash.com/photo-1544735716-2fdfb0075e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'The moment I saw Mount Everest up close, I understood what true majesty means. The Khumbu Icefall glittered in the morning light...'
    },
    {
      id: 2,
      title: 'Dawn at Poon Hill',
      location: 'Ghorepani, Annapurna Region',
      date: 'April 10, 2024',
      coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Woke at 4 AM for the hike to Poon Hill. As the sun rose, the Annapurna range turned from shadow to gold. The silence was profound...'
    },
    {
      id: 3,
      title: 'Ancient Temples of Bhaktapur',
      location: 'Bhaktapur Durbar Square',
      date: 'April 5, 2024',
      coverImage: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Spent the day wandering through Bhaktapur\'s medieval streets. The 55-window palace stood as a testament to Newari craftsmanship...'
    },
    {
      id: 4,
      title: 'Peaceful Phewa Lake',
      location: 'Pokhara, Gandaki Province',
      date: 'March 28, 2024',
      coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Rented a colorful boat and rowed to the middle of Phewa Lake. Machhapuchhre reflected perfectly in the still water...'
    },
    {
      id: 5,
      title: 'Mountain Villages of Manang',
      location: 'Manang Valley, Annapurna',
      date: 'March 22, 2024',
      coverImage: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'The stone houses of Manang cling to mountainsides at 3,500 meters. Locals shared butter tea and stories of mountain spirits...'
    },
    {
      id: 6,
      title: 'Sacred Pashupatinath',
      location: 'Kathmandu, Bagmati Province',
      date: 'March 18, 2024',
      coverImage: 'https://images.unsplash.com/photo-1585920098740-b1acd19d47bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Evening aarti at Pashupatinath Temple. The air thick with incense, chants echoing across the Bagmati River...'
    },
    {
      id: 7,
      title: 'Rhododendron Forests',
      location: 'Ghandruk, Annapurna',
      date: 'March 15, 2024',
      coverImage: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Hiked through forests of blooming rhododendrons - Nepal\'s national flower painting the hillsides in shades of red...'
    },
    {
      id: 8,
      title: 'Boudhanath Stupa at Dusk',
      location: 'Boudha, Kathmandu',
      date: 'March 12, 2024',
      coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'The giant eyes of Boudhanath watch as monks circle the stupa with prayer wheels. The scent of juniper incense fills the air...'
    },
    {
      id: 9,
      title: 'Hidden Waterfalls',
      location: 'Davis Falls, Pokhara',
      date: 'March 8, 2024',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Followed the sound of rushing water to discover Davis Falls. The river disappears into an underground cavern...'
    },
    {
      id: 10,
      title: 'Sunset at Nagarkot',
      location: 'Nagarkot, Bhaktapur',
      date: 'March 5, 2024',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'From Nagarkot viewpoint, watched as the sun set behind the Himalayas. The sky turned from orange to deep purple...'
    },
    {
      id: 11,
      title: 'Swayambhunath Monkeys',
      location: 'Monkey Temple, Kathmandu',
      date: 'March 1, 2024',
      coverImage: 'https://images.unsplash.com/photo-1521800641212-77b98b86b9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Climbed the 365 steps to Swayambhunath. Playful monkeys watched as we spun prayer wheels at this ancient site...'
    },
    {
      id: 12,
      title: 'Thakali Village Life',
      location: 'Tatopani, Mustang',
      date: 'February 25, 2024',
      coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Stayed with a Thakali family in their traditional stone house. Learned about their unique culture and mountain agriculture...'
    },
    {
      id: 13,
      title: 'Mountain Pass Crossing',
      location: 'Thorong La Pass, Mustang',
      date: 'February 20, 2024',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Crossed the 5,416m Thorong La Pass. The highest point of the Annapurna Circuit, with prayer flags flapping in thin air...'
    },
    {
      id: 14,
      title: 'Ghandruk Village Stay',
      location: 'Ghandruk, Kaski',
      date: 'February 15, 2024',
      coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'Stayed in a traditional Gurung homestay. The family showed us their customs and shared stories of Gurkha heritage...'
    },
    {
      id: 15,
      title: 'Morning at Sarangkot',
      location: 'Sarangkot, Pokhara',
      date: 'February 10, 2024',
      coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      excerpt: 'The paragliders took off as the morning mist cleared over Pokhara Valley. Fishtail Mountain stood sharp against the blue sky...'
    }
  ]);

  const handleNewEntry = () => {
    navigate('/create');
  };

  const handleViewAll = () => {
    // Navigate to all entries page
    console.log('View all entries');
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
            <a href="/" className="nav-link">Home</a>
            <a href="/dashboard" className="nav-link active">Dashboard</a>
            <a href="/explore" className="nav-link">Explore</a>
            <button className="nav-cta" onClick={handleNewEntry}>
              Write
            </button>
            <div className="profile-dropdown">
              <button className="profile-trigger">
                <span className="profile-avatar">🧑‍🦰</span>
              </button>
              <div className="dropdown-menu">
                <a href="/profile" className="dropdown-item">Profile</a>
                <a href="/settings" className="dropdown-item">Settings</a>
                <button className="dropdown-item logout">Logout</button>
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
          <p className="welcome-subtitle">Your next Himalayan memory is waiting to be written</p>
        </section>

        {/* Primary CTA - Most Important */}
        <section className="cta-section">
          <button 
            className="write-button"
            onClick={handleNewEntry}
          >
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
            {recentEntries.map(entry => (
              <article 
                key={entry.id} 
                className="entry-card"
                onClick={() => console.log('Open entry', entry.id)}
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
        <p className="footer-note">Every mountain has a story. Every story belongs here.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
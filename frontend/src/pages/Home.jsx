import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Shield, Calendar, Wrench, ArrowRight } from 'lucide-react';
import '../styles/global.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Smart Campus Operations Hub</h1>
        <p className="hero-subtitle">
          Streamline university operations with our next-gen platform for resource management, 
          booking, and maintenance handling.
        </p>
        <div className="hero-actions">
          <Link to="/catalogue" className="btn-primary">
            Explore Assets <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="features-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        padding: '0 40px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <FeatureCard 
          icon={<Layout size={32} color="#6366f1" />}
          title="Assets Catalogue"
          description="Browse and manage all campus resources from lecture halls to high-end lab equipment."
        />
        <FeatureCard 
          icon={<Calendar size={32} color="#8b5cf6" />}
          title="Seamless Bookings"
          description="Real-time availability and conflict prevention for all bookable campus spaces."
        />
        <FeatureCard 
          icon={<Wrench size={32} color="#10b981" />}
          title="Incident Handling"
          description="Report faults and track maintenance tickets with detailed updates and evidence."
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass-card" style={{ padding: '32px', textAlign: 'left' }}>
    <div style={{ marginBottom: '20px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{description}</p>
  </div>
);

export default Home;

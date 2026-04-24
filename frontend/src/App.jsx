import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AssetCatalogue from './pages/AssetCatalogue';
import ResourceManager from './pages/ResourceManager';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="glass-card" style={{ 
          margin: '20px 40px', 
          padding: '16px 32px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: '20px',
          zIndex: 100
        }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
            Smart<span style={{ color: 'var(--primary)' }}>Campus</span>
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <Link to="/catalogue" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Assets</Link>
            <Link to="/manage" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Manage</Link>
            <button className="btn-primary" style={{ padding: '8px 20px' }}>Login</button>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<AssetCatalogue />} />
            <Route path="/manage" element={<ResourceManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/App.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force header background on non-home pages
  const showBackground = scrolled || !isHome;

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    padding: '20px 0',
    transition: 'all 0.3s ease',
    backgroundColor: showBackground ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
    backdropFilter: showBackground ? 'blur(10px)' : 'none',
    boxShadow: showBackground ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: showBackground ? 'var(--color-primary)' : '#fff',
    letterSpacing: '1px',
    fontFamily: 'var(--font-pop)',
    transition: 'color 0.3s',
  };

  const linkStyle = {
    marginLeft: '30px',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: showBackground ? 'var(--color-text)' : '#fff',
    opacity: 1,
    transition: 'color 0.3s',
    cursor: 'pointer'
  };

  return (
    <header style={headerStyle}>
      <div className="container" style={navStyle}>
        <Link to="/" style={logoStyle}>楽SAKEターミナル</Link>
        <nav>
          {isHome ? (
            <>
              <a href="#about" style={linkStyle}>About</a>
              <a href="#events" style={linkStyle}>Events</a>
            </>
          ) : (
            <Link to="/" style={linkStyle}>Home</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

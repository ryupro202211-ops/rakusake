import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

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

  const showBackground = scrolled || !isHome;

  return (
    <header className={`header ${showBackground ? 'header--solid' : 'header--transparent'}`}>
      <div className="container header__nav">
        <Link to="/" className={`header__logo ${showBackground ? 'header__logo--dark' : 'header__logo--light'}`}>
          楽SAKEターミナル
        </Link>
        <nav>
          {isHome ? (
            <>
              <a href="#about" className={`header__link ${showBackground ? 'header__link--dark' : 'header__link--light'}`}>About</a>
              <a href="#events" className={`header__link ${showBackground ? 'header__link--dark' : 'header__link--light'}`}>Events</a>
            </>
          ) : (
            <Link to="/" className={`header__link ${showBackground ? 'header__link--dark' : 'header__link--light'}`}>Home</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

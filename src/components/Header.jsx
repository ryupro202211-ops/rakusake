import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const showBg = scrolled || !isHome || menuOpen;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: menuOpen ? 10001 : 1000,
      padding: '12px 0',
      transition: 'all 0.3s ease',
      backgroundColor: showBg ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: showBg ? 'blur(10px)' : 'none',
      boxShadow: showBg ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src={`${import.meta.env.BASE_URL}images/S__2351117_0.jpg`}
            alt="楽SAKEターミナル"
            style={{ height: '40px', width: 'auto', borderRadius: '6px', transition: 'all 0.3s' }}
          />
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '5px', padding: '8px', zIndex: 100000, position: 'relative',
          }}
          className="hamburger-btn"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: showBg ? 'var(--color-text)' : '#fff',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>

        {/* Nav links */}
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isHome ? (
            <>
              <NavLink href="#about" showBg={showBg} onClick={() => setMenuOpen(false)}>コンセプト</NavLink>
              <NavLink href="#events" showBg={showBg} onClick={() => setMenuOpen(false)}>イベント一覧</NavLink>
              <NavLink href="#event-photos" showBg={showBg} onClick={() => setMenuOpen(false)}>イベントの様子</NavLink>
              <NavLink href="#first-timer" showBg={showBg} onClick={() => setMenuOpen(false)}>初めての方へ</NavLink>
            </>
          ) : (
            <Link to="/" style={{ ...navLinkStyle(showBg), textDecoration: 'none' }}>ホーム</Link>
          )}
          <a
            href="#events"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-block', padding: '10px 24px',
              background: 'var(--color-primary)', color: '#fff',
              borderRadius: '50px', fontWeight: 'bold', fontSize: '0.9rem',
              textDecoration: 'none', marginLeft: '8px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(255,159,28,0.3)',
            }}
            onMouseEnter={e => { e.target.style.background = 'var(--color-accent)'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.background = 'var(--color-primary)'; e.target.style.transform = 'translateY(0)'; }}
          >
            申し込む
          </a>
        </nav>
      </div>

      {/* Mobile menu overlay - rendered via portal to body */}
      {menuOpen && createPortal(
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: '#ffffff',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '2rem', zIndex: 99999,
        }} className="mobile-menu-overlay">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="メニューを閉じる"
            style={{
              position: 'absolute', top: '12px', right: '36px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '2rem', color: 'var(--color-text)', lineHeight: 1,
              padding: '8px',
            }}
          >✕</button>
          {isHome ? (
            <>
              <a href="#about" onClick={() => setMenuOpen(false)} style={mobileNavStyle}>コンセプト</a>
              <a href="#events" onClick={() => setMenuOpen(false)} style={mobileNavStyle}>イベント一覧</a>
              <a href="#event-photos" onClick={() => setMenuOpen(false)} style={mobileNavStyle}>イベントの様子</a>
              <a href="#first-timer" onClick={() => setMenuOpen(false)} style={mobileNavStyle}>初めての方へ</a>
            </>
          ) : (
            <Link to="/" onClick={() => setMenuOpen(false)} style={mobileNavStyle}>ホーム</Link>
          )}
          <a href="#events" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>
            申し込む
          </a>
        </div>,
        document.body
      )}

      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </header>
  );
};

const navLinkStyle = (showBg) => ({
  fontSize: '0.9rem', fontWeight: 'bold',
  color: showBg ? 'var(--color-text)' : '#fff',
  opacity: 1, transition: 'color 0.3s', cursor: 'pointer',
  padding: '8px 12px',
});

const NavLink = ({ href, showBg, children, onClick }) => (
  <a href={href} style={navLinkStyle(showBg)} onClick={onClick}>{children}</a>
);

const mobileNavStyle = {
  fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-text)',
  textDecoration: 'none', padding: '0.5rem 1rem',
};

export default Header;

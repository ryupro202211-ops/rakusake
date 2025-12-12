import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '3rem 0',
            textAlign: 'center',
            background: '#fff',
            borderTop: '1px solid #eee',
            marginTop: 'auto'
        }}>
            <div className="container">
                <h4 style={{
                    fontSize: '1.4rem',
                    margin: '0 0 1.5rem',
                    fontFamily: 'var(--font-pop)',
                    color: 'var(--color-primary)',
                    fontWeight: 'bold'
                }}>
                    楽SAKEターミナル
                </h4>
                <div style={{ marginBottom: '2rem' }}>
                    <a href="#about" style={{ margin: '0 15px', color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 'bold' }}>About</a>
                    <a href="#events" style={{ margin: '0 15px', color: 'var(--color-text)', fontSize: '0.95rem', fontWeight: 'bold' }}>Events</a>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <a
                        href="https://www.instagram.com/raku_sake_terminal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', color: '#E1306C', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: '8px' }}
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                    </a>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    &copy; {new Date().getFullYear()} Raku Sake Terminal. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

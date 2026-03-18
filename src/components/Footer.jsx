import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <h4 className="footer__logo">
                    楽SAKEターミナル
                </h4>
                <div className="footer__nav">
                    <a href="#about" className="footer__nav-link">About</a>
                    <a href="#events" className="footer__nav-link">Events</a>
                </div>

                <div className="footer__social">
                    <a
                        href="https://www.instagram.com/raku_sake_terminal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__instagram"
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
                            className="footer__instagram-icon"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                    </a>
                </div>
                <p className="footer__copyright">
                    &copy; {new Date().getFullYear()} Raku Sake Terminal. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

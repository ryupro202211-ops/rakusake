import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';

const Hero = () => {
    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {
        const fetchLatestEvent = () => {
            const allEvents = getEvents();
            const today = new Date().toISOString().split('T')[0];

            // Filter upcoming events
            const upcoming = allEvents
                .filter(event => event.date >= today)
                .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

            if (upcoming.length > 0) {
                setLatestEvent(upcoming[0]);
            }
        };

        fetchLatestEvent();
        window.addEventListener('storage-update', fetchLatestEvent);
        return () => window.removeEventListener('storage-update', fetchLatestEvent);
    }, []);

    const heroStyle = {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundAttachment: 'fixed',
    };

    // Fallback static image
    const defaultBgImage = `${import.meta.env.BASE_URL}images/hero_party.png`;
    const bgImage = latestEvent?.image || defaultBgImage;

    const bgImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Darker gradient to hide text in background images and improve readability
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)',
        zIndex: 1,
        backdropFilter: 'blur(3px)',
    };

    const contentStyle = {
        zIndex: 2,
        textAlign: 'center',
        color: '#fff',
        padding: '0 20px',
        maxWidth: '800px',
        width: '100%',
        textShadow: '0 2px 10px rgba(0,0,0,0.7)',
    };

    const titleStyle = {
        fontSize: 'clamp(1.5rem, 4vw, 4rem)', // Smaller min/max for mobile
        marginBottom: '20px',
        lineHeight: 1.4, // More breathing room
        fontFamily: 'var(--font-pop)',
        fontWeight: '800',
        wordWrap: 'break-word', // Allow wrapping
    };

    const subtitleStyle = {
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        fontWeight: 'bold',
        marginBottom: '30px',
        display: 'block',
        lineHeight: 1.6,
    };

    const dateBadgeStyle = {
        display: 'inline-block',
        background: '#ff4d4d',
        color: 'white',
        padding: '5px 15px',
        borderRadius: '20px',
        fontWeight: 'bold',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    };

    return (
        <section style={heroStyle}>
            <div style={bgImageStyle}></div>
            <div style={overlayStyle}></div>

            <div className="container" style={contentStyle}>
                <div className="animate-fade-in">
                    {latestEvent ? (
                        <>
                            <div className="animate-slide-down" style={{ marginBottom: '1rem' }}>
                                <span style={dateBadgeStyle}>NEXT EVENT: {latestEvent.date}</span>
                            </div>
                            <h1 style={titleStyle}>
                                {latestEvent.title}
                            </h1>
                            <span style={subtitleStyle} className="delay-200 animate-slide-right">
                                {latestEvent.summary}
                            </span>
                            <div className="delay-500 animate-fade-in" style={{ marginTop: '2rem' }}>
                                <Link to={`/events/${latestEvent.id}`} className="btn-primary" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                                    詳細を見る
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 style={titleStyle}>
                                美味い酒を<br />
                                片手に語り合おう
                            </h1>
                            <span style={subtitleStyle} className="delay-200 animate-slide-right">
                                みんなで楽しむ、最高の一杯と新しい出会い！
                            </span>
                            <div className="delay-500 animate-fade-in" style={{ marginTop: '2rem' }}>
                                <a href="#events" className="btn-primary" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                                    Check Events!
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;

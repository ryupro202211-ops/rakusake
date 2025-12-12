import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';

const EventCard = ({ id, title, date, description, summary, isPast = false, image }) => (
    <Link to={`/events/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            position: 'relative',
            top: 0
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 159, 28, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}
        >
            {image && (
                <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1.0)'}
                        onError={(e) => e.target.style.display = 'none'} // Hide broken images
                    />
                </div>
            )}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.8rem'
                }}>
                    <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: isPast ? '#a0a0a0' : 'var(--color-primary)',
                        background: isPast ? '#f0f0f0' : 'rgba(255, 159, 28, 0.15)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                    }}>
                        {isPast ? 'PAST' : 'UPCOMING'}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>{date}</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', lineHeight: 1.4, textAlign: 'left' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-muted)', flexGrow: 1 }}>
                    {summary || (description && description.substring(0, 50) + "...")}
                </p>
            </div>
        </div>
    </Link>
);

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = () => {
            const allEvents = getEvents();
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            const upcoming = [];
            const past = [];

            allEvents.forEach(event => {
                if (!event.date) return; // Skip invalid dates

                // Simple string comparison for YYYY-MM-DD works
                if (event.date >= today) {
                    upcoming.push(event);
                } else {
                    past.push(event);
                }
            });

            // Sort: Upcoming (nearest first), Past (newest first)
            upcoming.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            past.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

            setUpcomingEvents(upcoming);
            setPastEvents(past);
        };

        fetchEvents();

        // Listen for updates from other components (like Admin or seed)
        window.addEventListener('storage-update', fetchEvents);

        return () => {
            window.removeEventListener('storage-update', fetchEvents);
        };
    }, []); // Run once on mount

    return (
        <section id="events" className="section-padding" style={{ background: '#fcfcfc' }}>
            <div className="container">
                <h2 style={{ width: '100%', textAlign: 'center' }}>EVENTS</h2>

                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        color: 'var(--color-text-muted)'
                    }}>
                        Check Upcoming Events!
                    </h3>
                    {upcomingEvents.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel" style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: '#fff',
                            maxWidth: '600px',
                            margin: '0 auto',
                            border: '2px dashed #ddd'
                        }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', fontWeight: 'bold' }}>
                                現在、とびきり楽しいイベントを企画中！🚀
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                次回の開催をお楽しみに！
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <h3 style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        color: 'var(--color-text)'
                    }}>
                        Past Party Archives
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {pastEvents.map(event => (
                            <EventCard key={event.id} {...event} isPast={true} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;

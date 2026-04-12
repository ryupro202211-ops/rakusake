import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

const EventCard = ({ id, title, date, description, summary, isPast = false, image, remainingSeats }) => (
    <Link to={`/events/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: '#fff', borderRadius: '24px', overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)', position: 'relative', top: 0,
        }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,159,28,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)'; }}
        >
            {image && (
                <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={image.startsWith('data:') ? image : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
                        onError={e => e.target.style.display = 'none'}
                    />
                </div>
            )}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{
                        fontSize: '0.8rem', fontWeight: 'bold',
                        color: isPast ? '#a0a0a0' : 'var(--color-primary)',
                        background: isPast ? '#f0f0f0' : 'rgba(255,159,28,0.15)',
                        padding: '4px 12px', borderRadius: '20px',
                    }}>
                        {isPast ? '開催済み' : '開催予定'}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>{date}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', lineHeight: 1.4, textAlign: 'left' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-muted)', flexGrow: 1 }}>
                    {summary || (description && description.substring(0, 50) + '...')}
                </p>
                {!isPast && remainingSeats != null && (
                    <p style={{ fontSize: '0.85rem', color: '#ff4d4d', fontWeight: 'bold', marginTop: '0.8rem' }}>
                        残り{remainingSeats}席
                    </p>
                )}
            </div>
        </div>
    </Link>
);

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [showAllPast, setShowAllPast] = useState(false);

    useEffect(() => {
        const fetchEvents = () => {
            const allEvents = getEvents();
            const today = new Date().toISOString().split('T')[0];
            const upcoming = [], past = [];
            allEvents.forEach(event => {
                if (!event.date) return;
                if (event.date >= today) upcoming.push(event);
                else past.push(event);
            });
            upcoming.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            past.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
            setUpcomingEvents(upcoming);
            setPastEvents(past);
        };
        fetchEvents();
        window.addEventListener('storage-update', fetchEvents);
        return () => window.removeEventListener('storage-update', fetchEvents);
    }, []);

    return (
        <section id="events" className="section-padding" style={{ background: '#fcfcfc' }}>
            <div className="container">
                <h2 style={{ width: '100%', textAlign: 'center' }}>イベント一覧</h2>

                {/* Upcoming */}
                <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.3rem', color: 'var(--color-text-muted)' }}>
                        開催予定のイベント
                    </h3>
                    {upcomingEvents.length > 0 ? (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {upcomingEvents.map(event => <EventCard key={event.id} {...event} />)}
                            </div>
                        </>
                    ) : (
                        <div style={{
                            textAlign: 'center', padding: '3rem', background: '#fff',
                            maxWidth: '600px', margin: '0 auto', borderRadius: '24px',
                            border: '2px dashed #ddd',
                        }}>
                            <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                次回イベントは準備中です
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                LINE登録で最速の告知を受け取ろう
                            </p>
                            <a
                                href={LINE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '12px 28px', background: '#06C755', color: '#fff',
                                    borderRadius: '50px', fontWeight: 'bold', fontSize: '0.95rem',
                                    textDecoration: 'none', transition: 'all 0.3s',
                                    boxShadow: '0 4px 12px rgba(6,199,85,0.3)',
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                                </svg>
                                LINE登録で最速告知
                            </a>
                        </div>
                    )}
                </div>

                {/* Past */}
                {pastEvents.length > 0 && (
                    <div>
                        <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.3rem', color: 'var(--color-text)' }}>
                            過去のイベント
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {(showAllPast ? pastEvents : pastEvents.slice(0, 3)).map(event => <EventCard key={event.id} {...event} isPast={true} />)}
                        </div>
                        {pastEvents.length > 3 && !showAllPast && (
                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <button
                                    onClick={() => setShowAllPast(true)}
                                    style={{
                                        padding: '12px 32px', background: 'transparent',
                                        border: '2px solid var(--color-primary)', color: 'var(--color-primary)',
                                        borderRadius: '50px', fontWeight: 'bold', fontSize: '0.95rem',
                                        cursor: 'pointer', transition: 'all 0.3s',
                                    }}
                                    onMouseEnter={e => { e.target.style.background = 'var(--color-primary)'; e.target.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-primary)'; }}
                                >
                                    過去のイベントをもっと見る（残り{pastEvents.length - 3}件）
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Events;

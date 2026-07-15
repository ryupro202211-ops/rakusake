import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import SeatsBar from './SeatsBar';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

// 3D tilt: card leans toward the cursor
const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
    card.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-8px)`;
    card.style.boxShadow = '0 24px 48px rgba(255,159,28,0.2)';
};

const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease';
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
};

const EventCard = ({ id, title, date, description, summary, isPast = false, image, remainingSeats, capacity }) => (
    <Link to={`/events/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)', position: 'relative',
            border: '1px solid rgba(0,0,0,0.04)',
        }}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
        >
            {image && (
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img src={image.startsWith('data:') ? image : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.target.style.transform = 'scale(1.0)'}
                        onError={e => e.target.style.display = 'none'}
                    />
                    <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        fontSize: '0.75rem', fontWeight: 'bold',
                        color: '#fff',
                        background: isPast ? 'rgba(0,0,0,0.5)' : 'var(--color-primary)',
                        padding: '5px 14px', borderRadius: '20px',
                        backdropFilter: 'blur(4px)',
                    }}>
                        {isPast ? '開催済み' : '開催予定'}
                    </div>
                </div>
            )}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {!image && (
                    <div style={{ marginBottom: '0.8rem' }}>
                        <span style={{
                            fontSize: '0.75rem', fontWeight: 'bold',
                            color: isPast ? '#a0a0a0' : 'var(--color-primary)',
                            background: isPast ? '#f5f5f5' : 'rgba(255,159,28,0.1)',
                            padding: '5px 14px', borderRadius: '20px',
                        }}>
                            {isPast ? '開催済み' : '開催予定'}
                        </span>
                    </div>
                )}
                <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: '600', marginBottom: '0.5rem' }}>{date}</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', lineHeight: 1.5, textAlign: 'left', fontWeight: '700' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--color-text-muted)', flexGrow: 1 }}>
                    {summary || (description && description.substring(0, 50) + '...')}
                </p>
                {!isPast && remainingSeats != null && (
                    <div style={{ marginTop: '1rem' }}>
                        {capacity != null
                            ? <SeatsBar capacity={capacity} remaining={remainingSeats} variant="light" />
                            : <p style={{ fontSize: '0.85rem', color: '#ff4d4d', fontWeight: 'bold' }}>残り{remainingSeats}席</p>}
                    </div>
                )}
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '600' }}>
                    詳しく見る
                    <span style={{ transition: 'transform 0.3s' }}>→</span>
                </div>
            </div>
        </div>
    </Link>
);

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [showAllPast, setShowAllPast] = useState(false);
    const [gridRef, gridVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
    const [pastRef, pastVisible] = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

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
                            <div ref={gridRef} className={`stagger-children${gridVisible ? ' visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
                        <div ref={pastRef} className={`stagger-children${pastVisible ? ' visible' : ''}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

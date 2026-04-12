import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

const Hero = () => {
    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {
        const fetchLatestEvent = () => {
            const allEvents = getEvents();
            const today = new Date().toISOString().split('T')[0];
            const upcoming = allEvents
                .filter(event => event.date >= today)
                .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            if (upcoming.length > 0) setLatestEvent(upcoming[0]);
        };
        fetchLatestEvent();
        window.addEventListener('storage-update', fetchLatestEvent);
        return () => window.removeEventListener('storage-update', fetchLatestEvent);
    }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
    };

    return (
        <section style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background image */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${import.meta.env.BASE_URL}images/hero_party.png)`,
                backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0, filter: 'blur(3px)', transform: 'scale(1.02)',
            }} />
            {/* Dark overlay for text readability */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 100%)',
                zIndex: 1,
            }} />

            <div className="container" style={{ zIndex: 2, textAlign: 'center', color: '#fff', padding: '100px 20px 60px', maxWidth: '900px', width: '100%' }}>
                <div className="animate-fade-in">
                    {/* Functional main copy */}
                    <p style={{
                        fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', letterSpacing: '0.15em',
                        color: 'var(--color-secondary)', marginBottom: '1rem', fontWeight: 'bold',
                    }}>
                        東京で毎月開催 | お酒 × 企画の交流イベント
                    </p>

                    <div style={{ marginBottom: '1.2rem' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}images/S__2351117_0.jpg`}
                            alt="楽SAKEターミナル"
                            style={{
                                height: 'clamp(80px, 15vw, 140px)', width: 'auto', borderRadius: '16px',
                            }}
                        />
                    </div>

                    <p className="delay-200 animate-slide-right" style={{
                        fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: '500',
                        marginBottom: '2.5rem', lineHeight: 1.8, opacity: 0.9,
                    }}>
                        一人参加OK・20〜30代中心<br />
                        お酒好きが集まる、ちょっと特別な交流の場
                    </p>
                </div>

                {/* Next event card OR LINE registration CTA */}
                <div className="delay-300 animate-fade-in" style={{ maxWidth: '520px', margin: '0 auto' }}>
                    {latestEvent ? (
                        <div style={{
                            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
                            borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                <span style={{
                                    background: '#ff4d4d', color: '#fff', padding: '4px 14px',
                                    borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem',
                                }}>NEXT EVENT</span>
                                <span style={{ fontSize: '0.9rem', color: '#fff', opacity: 0.9 }}>{formatDate(latestEvent.date)}</span>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', lineHeight: 1.4, color: '#fff' }}>{latestEvent.title}</h3>
                            {latestEvent.summary && (
                                <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.2rem', lineHeight: 1.6 }}>{latestEvent.summary}</p>
                            )}
                            {latestEvent.venue && (
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1rem' }}>
                                    📍 {latestEvent.venue}
                                    {latestEvent.fee && ` | 💰 ${latestEvent.fee}`}
                                </p>
                            )}
                            {latestEvent.remainingSeats != null && (
                                <p style={{ fontSize: '0.85rem', color: '#ff6b6b', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    🔥 残り{latestEvent.remainingSeats}席
                                </p>
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Link to={`/events/${latestEvent.id}`} className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', boxSizing: 'border-box' }}>
                                    申し込む
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
                            borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.12)',
                            textAlign: 'center',
                        }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                次回イベントは準備中です
                            </p>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '1.5rem' }}>
                                LINE登録で最速告知を受け取れます
                            </p>
                            <a
                                href={LINE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '14px 32px', background: '#06C755', color: '#fff',
                                    borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem',
                                    textDecoration: 'none', transition: 'all 0.3s',
                                    boxShadow: '0 4px 15px rgba(6,199,85,0.3)',
                                }}
                                onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                                </svg>
                                LINE登録で最速告知
                            </a>
                        </div>
                    )}
                </div>

                {/* Scroll down indicator */}
                <div className="delay-500 animate-fade-in" style={{ marginTop: '3rem', opacity: 0.5 }}>
                    <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                        ▼ SCROLL
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

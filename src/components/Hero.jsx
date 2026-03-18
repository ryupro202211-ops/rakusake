import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';
import '../styles/hero.css';

const Hero = () => {
    const [latestEvent, setLatestEvent] = useState(null);

    useEffect(() => {
        const fetchLatestEvent = () => {
            const allEvents = getEvents();
            const today = new Date().toISOString().split('T')[0];

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

    const defaultBgImage = `${import.meta.env.BASE_URL}images/hero_party.png`;
    const bgImage = latestEvent?.image || defaultBgImage;

    return (
        <section className="hero">
            <div className="hero__bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
            <div className="hero__overlay"></div>

            <div className="container hero__content">
                <div className="animate-fade-in">
                    {latestEvent ? (
                        <>
                            <div className="animate-slide-down hero__slide-down">
                                <span className="hero__date-badge">NEXT EVENT: {latestEvent.date}</span>
                            </div>
                            <h1 className="hero__title">
                                {latestEvent.title}
                            </h1>
                            <span className="hero__subtitle delay-200 animate-slide-right">
                                {latestEvent.summary}
                            </span>
                            <div className="delay-500 animate-fade-in hero__cta">
                                <Link to={`/events/${latestEvent.id}`} className="btn-primary hero__btn-shadow">
                                    詳細を見る
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="hero__title">
                                美味い酒を<br />
                                片手に語り合おう
                            </h1>
                            <span className="hero__subtitle delay-200 animate-slide-right">
                                みんなで楽しむ、最高の一杯と新しい出会い！
                            </span>
                            <div className="delay-500 animate-fade-in hero__cta">
                                <a href="#events" className="btn-primary hero__btn-shadow">
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

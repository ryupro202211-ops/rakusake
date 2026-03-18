import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';
import '../styles/events.css';

const EventCard = ({ id, title, date, description, summary, isPast = false, image }) => (
    <Link to={`/events/${id}`} className="event-card-link">
        <div className="event-card">
            {image && (
                <div className="event-card__image-wrapper">
                    <img src={image} alt={title} className="event-card__image"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </div>
            )}
            <div className="event-card__body">
                <div className="event-card__header">
                    <span className={`event-card__badge ${isPast ? 'event-card__badge--past' : 'event-card__badge--upcoming'}`}>
                        {isPast ? 'PAST' : 'UPCOMING'}
                    </span>
                    <span className="event-card__date">{date}</span>
                </div>

                <h3 className="event-card__title">{title}</h3>
                <p className="event-card__summary">
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
            const today = new Date().toISOString().split('T')[0];

            const upcoming = [];
            const past = [];

            allEvents.forEach(event => {
                if (!event.date) return;

                if (event.date >= today) {
                    upcoming.push(event);
                } else {
                    past.push(event);
                }
            });

            upcoming.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            past.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

            setUpcomingEvents(upcoming);
            setPastEvents(past);
        };

        fetchEvents();
        window.addEventListener('storage-update', fetchEvents);
        return () => {
            window.removeEventListener('storage-update', fetchEvents);
        };
    }, []);

    return (
        <section id="events" className="section-padding events">
            <div className="container">
                <h2 className="events__heading">EVENTS</h2>

                <div className="events__section">
                    <h3 className="events__subheading">
                        Check Upcoming Events!
                    </h3>
                    {upcomingEvents.length > 0 ? (
                        <div className="events__grid">
                            {upcomingEvents.map(event => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel events__empty">
                            <p className="events__empty-title">
                                現在、とびきり楽しいイベントを企画中！
                            </p>
                            <p className="events__empty-sub">
                                次回の開催をお楽しみに！
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="events__subheading events__subheading--dark">
                        Past Party Archives
                    </h3>
                    <div className="events__grid">
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

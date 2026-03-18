import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../utils/storage';
import { sanitizeHTML } from '../utils/sanitize';
import '../styles/eventDetail.css';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedEvent = getEventById(id);
        if (fetchedEvent) {
            setEvent(fetchedEvent);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="container section-padding">Loading...</div>;

    if (!event) {
        return (
            <div className="container section-padding event-detail__not-found">
                <h2>Event Not Found</h2>
                <p>Could not find the event you are looking for.</p>
                <Link to="/" className="btn-primary event-detail__back-btn">Back to Home</Link>
            </div>
        );
    }

    const heroBackground = event.image
        ? `url(${event.image})`
        : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';

    return (
        <div className="event-detail">
            <div className="event-detail__hero" style={{ background: heroBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="event-detail__hero-overlay"></div>
                <div className="container event-detail__hero-content">
                    <span className="event-detail__date-badge">
                        {event.date}
                    </span>
                    <h1 className="event-detail__title">{event.title}</h1>
                </div>
            </div>

            <div className="container section-padding">
                <div className="glass-panel event-detail__body">
                    <div
                        className="event-detail__description"
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(event.description) }}
                    />
                    <div className="event-detail__footer">
                        <Link to="/" className="btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

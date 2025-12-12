import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../utils/storage';
import '../styles/App.css';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
            <div className="container section-padding" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Event Not Found</h2>
                <p>Could not find the event you are looking for.</p>
                <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            {/* Hero-like Header */}
            <div style={{
                height: '40vh',
                position: 'relative',
                background: event.image ? `url(${event.image})` : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'end'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '3rem', width: '100%' }}>
                    <span style={{
                        background: 'var(--color-primary)',
                        color: '#fff',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        {event.date}
                    </span>
                    <h1 style={{ color: '#fff', fontSize: '3rem', marginTop: '1rem', textShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>{event.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="container section-padding">
                <div className="glass-panel" style={{ background: '#fff' }}>
                    <div
                        style={{ fontSize: '1.2rem', lineHeight: '2', color: 'var(--color-text)', wordWrap: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: event.description }}
                    />

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <Link to="/" className="btn-primary">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

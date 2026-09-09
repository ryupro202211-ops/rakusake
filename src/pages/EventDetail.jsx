import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../utils/storage';
import '../styles/App.css';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setEvent(getEventById(id) || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="editorial-page">
                <div className="container event-detail-inner">
                    <p className="editorial-kicker">LOADING</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="editorial-page">
                <div className="container event-detail-inner">
                    <p className="editorial-kicker">NOT FOUND</p>
                    <div className="event-detail-head">
                        <h1>イベントが見つかりませんでした</h1>
                    </div>
                    <p className="event-detail-meta">
                        受付が終了したか、URLが変わった可能性があります。
                    </p>
                    <div className="event-detail-foot">
                        <Link to="/" className="event-detail-back">← ホームへ戻る</Link>
                    </div>
                </div>
            </div>
        );
    }

    const date = new Date(event.date + 'T00:00:00');
    const image = event.image;
    const imageSrc = image && (/^(data:|https?:)/.test(image) ? image : import.meta.env.BASE_URL + image.replace(/^\//, ''));
    // The apply link lives inside the description HTML, so surface it as a CTA too.
    const applyUrl = (event.description || '').match(/https:\/\/peatix\.com\/event\/\d+[^\s"'<]*/)?.[0];
    const isUpcoming = event.date >= new Date().toISOString().split('T')[0];

    return (
        <div className="editorial-page">
            <div className="container event-detail-inner">
                <p className="editorial-kicker">RAKU SAKE TERMINAL <span>／ {isUpcoming ? 'NEXT EVENT' : 'PAST EVENT'}</span></p>

                <div className="event-detail-head">
                    <div className="event-detail-date">
                        <time dateTime={event.date}>{date.getMonth() + 1}<span>/</span>{date.getDate()}</time>
                        <span>
                            {WEEKDAYS[date.getDay()]}
                            {event.startTime && <><br />{event.startTime}{event.endTime && ' – ' + event.endTime}</>}
                        </span>
                    </div>
                    <h1>{event.title}</h1>
                </div>

                {imageSrc && (
                    <div className="event-detail-art">
                        <img src={imageSrc} alt="" aria-hidden="true" />
                    </div>
                )}

                {(event.venue || event.fee) && (
                    <p className="event-detail-meta">
                        {event.venue}{event.venue && event.fee && ' ｜ '}{event.fee}
                    </p>
                )}

                <article
                    className="event-detail-body"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                />

                <div className="event-detail-foot">
                    <Link to="/" className="event-detail-back">← ホームへ戻る</Link>
                    {isUpcoming && applyUrl && (
                        <a className="ticket-cta" href={applyUrl} target="_blank" rel="noopener noreferrer">
                            申し込む <span aria-hidden="true">↗</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

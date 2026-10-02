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
    const displayDescription = (event.description || '').replace(/<h2>主催<\/h2>[\s\S]*$/i, '');
    const ticketUrl = event.applyUrl || (event.id === 'aki-bbq-2026-09-12'
        ? 'https://peatix.com/sales/event/5193579/tickets'
        : applyUrl);

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

                <div className="event-detail-overview">
                    <p className="event-detail-meta">
                        <strong>開催日時：</strong>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日（{['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}）
                        {event.startTime && ` ${event.startTime}${event.endTime ? '〜' + event.endTime : ''}`}
                        {event.venue && <><br /><strong>会場：</strong>{event.venue}</>}
                        {event.fee && <><br /><strong>参加費：</strong>{event.fee}</>}
                        {event.payment && <><br /><strong>支払い：</strong>{event.payment}</>}
                    </p>
                    {isUpcoming && ticketUrl && (
                        <a className="ticket-cta" href={ticketUrl} target="_blank" rel="noopener noreferrer">
                            Peatixで申し込む <span aria-hidden="true">↗</span>
                        </a>
                    )}
                </div>

                {imageSrc && (
                    <div className="event-detail-art">
                        <img src={imageSrc} alt="" aria-hidden="true" />
                    </div>
                )}

                <article
                    className="event-detail-body"
                    dangerouslySetInnerHTML={{ __html: displayDescription }}
                />

                <div className="event-detail-foot">
                    <Link to="/" className="event-detail-back">← ホームへ戻る</Link>
                    {isUpcoming && ticketUrl && (
                        <a className="ticket-cta" href={ticketUrl} target="_blank" rel="noopener noreferrer">
                            Peatixで申し込む <span aria-hidden="true">↗</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage';
import SeatsBar from './SeatsBar';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

const Hero = () => {
    const [latestEvent, setLatestEvent] = useState(null);
    useEffect(() => {
        const fetchLatestEvent = () => {
            const today = new Date().toISOString().split('T')[0];
            const upcoming = getEvents().filter(event => event.date >= today)
                .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
            setLatestEvent(upcoming[0] || null);
        };
        fetchLatestEvent();
        window.addEventListener('storage-update', fetchLatestEvent);
        return () => window.removeEventListener('storage-update', fetchLatestEvent);
    }, []);
    const date = latestEvent && new Date(latestEvent.date + 'T00:00:00');
    const image = latestEvent?.image;
    const imageSrc = image && (/^(data:|https?:)/.test(image) ? image : import.meta.env.BASE_URL + image.replace(/^\//, ''));

    return (
        <section className="editorial-hero">
            <div className="container hero-layout">
                <div className="hero-story">
                    <p className="editorial-kicker">RAKU SAKE TERMINAL <span>／ TOKYO</span></p>
                    <p className="hero-category">東京で毎月開催｜お酒 × 企画の交流イベント</p>
                    <h1>いつもの休日に、<br /><span>乾杯と、</span><br />新しい出会いを。</h1>
                    <p className="hero-intro">おいしい一杯を片手に、初めましての人と笑い合う。<br className="desktop-break" />次の休日は、楽SAKEで過ごしませんか。</p>
                    <div className="hero-tags"><span>一人参加OK</span><span>20〜30代中心</span><span>毎月ちがう企画</span></div>
                    {latestEvent && <Link className="ticket-cta hero-mobile-cta" to={'/events/' + latestEvent.id}>{date.getMonth() + 1}/{date.getDate()}のイベントに申し込む <span aria-hidden="true">↗</span></Link>}
                    <div className="hero-secondary-links">
                        <a href="#event-photos">イベントの様子を見る <span aria-hidden="true">↗</span></a>
                        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">公式LINE <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
                <div id="next-event" className="hero-feature" style={{ scrollMarginTop: '90px' }}>
                    {latestEvent ? (
                        <article className="next-event-ticket">
                            <div className="ticket-topline"><span>NEXT EVENT</span><span>次の休日の予定</span></div>
                            {imageSrc && <Link className="ticket-art" to={'/events/' + latestEvent.id} tabIndex={-1} aria-hidden="true"><img src={imageSrc} alt="" fetchPriority="high" /></Link>}
                            <div className="ticket-body">
                                <div className="ticket-date"><time dateTime={latestEvent.date}>{date.getMonth() + 1}<span>/</span>{date.getDate()}</time><span>{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()]}<br />{latestEvent.startTime}{latestEvent.endTime && ' – ' + latestEvent.endTime}</span></div>
                                <h2>{latestEvent.title}</h2>
                                {latestEvent.venue && <p className="ticket-venue">{latestEvent.venue}{latestEvent.fee && ' ｜ ' + latestEvent.fee}</p>}
                                <SeatsBar capacity={latestEvent.capacity} remaining={latestEvent.remainingSeats} variant="light" />
                                <Link to={'/events/' + latestEvent.id} className="ticket-cta">申し込む <span aria-hidden="true">↗</span></Link>
                            </div>
                        </article>
                    ) : (
                        <article className="next-event-ticket ticket-empty">
                            <p className="editorial-kicker">SEE YOU NEXT TIME</p>
                            <h2>次の楽しみは、<br />ここから。</h2>
                            <p>新しいイベントが決まったら、公式LINEでお知らせします。</p>
                            <a href={LINE_URL} className="ticket-cta" target="_blank" rel="noopener noreferrer">LINEで開催のお知らせを受け取る <span aria-hidden="true">↗</span></a>
                        </article>
                    )}
                </div>
            </div>
            <div className="container hero-bottom"><span>GOOD DRINKS. GOOD COMPANY.</span><a href="#events">イベントを探す ↓</a></div>
        </section>
    );
};
export default Hero;

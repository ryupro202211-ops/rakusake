import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Atmosphere = () => {
    const [ref, isVisible] = useIntersectionObserver({
        threshold: 0.2,
        triggerOnce: true,
    });

    const sectionStyle = {
        position: 'relative',
        padding: '6rem 0',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #fff, #f9fbfd)',
    };

    const containerStyle = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out',
        maxWidth: '900px', // Slightly wider for text
        margin: '0 auto',
    };

    const titleStyle = {
        fontFamily: 'var(--font-pop)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        marginBottom: '3rem',
        textAlign: 'center',
        color: 'var(--color-primary)',
        textShadow: '2px 2px 0px rgba(0,0,0,0.05)',
    };

    const textBlockStyle = {
        marginBottom: '2.5rem',
        fontSize: '1.1rem',
        lineHeight: '2',
        color: 'var(--color-text)',
        textAlign: 'center', // Centered for atmospheric feel
    };

    const highlightStyle = {
        background: 'linear-gradient(transparent 60%, rgba(255, 191, 105, 0.4) 60%)',
        fontWeight: 'bold',
    };

    return (
        <section id="atmosphere" style={sectionStyle} ref={ref}>
            <div className="container" style={containerStyle}>
                <h2 style={titleStyle}>Our Atmosphere</h2>
                <h3 style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-text-muted)', marginTop: '-2rem' }}>
                    過去の開催の様子
                </h3>

                <div className="glass-panel" style={{ padding: '4rem', background: 'rgba(255,255,255,0.8)' }}>
                    <p style={textBlockStyle}>
                        楽SAKEターミナルは、美味しいお酒を片手に、心と心がつながる出会いを提供する交流イベントを企画・開催しています。<br />
                        SNSやオンラインでのつながりが主流となった今だからこそ、<span style={highlightStyle}>「リアルで人と出会い、語り合う時間」</span>の価値を大切にしています。
                    </p>

                    <p style={textBlockStyle}>
                        イベントには、20代〜30代を中心とした多彩な参加者が集まり、毎回大盛況。<br />
                        「人と話すのが少し不安…」という方もご安心ください。運営スタッフは明るく、初参加の方も自然と打ち解けられる雰囲気づくりのプロフェッショナル。<span style={highlightStyle}>1人参加でも、すぐに仲良くなれる仕掛け</span>がたくさんあります。もちろんお友達との参加も大歓迎です！
                    </p>

                    <p style={textBlockStyle}>
                        お酒を通して、初対面の人とも自然に笑い合える。そんな温かく楽しい時間を、あなたも一緒に体験しませんか？<br />
                        仲間を増やしたい方、新しい刺激を求めている方、日常にちょっとしたスパイスがほしい方にぴったりのイベントです。
                    </p>
                </div>

                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'var(--color-accent)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    filter: 'blur(40px)',
                    zIndex: -1
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '150px',
                    height: '150px',
                    background: 'var(--color-primary)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    filter: 'blur(50px)',
                    zIndex: -1
                }}></div>
            </div>
        </section>
    );
};

export default Atmosphere;

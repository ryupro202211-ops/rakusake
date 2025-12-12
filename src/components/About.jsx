import React, { useEffect, useRef, useState } from 'react';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
    };

    const textContainerStyle = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out',
        background: '#fff',
        borderRadius: '30px',
        padding: '3rem',
        boxShadow: '0 15px 35px rgba(255, 159, 28, 0.1)',
        border: '3px solid #fff',
    };

    // Background decoration
    const bgDecorationStyle = {
        position: 'absolute',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        filter: 'blur(30px)',
        opacity: 0.6,
        zIndex: 0,
    };

    return (
        <section id="about" className="section-padding" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Pop Blobs */}
            <div style={{ ...bgDecorationStyle, top: '10%', right: '-5%', width: '300px', height: '300px', background: '#ffeaa7', animation: 'float 8s infinite' }}></div>
            <div style={{ ...bgDecorationStyle, bottom: '10%', left: '-5%', width: '400px', height: '400px', background: '#81ecec', animation: 'float 10s infinite reverse' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ width: '100%', textAlign: 'center' }}>CONCEPT</h2>

                <div style={gridStyle}>
                    <div style={textContainerStyle}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                            お酒で、ひらく！<br />みんなの心！
                        </h3>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
                            楽SAKEターミナルは、美味しいお酒をきっかけに、人と人とが自然につながる"場づくり"を大切にしています。
                        </p>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
                            ただ飲むだけじゃもったいない！<br />
                            出会い・対話・笑顔が生まれる空間で、「また会いたい！」「楽しかった！」と思える瞬間を一緒に作りましょう。
                        </p>
                    </div>

                    <div
                        style={{
                            ...textContainerStyle,
                            transitionDelay: '0.2s',
                            background: 'linear-gradient(135deg, #fff 0%, #fffbf0 100%)',
                            border: '2px solid var(--color-primary)'
                        }}
                    >
                        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            日本酒、ワイン、クラフトビール、ハイボール、カクテル...<br />
                            好きなお酒を片手に、新しい仲間と乾杯！
                        </p>
                        <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
                            お酒の好みが違っても大丈夫。コンセプトは「誰でも気軽に、つながれる」。
                            毎回新しいテーマで、ワクワクする出会いをお届けします！
                        </p>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: 'var(--color-accent)',
                            textAlign: 'center',
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'rgba(46, 196, 182, 0.1)',
                            borderRadius: '15px'
                        }}>
                            “ただの飲み会”じゃない、<br />最高の交流体験を！🍻
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

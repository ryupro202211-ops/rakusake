import React, { useState, useEffect, useRef } from 'react';

const stats = [
    { value: 20, suffix: '回+', label: '累計開催回数', icon: '🎉' },
    { value: 400, suffix: '名+', label: '累計参加者数', icon: '👥' },
    { value: 60, suffix: '%', label: '一人参加率', icon: '🙋' },
];

const AnimatedNumber = ({ target, suffix, isVisible }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 1500;
        const step = Math.ceil(target / (duration / 30));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 30);
        return () => clearInterval(timer);
    }, [isVisible, target]);
    return <span>{count}{suffix}</span>;
};

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return (
        <section ref={ref} style={{
            padding: '5rem 0',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(255,159,28,0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(46,196,182,0.1), transparent 50%)',
            }} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '2rem', textAlign: 'center',
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '20px',
                            padding: '2rem 1.5rem',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                            <p style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-pop)', lineHeight: 1.2 }}>
                                <AnimatedNumber target={s.value} suffix={s.suffix} isVisible={isVisible} />
                            </p>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;

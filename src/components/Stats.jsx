import React, { useState, useEffect, useRef } from 'react';

const stats = [
    { value: 20, suffix: '回+', label: '累計開催回数' },
    { value: 400, suffix: '名+', label: '累計参加者数' },
    { value: 60, suffix: '%', label: '一人参加率' },
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
            padding: '4rem 0',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '2rem', textAlign: 'center',
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                            transition: `all 0.5s ease-out ${i * 0.2}s`,
                        }}>
                            <p style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-pop)', lineHeight: 1.2 }}>
                                <AnimatedNumber target={s.value} suffix={s.suffix} isVisible={isVisible} />
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.5rem', fontWeight: 'bold' }}>
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

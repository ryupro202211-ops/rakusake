import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const items = [
    {
        icon: '👤',
        title: '一人参加OK',
        desc: '参加者の約60%が一人参加。スタッフが会話のきっかけを作るので安心です。',
    },
    {
        icon: '🎂',
        title: '20〜30代が中心',
        desc: '同年代の仲間と出会える場。もちろん他の年代も歓迎です。',
    },
    {
        icon: '👕',
        title: '服装自由',
        desc: 'カジュアルでOK。仕事帰りにそのまま参加する方も多いです。',
    },
    {
        icon: '🍺',
        title: '当日の流れ',
        desc: '受付→乾杯→フリートーク＆企画タイム。約2時間です。',
    },
];

const FirstTimer = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="first-timer" className="section-padding" ref={ref} style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                <h2 style={{ width: '100%', textAlign: 'center' }}>初めての方へ</h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem', marginTop: '-0.5rem', fontSize: '1.05rem' }}>
                    初参加でも安心して楽しめるポイント
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1.5rem',
                }}>
                    {items.map((item, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: '20px', padding: '2rem',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                            border: '1px solid #f0f0f0',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease-out ${i * 0.1}s`,
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.8rem', color: 'var(--color-primary)' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a href="#events" className="btn-primary">
                        イベントを見る
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FirstTimer;

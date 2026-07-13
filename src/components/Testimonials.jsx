import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const testimonials = [
    {
        text: '一人で参加しましたが、スタッフの方が自然に話しかけてくれて、気づいたら友達が3人もできてました！',
        name: 'Kさん',
        detail: '20代女性・初参加',
        emoji: '✨',
    },
    {
        text: '企画が毎回違うので飽きない。前回はBBQ、今回は流しそうめん。次も楽しみです。',
        name: 'Tさん',
        detail: '30代男性・リピーター',
        emoji: '🔥',
    },
    {
        text: '人見知りで不安でしたが、同じテーブルの人とお酒の話で盛り上がって最後まで居ちゃいました（笑）',
        name: 'Mさん',
        detail: '20代男性・初参加',
        emoji: '😊',
    },
];

const Testimonials = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="testimonials" className="section-padding" ref={ref} style={{ background: '#fff' }}>
            <div className="container">
                <h2 style={{ width: '100%', textAlign: 'center' }}>参加者の声</h2>

                <div className={`stagger-children${isVisible ? ' visible' : ''}`} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem', marginTop: '2rem',
                }}>
                    {testimonials.map((t, i) => (
                        <div key={i} style={{
                            background: '#fff', borderRadius: 'var(--radius-lg)', padding: '2rem',
                            border: 'none', position: 'relative',
                            boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,159,28,0.12)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)'; }}
                        >
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.4rem', marginBottom: '1rem',
                            }}>{t.emoji}</div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
                                {t.text}
                            </p>
                            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-primary)',
                                }}>{t.name[0]}</div>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--color-text)', margin: 0 }}>{t.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>{t.detail}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

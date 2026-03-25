import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const testimonials = [
    {
        text: '一人で参加しましたが、スタッフの方が自然に話しかけてくれて、気づいたら友達が3人もできてました！',
        name: 'Kさん',
        detail: '20代女性・初参加',
    },
    {
        text: '企画が毎回違うので飽きない。前回はBBQ、今回は流しそうめん。次も楽しみです。',
        name: 'Tさん',
        detail: '30代男性・リピーター',
    },
    {
        text: '人見知りで不安でしたが、同じテーブルの人とお酒の話で盛り上がって最後まで居ちゃいました（笑）',
        name: 'Mさん',
        detail: '20代男性・初参加',
    },
];

const Testimonials = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

    return (
        <section id="testimonials" className="section-padding" ref={ref} style={{ background: '#fff' }}>
            <div className="container">
                <h2 style={{ width: '100%', textAlign: 'center' }}>参加者の声</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem', marginTop: '2rem',
                }}>
                    {testimonials.map((t, i) => (
                        <div key={i} style={{
                            background: '#fafafa', borderRadius: '20px', padding: '2rem',
                            border: '1px solid #f0f0f0', position: 'relative',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.6s ease-out ${i * 0.15}s`,
                        }}>
                            <div style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>"</div>
                            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text)', marginBottom: '1.2rem' }}>
                                {t.text}
                            </p>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-text)' }}>{t.name}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

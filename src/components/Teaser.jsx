import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

// ▼ 次回予告の内容はここを編集してください（未確定イベントのティザー）
const TEASER = {
    enabled: true,
    month: '8月',
    hint: '夏祭り',
    emoji: '🏮',
    message: '浴衣で屋台で縁日で…？夏の夜を彩る「夏祭り」企画を準備中。詳細は近日解禁！',
};

const Teaser = ({ embedded = false }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

    if (!TEASER.enabled) return null;

    return (
        <section ref={ref} style={{ padding: embedded ? '0' : '80px 0', background: embedded ? 'transparent' : '#fff' }}>
            <div className="container" style={{ maxWidth: '760px', padding: embedded ? 0 : undefined }}>
                <div style={{
                    position: 'relative', overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', textAlign: 'center',
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
                    color: '#fff',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                    {/* Decorative glow */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle at 50% 0%, rgba(255,159,28,0.2), transparent 60%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{
                            display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold',
                            letterSpacing: '0.15em', color: '#ffcf6b', marginBottom: '1rem',
                            border: '1px solid rgba(255,207,107,0.4)', borderRadius: '20px', padding: '4px 16px',
                        }}>COMING SOON</span>

                        <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem', filter: 'blur(1px)', opacity: 0.9 }}>{TEASER.emoji}</div>

                        <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: '1rem', display: 'block' }}>
                            {TEASER.month}の予告：？？？？
                        </h2>

                        <p style={{ fontSize: '1rem', lineHeight: 1.9, opacity: 0.85, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                            {TEASER.message}
                        </p>

                        <div style={{
                            display: 'inline-flex', gap: '0.5rem', marginBottom: '2rem',
                            fontSize: '0.9rem', color: '#ffcf6b', fontWeight: 'bold',
                        }}>
                            <span>ヒント</span>
                            <span style={{ letterSpacing: '0.3em' }}>「{TEASER.hint}」</span>
                        </div>

                        <div>
                            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '13px 30px', background: '#06C755', color: '#fff',
                                borderRadius: '50px', fontWeight: 'bold', fontSize: '0.95rem',
                                textDecoration: 'none', boxShadow: '0 4px 15px rgba(6,199,85,0.3)',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                                </svg>
                                LINEで解禁通知を受け取る
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teaser;

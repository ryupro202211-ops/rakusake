import React from 'react';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

const Footer = () => {
    return (
        <footer style={{ padding: '0', background: '#fff', marginTop: 'auto' }}>
            {/* CTA Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                padding: '5rem 0', textAlign: 'center', color: '#fff',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 30% 40%, rgba(255,159,28,0.12), transparent 60%), radial-gradient(circle at 70% 60%, rgba(46,196,182,0.08), transparent 60%)',
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: '1rem', color: '#fff', fontWeight: '800' }}>次回のイベントに参加しませんか？</h3>
                    <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2rem' }}>一人参加OK・20〜30代中心・お酒好きが集まる交流イベント</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#events" className="btn-primary">イベントを見る</a>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '16px 32px', background: '#06C755', color: '#fff',
                                borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem',
                                textDecoration: 'none', transition: 'all 0.4s',
                                boxShadow: '0 4px 20px rgba(6,199,85,0.3)',
                            }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 30px rgba(6,199,85,0.5)'; }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(6,199,85,0.3)'; }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                            </svg>
                            LINE登録
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer links */}
            <div style={{ padding: '3rem 0 2rem', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ margin: '0 0 1.5rem' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}images/logo_e.png`}
                            alt="楽SAKEターミナル"
                            style={{ height: '50px', width: 'auto', borderRadius: '10px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <a href="#about" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', transition: 'color 0.3s' }}>コンセプト</a>
                        <a href="#events" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', transition: 'color 0.3s' }}>イベント一覧</a>
                        <a href="#first-timer" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: '600', transition: 'color 0.3s' }}>初めての方へ</a>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <a
                            href="https://www.instagram.com/raku_sake_terminal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: '44px', height: '44px', borderRadius: '50%',
                                background: '#f0f0f0', color: '#E1306C', textDecoration: 'none',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#E1306C'; }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: '44px', height: '44px', borderRadius: '50%',
                                background: '#f0f0f0', color: '#06C755', textDecoration: 'none',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#06C755'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#06C755'; }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                            </svg>
                        </a>
                    </div>

                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                        <p style={{ fontSize: '0.75rem', color: '#aaa' }}>
                            &copy; {new Date().getFullYear()} 楽SAKEターミナル All rights reserved.
                        </p>
                        <p style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '0.3rem' }}>
                            運営：<a href="https://ryupro202211-ops.github.io/ryupro/" target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', textDecoration: 'none' }}>合同会社ryupro</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

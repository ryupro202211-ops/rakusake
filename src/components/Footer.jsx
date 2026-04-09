import React from 'react';

const LINE_URL = 'https://line.me/R/ti/p/@667fodcp';

const Footer = () => {
    return (
        <footer style={{ padding: '0', background: '#fff', borderTop: '1px solid #eee', marginTop: 'auto' }}>
            {/* CTA Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
                padding: '3rem 0', textAlign: 'center', color: '#fff',
            }}>
                <div className="container">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: '#fff' }}>次回のイベントに参加しませんか？</h3>
                    <p style={{ opacity: 0.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>一人参加OK・20〜30代中心・お酒好きが集まる交流イベント</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#events" className="btn-primary">イベントを見る</a>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                padding: '14px 28px', background: '#06C755', color: '#fff',
                                borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem',
                                textDecoration: 'none', transition: 'all 0.3s',
                            }}
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
            <div style={{ padding: '2.5rem 0' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ margin: '0 0 1.2rem' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}images/S__2351117_0.jpg`}
                            alt="楽SAKEターミナル"
                            style={{ height: '60px', width: 'auto', borderRadius: '10px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <a href="#about" style={{ margin: '0 12px', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: 'bold' }}>コンセプト</a>
                        <a href="#events" style={{ margin: '0 12px', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: 'bold' }}>イベント一覧</a>
                        <a href="#first-timer" style={{ margin: '0 12px', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: 'bold' }}>初めての方へ</a>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <a
                            href="https://www.instagram.com/raku_sake_terminal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E1306C', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Instagram
                        </a>
                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06C755', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 5.81 2 10.5c0 2.89 1.87 5.42 4.68 6.89-.16.57-.59 2.07-.67 2.39-.11.42.15.41.32.3.13-.09 2.09-1.38 2.94-1.94.89.13 1.81.2 2.73.2 5.52 0 10-3.81 10-8.5S17.52 2 12 2z"/>
                            </svg>
                            LINE公式
                        </a>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#888' }}>
                        &copy; {new Date().getFullYear()} 楽SAKEターミナル All rights reserved.
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#bbb', marginTop: '0.5rem' }}>
                        運営：<a href="https://ryupro202211-ops.github.io/ryupro/" target="_blank" rel="noopener noreferrer" style={{ color: '#bbb', textDecoration: 'none' }}>合同会社ryupro</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

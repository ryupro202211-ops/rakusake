import React from 'react';

// Visualizes remaining seats as a filling progress bar.
// `capacity` = total seats, `remaining` = seats still open.
const SeatsBar = ({ capacity, remaining, variant = 'dark' }) => {
    if (capacity == null || remaining == null) return null;

    const taken = Math.max(0, capacity - remaining);
    const pct = Math.min(100, Math.round((taken / capacity) * 100));
    const almostFull = remaining <= Math.max(3, capacity * 0.2);

    const isLight = variant === 'light';
    const trackBg = isLight ? '#f0f0f0' : 'rgba(255,255,255,0.15)';
    const textColor = isLight ? 'var(--color-text)' : '#fff';

    const barColor = almostFull
        ? 'linear-gradient(90deg, #ff4d4d, #ff7676)'
        : 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))';

    return (
        <div style={{ margin: '0 0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: almostFull ? '#ff6b6b' : textColor }}>
                    {almostFull ? '🔥 残りわずか！' : '📊 予約状況'}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: textColor }}>
                    残り{remaining}席 / {capacity}席
                </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: trackBg, borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                    width: `${pct}%`, height: '100%', background: barColor,
                    borderRadius: '10px', transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
            </div>
        </div>
    );
};

export default SeatsBar;

import React, { useState, useEffect } from 'react';

// Computes the time remaining until a target date/time.
const getRemaining = (target) => {
    const diff = target - new Date();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
    };
};

const pad = (n) => String(n).padStart(2, '0');

// `date` = "YYYY-MM-DD", `time` = "HH:MM" (optional, defaults to 00:00)
const Countdown = ({ date, time = '00:00', variant = 'dark' }) => {
    const target = new Date(`${date}T${time}:00`);
    const [remaining, setRemaining] = useState(() => getRemaining(target));

    useEffect(() => {
        const timer = setInterval(() => {
            const r = getRemaining(target);
            setRemaining(r);
            if (!r) clearInterval(timer);
        }, 1000);
        return () => clearInterval(timer);
    }, [date, time]);

    if (!remaining) return null;

    const isLight = variant === 'light';
    const boxBg = isLight ? 'rgba(255,159,28,0.12)' : 'rgba(255,255,255,0.12)';
    const numColor = isLight ? 'var(--color-primary)' : '#fff';
    const labelColor = isLight ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.7)';

    const units = [
        { value: remaining.days, label: 'DAYS' },
        { value: pad(remaining.hours), label: 'HOURS' },
        { value: pad(remaining.minutes), label: 'MIN' },
        { value: pad(remaining.seconds), label: 'SEC' },
    ];

    return (
        <div style={{ margin: '0 0 1.2rem' }}>
            <p style={{
                fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.1em',
                color: isLight ? 'var(--color-primary)' : '#ffcf6b', marginBottom: '0.5rem',
            }}>
                ⏰ 開催まであと
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {units.map((u, i) => (
                    <div key={i} style={{
                        flex: 1, textAlign: 'center', background: boxBg,
                        borderRadius: '12px', padding: '0.6rem 0.2rem',
                        border: isLight ? '1px solid rgba(255,159,28,0.2)' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <div style={{
                            fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: '800',
                            color: numColor, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums',
                        }}>{u.value}</div>
                        <div style={{ fontSize: '0.6rem', color: labelColor, fontWeight: 'bold', letterSpacing: '0.05em', marginTop: '2px' }}>{u.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Countdown;

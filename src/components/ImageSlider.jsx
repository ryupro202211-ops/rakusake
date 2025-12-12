import React from 'react';

const ImageSlider = () => {
    // Images array
    const images = [
        '/images/real_fireworks.jpg',
        '/images/real_bbq.jpg',
        '/images/real_party.jpg',
        '/images/slider1.png',
        '/images/slider2.png',
        '/images/slider3.png',
        '/images/slider4.png',
    ];

    const sliderContainerStyle = {
        width: '100%',
        overflow: 'hidden',
        background: '#fff',
        padding: '3rem 0',
        position: 'relative'
    };

    const trackStyle = {
        display: 'flex',
        width: 'calc(300px * 14)', // 300px * (7 images * 2 sets)
        animation: 'scroll 60s linear infinite',
    };

    const slideStyle = {
        width: '300px',
        padding: '0 15px',
        flexShrink: 0,
    };

    const imgStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        filter: 'blur(1px)',
    };

    return (
        <section style={sliderContainerStyle}>
            {/* Title similar to other sections */}
            <h3 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-pop)',
                fontSize: '1.5rem'
            }}>
                Party Vibes 📸
            </h3>

            <div style={trackStyle}>
                {/* First set of images */}
                {images.map((img, index) => (
                    <div style={slideStyle} key={`slide-1-${index}`}>
                        <img src={img} alt={`Slide ${index}`} style={imgStyle} />
                    </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {images.map((img, index) => (
                    <div style={slideStyle} key={`slide-2-${index}`}>
                        <img src={img} alt={`Slide ${index}`} style={imgStyle} />
                    </div>
                ))}
            </div>

            <style>
                {`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-300px * 7)); }
                }
                `}
            </style>
        </section>
    );
};

export default ImageSlider;

import React from 'react';

const ImageSlider = () => {
    // Images array
    const images = [
        `${import.meta.env.BASE_URL}images/real_fireworks.jpg`,
        `${import.meta.env.BASE_URL}images/real_bbq.jpg`,
        `${import.meta.env.BASE_URL}images/real_party.jpg`,
        `${import.meta.env.BASE_URL}images/slider1.jpeg`,
        `${import.meta.env.BASE_URL}images/slider2.jpg`,
        `${import.meta.env.BASE_URL}images/slider3.jpg`,
        `${import.meta.env.BASE_URL}images/slider4.jpg`,
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

    // Scattered polaroid tilt, repeated across both loop sets
    const TILTS = [-3, 2.2, -1.4, 3, -2.4, 1.6, -0.8];

    const imgStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        filter: 'blur(1.5px)',
    };

    return (
        <section id="event-photos" style={sliderContainerStyle}>
            {/* Title similar to other sections */}
            <div className="container editorial-heading"><div><p className="editorial-kicker">02 / MOMENTS</p><h2>気づけば、一緒に笑ってる。</h2></div><p>イベントの様子</p></div>

            <div className="slider-track" style={trackStyle}>
                {/* First set of images */}
                {images.map((img, index) => (
                    <div style={slideStyle} key={`slide-1-${index}`}>
                        <figure className="polaroid" style={{ '--tilt': `${TILTS[index]}deg` }}>
                            <img src={img} alt={`Slide ${index}`} style={imgStyle} loading="lazy" decoding="async" />
                        </figure>
                    </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {images.map((img, index) => (
                    <div style={slideStyle} key={`slide-2-${index}`}>
                        <figure className="polaroid" style={{ '--tilt': `${TILTS[index]}deg` }}>
                            <img src={img} alt={`Slide ${index}`} style={imgStyle} loading="lazy" decoding="async" />
                        </figure>
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

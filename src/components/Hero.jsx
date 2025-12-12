import React from 'react';

const Hero = () => {
    const heroStyle = {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        // Parallax effect
        backgroundAttachment: 'fixed',
    };

    const bgImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${import.meta.env.BASE_URL}images/hero_party.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // Warm, exciting gradient overlay
        background: 'linear-gradient(135deg, rgba(255, 159, 28, 0.4), rgba(46, 196, 182, 0.4))',
        zIndex: 1,
        backdropFilter: 'blur(2px)',
    };

    const contentStyle = {
        zIndex: 2,
        textAlign: 'center',
        color: '#fff',
        padding: '0 20px',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    };

    const titleStyle = {
        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
        marginBottom: '20px',
        lineHeight: 1.1,
        fontFamily: 'var(--font-pop)',
        fontWeight: '800',
    };

    const subtitleStyle = {
        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
        fontWeight: 'bold',
        marginBottom: '40px',
        display: 'block',
    };

    // Pop decorative bubbles
    const bubbleStyle = {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        border: '2px solid rgba(255,255,255,0.4)',
        zIndex: 1,
        animation: 'float 6s ease-in-out infinite',
    };

    return (
        <section style={heroStyle}>
            <div style={bgImageStyle}></div>
            <div style={overlayStyle}></div>

            {/* Decorative Bubbles */}
            <div style={{ ...bubbleStyle, width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }}></div>
            <div style={{ ...bubbleStyle, width: '80px', height: '80px', top: '15%', left: '15%', animationDelay: '2s' }}></div>
            <div style={{ ...bubbleStyle, width: '200px', height: '200px', bottom: '15%', right: '10%', animationDelay: '1s' }}></div>
            <div style={{ ...bubbleStyle, width: '100px', height: '100px', bottom: '25%', right: '20%', animationDelay: '3s' }}></div>

            <div className="container" style={contentStyle}>
                <div className="animate-fade-in">
                    <h1 style={titleStyle}>
                        美味い酒を<br />
                        片手に語り合おう
                    </h1>
                    <span style={subtitleStyle} className="delay-200 animate-slide-right">
                        みんなで楽しむ、最高の一杯と新しい出会い！
                    </span>
                    <div className="delay-500 animate-fade-in" style={{ marginTop: '2rem' }}>
                        <a href="#events" className="btn-primary" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                            Check Events!
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import React from 'react';
import '../styles/imageSlider.css';

const ImageSlider = () => {
    const images = [
        `${import.meta.env.BASE_URL}images/real_fireworks.jpg`,
        `${import.meta.env.BASE_URL}images/real_bbq.jpg`,
        `${import.meta.env.BASE_URL}images/real_party.jpg`,
        `${import.meta.env.BASE_URL}images/slider1.jpeg`,
        `${import.meta.env.BASE_URL}images/slider2.jpg`,
        `${import.meta.env.BASE_URL}images/slider3.jpg`,
        `${import.meta.env.BASE_URL}images/slider4.jpg`,
    ];

    return (
        <section className="slider">
            <h3 className="slider__title">Party Vibes</h3>

            <div className="slider__track">
                {images.map((img, index) => (
                    <div className="slider__slide" key={`slide-1-${index}`}>
                        <img src={img} alt={`Slide ${index}`} className="slider__image" />
                    </div>
                ))}
                {images.map((img, index) => (
                    <div className="slider__slide" key={`slide-2-${index}`}>
                        <img src={img} alt={`Slide ${index}`} className="slider__image" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImageSlider;

import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import FirstTimer from '../components/FirstTimer';
import Events from '../components/Events';
import Atmosphere from '../components/Atmosphere';
import ImageSlider from '../components/ImageSlider';
import { seedInitialData } from '../utils/storage';

const Home = () => {
    useEffect(() => {
        seedInitialData();
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const timer = setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <Hero />
            <Stats />
            <Testimonials />
            <About />
            <FirstTimer />
            <Events />
            <Atmosphere />
            <ImageSlider />
        </>
    );
};

export default Home;

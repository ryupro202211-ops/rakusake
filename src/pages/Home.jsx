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
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
    useEffect(() => {
        seedInitialData();
    }, []);

    useScrollReveal();

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
            <div className="scroll-reveal"><Stats /></div>
            <div className="scroll-reveal"><Testimonials /></div>
            <div className="scroll-reveal"><About /></div>
            <div className="scroll-reveal"><FirstTimer /></div>
            <div className="scroll-reveal"><Events /></div>
            <div className="scroll-reveal"><Atmosphere /></div>
            <div className="scroll-reveal"><ImageSlider /></div>
        </>
    );
};

export default Home;

import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Atmosphere from '../components/Atmosphere';
import Events from '../components/Events';
import ImageSlider from '../components/ImageSlider';
import { seedInitialData } from '../utils/storage';

const Home = () => {
    useEffect(() => {
        // Initialize sample data on first load
        seedInitialData();
    }, []);

    return (
        <>
            <Hero />
            <About />
            <Events />
            <Atmosphere />
            <ImageSlider />
        </>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import ServicesOverview from '../sections/ServicesOverview';
import ApproachSection from '../sections/ApproachScrtion';
import EventsSection from '../sections/EventsSection';
import TestimonialsSection from '../sections/Testimonial';
import CTASection from '../sections/CTASection';
import Preload from '../components/Preload';


export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user has visited before in this session
        const hasVisited = sessionStorage.getItem('hasVisitedHome');

        if (hasVisited) {
            // Skip preloader for subsequent visits
            setIsLoading(false);
        } else {
            // Show preloader for first visit
            const timer = setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('hasVisitedHome', 'true');
            }, 2000); // Adjust timing as needed

            return () => clearTimeout(timer);
        }
    }, []);

    if (isLoading) {
        return <Preload />;
    }

    return (
        <div>
            <HeroSection />
            <StatsSection />
            <ServicesOverview />
            <ApproachSection />
            <EventsSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
};

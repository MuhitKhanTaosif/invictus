import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesOverview from '../components/home/ServicesOverview';
import ApproachSection from '../components/home/ApproachSection';
import EventsSection from '../components/home/EventsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const HomePageContainer = styled.div`
  /* No padding-top needed with floating header */
`;

import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';


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
        return <Preloader />;
    }


    return (
        <HomePageContainer>
            <HeroSection />
            <StatsSection />
            <ServicesOverview />
            <ApproachSection />
            <EventsSection />
            <TestimonialsSection />
            <CTASection />
        </HomePageContainer>
    );
};

import React, { useState, useEffect, useRef } from 'react';
import CarRow from './CarRow';
import carsData from './data.jsx';
import { Container, Button, Box } from '@mui/material';

const TopRecommendCa = () => {
  const [showAllTopCars, setShowAllTopCars] = useState(false);
  const [showAllRecommendedCars, setShowAllRecommendedCars] = useState(false);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);

  const topCarsRef = useRef();
  const recommendedCarsRef = useRef();

  const simulateLoading = (callback) => {
    setTimeout(callback, 2000); // Simulate a 2-second loading delay
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === topCarsRef.current) {
            simulateLoading(() => {
              setIsLoadingTop(false);
              observer.unobserve(topCarsRef.current);
            });
          }
          if (entry.target === recommendedCarsRef.current) {
            simulateLoading(() => {
              setIsLoadingRecommended(false);
              observer.unobserve(recommendedCarsRef.current);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (topCarsRef.current) observer.observe(topCarsRef.current);
    if (recommendedCarsRef.current) observer.observe(recommendedCarsRef.current);

    return () => {
      if (topCarsRef.current) observer.unobserve(topCarsRef.current);
      if (recommendedCarsRef.current) observer.unobserve(recommendedCarsRef.current);
    };
  }, []);

  const topCars = showAllTopCars
    ? carsData.filter((car) => car.isTop)
    : carsData.filter((car) => car.isTop).slice(0, 4);

  const recommendedCars = showAllRecommendedCars
    ? carsData.filter((car) => car.isRecommended)
    : carsData.filter((car) => car.isRecommended).slice(0, 4);

  return (
    <Container>
      <div ref={topCarsRef}>
        <CarRow rowTitle="Top Cars" data={topCars} isLoading={isLoadingTop} />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAllTopCars((prev) => !prev)}
          >
            {showAllTopCars ? 'Show Less' : 'View More'}
          </Button>
        </Box>
      </div>

      <div ref={recommendedCarsRef}>
        <CarRow rowTitle="Recommended Cars" data={recommendedCars} isLoading={isLoadingRecommended} />
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAllRecommendedCars((prev) => !prev)}
          >
            {showAllRecommendedCars ? 'Show Less' : 'View More'}
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default TopRecommendCa;

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import CarRentalForm from '../components/CarRentalForm';
import { carsAPI } from '../Api/cars';

const RentCarPage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const carData = await carsAPI.getCarById(carId);
        setCar(carData);
        setError(null);
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    // Get car from location state or fetch from API
    if (location.state?.car) {
      setCar(location.state.car);
      setLoading(false);
    } else {
      fetchCar();
    }
  }, [carId, location.state]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography>Loading car details...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <Typography>Car not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 2,
            backgroundColor: '#f9f9f9'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Rent {car.make} {car.model}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={car.imageUrl}
                alt={car.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{car.make} {car.model}</Typography>
              <Typography variant="body2" color="textSecondary">
                {car.description}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Price:</strong> ${car.price}/day
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Year:</strong> {car.year}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Color:</strong> {car.color}
              </Typography>
            </Box>
          </Box>

          <CarRentalForm car={car} />
        </Paper>
      </Container>
    </motion.div>
  );
};

export default RentCarPage;

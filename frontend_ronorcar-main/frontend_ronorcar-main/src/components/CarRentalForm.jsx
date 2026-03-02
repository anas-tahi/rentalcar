import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { bookingsAPI } from '../Api/bookings';
import { AuthContext } from '../Context/authContext';

const CarRentalForm = ({ car }) => {
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    carId: car.id,
    userId: currentUser?.id || '',
    startDate: dayjs().add(1, 'day'),
    endDate: dayjs().add(2, 'day'),
    totalAmount: car.price * 2 // Simple calculation: 2 days rental
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Please login to rent a car');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const booking = await bookingsAPI.createBooking({
        ...formData,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString()
      });
      
      // Redirect to payment options page
      const bookingData = {
        carId: car.id,
        userId: currentUser?.id || '',
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        totalAmount: calculateTotal(),
        pickupLocation: 'Default Location', // You might want to add location selection
        car: car
      };
      
      navigate(`/payment-options?data=${encodeURIComponent(JSON.stringify(bookingData))}`);
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const days = formData.endDate.diff(formData.startDate, 'day');
    return Math.max(1, days) * car.price;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 600,
            mx: 'auto',
            mt: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Rent {car.make} {car.model}
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(newValue) => setFormData(prev => ({ ...prev, startDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDate={dayjs()}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => setFormData(prev => ({ ...prev, endDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDate={formData.startDate.add(1, 'day')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  value={`$${calculateTotal()}`}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </LocalizationProvider>
  );
};

export default CarRentalForm;

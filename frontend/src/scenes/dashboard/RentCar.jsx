import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { carsAPI } from '../../Api/cars';

// Spanish cities for pickup locations
const spanishCities = [
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Bilbao',
  'Málaga',
  'Murcia',
  'Palma de Mallorca',
  'Las Palmas',
  'Zaragoza',
  'Alicante',
  'Valladolid',
  'Córdoba',
  'Vigo',
  'Gijón',
  'Hospitalet de Llobregat',
  'La Coruña',
  'Vitoria-Gasteiz',
  'Elche',
  'Santa Cruz de Tenerife'
];

const RentCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    pickupCity: '',
    startDate: dayjs().add(1, 'day'),
    endDate: dayjs().add(3, 'day'),
    carType: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await carsAPI.getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = async () => {
    if (!searchParams.pickupCity || !searchParams.carType) {
      alert('Please select a pickup city and car type');
      return;
    }

    setSearchLoading(true);
    try {
      const allCars = await carsAPI.getAllCars();
      let filteredCars = allCars;

      // Filter by car type if selected
      if (searchParams.carType) {
        filteredCars = filteredCars.filter(car => 
          car.make.toLowerCase().includes(searchParams.carType.toLowerCase()) ||
          car.model.toLowerCase().includes(searchParams.carType.toLowerCase())
        );
      }

      setSearchResults(filteredCars);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching cars:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRentCar = (car) => {
    console.log('Renting car:', car);
    console.log('Search params:', searchParams);
    
    const bookingData = {
      carId: car.id,
      userId: 'current-user-id', // This should come from auth context
      startDate: searchParams.startDate.toISOString(),
      endDate: searchParams.endDate.toISOString(),
      totalAmount: car.price * searchParams.endDate.diff(searchParams.startDate, 'day'),
      pickupLocation: searchParams.pickupCity,
      car: car
    };

    console.log('Booking data to pass:', bookingData);

    // Navigate to payment options page
    window.location.href = `/payment-options?data=${encodeURIComponent(JSON.stringify(bookingData))}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Rent a Car
          </Typography>

          {/* Search Form */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Search for Your Perfect Car
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Pickup City</InputLabel>
                  <Select
                    value={searchParams.pickupCity}
                    label="Pickup City"
                    onChange={(e) => setSearchParams(prev => ({ ...prev, pickupCity: e.target.value }))}
                  >
                    <MenuItem value="">
                      <em>Select a city</em>
                    </MenuItem>
                    {spanishCities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={searchParams.startDate}
                  onChange={(newValue) => setSearchParams(prev => ({ ...prev, startDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={dayjs()}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={searchParams.endDate}
                  onChange={(newValue) => setSearchParams(prev => ({ ...prev, endDate: newValue }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={searchParams.startDate.add(1, 'day')}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  label="Car Type"
                  value={searchParams.carType}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, carType: e.target.value }))}
                  placeholder="e.g., Toyota, BMW"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  disabled={searchLoading}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {searchLoading ? <CircularProgress size={24} color="inherit" /> : 'Search Cars'}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Search Results */}
          {showResults && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Cars ({searchResults.length})
              </Typography>
              
              <Grid container spacing={3}>
                {searchResults.map((car) => (
                  <Grid item xs={12} sm={6} md={4} key={car.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={car.imageUrl}
                        alt={car.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {car.make} {car.model}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {car.description}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${car.price}/day
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Chip label={car.color} size="small" sx={{ mr: 1 }} />
                          <Chip label={`${car.year}`} size="small" sx={{ mr: 1 }} />
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleRentCar(car)}
                        >
                          Rent Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Quick Browse */}
          {!showResults && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Or Browse All Cars
              </Typography>
              <Grid container spacing={3}>
                {cars.slice(0, 6).map((car) => (
                  <Grid item xs={12} sm={6} md={4} key={car.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={car.imageUrl}
                        alt={car.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {car.make} {car.model}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {car.description}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${car.price}/day
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleRentCar(car)}
                        >
                          Rent Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </motion.div>
    </LocalizationProvider>
  );
};

export default RentCar;

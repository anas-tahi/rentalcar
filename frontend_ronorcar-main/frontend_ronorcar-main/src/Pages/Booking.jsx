import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../Context/authContext';
import { bookingsAPI } from '../Api/bookings';
import { carsAPI } from '../Api/cars';
import { generateInvoicePDF } from '../utils/invoiceGenerator';
import { 
  Card, 
  Button, 
  Select, 
  DatePicker, 
  TimePicker, 
  Space, 
  Typography, 
  Divider,
  Row,
  Col,
  message,
  Spin
} from 'antd';
import { 
  CarOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../dist/styles.css';

const { Title, Text } = Typography;
const { Option } = Select;

const spanishCities = [
  'Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 
  'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Zaragoza',
  'Alicante', 'Cordoba', 'Valladolid', 'Vigo', 'Gijon'
];

const carTypes = [
  { value: 'sedan', label: 'Sedan', icon: '🚗' },
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'sports', label: 'Sports', icon: '🏎️' },
  { value: 'luxury', label: 'Luxury', icon: '🚘' },
  { value: 'electric', label: 'Electric', icon: '🔋' }
];

const Booking = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    city: '',
    date: null,
    time: null,
    carType: '',
    duration: 1
  });

  const [bookingData, setBookingData] = useState(null);

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchCars();
  }, [currentUser, navigate]);

  const fetchCars = async () => {
    try {
      const allCars = await carsAPI.getAllCars();
      setCars(allCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      message.error('Failed to load cars');
    }
  };

  const handleCityChange = (value) => {
    setFormData(prev => ({ ...prev, city: value }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData(prev => ({ ...prev, date: dateString }));
  };

  const handleTimeChange = (time, timeString) => {
    setFormData(prev => ({ ...prev, time: timeString }));
  };

  const handleCarTypeChange = (value) => {
    setFormData(prev => ({ ...prev, carType: value }));
  };

  const handleDurationChange = (value) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleSearchCars = () => {
    if (!formData.city || !formData.date || !formData.time) {
      message.error('Please fill in all required fields');
      return;
    }

    // Filter cars based on type if selected
    let filteredCars = cars;
    if (formData.carType) {
      filteredCars = cars.filter(car => car.type === formData.carType);
    }

    if (filteredCars.length === 0) {
      message.info('No cars available for your criteria');
      return;
    }

    // Show available cars
    setCars(filteredCars);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    
    // Calculate total amount
    const totalAmount = car.price * formData.duration;
    
    setBookingData({
      car,
      ...formData,
      totalAmount,
      startDate: `${formData.date} ${formData.time}`,
      endDate: calculateEndDate(formData.date, formData.time, formData.duration)
    });
  };

  const calculateEndDate = (startDate, startTime, duration) => {
    const start = new Date(`${startDate} ${startTime}`);
    const end = new Date(start.getTime() + (duration * 24 * 60 * 60 * 1000));
    return end.toISOString();
  };

  const handlePaymentMethod = async (method) => {
    if (!selectedCar || !bookingData) {
      message.error('Please select a car first');
      return;
    }

    setLoading(true);
    try {
      // Create booking
      const booking = await bookingsAPI.createBooking({
        carId: selectedCar.id,
        userId: currentUser.id || currentUser._id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalAmount: bookingData.totalAmount,
        pickupLocation: bookingData.city,
        paymentMethod: method
      });

      // Generate PDF invoice
      const invoiceData = {
        ...bookingData,
        bookingId: booking.id,
        paymentMethod: method,
        customer: {
          name: currentUser.firstName || currentUser.username,
          email: currentUser.email
        }
      };

      await generateInvoicePDF(invoiceData, method);

      if (method === 'online') {
        // Simulate online payment
        setTimeout(() => {
          setSuccess(true);
          setShowPayment(false);
          setLoading(false);
          message.success('Payment successful! Booking confirmed.');
        }, 2000);
      } else {
        // Agency payment
        setSuccess(true);
        setShowPayment(false);
        setLoading(false);
        message.success('Booking confirmed! Please pay at the agency.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      message.error('Failed to create booking');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
              <Title level={2} className="text-green-600">Booking Confirmed!</Title>
              <Text className="text-gray-600 mb-6 block">
                Your car rental has been successfully booked. Check your email for the invoice.
              </Text>
              <div className="space-y-3">
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  onClick={() => navigate('/dashboard/user/booked')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  View My Bookings
                </Button>
                <Button 
                  size="large" 
                  block
                  onClick={() => navigate('/')}
                  className="border-gray-300"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={1} className="text-center mb-8 text-blue-800">
              <CarOutlined className="mr-2" />
              Book Your Car
            </Title>

            {!showPayment ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Search Form */}
                <Card className="shadow-lg rounded-xl">
                  <Title level={3} className="text-blue-700 mb-6">
                    <EnvironmentOutlined className="mr-2" />
                    Search Options
                  </Title>
                  
                  <Space direction="vertical" size="large" className="w-full">
                    <div>
                      <Text strong className="text-gray-700">City *</Text>
                      <Select
                        placeholder="Select a city"
                        value={formData.city}
                        onChange={handleCityChange}
                        className="w-full mt-2"
                        size="large"
                      >
                        {spanishCities.map(city => (
                          <Option key={city} value={city}>{city}</Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Text strong className="text-gray-700">Date *</Text>
                      <DatePicker
                        placeholder="Select date"
                        onChange={handleDateChange}
                        className="w-full mt-2"
                        size="large"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <Text strong className="text-gray-700">Time *</Text>
                      <TimePicker
                        placeholder="Select time"
                        onChange={handleTimeChange}
                        className="w-full mt-2"
                        size="large"
                        style={{ width: '100%' }}
                        format="HH:mm"
                      />
                    </div>

                    <div>
                      <Text strong className="text-gray-700">Car Type (Optional)</Text>
                      <Select
                        placeholder="Select car type"
                        value={formData.carType}
                        onChange={handleCarTypeChange}
                        className="w-full mt-2"
                        size="large"
                      >
                        {carTypes.map(type => (
                          <Option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Text strong className="text-gray-700">Duration (days)</Text>
                      <Select
                        placeholder="Select duration"
                        value={formData.duration}
                        onChange={handleDurationChange}
                        className="w-full mt-2"
                        size="large"
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map(day => (
                          <Option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</Option>
                        ))}
                      </Select>
                    </div>

                    <Button
                      type="primary"
                      size="large"
                      onClick={handleSearchCars}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      icon={<CarOutlined />}
                    >
                      Search Cars
                    </Button>
                  </Space>
                </Card>

                {/* Available Cars */}
                <Card className="shadow-lg rounded-xl">
                  <Title level={3} className="text-blue-700 mb-6">
                    <CarOutlined className="mr-2" />
                    Available Cars
                  </Title>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cars.length > 0 ? (
                      cars.map(car => (
                        <Card
                          key={car.id}
                          size="small"
                          className={`cursor-pointer transition-all ${
                            selectedCar?.id === car.id ? 'border-blue-500 shadow-md' : 'hover:border-blue-300'
                          }`}
                          onClick={() => handleSelectCar(car)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <Text strong className="text-blue-700">
                                {car.make} {car.model}
                              </Text>
                              <div className="text-gray-600 text-sm">
                                ${car.price}/day • {car.year}
                              </div>
                            </div>
                            <div className="text-right">
                              <Text className="text-green-600 font-bold">
                                ${car.price * formData.duration}
                              </Text>
                              <div className="text-xs text-gray-500">
                                Total for {formData.duration} days
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CarOutlined className="text-4xl mb-2" />
                        <p>No cars available. Please adjust your search criteria.</p>
                      </div>
                    )}
                  </div>

                  {selectedCar && (
                    <div className="mt-6 pt-4 border-t">
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-green-600 hover:bg-green-700"
                        icon={<DollarCircleOutlined />}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            ) : (
              /* Payment Options */
              <Card className="shadow-lg rounded-xl max-w-2xl mx-auto">
                <Title level={3} className="text-blue-700 mb-6">
                  <DollarCircleOutlined className="mr-2" />
                  Choose Payment Method
                </Title>

                {bookingData && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <Title level={5} className="text-gray-700 mb-3">Booking Summary</Title>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Text strong>Car:</Text> {bookingData.car.make} {bookingData.car.model}
                      </div>
                      <div>
                        <Text strong>City:</Text> {bookingData.city}
                      </div>
                      <div>
                        <Text strong>Date:</Text> {bookingData.date}
                      </div>
                      <div>
                        <Text strong>Time:</Text> {bookingData.time}
                      </div>
                      <div>
                        <Text strong>Duration:</Text> {bookingData.duration} days
                      </div>
                      <div>
                        <Text strong>Total:</Text> <span className="text-green-600 font-bold">${bookingData.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    size="large"
                    onClick={() => handlePaymentMethod('online')}
                    loading={loading}
                    className="h-24 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
                  >
                    <DollarCircleOutlined className="text-2xl mb-2" />
                    <span>Pay Online</span>
                    <span className="text-xs opacity-75">Secure payment</span>
                  </Button>

                  <Button
                    size="large"
                    onClick={() => handlePaymentMethod('agency')}
                    loading={loading}
                    className="h-24 flex flex-col items-center justify-center border-2 border-gray-300 hover:border-green-500"
                  >
                    <EnvironmentOutlined className="text-2xl mb-2" />
                    <span>Pay at Agency</span>
                    <span className="text-xs opacity-75">Pay on arrival</span>
                  </Button>
                </div>

                <Button
                  onClick={() => setShowPayment(false)}
                  className="mt-6"
                  type="text"
                >
                  ← Back to Search
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;

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
  Spin,
  Input,
  Slider,
  Tag,
  Rate,
  Badge
} from 'antd';
import { 
  CarOutlined, 
  EnvironmentOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarCircleOutlined,
  SearchOutlined,
  HeartOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../dist/styles.css';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const spanishCities = [
  'Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 
  'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Zaragoza',
  'Alicante', 'Cordoba', 'Valladolid', 'Vigo', 'Gijon',
  'Hospitalet de Llobregat', 'La Coruña', 'Vitoria-Gasteiz', 
  'Elche', 'Santa Cruz de Tenerife'
];

const carTypes = [
  { value: 'sedan', label: 'Sedan', icon: '🚗', description: 'Comfortable and economical' },
  { value: 'suv', label: 'SUV', icon: '🚙', description: 'Spacious and versatile' },
  { value: 'sports', label: 'Sports', icon: '🏎️', description: 'High performance' },
  { value: 'luxury', label: 'Luxury', icon: '🚘', description: 'Premium experience' },
  { value: 'electric', label: 'Electric', icon: '🔋', description: 'Eco-friendly' },
  { value: 'convertible', label: 'Convertible', icon: '🚗', description: 'Open-top driving' },
  { value: 'van', label: 'Van', icon: '🚐', description: 'Extra space' },
  { value: 'hybrid', label: 'Hybrid', icon: '🔋', description: 'Fuel efficient' }
];

const priceRanges = [
  { label: 'Budget ($0-50)', min: 0, max: 50 },
  { label: 'Standard ($50-100)', min: 50, max: 100 },
  { label: 'Premium ($100-200)', min: 100, max: 200 },
  { label: 'Luxury ($200+)', min: 200, max: 1000 }
];

const UnifiedBooking = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    city: '',
    startDate: dayjs().add(1, 'day'),
    endDate: dayjs().add(3, 'day'),
    startTime: '10:00',
    endTime: '10:00',
    carType: '',
    priceRange: [0, 500],
    transmission: '',
    fuel: '',
    seats: '',
    searchTerm: ''
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
      setFilteredCars(allCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      message.error('Failed to load cars');
    }
  };

  const handleSearch = async () => {
    if (!searchForm.city) {
      message.error('Please select a pickup city');
      return;
    }

    setSearchLoading(true);
    try {
      let results = [...cars];

      // Get existing bookings to check availability
      const existingBookings = await bookingsAPI.getAllBookings();
      console.log('Existing bookings:', existingBookings);

      // Filter out cars that are already booked for the selected dates
      const startDate = searchForm.startDate.format('YYYY-MM-DD');
      const endDate = searchForm.endDate.format('YYYY-MM-DD');
      
      results = results.filter(car => {
        const conflictingBookings = existingBookings.filter(booking => 
          booking.carId === car.id && 
          booking.status !== 'cancelled' &&
          new Date(booking.startDate) <= new Date(endDate) &&
          new Date(booking.endDate) >= new Date(startDate)
        );
        
        return conflictingBookings.length === 0;
      });

      // Filter by car type
      if (searchForm.carType) {
        results = results.filter(car => 
          car.type === searchForm.carType ||
          car.make.toLowerCase().includes(searchForm.carType.toLowerCase()) ||
          car.model.toLowerCase().includes(searchForm.carType.toLowerCase())
        );
      }

      // Filter by price range
      results = results.filter(car => 
        car.price >= searchForm.priceRange[0] && 
        car.price <= searchForm.priceRange[1]
      );

      // Filter by transmission
      if (searchForm.transmission) {
        results = results.filter(car => car.transmission === searchForm.transmission);
      }

      // Filter by fuel type
      if (searchForm.fuel) {
        results = results.filter(car => car.fuelType === searchForm.fuel);
      }

      // Filter by seats
      if (searchForm.seats) {
        results = results.filter(car => car.seats >= parseInt(searchForm.seats));
      }

      // Filter by search term
      if (searchForm.searchTerm) {
        const term = searchForm.searchTerm.toLowerCase();
        results = results.filter(car =>
          car.make.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term) ||
          car.description?.toLowerCase().includes(term)
        );
      }

      setFilteredCars(results);
      setShowResults(true);
      
      if (results.length === 0) {
        message.warning('No cars available for the selected dates. Try different dates or filters.');
      } else {
        message.success(`Found ${results.length} available cars matching your criteria`);
      }
    } catch (error) {
      console.error('Error searching cars:', error);
      message.error('Failed to search cars');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setShowPayment(true);
    
    // Calculate total amount
    const days = searchForm.endDate.diff(searchForm.startDate, 'day');
    const totalAmount = car.price * days;
    
    setBookingData({
      car,
      ...searchForm,
      totalAmount,
      duration: days,
      startDate: searchForm.startDate.format('YYYY-MM-DD'),
      endDate: searchForm.endDate.format('YYYY-MM-DD'),
      startTime: searchForm.startTime,
      endTime: searchForm.endTime
    });
  };

  const handlePaymentMethod = async (method) => {
    if (!selectedCar || !bookingData) {
      message.error('Please select a car first');
      return;
    }

    setLoading(true);
    try {
      // Create booking with proper date format
      const bookingPayload = {
        carId: selectedCar.id,
        userId: currentUser.id || currentUser._id,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        totalAmount: bookingData.totalAmount,
        pickupLocation: bookingData.city,
        paymentMethod: method
      };

      console.log('Creating booking with payload:', bookingPayload);

      const booking = await bookingsAPI.createBooking(bookingPayload);
      console.log('Booking created successfully:', booking);

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
      
      // Handle specific booking conflicts
      if (error.response?.data?.error === 'Car is already booked for these dates') {
        message.error('This car is already booked for the selected dates. Please choose different dates or another car.');
      } else {
        message.error(error.response?.data?.error || 'Failed to create booking');
      }
      setLoading(false);
    }
  };

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const shareCar = (car) => {
    const shareText = `Check out this ${car.make} ${car.model} - $${car.price}/day`;
    if (navigator.share) {
      navigator.share({
        title: `${car.make} ${car.model}`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      message.success('Car details copied to clipboard!');
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
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title level={1} className="text-center mb-8 text-blue-800">
              <CarOutlined className="mr-2" />
              Find Your Perfect Car
            </Title>

            {/* Search Section */}
            <Card className="shadow-lg rounded-xl mb-8">
              <Title level={3} className="text-blue-700 mb-6">
                <SearchOutlined className="mr-2" />
                Search Options
              </Title>
              
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Pickup City *</Text>
                    <Select
                      placeholder="Select city"
                      value={searchForm.city}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, city: value }))}
                      className="w-full mt-2"
                      size="large"
                      showSearch
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {spanishCities.map(city => (
                        <Option key={city} value={city}>
                          <EnvironmentOutlined className="mr-1" />
                          {city}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Pickup Date</Text>
                    <DatePicker
                      value={searchForm.startDate}
                      onChange={(date) => setSearchForm(prev => ({ ...prev, startDate: date }))}
                      className="w-full mt-2"
                      size="large"
                      disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Return Date</Text>
                    <DatePicker
                      value={searchForm.endDate}
                      onChange={(date) => setSearchForm(prev => ({ ...prev, endDate: date }))}
                      className="w-full mt-2"
                      size="large"
                      disabledDate={(current) => current && current < searchForm.startDate}
                    />
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Pickup Time</Text>
                    <Select
                      value={searchForm.startTime}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, startTime: value }))}
                      className="w-full mt-2"
                      size="large"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                        <Option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {hour.toString().padStart(2, '0')}:00
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Car Type</Text>
                    <Select
                      placeholder="Any type"
                      value={searchForm.carType}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, carType: value }))}
                      className="w-full mt-2"
                      size="large"
                      allowClear
                    >
                      {carTypes.map(type => (
                        <Option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Price Range: ${searchForm.priceRange[0]} - ${searchForm.priceRange[1]}</Text>
                    <Slider
                      range
                      min={0}
                      max={500}
                      value={searchForm.priceRange}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, priceRange: value }))}
                      className="mt-2"
                    />
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Transmission</Text>
                    <Select
                      placeholder="Any"
                      value={searchForm.transmission}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, transmission: value }))}
                      className="w-full mt-2"
                      size="large"
                      allowClear
                    >
                      <Option value="automatic">Automatic</Option>
                      <Option value="manual">Manual</Option>
                    </Select>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={6}>
                  <div>
                    <Text strong className="text-gray-700">Fuel Type</Text>
                    <Select
                      placeholder="Any"
                      value={searchForm.fuel}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, fuel: value }))}
                      className="w-full mt-2"
                      size="large"
                      allowClear
                    >
                      <Option value="petrol">Petrol</Option>
                      <Option value="diesel">Diesel</Option>
                      <Option value="electric">Electric</Option>
                      <Option value="hybrid">Hybrid</Option>
                    </Select>
                  </div>
                </Col>

                <Col xs={24} sm={12} md={12}>
                  <div>
                    <Text strong className="text-gray-700">Search Cars</Text>
                    <Search
                      placeholder="Search by make, model, or features..."
                      value={searchForm.searchTerm}
                      onChange={(e) => setSearchForm(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full mt-2"
                      size="large"
                      allowClear
                    />
                  </div>
                </Col>

                <Col xs={24} sm={12} md={12}>
                  <div>
                    <Text strong className="text-gray-700">Min Seats</Text>
                    <Select
                      placeholder="Any"
                      value={searchForm.seats}
                      onChange={(value) => setSearchForm(prev => ({ ...prev, seats: value }))}
                      className="w-full mt-2"
                      size="large"
                      allowClear
                    >
                      <Option value="2">2+ seats</Option>
                      <Option value="4">4+ seats</Option>
                      <Option value="5">5+ seats</Option>
                      <Option value="7">7+ seats</Option>
                      <Option value="8">8+ seats</Option>
                    </Select>
                  </div>
                </Col>
              </Row>

              <div className="mt-6 flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSearch}
                  loading={searchLoading}
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  icon={<SearchOutlined />}
                >
                  Search Cars
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {showResults && (
              <Card className="shadow-lg rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <Title level={3} className="text-blue-700 mb-0">
                    <CarOutlined className="mr-2" />
                    Available Cars ({filteredCars.length})
                  </Title>
                  <div className="flex gap-2">
                    <Tag color="blue">{searchForm.city}</Tag>
                    <Tag color="green">
                      {searchForm.startDate.format('MMM DD')} - {searchForm.endDate.format('MMM DD')}
                    </Tag>
                    <Tag color="orange">
                      {searchForm.endDate.diff(searchForm.startDate, 'day')} days
                    </Tag>
                  </div>
                </div>
                
                <Row gutter={[16, 16]}>
                  {filteredCars.map(car => (
                    <Col key={car.id} xs={24} sm={12} lg={8} xl={6}>
                      <Card
                        className={`h-full cursor-pointer transition-all duration-300 ${
                          selectedCar?.id === car.id ? 'border-blue-500 shadow-lg' : 'hover:border-blue-300 hover:shadow-md'
                        }`}
                        onClick={() => handleSelectCar(car)}
                        cover={
                          <div className="relative">
                            <img
                              alt={car.name}
                              src={car.imageUrl || '/placeholder-car.jpg'}
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                size="small"
                                icon={<HeartOutlined />}
                                className={favorites.includes(car.id) ? 'text-red-500' : ''}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(car.id);
                                }}
                              />
                              <Button
                                size="small"
                                icon={<ShareAltOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shareCar(car);
                                }}
                              />
                            </div>
                            {car.isTop && (
                              <Badge.Ribbon text="TOP" color="gold" />
                            )}
                          </div>
                        }
                        actions={[
                          <Button
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectCar(car);
                            }}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Select Car
                          </Button>
                        ]}
                      >
                        <Card.Meta
                          title={
                            <div className="flex justify-between items-start">
                              <span className="text-blue-700 font-bold">
                                {car.make} {car.model}
                              </span>
                              <div className="text-right">
                                <div className="text-green-600 font-bold text-lg">
                                  ${car.price}
                                </div>
                                <div className="text-xs text-gray-500">/day</div>
                              </div>
                            </div>
                          }
                          description={
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Year:</span>
                                <span>{car.year}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Color:</span>
                                <span>{car.color}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Transmission:</span>
                                <span>{car.transmission || 'Automatic'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Fuel:</span>
                                <span>{car.fuelType || 'Petrol'}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Seats:</span>
                                <span>{car.seats || '5'}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-2">
                                <Rate disabled defaultValue={4} className="text-xs" />
                                <span className="text-xs text-gray-500">(4.5)</span>
                              </div>
                              <Paragraph className="text-xs text-gray-600 mb-0">
                                {car.description || 'Comfortable and reliable vehicle for your journey.'}
                              </Paragraph>
                            </div>
                          }
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>

                {filteredCars.length === 0 && (
                  <div className="text-center py-12">
                    <CarOutlined className="text-6xl text-gray-300 mb-4" />
                    <Title level={4} className="text-gray-500">No cars found</Title>
                    <Text className="text-gray-400">
                      Try adjusting your search criteria to find available cars.
                    </Text>
                  </div>
                )}
              </Card>
            )}

            {/* Selected Car & Payment */}
            {selectedCar && bookingData && showPayment && (
              <Card className="shadow-lg rounded-xl mt-8">
                <Title level={3} className="text-blue-700 mb-6">
                  <CheckCircleOutlined className="mr-2" />
                  Booking Summary
                </Title>

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Title level={5} className="text-gray-700 mb-4">Selected Car</Title>
                      <div className="flex gap-4">
                        <img
                          src={selectedCar.imageUrl || '/placeholder-car.jpg'}
                          alt={selectedCar.name}
                          style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                        />
                        <div>
                          <Text strong className="text-blue-700 text-lg">
                            {selectedCar.make} {selectedCar.model}
                          </Text>
                          <div className="text-gray-600 text-sm">
                            {selectedCar.year} • {selectedCar.color} • {selectedCar.transmission || 'Automatic'}
                          </div>
                          <div className="text-green-600 font-bold">
                            ${selectedCar.price}/day
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Title level={5} className="text-gray-700 mb-4">Rental Details</Title>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Pickup Location:</span>
                          <span className="font-medium">{bookingData.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pickup Date:</span>
                          <span className="font-medium">{bookingData.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return Date:</span>
                          <span className="font-medium">{bookingData.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pickup Time:</span>
                          <span className="font-medium">{bookingData.startTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{bookingData.duration} days</span>
                        </div>
                        <Divider />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Amount:</span>
                          <span className="text-green-600">${bookingData.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="mt-6">
                  <Title level={5} className="text-blue-700 mb-4">Choose Payment Method</Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Button
                        size="large"
                        onClick={() => handlePaymentMethod('online')}
                        loading={loading}
                        className="w-full h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700"
                      >
                        <DollarCircleOutlined className="text-2xl mb-1" />
                        <span>Pay Online</span>
                        <span className="text-xs opacity-75">Secure payment</span>
                      </Button>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        size="large"
                        onClick={() => handlePaymentMethod('agency')}
                        loading={loading}
                        className="w-full h-20 flex flex-col items-center justify-center border-2 border-gray-300 hover:border-green-500"
                      >
                        <EnvironmentOutlined className="text-2xl mb-1" />
                        <span>Pay at Agency</span>
                        <span className="text-xs opacity-75">Pay on arrival</span>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnifiedBooking;

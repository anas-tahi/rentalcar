import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import { bookingsAPI } from '../Api/bookings';
import { AuthContext } from '../Context/authContext';
import { generateInvoicePDF } from '../utils/invoiceGenerator';

const PaymentOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  React.useEffect(() => {
    // Parse booking data from URL
    const params = new URLSearchParams(location.search);
    const data = params.get('data');
    if (data) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        setBookingData(parsedData);
      } catch (err) {
        setError('Invalid booking data');
      }
    } else {
      setError('No booking data found');
    }
  }, [location.search]);

  const handlePayment = async () => {
    if (!currentUser) {
      setError('Please login to continue');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    console.log('=== PAYMENT DEBUG ===');
    console.log('Current user:', currentUser);
    console.log('Booking data:', bookingData);
    console.log('Payment method:', paymentMethod);

    try {
      // Test with hardcoded data first
      const testBooking = {
        carId: 'car_001',
        userId: 'user_123',
        startDate: '2026-03-03T00:00:00.000Z',
        endDate: '2026-03-05T00:00:00.000Z',
        totalAmount: 450
      };

      console.log('Testing with hardcoded data:', testBooking);

      // Try the hardcoded booking first
      const testResponse = await bookingsAPI.createBooking(testBooking);
      console.log('Test booking response:', testResponse);

      // If test works, try with real data
      if (testResponse) {
        const bookingPayload = {
          carId: bookingData.carId,
          userId: currentUser.id || currentUser._id || 'user_123',
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          totalAmount: bookingData.totalAmount
        };

        console.log('Sending real booking payload:', bookingPayload);
        const response = await bookingsAPI.createBooking(bookingPayload);
        console.log('Real booking response:', response);

        setBookingId(response.id);

        const invoiceFileName = await generateInvoicePDF(bookingData, paymentMethod);
        console.log('Invoice generated:', invoiceFileName);
        setInvoiceGenerated(true);
        
        if (paymentMethod === 'online') {
          setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        } else {
          setSuccess(true);
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('=== BOOKING ERROR ===');
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      
      setError(err.response?.data?.error || err.message || 'Failed to create booking');
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (bookingData) {
      try {
        await generateInvoicePDF(bookingData, paymentMethod);
      } catch (error) {
        console.error('Error generating invoice:', error);
      }
    }
  };

  if (error && !bookingData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!bookingData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 text-lg mb-6">Your car rental has been successfully booked.</p>
            </div>

            {paymentMethod === 'online' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  <span className="font-semibold">✓ Payment completed online.</span> Your booking is confirmed and invoice has been downloaded.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <span className="font-semibold">ℹ Please visit our agency to complete payment.</span> Your booking is reserved for 24 hours and invoice has been downloaded.
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Booking Details:</h3>
              <div className="space-y-2 text-left">
                <p className="text-gray-700"><span className="font-medium">Car:</span> {bookingData.car.make} {bookingData.car.model}</p>
                <p className="text-gray-700"><span className="font-medium">Pickup:</span> {bookingData.pickupLocation}</p>
                <p className="text-gray-700"><span className="font-medium">Start:</span> {new Date(bookingData.startDate).toLocaleDateString()}</p>
                <p className="text-gray-700"><span className="font-medium">End:</span> {new Date(bookingData.endDate).toLocaleDateString()}</p>
                <p className="text-gray-700"><span className="font-medium">Total:</span> <span className="text-xl font-bold text-blue-600">${bookingData.totalAmount}</span></p>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={handleDownloadInvoice}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Invoice
              </button>
              <button
                onClick={() => navigate('/dashboard/user/booked')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                View My Bookings
              </button>
            </div>

            <button
              onClick={() => navigate('/dashboard/user')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Choose Payment Method</h1>

          {/* Booking Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Car:</span> {bookingData.car.make} {bookingData.car.model}</p>
                <p className="text-gray-700"><span className="font-medium">Pickup Location:</span> {bookingData.pickupLocation}</p>
                <p className="text-gray-700"><span className="font-medium">Start Date:</span> {new Date(bookingData.startDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">End Date:</span> {new Date(bookingData.endDate).toLocaleDateString()}</p>
                <p className="text-gray-700"><span className="font-medium">Duration:</span> {Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24))} days</p>
                <p className="text-gray-700"><span className="font-medium">Total Amount:</span> <span className="text-2xl font-bold text-blue-600">${bookingData.totalAmount}</span></p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Select Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4 w-4 h-4 text-blue-600"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Pay Online</h3>
                  <p className="text-gray-600">Secure online payment with credit/debit card</p>
                </div>
              </label>
              
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="agency"
                  checked={paymentMethod === 'agency'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4 w-4 h-4 text-blue-600"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Pay at Agency</h3>
                  <p className="text-gray-600">Visit our rental agency to pay in person</p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'online' && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Online Payment (Simulated)</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-blue-800">This is a simulated payment process for demonstration purposes.</p>
              </div>
              <p className="text-gray-600">In a real application, this would connect to a payment gateway like Stripe or PayPal.</p>
            </div>
          )}

          {paymentMethod === 'agency' && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pay at Agency</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-800">Please visit our agency within 24 hours to complete payment and pick up your car.</p>
              </div>
              <div className="text-gray-700">
                <p className="font-semibold mb-2">Agency Address:</p>
                <p>Car Rental Agency</p>
                <p>123 Main Street</p>
                <p>Madrid, Spain</p>
                <p>Phone: +34 123 456 789</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition duration-200 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : paymentMethod === 'online' ? (
                'Pay Now'
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentOptions;

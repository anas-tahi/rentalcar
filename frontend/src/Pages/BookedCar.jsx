import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Typography, Spin, Space, Button, message, Empty, Tag } from "antd";
import { DeleteOutlined, CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { bookingsAPI } from "../Api/bookings";
import { carsAPI } from "../Api/cars";
import { AuthContext } from "../Context/authContext";
import PropTypes from 'prop-types';

const { Meta } = Card;
const { Text, Title } = Typography;

const BookedCar = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        console.log('Fetching reservations for user:', currentUser.id || currentUser._id);
        
        // Fetch user's reservations
        const userReservations = await bookingsAPI.getBookingsByUserId(currentUser.id || currentUser._id);
        console.log('User reservations:', userReservations);
        
        // Fetch car details for each reservation
        const reservationsWithCars = await Promise.all(
          userReservations.map(async (reservation) => {
            try {
              const car = await carsAPI.getCarById(reservation.carId);
              return {
                ...reservation,
                car: car
              };
            } catch (error) {
              console.error('Error fetching car:', error);
              return {
                ...reservation,
                car: {
                  make: 'Unknown',
                  model: 'Car',
                  price: 0,
                  year: '2024',
                  color: 'N/A',
                  imageUrl: '/placeholder-car.jpg'
                }
              };
            }
          })
        );
        
        setReservations(reservationsWithCars);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        message.error("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser]);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await bookingsAPI.deleteBooking(reservationId);
      setReservations(prev => prev.filter(res => res.id !== reservationId));
      message.success("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      message.error("Failed to delete reservation. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'blue';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">My Reservations</Title>
      
      {reservations.length > 0 ? (
        <Row gutter={[16, 16]}>
          {reservations.map((reservation) => (
            <Col key={reservation.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                className="h-full"
                cover={
                  <img
                    alt={reservation.car?.name || 'Car'}
                    src={reservation.car?.imageUrl || '/placeholder-car.jpg'}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="text"
                    danger
                    onClick={() => handleDeleteReservation(reservation.id)}
                    icon={<DeleteOutlined />}
                  >
                    Cancel
                  </Button>
                ]}
              >
                <Meta
                  title={reservation.car ? `${reservation.car.make} ${reservation.car.model}` : 'Car Details'}
                  description={
                    <div className="space-y-2">
                      {reservation.car && (
                        <>
                          <div className="flex justify-between">
                            <Text strong>Daily Rate:</Text>
                            <Text>${reservation.car.price}/day</Text>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Year:</Text>
                            <Text>{reservation.car.year}</Text>
                          </div>
                          <div className="flex justify-between">
                            <Text strong>Color:</Text>
                            <Text>{reservation.car.color}</Text>
                          </div>
                        </>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarOutlined />
                          <Text strong>Duration:</Text>
                          <Text>
                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <EnvironmentOutlined />
                          <Text strong>Pickup:</Text>
                          <Text>{reservation.pickupLocation || 'Default Location'}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                          <Text strong>Total:</Text>
                          <Text className="text-xl font-bold text-blue-600">
                            ${reservation.totalAmount}
                          </Text>
                        </div>
                        <div className="mt-2">
                          <Tag color={getStatusColor(reservation.status)}>
                            {reservation.status?.toUpperCase() || 'PENDING'}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="No reservations yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="mt-20"
        />
      )}
    </div>
  );
};

export default BookedCar;

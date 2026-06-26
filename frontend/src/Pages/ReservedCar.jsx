import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Spin, Space, Button, message, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "../components/NavBarN";
import { carData } from "./carData";

const { Meta } = Card;

const ReservedCar = () => {
  const [reservedCars, setReservedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservations`);
        const reservations = response.data;

        // Create a map to associate reservations with cars
        const reservedCarsWithDetails = reservations.map(reservation => {
          const carDetails = carData.find(car => car.id === reservation.carId);
          return { ...reservation, ...carDetails };
        });

        setReservedCars(reservedCarsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservedCars(prevCars => prevCars.filter(car => car.reservationId !== reservationId));
      message.success("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      message.error("Failed to delete reservation. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography.Title level={3} style={{ marginBottom: "20px" }}>
          All Reserved Cars
        </Typography.Title>
        {reservedCars.length > 0 ? (
          <Row gutter={[16, 16]}>
{reservedCars.map((car, index) => (
  <Col key={car.id || `car-${index}`} span={8}>
              <Card
                  hoverable
                  cover={
                    <img
                      alt={car.name}
                      src={car.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Space>
                      <Button
                        type="text"
                        danger
                        onClick={() => handleDeleteReservation(car.reservationId)}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    </Space>
                  ]}
                >
                  <Meta title={car.name} description={`Price: $${car.price}`} />
                  <Typography.Paragraph>
                    Number: {car.number}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Reserved by: {car.userName}
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Reservation ID: {car.reservationId}
                  </Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No reserved cars yet" style={{ marginTop: "110px" }} />
        )}
      </div>
    </>
  );
};

export default ReservedCar;

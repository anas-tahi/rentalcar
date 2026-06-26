import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import axios from "axios";

const { Meta } = Card;

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>All Cars</h1>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {cars.map((car) => (
            <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={car.make + " " + car.model} src={car.imageUrl} style={{ height: "200px", objectFit: "cover" }} />}
              >
                <Meta title={`${car.make} ${car.model}`} description={`Price: $${car.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CarsPage;

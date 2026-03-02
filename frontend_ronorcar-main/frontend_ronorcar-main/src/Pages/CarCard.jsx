import React from "react";
import { Card } from "antd";

const CarCard = ({ car }) => {
  return (
    <Card
      hoverable
      cover={<img alt={car.model} src={car.imageUrl} style={{ height: "200px", objectFit: "cover" }} />}
    >
      <Card.Meta title={`${car.make} ${car.model}`} description={car.description} />
      <p className="card-text">Price: ${car.price}</p>
    </Card>
  );
};

export default CarCard;

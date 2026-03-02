import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import car images
import imgMercedesBenzGClass from "../images/Cars/Mercedes-Benz-G-Class.png";
import imgMercedesBenzGLA from "../images/Cars/Mercedes-Benz-GLA.png";
import imgMercedesBenzGLCCoupe from "../images/Cars/Mercedes-Benz-GLC-Coupe.png";
import imgMercedesBenzGLS from "../images/Cars/Mercedes-Benz-GLS.png";
import imgMercedesBenzSClass from "../images/Cars/Mercedes-Benz-S-Class.png";
import imgPorscheCayenne from "../images/Cars/Porsche-Cayenne.png";
import imgPorscheMacanTurboEV from "../images/Cars/Porsche-Macan-Turbo-EV.png";
import imgPorsche911 from "../images/Cars/Porsche-Taycan.png";
import imgAstonMartinDB11 from "../images/Cars/Aston Martin DB11.jpg";
import imgAudiQ7 from "../images/Cars/Audi Q7.jpg";
import imgJeepGrandCherokee from "../images/Cars/jeep grand cherokee.jpg";
import imgJeepWrangler from "../images/Cars/jeep wrangler.jpg";
import imgLandRoverDefender from "../images/Cars/land rover defender.jpg";
import imgLandRoverRangeRover from "../images/Cars/Land Rover range rover.jpg";
import NavLR from "../components/NavLR";

const carImages = {
  "Mercedes-BenzG-Class": imgMercedesBenzGClass,
  "Mercedes-BenzGLA": imgMercedesBenzGLA,
  "Mercedes-BenzGLC Coupe": imgMercedesBenzGLCCoupe,
  "Mercedes-BenzGLS": imgMercedesBenzGLS,
  "Mercedes-BenzS-Class": imgMercedesBenzSClass,
  "PorscheCayenne": imgPorscheCayenne,
  "PorscheMacan Turbo EV": imgPorscheMacanTurboEV,
  "Porsche911": imgPorsche911,
  "Aston MartinDB11": imgAstonMartinDB11,
  "AudiQ7": imgAudiQ7,
  "JeepGrand Cherokee": imgJeepGrandCherokee,
  "JeepWrangler": imgJeepWrangler,
  "Land RoverDefender": imgLandRoverDefender,
  "Land RoverRange Rover": imgLandRoverRangeRover,
};

const AllCarPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars/all");
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCardClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <>
    <NavLR/>
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
                cover={<img alt={car.make + " " + car.model} src={carImages[car.make + car.model]} style={{ height: "200px", objectFit: "cover" }} />}
                onClick={() => handleCardClick(car.id)}
              >
                <Card.Meta title={`${car.make} ${car.model}`} description={`Price: $${car.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div></>
  );
};

export default AllCarPage;

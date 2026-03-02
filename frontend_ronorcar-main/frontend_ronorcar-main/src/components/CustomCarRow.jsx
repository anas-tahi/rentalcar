import React from "react";
import { Card, Col, Row, Button } from "antd";
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
import { useNavigate } from "react-router-dom";

const carImages = {
  "Mercedes-BenzG-Class": imgMercedesBenzGClass,
  "Mercedes-BenzGLA": imgMercedesBenzGLA,
  "Mercedes-BenzGLC Coupe": imgMercedesBenzGLCCoupe,
  "Mercedes-BenzGLS": imgMercedesBenzGLS,
  "Mercedes-BenzS-Class": imgMercedesBenzSClass,
  PorscheCayenne: imgPorscheCayenne,
  "PorscheMacan Turbo EV": imgPorscheMacanTurboEV,
  Porsche911: imgPorsche911,
  "Aston MartinDB11": imgAstonMartinDB11,
  AudiQ7: imgAudiQ7,
  "JeepGrand Cherokee": imgJeepGrandCherokee,
  JeepWrangler: imgJeepWrangler,
  "Land RoverDefender": imgLandRoverDefender,
  "Land RoverRange Rover": imgLandRoverRangeRover,
};
const CustomCarRow = ({ rowTitle, data, isLoading }) => {
  const navigate =useNavigate();

  return (
    <div className="px-10 md:px-0 mt-36">
      {rowTitle && (
        <div className="flex justify-between items-center mt-4 mb-4">
          <h2 className="ml-4 mb-6 font-semibold text-secondary-300">
            {rowTitle}
          </h2>
          <Button
            type="primary"
            onClick={() => {
              navigate("/cars");
            }}
          >
            View All
          </Button>
        </div>
      )}
      <Row gutter={[16, 16]}>
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          data.map((car) => (
            <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={car.make + car.model}
                    src={carImages[car.make + car.model]}
                  />
                }
              >
                <Card.Meta
                  title={car.model}
                  description={`Price: $${car.price}`}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default CustomCarRow;

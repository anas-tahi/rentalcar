import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const CarItem = ({ car }) => {
  const [heartFilled, setHeartFilled] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log("View details clicked for:", car.name);
  };

  const rentNowHandler = () => {
    navigate(`/rent-car/${car.id}`, { state: { car } });
  };

  return (
    <Container
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1), 0 20px 40px rgba(255,215,0,0.2)",
        border: "1px solid rgba(255,215,0,0.2)",
        height: "420px"
      }}
    >
      {/* Car Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image || '/api/placeholder/placeholder.png'}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ filter: "brightness(1.1) contrast(1.1)" }}
        />
        
        {/* Premium Badge */}
        {car.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
        )}
        
        {/* Car Type Badge */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-xs font-bold">
          {car.category}
        </div>
      </div>

      {/* Car Information */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
              {car.make} {car.model}
            </h2>
            <p className="text-gray-400 text-sm uppercase tracking-wide mb-3">
              {car.year} • {car.category}
            </p>
          </div>
          
          {/* Price */}
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              ${car.price.toFixed(2)}
              <span className="text-lg text-gray-400 font-normal">/day</span>
            </div>
            {car.discount && (
              <div className="text-green-400 text-sm line-through">
                Save ${car.discount.toFixed(2)}/day
              </div>
            )}
          </div>
        </div>

        {/* Car Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 bg-black bg-opacity-30 rounded-lg p-3">
            <i className="fas fa-gas-pump text-yellow-400 text-lg"></i>
            <div>
              <p className="text-xs text-gray-400 uppercase">Fuel Type</p>
              <p className="text-white font-semibold">{car.fuelType || 'Petrol'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-black bg-opacity-30 rounded-lg p-3">
            <i className="fas fa-cogs text-yellow-400 text-lg"></i>
            <div>
              <p className="text-xs text-gray-400 uppercase">Transmission</p>
              <p className="text-white font-semibold">{car.transmission || 'Automatic'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-black bg-opacity-30 rounded-lg p-3">
            <i className="fas fa-users text-yellow-400 text-lg"></i>
            <div>
              <p className="text-xs text-gray-400 uppercase">Seats</p>
              <p className="text-white font-semibold">{car.seats || '5'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-black bg-opacity-30 rounded-lg p-3">
            <i className="fas fa-suitcase text-yellow-400 text-lg"></i>
            <div>
              <p className="text-xs text-gray-400 uppercase">Luggage</p>
              <p className="text-white font-semibold">{car.luggage || '2 Large'}</p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {car.airConditioning && (
            <div className="bg-black bg-opacity-30 px-3 py-2 rounded-lg flex items-center space-x-2">
              <i className="fas fa-snowflake text-blue-400"></i>
              <span className="text-white text-sm">Air Conditioning</span>
            </div>
          )}
          {car.bluetooth && (
            <div className="bg-black bg-opacity-30 px-3 py-2 rounded-lg flex items-center space-x-2">
              <i className="fas fa-bluetooth text-blue-400"></i>
              <span className="text-white text-sm">Bluetooth</span>
            </div>
          )}
          {car.gps && (
            <div className="bg-black bg-opacity-30 px-3 py-2 rounded-lg flex items-center space-x-2">
              <i className="fas fa-map-marked-alt text-green-400"></i>
              <span className="text-white text-sm">GPS Navigation</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
          {car.description || 'Experience luxury and comfort with our premium vehicle. Perfect for business trips, family vacations, or special occasions. Features modern amenities and exceptional performance.'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex space-x-3">
            <button
              onClick={clickHandler}
              className="flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-yellow-400 hover:text-black"
            >
              <i className="fas fa-info-circle mr-2"></i>
              View Details
            </button>
            <button
              onClick={rentNowHandler}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 hover:shadow-lg hover:shadow-yellow-400"
            >
              <i className="fas fa-car mr-2"></i>
              Rent Now
            </button>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={() => setHeartFilled((prev) => !prev)}
            className="absolute top-4 right-4 text-2xl transition-all duration-300 hover:scale-110"
          >
            <i
              className={
                heartFilled
                  ? "fas fa-heart text-red-500"
                  : "far fa-heart text-gray-400 hover:text-red-400"
              }
            ></i>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default CarItem;

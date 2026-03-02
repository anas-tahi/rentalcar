import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import CustomCarRow from "./CustomCarRow";
import { useNavigate } from "react-router-dom";

const TopRecommendCar = () => {
  const [topCars, setTopCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);

  useEffect(() => {
    const fetchTopCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars/topCars");
        setTopCars(response.data);
        setIsLoadingTop(false);
      } catch (error) {
        console.error("Error fetching top cars:", error);
      }
    };

    const fetchRecommendedCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars/recommendedCars");
        setRecommendedCars(response.data);
        console.log(response.data);
        setIsLoadingRecommended(false);
      } catch (error) {
        console.error("Error fetching recommended cars:", error);
      }
    };

    fetchTopCars();
    fetchRecommendedCars();
  }, []);

  return (
    <Container mt={20} mb={15}>
      <CustomCarRow
        rowTitle="Top Cars"
        data={topCars}
        isLoading={isLoadingTop}
      />
      <CustomCarRow
        rowTitle="Recommended Cars"
        data={recommendedCars}
        isLoading={isLoadingRecommended}
      />
    </Container>
  );
};

export default TopRecommendCar;

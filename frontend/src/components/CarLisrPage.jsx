import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from Framer Motion
import CarItem from "./CarItem";
import CarFilter from "./CarFilter";
import Spinner from "./Spinner"; // Import Spinner component
import { Button } from "@mui/material";
import {
  Container,
  Grid,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { carsAPI } from "../Api/cars"; // Import cars API

// Helper function to get unique values for a specific key
const getUniqueValues = (data, key) => {
  return [...new Set(data.map((item) => item[key]))];
};

const CarListPage = ({ searchParams }) => {
  const [cars, setCars] = useState([]); // State for cars from API
  const [filters, setFilters] = useState({
    category: "",
    gas: "",
    gear: "",
  });
  const [sortBy, setSortBy] = useState(""); // State for sorting
  const [filterVisible, setFilterVisible] = useState(false); // State to track filter visibility
  const [searchConducted, setSearchConducted] = useState(false); // State to track if a search is conducted
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State for API errors

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carsData = await carsAPI.getAllCars();
        setCars(carsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const categories = getUniqueValues(cars, "category");
  const gasTypes = getUniqueValues(cars, "gas");
  const gearTypes = getUniqueValues(cars, "gear");

  // Function to sort cars based on selected criteria
  const sortCars = (cars, sortBy) => {
    switch (sortBy) {
      case "priceAsc":
        return cars.slice().sort((a, b) => a.price - b.price);
      case "priceDesc":
        return cars.slice().sort((a, b) => b.price - a.price);
      case "nameAsc":
        return cars.slice().sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return cars.slice().sort((a, b) => b.name.localeCompare(a.name));
      default:
        return cars;
    }
  };

  // Clear search parameters on page load
  useEffect(() => {
    if (searchParams) {
      setSearchConducted(true);
    } else {
      setSearchConducted(false);
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }, [searchParams]);

  // Filter cars based on searchParams
  const filteredCars = cars.filter((car) => {
    return (
      (!filters.category || car.category === filters.category) &&
      (!filters.gas || car.gas === filters.gas) &&
      (!filters.gear || car.gear === filters.gear) &&
      (!searchParams ||
        !searchParams.carType ||
        car.category === searchParams.carType)
    );
  });

  const sortedCars = sortCars(filteredCars, sortBy);

  return (
    <Container
      id="Result-section"
      sx={{
        p: 2,
        border: "2px solid #b5b5b5",
        borderRadius: "1rem",
        alignSelf: "center",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          userSelect: "none",
          mt: 4,
          mb: 2,
          color: "gray",
          fontFamily: "Poppins, sans-serif",
          borderBottom: "1px solid #cdced1",
          "&:hover": { color: "blue", cursor: "pointer" }, // Hover effect
        }}
        onClick={() => setFilterVisible((prev) => !prev)}
      >
        Show Filter
      </Typography>
      <AnimatePresence>
        {filterVisible && (
          <motion.div
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 500, transition: { duration: 0.5 } }}
            exit={{ maxHeight: 0, transition: { duration: 0.5 } }}
            style={{ overflow: "hidden" }}
          >
            <CarFilter
              filters={filters}
              setFilters={setFilters}
              categories={categories}
              gasTypes={gasTypes}
              gearTypes={gearTypes}
            />
            <Box mb={3} display="flex" justifyContent="start">
              <FormControl variant="outlined" style={{ minWidth: "150px" }}>
                <Select
                  value={sortBy}
                  sx={{
                    fontSize: "1.5rem",
                    width: "auto", // Adjust the width
                    height: 40,
                  }}
                  onChange={(e) => setSortBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">Sort by</MenuItem>
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                  <MenuItem value="nameAsc">Name: A to Z</MenuItem>
                  <MenuItem value="nameDesc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {searchParams && searchParams.carType ? (
        <Typography
          gutterBottom
          sx={{
            fontSize: "2.2rem",
            mt: 4,
            mb: 3,
            borderBottom: "1px solid #cdced1",
            color: "gray",
          }}
        >
          <span className="text-sky-600">{searchParams.carType}</span>
          {" "} - search results
        </Typography>
      ) : (
        <Typography
          gutterBottom
          color="GrayText"
          sx={{
            fontSize: "2.2rem",
            mt: 4,
            mb: 3,
            borderBottom: "1.8px solid #cdced1",
            color: "gray",
          }}
        >
          Results :
        </Typography>
      )}
      {/* Add Edit Search Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: 11,
            fontFamily: "Poppins,sans serif",
          }}
          onClick={() => {
            document
              .querySelector("#booking-section")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Edit Search
        </Button>
      </Box>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Box
          mt={10}
          mb={15}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "2.2rem",
              color: "red",
            }}
          >
            {error}
          </Typography>
        </Box>
      ) : searchConducted ? (
        sortedCars.length > 0 ? (
          <Grid container spacing={8}>
            {sortedCars.map((car) => (
              <Grid
                item
                key={car.id}
                xs={12}
                sm={6}
                md={3.3}
                container
                direction="column"
                style={{ display: "flex" }}
              >
                <CarItem car={car} style={{ flex: 1 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            mt={10}
            mb={15}
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: "2.2rem",
                color: "gray",
              }}
            >
              No cars found matching your criteria.
            </Typography>
          </Box>
        )
      ) : (
        <Box
          mt={10}
          mb={15}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: 22,
              color: "gray",
              fontFamily: "Poppins, sans-serif",
              "&:hover": { color: "blue", cursor: "pointer" }, // Hover effect
            }}
            onClick={() => {
              document
                .querySelector("#booking-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Scroll up to search for cars
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CarListPage;

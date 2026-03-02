import { useContext, useState } from "react";
import {
  Input,
  Space,
  Layout,
  message,
  Card,
  InputNumber,
  Button,
  Row,
  Col,
  Menu,
  Empty,
  Divider,
} from "antd";
import {
  CarOutlined,
  DollarOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { carData } from "./carData";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function BookingPage() {
  const [cars, setCars] = useState(carData);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    ratings: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuClick = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const handlePriceChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const handleReservation = async (carId) => {
    try {
      // const reservationData = {
      //   userId: currentUser.id, // Replace with actual user ID
      //   carId: carId,
      //   startDate: new Date().toISOString(), // Replace with actual start date
      //   endDate: new Date().toISOString(), // Replace with actual end date
      //   totalAmount: cars.find((car) => car.id === carId).price, // Calculate based on actual rental duration
      // };

      // const response = await axios.post(
      //   "http://localhost:5000/api/reservations",
      //   reservationData
      // );
      // message.success("Reservation successful!");
      navigate(`/payment/${carId}`);

    } catch (error) {
      console.error(error);
      message.error("Failed to make a reservation. Please try again.");
    }
  };
  const filteredCars = cars.filter((car) => {
    const brandMatches = car.brand
      .toLowerCase()
      .includes(filters.brand.toLowerCase());
    const nameMatches = car.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const minPriceMatches =
      !filters.minPrice || car.price >= parseInt(filters.minPrice);
    const maxPriceMatches =
      !filters.maxPrice || car.price <= parseInt(filters.maxPrice);
    const ratingsMatches =
      !filters.ratings || car.ratings >= parseInt(filters.ratings);

    return (
      brandMatches &&
      nameMatches &&
      minPriceMatches &&
      maxPriceMatches &&
      ratingsMatches
    );
  });

  const menuItems = [
    {
      key: "ratings",
      label: "Ratings",
      children: [
        {
          key: "1",
          label: (
            <>
              <StarOutlined /> 1+
            </>
          ),
        },
        {
          key: "2",
          label: (
            <>
              <StarOutlined /> 2+
            </>
          ),
        },
        {
          key: "3",
          label: (
            <>
              <StarOutlined /> 3+
            </>
          ),
        },
        {
          key: "4",
          label: (
            <>
              <StarOutlined /> 4+
            </>
          ),
        },
        {
          key: "5",
          label: (
            <>
              <StarOutlined /> 5
            </>
          ),
        },
      ],
    },
  ];

  const handleRemoveFilter = (filterType) => {
    setFilters({ ...filters, [filterType]: "" });
  };

  return (
    <>
      <Layout className="booking-page">
        <Sider
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            borderTop: "1px solid grey",
          }}
          theme="light"
          width={250}
          className={`sidebar ${showSidebar ? "show" : "hide"}`}
        >
          <h2
            style={{ padding: 10, display: "flex", justifyContent: "center" }}
          >
            Filters
          </h2>
          {menuItems.map((menuItem) => (
            <Menu
              key={menuItem.key}
              style={{ width: "100%", marginBottom: "10px" }}
              mode="inline"
              onClick={({ key }) => handleMenuClick(menuItem.key, key)}
            >
              <SubMenu key={menuItem.key} title={menuItem.label}>
                {menuItem.children.map((child) => (
                  <Menu.Item key={child.key}>{child.label}</Menu.Item>
                ))}
              </SubMenu>
            </Menu>
          ))}
          <div style={{ marginBottom: "20px" }}>
            {/* Render buttons beside each filter */}
            {Object.keys(filters).map(
              (filterType) =>
                filters[filterType] && (
                  <div key={filterType} style={{ marginBottom: "10px" }}>
                    <span>
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      : {filters[filterType]}
                    </span>
                    <Button
                      type="text"
                      onClick={() => handleRemoveFilter(filterType)}
                    >
                      Remove
                    </Button>
                  </div>
                )
            )}
          </div>
          <Divider />
          <Space.Compact
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputNumber
              placeholder="Min"
              addonBefore="$"
              style={{ width: "45%" }}
              min={0}
              max={10000}
              onChange={(value) => handlePriceChange("minPrice", value)}
            />
            <InputNumber
              placeholder="Max"
              addonAfter="$"
              style={{ width: "45%" }}
              min={0}
              max={10000}
              onChange={(value) => handlePriceChange("maxPrice", value)}
            />
          </Space.Compact>
        </Sider>

        <Content
          className="main-content"
          style={{
            padding: "20px",
            marginLeft: 250, // Adjust margin to accommodate the sidebar width
            overflowY: "auto",
            height: "100vh", // Set content height to fill the viewport
          }}
        >
          <Input.Search
            placeholder="Search for cars..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: "20px" }}
          />
          {filteredCars.length > 0 ? (
            <Row gutter={[16, 16]} justify="center" align="middle">
              {filteredCars.map((car) => (
                <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    style={{ marginBottom: "20px", width: "100%" }}
                    bodyStyle={{ padding: "12px" }}
                    cover={
                      <img
                        alt={car.name}
                        src={car.image}
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    }
                  >
                    <Card.Meta
                      title={
                        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {car.name}
                        </div>
                      }
                      description={
                        <div style={{ fontSize: "12px" }}>
                          <p>
                            <CarOutlined /> Brand: {car.brand}
                          </p>
                          <p>
                            <DollarOutlined /> Price: ${car.price} per day
                          </p>
                          {/* Additional car details */}
                          <p>Fuel Type: {car.fuelType}</p>
                          <p>Transmission: {car.transmission}</p>
                          <p>Discount: {car.discount}% off</p>
                          <p>
                            <StarOutlined /> Ratings: {car.ratings} stars
                          </p>
                        </div>
                      }
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: "12px", width: "100%" }}
                      onClick={() => handleReservation(car.id)}
                    >
                      Reserve
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              imageStyle={{
                height: 70,
                marginTop: 160,
                alignSelf: "center",
                justifySelf: "center",
              }}
              description={<span>No cars found</span>}
            />
          )}
        </Content>
      </Layout>
    </>
  );
}

export default BookingPage;

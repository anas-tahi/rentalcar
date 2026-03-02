import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Input,
  Row,
  Col,
  message,
  Divider,
  Typography,
  Space,
} from "antd";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBarN";
import { carData } from "./carData";
import { AuthContext } from "../Context/authContext";
import axios from "axios";

const { TextArea } = Input;

const couponCodes = {
  DISCOUNT10: { discount: 10, expires: new Date("2024-12-31") },
  SUMMER20: { discount: 20, expires: new Date("2024-07-01") },
  WINTER30: { discount: 30, expires: new Date("2024-01-31") },
};

const PaymentPage = () => {
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState("");
  const { carId } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState(carData);
  const selectedCar = carData.find((car) => car.id === carId);
  const { currentUser } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      couponCode: "",
    },
    onSubmit: async (values) => {
      try {
        const selectedCar = cars.find((car) => car.id === carId);
        const basePrice = selectedCar ? selectedCar.price : 0;
        let totalPrice = basePrice;

        if (couponApplied) {
          totalPrice -= (basePrice * discount) / 100;
        }

        const reservationData = {
          userId: currentUser.id,
          carId: carId,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          totalAmount: totalPrice,
        };

        const response = await axios.post(
          "http://localhost:5000/api/reservations",
          reservationData
        );
        message.success("Reservation successful!");
        navigate(`/dashboard/user`);
      } catch (error) {
        console.error(error);
        message.error("Failed to make a reservation. Please try again.");
      }
    },
  });

  const applyCoupon = () => {
    const { couponCode } = formik.values;
    const coupon = couponCodes[couponCode];

    if (coupon) {
      if (new Date() <= coupon.expires) {
        setDiscount(coupon.discount);
        setCouponApplied(true);
        setCouponStatus("valid");
      } else {
        setCouponStatus("expired");
      }
    } else {
      setCouponStatus("invalid");
    }
  };

  const carPrice = selectedCar ? selectedCar.price : 0;
  const discountedPrice = carPrice - (carPrice * discount) / 100;

  return (
    <>
      <Navbar />
      <Form
        onFinish={formik.handleSubmit}
        style={{
          margin: 22,
          padding: "12px 40px",
          borderRadius: 30,
          backgroundColor: "#FDFDFD",
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Typography
            style={{
              fontFamily: "Poppins,sans serif",
              fontSize: 35,
            }}
          >
            Payment
          </Typography>
        </Row>
        <Divider></Divider>
        <Row
          gutter={22}
          style={{
            fontFamily: "Poppins,sans serif",
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            marginBottom: 20,
          }}
        >
          {selectedCar && (
            <>
              <Col>
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  style={{
                    border: "1px solid rgb(0,0,0,0.2)",
                    backgroundColor: "rgb(0,0,0,0.01)",
                    margin: 20,
                    borderRadius: "18px",
                    width: "300px",
                    height: "300px",
                    objectFit: "scale-down",
                  }}
                />
              </Col>
              <Col style={{ margin: 10 }}>
                <Typography
                  style={{
                    fontFamily: "Poppins,sans serif",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Car: {selectedCar.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins,sans serif",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Price: ${selectedCar.price}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins,sans serif",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  idNumber: {selectedCar.id}
                </Typography>
              </Col>
            </>
          )}
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Divider>Order Summary</Divider>
            <p>
              Full Name: {currentUser.firstName} {currentUser.lastName}
            </p>
            <p>Email: {currentUser.email}</p>
            <p>Phone Number: {currentUser.phoneNumber}</p>
            <p>Address: {currentUser.address}</p>
            <p>Total Price: ${carPrice}</p>
            {couponApplied && (
              <>
                <p>
                  Discount: {discount}% (-${(carPrice * discount) / 100})
                </p>
                <p>
                  <span style={{ textDecoration: "line-through" }}>
                    ${carPrice}
                  </span>{" "}
                  <span style={{ color: "green" }}>${discountedPrice}</span>
                </p>
              </>
            )}
            <Form.Item label="Coupon Code">
              <Space.Compact>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.couponCode}
                  size="large"
                  name="couponCode"
                />
                <Button type="primary" onClick={applyCoupon} size="large">
                  Apply
                </Button>
              </Space.Compact>
              {couponStatus === "valid" && (
                <Typography style={{ marginTop: 8, color: "green" }}>
                  Coupon applied! You get a {discount}% discount.
                </Typography>
              )}
              {couponStatus === "expired" && (
                <Typography style={{ marginTop: 8, color: "red" }}>
                  Coupon expired.
                </Typography>
              )}
              {couponStatus === "invalid" && (
                <Typography style={{ marginTop: 8, color: "red" }}>
                  Invalid coupon code.
                </Typography>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default PaymentPage;

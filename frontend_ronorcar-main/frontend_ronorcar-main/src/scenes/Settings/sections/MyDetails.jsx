import React from "react";
import { Typography, Row, Col } from "antd";
import { useTheme } from "@mui/material/styles";

const { Title, Text } = Typography;

const MyDetails = ({ userDetails }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const detailStyle = {
    color: mode === "dark" ? "#ddd" : "#777",
    marginBottom: "16px",
  };

  return (
    <div
      style={{
        padding: "16px",
        background: mode === "dark" ? "#001529" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      <Title level={5} style={{ color: mode === "dark" ? "#fff" : "#000" }}>
        My Details
      </Title>
      <Text
        type="secondary"
        style={{ color: mode === "dark" ? "#ddd" : "#777" }}
      >
        View your personal and contact information here
      </Text>
      <div style={{ marginTop: "16px" }}>
        <Row style={detailStyle}>
          <Col span={8}><strong>First Name:</strong></Col>
          <Col span={16}>{userDetails.firstName}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Last Name:</strong></Col>
          <Col span={16}>{userDetails.lastName}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Email:</strong></Col>
          <Col span={16}>{userDetails.email}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Phone Number:</strong></Col>
          <Col span={16}>{userDetails.phoneNumber}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Date of Birth:</strong></Col>
          <Col span={16}>{userDetails.dob}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Gender:</strong></Col>
          <Col span={16}>{userDetails.gender}</Col>
        </Row>
        <Row style={detailStyle}>
          <Col span={8}><strong>Address:</strong></Col>
          <Col span={16}>{userDetails.address}</Col>
        </Row>
      </div>
    </div>
  );
};

export default MyDetails;

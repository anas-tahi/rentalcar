import React, { useState } from "react";
import { Typography, Radio, Button, Form, Input } from "antd";
import { useTheme } from "@mui/material/styles";

const { Title, Text } = Typography;

const PaymentInfo = ({ paymentDetails, onUpdatePaymentMethod }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const [selectedMethod, setSelectedMethod] = useState(paymentDetails.method);

  const handlePaymentMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleUpdatePaymentMethod = () => {
    onUpdatePaymentMethod(selectedMethod);
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
        Payment Information
      </Title>
      <Text
        type="secondary"
        style={{ color: mode === "dark" ? "#ddd" : "#777" }}
      >
        View and update your payment method
      </Text>
      <Form layout="vertical" style={{ marginTop: "16px" }}>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Current Payment Method
            </label>
          }
        >
          <Input
            value={paymentDetails.method}
            readOnly
            style={{ color: mode === "dark" ? "#fff" : "#000" }}
          />
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Update Payment Method
            </label>
          }
        >
          <Radio.Group
            onChange={handlePaymentMethodChange}
            value={selectedMethod}
            style={{ color: mode === "dark" ? "#fff" : "#000" }}
          >
            <Radio value="Credit Card">Credit Card</Radio>
            <Radio value="PayPal">PayPal</Radio>
            <Radio value="Bank Transfer">Bank Transfer</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleUpdatePaymentMethod}>
            Update Payment Method
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentInfo;

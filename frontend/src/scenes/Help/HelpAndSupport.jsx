import React, { useState } from "react";
import { Typography, Button, Input, Form } from "antd";
import { useTheme } from "@mui/material/styles";
const { Title, Text } = Typography;
const { TextArea } = Input;

const HelpAndSupport = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const handleContactSupport = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setMessage("");
  };

  const handleSubmit = (values) => {
    // Add functionality to send the form data (values) to support
    console.log("Form submitted with values:", values);
    // Clear the message input field after sending
    setMessage("");
    // Close the form
    setShowForm(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div
      style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        padding: "16px",
        background: mode === "dark" ? "#001529" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      <Title level={5} style={{ color: mode === "dark" ? "#fff" : "#000" }}>
        Help and Support
      </Title>
      <Text
        type="secondary"
        style={{ color: mode === "dark" ? "#ddd" : "#777" }}
      >
        Need assistance? Contact our support team.
      </Text>
      {!showForm && (
        <Button
          type="primary"
          style={{ marginTop: "16px" }}
          onClick={handleContactSupport}
        >
          Contact Support
        </Button>
      )}
      {showForm && 
        <Form
          onFinish={handleSubmit}
          style={{ marginTop: "16px" }}
          initialValues={{ message }}
        >
          <Form.Item
            name="message"
            rules={[
              { required: true, message: "Please enter your message" },
              { max: 1500, message: "Exceeds maximum length of 1500 characters" },
            ]}
          >
            <TextArea
             count={{
              show:true,
              max:1500,
              style: { color: "red" } // Inline style to change character count color
             }}
              rows={4}
              placeholder="Type your message here..."
              onChange={handleMessageChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      }
       
      {/* Custom styling for character count */}
    </div>
  );
};

export default HelpAndSupport;

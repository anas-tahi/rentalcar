import React from "react";
import { Typography, Form, Input, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";

const { Title, Text } = Typography;

const AccountInfo = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <div
      style={{
        padding: "16px",
        background: mode === "dark" ? "#001529" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      <Title level={5} style={{ color: mode === "dark" ? "#fff" : "#000" }}>
        Account Information
      </Title>
      <Text
        type="secondary"
        style={{ color: mode === "dark" ? "#ddd" : "#777" }}
      >
        Update your account information here
      </Text>
      <Form layout="vertical">
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Email
            </label>
          }
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Phone Number
            </label>
          }
        >
          <Input placeholder="+212 17*******" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SaveOutlined />}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountInfo;

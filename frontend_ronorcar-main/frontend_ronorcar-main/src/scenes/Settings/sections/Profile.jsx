import React, { useState } from "react";
import {
  Typography,
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  message,
  Select,
  Modal,
} from "antd";
import { InboxOutlined, SaveOutlined } from "@ant-design/icons";
import { useTheme } from "@mui/material/styles";

const { Title, Text } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Profile = ({ onPhotoChange }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleProfilePhotoChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadProps = {
    accept: "image/*",
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    onPreview: handlePreview,
    onChange: handleProfilePhotoChange,
    multiple: false,
    fileList,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: false,
    },
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
        Profile
      </Title>
      <Text
        type="secondary"
        style={{ color: mode === "dark" ? "#ddd" : "#777" }}
      >
        Update your photo and personal details here
      </Text>
      <Form layout="vertical">
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Live in
            </label>
          }
        >
          <Input placeholder="Sylhet, Bangladesh" />
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Street
            </label>
          }
        >
          <Input placeholder="SYL 3108" />
        </Form.Item>
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
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Date of Birth
            </label>
          }
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Gender
            </label>
          }
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <label style={{ color: mode === "dark" ? "#ddd" : "#777" }}>
              Your Photo
            </label>
          }
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          <Text
            type="secondary"
            style={{ color: mode === "dark" ? "#ddd" : "#777" }}
          >
            This will be displayed in your profile
          </Text>
          <Modal
            visible={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
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

export default Profile;

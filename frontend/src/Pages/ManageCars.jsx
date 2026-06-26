import React, { useEffect, useState } from "react";
import { Table, Typography, Spin, Button, message, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { carData } from "./carData";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [carDetails, setCarDetails] = useState({ name: '', price: '', number: '' });

  useEffect(() => {
    // Simulate fetching car data
    setCars(carData);
    setLoading(false);
  }, []);

  const handleDeleteCar = async (carId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${carId}`);
      setCars(prevCars => prevCars.filter(car => car.id !== carId));
      message.success("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car:", error);
      message.error("Failed to delete car. Please try again.");
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setCarDetails({ name: car.name, price: car.price, number: car.number });
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/cars/${editingCar.id}`, carDetails);
      setCars(prevCars => prevCars.map(car => car.id === editingCar.id ? { ...car, ...carDetails } : car));
      setEditModalVisible(false);
      message.success("Car details updated successfully!");
    } catch (error) {
      console.error("Error updating car details:", error);
      message.error("Failed to update car details. Please try again.");
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="car" style={{ width: "100px", height: "auto" }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditCar(record)}
          >
            Edit
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCar(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Typography.Title level={3} style={{ marginBottom: "20px" }}>
          Manage Cars
        </Typography.Title>
        <Table columns={columns} dataSource={cars} rowKey="id" />

        <Modal
          title="Edit Car Details"
          visible={editModalVisible}
          onOk={handleSaveEdit}
          onCancel={() => setEditModalVisible(false)}
        >
          <Input
            placeholder="Car Name"
            value={carDetails.name}
            onChange={(e) => setCarDetails({ ...carDetails, name: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Price"
            value={carDetails.price}
            onChange={(e) => setCarDetails({ ...carDetails, price: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Input
            placeholder="Number"
            value={carDetails.number}
            onChange={(e) => setCarDetails({ ...carDetails, number: e.target.value })}
          />
        </Modal>
      </div>
    </>
  );
};

export default ManageCars;
